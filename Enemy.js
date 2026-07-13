export class Enemy {
  constructor({ def, row, x, mesh }) {
    Object.assign(this, { def, row, x, mesh });
    this.hp = def.hp;
    this.attackTimer = 0;
  }
}
