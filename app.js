import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GameState } from "./core/GameState.js";
import { Grid } from "./board/Grid.js";
import { Plant } from "./entities/Plant.js";
import { Enemy } from "./entities/Enemy.js";
import { Factory } from "./systems/Factory.js";
import { HUD } from "./ui/HUD.js";

const [heroes, enemyDefs, waveConfig] = await Promise.all([
  fetch("./data/heroes.json").then(r => r.json()),
  fetch("./data/enemies.json").then(r => r.json()),
  fetch("./data/waves.json").then(r => r.json())
]);

const canvas = document.getElementById("gameCanvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fd6f4);

const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
camera.position.set(4, 12, 15);

const controls = new OrbitControls(camera, canvas);
controls.target.set(2, 0, 0);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 10;
controls.maxDistance = 24;
controls.maxPolarAngle = Math.PI * 0.45;
controls.update();

scene.add(new THREE.HemisphereLight(0xffffff, 0x355b2f, 1.8));
const directional = new THREE.DirectionalLight(0xffffff, 2.2);
directional.position.set(-8, 14, 10);
directional.castShadow = true;
scene.add(directional);

const state = new GameState();
const grid = new Grid(scene);
const factory = new Factory();
const hud = new HUD(state, heroes);

const heroMap = Object.fromEntries(heroes.map(x => [x.id, x]));
const enemyMap = Object.fromEntries(enemyDefs.map(x => [x.id, x]));
const plants = [];
const enemies = [];
const shots = [];
const spawnQueue = [];
const occupied = new Set();

let lastTime = performance.now();

function place(row, col) {
  if (col > 5) return hud.flash("วางได้เฉพาะ 6 ช่องฝั่งซ้าย");

  const key = `${row}:${col}`;
  if (occupied.has(key)) return hud.flash("ช่องนี้มีต้นไม้อยู่แล้ว");

  const def = heroMap[state.selectedHero];
  if (state.sun < def.cost) return hud.flash("แสงแดดไม่พอ");

  state.sun -= def.cost;
  occupied.add(key);

  const mesh = factory.plant(def.id);
  mesh.position.copy(grid.world(col, row));
  scene.add(mesh);

  plants.push(new Plant({ def, row, col, mesh }));
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

canvas.addEventListener("pointerup", event => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(grid.tiles)[0];
  if (hit) place(hit.object.userData.row, hit.object.userData.col);
});

function startWave() {
  if (state.running) return;
  state.running = true;
  state.wave++;

  const count = waveConfig.baseCount + state.wave * waveConfig.countPerWave;
  for (let i = 0; i < count; i++) {
    spawnQueue.push({
      at: performance.now() + i * waveConfig.spawnIntervalMs,
      type: i % waveConfig.beetleEvery === waveConfig.beetleEvery - 1 ? "beetle" : "hopper",
      row: Math.floor(Math.random() * grid.rows)
    });
  }

  document.getElementById("startWaveBtn").disabled = true;
}

document.getElementById("startWaveBtn").onclick = startWave;

function spawnEnemy(item) {
  const def = enemyMap[item.type];
  const mesh = factory.enemy(item.type);
  mesh.position.copy(grid.world(grid.cols + 0.4, item.row));
  scene.add(mesh);
  enemies.push(new Enemy({ def, row: item.row, x: grid.cols + 0.4, mesh }));
}

function fire(plant, target) {
  const mesh = factory.projectile();
  mesh.position.copy(plant.mesh.position).add(new THREE.Vector3(0.25, 0.7, 0));
  scene.add(mesh);
  shots.push({ mesh, target, damage: plant.def.damage, speed: 7 });
}

function update(dt, now) {
  while (spawnQueue.length && spawnQueue[0].at <= now) {
    spawnEnemy(spawnQueue.shift());
  }

  for (const plant of plants) {
    if (plant.def.role === "support") {
      plant.productionTimer += dt;
      if (plant.productionTimer >= plant.def.sunEvery) {
        plant.productionTimer = 0;
        state.sun += plant.def.sunAmount;
        hud.flash(`+${plant.def.sunAmount} แสงแดด`);
      }
    }

    if (plant.def.role === "ranged") {
      plant.cooldown -= dt;
      const target = enemies
        .filter(e => e.row === plant.row && e.x > plant.col)
        .sort((a, b) => a.x - b.x)[0];

      if (target && plant.cooldown <= 0) {
        plant.cooldown = plant.def.cooldown;
        fire(plant, target);
      }
    }
  }

  for (const enemy of enemies) {
    const blocker = plants.find(p => p.row === enemy.row && Math.abs(enemy.x - p.col) < 0.5);

    if (blocker) {
      enemy.attackTimer -= dt;
      if (enemy.attackTimer <= 0) {
        enemy.attackTimer = 1;
        blocker.hp -= enemy.def.damage;
      }
    } else {
      enemy.x -= enemy.def.speed * dt;
    }

    enemy.mesh.position.x = grid.world(enemy.x, enemy.row).x;

    if (enemy.x < -0.2) {
      state.coreHp -= 12;
      enemy.hp = 0;
    }
  }

  for (const shot of shots) {
    if (!shot.target || shot.target.hp <= 0) {
      shot.dead = true;
      continue;
    }

    const aim = shot.target.mesh.position.clone().add(new THREE.Vector3(0, 0.4, 0));
    const direction = aim.clone().sub(shot.mesh.position);
    const distance = direction.length();
    const step = shot.speed * dt;

    if (distance <= step) {
      shot.target.hp -= shot.damage;
      shot.dead = true;
    } else {
      shot.mesh.position.add(direction.normalize().multiplyScalar(step));
    }
  }

  for (let i = shots.length - 1; i >= 0; i--) {
    if (!shots[i].dead) continue;
    scene.remove(shots[i].mesh);
    shots.splice(i, 1);
  }

  for (let i = plants.length - 1; i >= 0; i--) {
    if (plants[i].hp > 0) continue;
    occupied.delete(`${plants[i].row}:${plants[i].col}`);
    scene.remove(plants[i].mesh);
    plants.splice(i, 1);
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].hp > 0) continue;
    state.sun += enemies[i].def.reward;
    scene.remove(enemies[i].mesh);
    enemies.splice(i, 1);
  }

  if (state.running && spawnQueue.length === 0 && enemies.length === 0) {
    state.running = false;
    state.level = Math.max(state.level, state.wave + 1);
    state.save();
    document.getElementById("startWaveBtn").disabled = false;
    hud.flash("ผ่านเวฟ!");
  }

  if (state.coreHp <= 0) {
    document.getElementById("endOverlay").classList.remove("hidden");
    document.getElementById("endText").textContent = `คุณป้องกันได้ถึงเวฟ ${state.wave}`;
  }

  hud.render(enemies.length + spawnQueue.length);
}

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.04, (now - lastTime) / 1000);
  lastTime = now;
  update(dt, now);
  controls.update();
  renderer.render(scene, camera);
}
requestAnimationFrame(loop);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js").catch(console.warn);
}
