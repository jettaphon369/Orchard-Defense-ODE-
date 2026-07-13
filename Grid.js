import * as THREE from "three";

export class Grid {
  constructor(scene, { rows = 5, cols = 9, tile = 1.45 } = {}) {
    this.scene = scene;
    this.rows = rows;
    this.cols = cols;
    this.tile = tile;
    this.tiles = [];
    this.build();
  }

  world(col, row) {
    return new THREE.Vector3(
      (col - this.cols / 2 + 0.5) * this.tile,
      0.09,
      (row - this.rows / 2 + 0.5) * this.tile
    );
  }

  build() {
    const island = new THREE.Mesh(
      new THREE.CylinderGeometry(8.8, 7.5, 1.2, 48),
      new THREE.MeshStandardMaterial({ color: 0x6fa94e, roughness: 1 })
    );
    island.position.set(2, -0.65, 0);
    island.receiveShadow = true;
    this.scene.add(island);

    const underside = new THREE.Mesh(
      new THREE.ConeGeometry(7.4, 4.5, 36),
      new THREE.MeshStandardMaterial({ color: 0x6e5445, roughness: 1 })
    );
    underside.position.set(2, -3.45, 0);
    this.scene.add(underside);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const tile = new THREE.Mesh(
          new THREE.BoxGeometry(this.tile - 0.06, 0.14, this.tile - 0.06),
          new THREE.MeshStandardMaterial({
            color: (row + col) % 2 ? 0x6fb44b : 0x78be52,
            roughness: 1
          })
        );
        tile.position.copy(this.world(col, row));
        tile.userData = { row, col };
        tile.receiveShadow = true;
        this.scene.add(tile);
        this.tiles.push(tile);
      }
    }
  }
}
