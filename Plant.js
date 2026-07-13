export class Plant {
  constructor({ def, row, col, mesh }) {
    Object.assign(this, { def, row, col, mesh });
    this.hp = def.hp;
    this.cooldown = 0;
    this.productionTimer = 0;
  }
}
