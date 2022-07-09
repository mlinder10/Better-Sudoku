const mainContainer = document.getElementById("mainContainer");
const body = document.querySelector("body");

class Board {
  constructor() {
    this.boxes = [];
    this.sections = [[], [], [], [], [], [], [], [], []];
    this.rows = [[], [], [], [], [], [], [], [], []];
    this.columns = [[], [], [], [], [], [], [], [], []];
    this.element = mainContainer;
    this.sectionElements = [];

    this.checks = [];

    this.createSections();
    this.createBoxes();
    this.createChecks();

    this.selectedNum = 0;
  }

  createSections() {
    for (let i = 0; i < 9; i++) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "section");
      this.element.appendChild(newDiv);
      this.sectionElements.push(newDiv);
    }
  }

  createBoxes() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            let box = new Box(this.sectionElements[i * 3 + j]);
            this.boxes.push(box);
            this.sections[i * 3 + j].push(box);
            this.rows[j * 3 + l].push(box);
            this.columns[i * 3 + k].push(box);
          }
        }
      }
    }
  }

  createChecks() {
    for (let i = 0; i < 10; i++) {
      let check = new NumSelector(i + 1);
      this.checks.push(check.element);
    }
  }

  update() {
    onclick = (e) => {
      this.boxes.forEach((box) => (box.element.style.background = "white"));
      this.boxes.forEach((box) => box.update());
      this.checks.forEach((check) => {
        if (e.target == check) {
          if (check.innerHTML < 10) board.selectedNum = check.innerHTML;
          else if (check.innerHTML == "Clear") board.selectedNum = 0;
        }
      });
    };
  }
}

class Box {
  constructor(parent) {
    this.element = document.createElement("input");
    parent.appendChild(this.element);
    this.number = 0;
  }

  update() {
    if (this.element.value && this.element.value == board.selectedNum) {
      for (let i = 0; i < board.sections.length; i++) {
        if (board.sections[i].includes(this)) {
          board.sections[i].forEach(
            (spot) => (spot.element.style.background = "red")
          );
        }
      }
      for (let i = 0; i < board.rows.length; i++) {
        if (board.rows[i].includes(this)) {
          board.rows[i].forEach(
            (spot) => (spot.element.style.background = "red")
          );
        }
      }
      for (let i = 0; i < board.columns.length; i++) {
        if (board.columns[i].includes(this)) {
          board.columns[i].forEach(
            (spot) => (spot.element.style.background = "red")
          );
        }
      }
    }
  }
}

class NumSelector {
  constructor(number) {
    this.element = document.createElement("button");
    if (number < 10) this.element.innerHTML = number;
    else if (number == 10) this.element.innerHTML = "Clear";
    body.appendChild(this.element);
  }

  update() {}
}

let board = new Board();
board.update();
