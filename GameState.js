export class GameState {
  constructor() {
    this.sun = 150;
    this.wave = 0;
    this.coreHp = 100;
    this.level = Number(localStorage.getItem("orchardLevel") || 1);
    this.selectedHero = "peach";
    this.running = false;
  }
  save() {
    localStorage.setItem("orchardLevel", String(this.level));
  }
}
