export class HUD {
  constructor(state, heroes) {
    this.state = state;
    this.heroes = heroes;
    this.sun = document.getElementById("sunValue");
    this.wave = document.getElementById("waveValue");
    this.hp = document.getElementById("coreHpValue");
    this.level = document.getElementById("levelValue");
    this.enemy = document.getElementById("enemyValue");
    this.bar = document.getElementById("cardBar");
    this.buildCards();
  }

  buildCards() {
    this.bar.innerHTML = "";
    this.heroes.forEach(hero => {
      const el = document.createElement("div");
      el.className = "card" + (hero.id === this.state.selectedHero ? " selected" : "");
      el.dataset.id = hero.id;
      el.innerHTML = `${hero.emoji} ${hero.name}<small>${hero.cost} แสง</small>`;
      el.onclick = () => {
        this.state.selectedHero = hero.id;
        [...this.bar.children].forEach(c => c.classList.toggle("selected", c.dataset.id === hero.id));
      };
      this.bar.appendChild(el);
    });
  }

  flash(text) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(this.timer);
    this.timer = setTimeout(() => el.classList.remove("show"), 1200);
  }

  render(enemyCount) {
    this.sun.textContent = Math.floor(this.state.sun);
    this.wave.textContent = this.state.wave;
    this.hp.textContent = Math.max(0, Math.floor(this.state.coreHp));
    this.level.textContent = this.state.level;
    this.enemy.textContent = enemyCount;
  }
}
