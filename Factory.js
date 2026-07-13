import * as THREE from "three";

export class Factory {
  material(color) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.72 });
  }

  plant(type) {
    const group = new THREE.Group();
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.55, 8),
      this.material(0x4e8f3d)
    );
    stem.position.y = 0.28;
    group.add(stem);

    if (type === "peach") {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), this.material(0xf49a74));
      body.position.y = 0.72;
      group.add(body);
    } else if (type === "sunny") {
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), this.material(0x6d3d22));
      center.position.y = 0.82;
      group.add(center);
      for (let i = 0; i < 10; i++) {
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), this.material(0xffd43b));
        petal.scale.set(1.7, 0.65, 0.55);
        const angle = i * Math.PI * 2 / 10;
        petal.position.set(Math.cos(angle) * 0.29, 0.82 + Math.sin(angle) * 0.29, 0);
        petal.rotation.z = angle;
        group.add(petal);
      }
    } else {
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), this.material(0xb88753));
      body.scale.set(1.05, 0.85, 0.9);
      body.position.y = 0.44;
      group.add(body);
    }

    group.traverse(o => { if (o.isMesh) o.castShadow = true; });
    return group;
  }

  enemy(type) {
    const group = new THREE.Group();
    const color = type === "hopper" ? 0x72a844 : 0x4a3428;
    const body = new THREE.Mesh(new THREE.SphereGeometry(type === "hopper" ? 0.32 : 0.38, 16, 12), this.material(color));
    body.scale.set(type === "hopper" ? 1.2 : 1.15, type === "hopper" ? 0.8 : 0.95, 0.9);
    body.position.y = 0.42;
    group.add(body);
    group.traverse(o => { if (o.isMesh) o.castShadow = true; });
    return group;
  }

  projectile() {
    return new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xffd17a, emissive: 0xff8a00, emissiveIntensity: 1.2 })
    );
  }
}
