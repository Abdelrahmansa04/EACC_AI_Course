const game = document.getElementById("game");

let screen = 0;
let stars = 0;
let locked = false;

const screens = [
  welcome,
  warmUp,
  colorsGame,
  animalsGame,
  shapesGame,
  fruitGame,
  youtubeGame,
  phoneGame,
  cleanTrainGame,
  robotBuilder,
  finalChallenge,
  finish
];

function render() {
  locked = false;
  screens[screen]();
}

function next() {
  if (screen < screens.length - 1) {
    screen++;
    render();
  }
}

function back() {
  if (screen > 0) {
    screen--;
    render();
  }
}

function topUI() {
  return `
    <div class="top-ui">
      <div class="badge">⭐ ${stars}</div>
      <div class="steps">
        ${screens.map((_, i) => `<span class="step ${i === screen ? "on" : ""}"></span>`).join("")}
      </div>
      <div class="badge">${screen + 1}/${screens.length}</div>
    </div>
  `;
}

function card(content, options = {}) {
  const noBack = options.noBack || false;
  const noNext = options.noNext || false;
  const nextText = options.nextText || "Next ➡";

  game.innerHTML = `
    <div class="card">
      ${topUI()}

      <div class="screen">
        ${content}
      </div>

      <div class="nav">
        ${screen > 0 && !noBack ? `<button class="blue" onclick="back()">⬅ Back</button>` : ""}
        ${screen < screens.length - 1 && !noNext ? `<button onclick="next()">${nextText}</button>` : ""}
      </div>
    </div>
  `;
}

function setFeedback(text, kind = "") {
  const f = document.getElementById("feedback");
  if (!f) return;
  f.className = "feedback " + kind;
  f.textContent = text;
}

function markGood(btn, text = "✅ Great!") {
  if (locked) return;
  locked = true;
  btn.classList.add("good");
  stars++;
  setFeedback(text, "ok");
  confetti(14);
}

function markBad(btn, text = "❌ Look again") {
  if (locked) return;
  btn.classList.add("bad");
  setFeedback(text, "no");
  setTimeout(() => btn.classList.remove("bad"), 450);
}

function confetti(count = 22) {
  const old = document.querySelector(".confetti");
  if (old) old.remove();

  const c = document.createElement("div");
  c.className = "confetti";
  const icons = ["⭐", "✨", "🎉", "✅", "🤖"];

  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.textContent = icons[Math.floor(Math.random() * icons.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDelay = Math.random() * 0.6 + "s";
    c.appendChild(s);
  }

  document.body.appendChild(c);
  setTimeout(() => c.remove(), 2600);
}

/* 1 */

function welcome() {
  stars = 0;

  card(`
    <h2 class="title">Hello Explorers!</h2>
    <div class="ai-face">🤖</div>

    <p class="text">Look carefully.</p>
    <p class="text">Choose what comes next.</p>

    <div class="sequence">
      <div class="tile">👀</div>
      <div class="arrow">➡</div>
      <div class="tile">🔁</div>
      <div class="arrow">➡</div>
      <div class="tile q">❓</div>
    </div>

    <p class="tiny">AI sees many examples.</p>
  `, { noBack: true, nextText: "Start 🚀" });
}

/* 2 */

function warmUp() {
  card(`
    <h2 class="title">Warm Up</h2>
    <p class="text">Watch. Then choose.</p>

    <div class="sequence">
      <div class="tile">👏</div>
      <div class="tile">🦘</div>
      <div class="tile">👏</div>
      <div class="tile">🦘</div>
      <div class="tile">👏</div>
      <div class="tile q">❓</div>
    </div>

    <div class="row">
      <button class="choice" onclick="markBad(this)">👏</button>
      <button class="choice" onclick="markGood(this)">🦘</button>
      <button class="choice" onclick="markBad(this)">😴</button>
    </div>

    <div id="feedback" class="feedback">Choose one 👆</div>
  `);
}

/* 3 */

function colorsGame() {
  card(`
    <h2 class="title">Colors</h2>
    <p class="text">What comes next?</p>

    <div class="ai-face">🤖</div>

    <div class="sequence">
      <div class="tile">🔴</div>
      <div class="tile">🔵</div>
      <div class="tile">🔴</div>
      <div class="tile">🔵</div>
      <div class="tile">🔴</div>
      <div class="tile q">❓</div>
    </div>

    <div class="row">
      <button class="choice" onclick="markGood(this)">🔵</button>
      <button class="choice" onclick="markBad(this)">🔴</button>
      <button class="choice" onclick="markBad(this)">🟢</button>
    </div>

    <div id="feedback" class="feedback">Choose one 👆</div>
  `);
}

/* 4 */

function animalsGame() {
  card(`
    <h2 class="title">Animals</h2>
    <p class="text">Help the robot.</p>

    <div class="ai-face">🤖</div>

    <div class="sequence">
      <div class="tile">🐱</div>
      <div class="tile">🐶</div>
      <div class="tile">🐱</div>
      <div class="tile">🐶</div>
      <div class="tile">🐱</div>
      <div class="tile q">❓</div>
    </div>

    <div class="row">
      <button class="choice" onclick="markGood(this)">🐶</button>
      <button class="choice" onclick="markBad(this)">🐱</button>
      <button class="choice" onclick="markBad(this)">🐭</button>
    </div>

    <div id="feedback" class="feedback">Choose one 👆</div>
  `);
}

/* 5 */

function shapesGame() {
  card(`
    <h2 class="title">Look Slowly</h2>
    <p class="text">This one is harder.</p>

    <div class="ai-face">🤔</div>

    <div class="sequence">
      <div class="tile">⭐</div>
      <div class="tile">⭐</div>
      <div class="tile">🌙</div>
      <div class="tile">⭐</div>
      <div class="tile">⭐</div>
      <div class="tile q">❓</div>
    </div>

    <div class="row">
      <button class="choice" onclick="markBad(this)">⭐</button>
      <button class="choice" onclick="markGood(this)">🌙</button>
      <button class="choice" onclick="markBad(this)">☀️</button>
    </div>

    <div id="feedback" class="feedback">Choose one 👆</div>
  `);
}

/* 6 */

function fruitGame() {
  card(`
    <h2 class="title">3 Things</h2>
    <p class="text">Look at all three.</p>

    <div class="ai-face">😎</div>

    <div class="sequence">
      <div class="tile">🍎</div>
      <div class="tile">🍌</div>
      <div class="tile">🍇</div>
      <div class="tile">🍎</div>
      <div class="tile">🍌</div>
      <div class="tile q">❓</div>
    </div>

    <div class="row">
      <button class="choice" onclick="markGood(this)">🍇</button>
      <button class="choice" onclick="markBad(this)">🍌</button>
      <button class="choice" onclick="markBad(this)">🍎</button>
    </div>

    <div id="feedback" class="feedback">Choose one 👆</div>
  `);
}

/* 7 */

function youtubeGame() {
  card(`
    <h2 class="title">Real Life</h2>
    <p class="text">You watch many football videos.</p>

    <div class="sequence">
      <div class="tile">⚽</div>
      <div class="tile">⚽</div>
      <div class="tile">⚽</div>
      <div class="tile">⚽</div>
      <div class="tile q">❓</div>
    </div>

    <p class="text">What may show next?</p>

    <div class="row">
      <button class="choice" onclick="markGood(this)">⚽</button>
      <button class="choice" onclick="markBad(this)">🍎</button>
      <button class="choice" onclick="markBad(this)">🐱</button>
    </div>

    <div id="feedback" class="feedback">Choose one 👆</div>
  `);
}

/* 8 */

function phoneGame() {
  card(`
    <h2 class="title">Phone</h2>
    <p class="text">The phone saw this face.</p>

    <div class="screen-grid">
      <div class="box">
        <div>
          <div class="big-emoji">📱</div>
          <div class="sequence">
            <div class="tile">😀</div>
            <div class="tile">😀</div>
            <div class="tile">😀</div>
          </div>
        </div>
      </div>

      <div class="box">
        <div>
          <div class="big-emoji">🔓❓</div>
          <div class="row">
            <button class="choice" onclick="markGood(this, '✅ Open!')">😀</button>
            <button class="choice" onclick="markBad(this, '❌ Locked')">😎</button>
            <button class="choice" onclick="markBad(this, '❌ Locked')">🐱</button>
          </div>
          <div id="feedback" class="feedback">Choose one 👆</div>
        </div>
      </div>
    </div>
  `);
}

/* 9 */

let catPicked = [];

function cleanTrainGame() {
  catPicked = [];

  card(`
    <h2 class="title">Train Robot</h2>
    <p class="text">Click only cats.</p>

    <div class="ai-face">🤖</div>

    <div class="row">
      <button class="emoji-card" onclick="pickCat(this, true)">🐱</button>
      <button class="emoji-card" onclick="pickCat(this, true)">😺</button>
      <button class="emoji-card" onclick="pickCat(this, true)">🐈</button>
      <button class="emoji-card" onclick="pickCat(this, false)">🐶</button>
      <button class="emoji-card" onclick="pickCat(this, false)">🍎</button>
      <button class="emoji-card" onclick="pickCat(this, false)">🚗</button>
    </div>

    <div class="row">
      <button class="yellow" onclick="checkCats()">Check ✅</button>
      <button class="blue" onclick="cleanTrainGame()">Reset ↩</button>
    </div>

    <div id="feedback" class="feedback">Choose cats 👆</div>
  `);
}

function pickCat(btn, isCat) {
  if (btn.classList.contains("selected")) return;

  btn.classList.add("selected");
  catPicked.push(isCat);
  setFeedback("✅");
}

function checkCats() {
  const good = catPicked.filter(x => x).length;
  const bad = catPicked.filter(x => !x).length;

  if (good === 3 && bad === 0) {
    stars += 2;
    setFeedback("✅ Smart robot!", "ok");
    confetti(16);
  } else if (bad > 0) {
    setFeedback("❌ Robot confused", "no");
  } else {
    setFeedback("More cats 👆");
  }
}

/* 10 */

let made = [];
let buildAnswer = "";

function robotBuilder() {
  made = [];
  buildAnswer = "";

  card(`
    <h2 class="title">Robot Builder</h2>
    <p class="text">Choose 2 pictures.</p>
    <p class="text">Press 🤖🔁. Then answer.</p>

    <div class="row">
      ${["🔴", "🔵", "🟢", "⭐", "🌙", "🐱", "🐶", "🍎"].map(x =>
        `<button class="small-card" onclick="addBuild(this, '${x}')">${x}</button>`
      ).join("")}
    </div>

    <div class="sequence" id="madeBox">
      <div class="tile q">1</div>
      <div class="tile q">2</div>
    </div>

    <div class="row">
      <button class="yellow" onclick="makeRobotChain()">🤖🔁</button>
      <button class="blue" onclick="robotBuilder()">Reset ↩</button>
    </div>

    <div id="answerBox" class="row"></div>

    <div id="feedback" class="feedback">Choose 2 👆</div>
  `);
}

function addBuild(btn, emoji) {
  if (made.length >= 2) {
    setFeedback("Press 🤖🔁");
    return;
  }

  made.push(emoji);
  btn.classList.add("good");
  btn.disabled = true;
  drawMade();

  if (made.length === 1) setFeedback("Choose 1 more 👆");
  if (made.length === 2) setFeedback("Press 🤖🔁");
}

function drawMade() {
  const box = document.getElementById("madeBox");

  box.innerHTML = made.map(x => `<div class="tile">${x}</div>`).join("");

  for (let i = made.length; i < 2; i++) {
    box.innerHTML += `<div class="tile q">${i + 1}</div>`;
  }
}

function makeRobotChain() {
  if (made.length < 2) {
    setFeedback("Choose 2 first 👆");
    return;
  }

  const first = made[0];
  const second = made[1];
  buildAnswer = second;

  document.getElementById("madeBox").innerHTML = `
    <div class="tile">${first}</div>
    <div class="tile">${second}</div>
    <div class="tile">${first}</div>
    <div class="tile">${second}</div>
    <div class="tile">${first}</div>
    <div class="tile q">❓</div>
  `;

  document.getElementById("answerBox").innerHTML = `
    <button class="choice" onclick="checkBuild(this, '${first}')">${first}</button>
    <button class="choice" onclick="checkBuild(this, '${second}')">${second}</button>
    <button class="choice" onclick="checkBuild(this, '❌')">❌</button>
  `;

  setFeedback("What comes next?");
}

function checkBuild(btn, answer) {
  if (answer === buildAnswer) {
    if (!btn.classList.contains("good")) {
      stars += 2;
    }
    btn.classList.add("good");
    setFeedback("✅ You made it!", "ok");
    confetti(18);
  } else {
    btn.classList.add("bad");
    setFeedback("❌ Look again", "no");
    setTimeout(() => btn.classList.remove("bad"), 450);
  }
}

/* 11 Final game */

let finalStep = 0;
let finalStars = 0;
let dogPicked = [];

function finalChallenge() {
  finalStep = 0;
  finalStars = 0;
  dogPicked = [];
  drawFinal();
}

function drawFinal() {
  if (finalStep === 0) {
    card(`
      <h2 class="title">Final Test</h2>
      <p class="text">Step 1: Choose next.</p>

      <div class="ai-face">🤖</div>

      <div class="sequence">
        <div class="tile">🔴</div>
        <div class="tile">🔵</div>
        <div class="tile">🔴</div>
        <div class="tile">🔵</div>
        <div class="tile">🔴</div>
        <div class="tile q">❓</div>
      </div>

      <div class="row">
        <button class="choice" onclick="finalAnswer(this, true)">🔵</button>
        <button class="choice" onclick="finalAnswer(this, false)">🔴</button>
        <button class="choice" onclick="finalAnswer(this, false)">🟢</button>
      </div>

      <div id="feedback" class="feedback">Choose one 👆</div>
    `);
  }

  if (finalStep === 1) {
    dogPicked = [];
    card(`
      <h2 class="title">Final Test</h2>
      <p class="text">Step 2: Click only dogs.</p>

      <div class="row">
        <button class="emoji-card" onclick="finalDog(this, true)">🐶</button>
        <button class="emoji-card" onclick="finalDog(this, true)">🐕</button>
        <button class="emoji-card" onclick="finalDog(this, false)">🐱</button>
        <button class="emoji-card" onclick="finalDog(this, false)">🍎</button>
      </div>

      <div class="row">
        <button class="yellow" onclick="checkFinalDogs()">Check ✅</button>
      </div>

      <div id="feedback" class="feedback">Choose dogs 👆</div>
    `);
  }

  if (finalStep === 2) {
    card(`
      <h2 class="title">Final Test</h2>
      <p class="text">Step 3: Real life.</p>

      <div class="sequence">
        <div class="tile">🎮</div>
        <div class="tile">🎮</div>
        <div class="tile">🎮</div>
        <div class="tile">🎮</div>
        <div class="tile q">❓</div>
      </div>

      <div class="row">
        <button class="choice" onclick="finalAnswer(this, true)">🎮</button>
        <button class="choice" onclick="finalAnswer(this, false)">📚</button>
        <button class="choice" onclick="finalAnswer(this, false)">🍕</button>
      </div>

      <div id="feedback" class="feedback">Choose one 👆</div>
    `);
  }

  if (finalStep === 3) {
    card(`
      <h2 class="title">Final Test</h2>
      <p class="text">Step 4: Hard one.</p>

      <div class="ai-face">😎</div>

      <div class="sequence">
        <div class="tile">⭐</div>
        <div class="tile">🌙</div>
        <div class="tile">⭐</div>
        <div class="tile">🌙</div>
        <div class="tile">⭐</div>
        <div class="tile q">❓</div>
      </div>

      <div class="row">
        <button class="choice" onclick="finalAnswer(this, false)">⭐</button>
        <button class="choice" onclick="finalAnswer(this, true)">🌙</button>
        <button class="choice" onclick="finalAnswer(this, false)">☀️</button>
      </div>

      <div id="feedback" class="feedback">Choose one 👆</div>
    `);
  }

  if (finalStep === 4) {
    stars += finalStars;

    card(`
      <h2 class="title">Final Done!</h2>

      <div class="huge">🏆</div>
      <div class="ai-face">🤩</div>

      <p class="text">You helped the robot.</p>
      <p class="text">Final stars: ⭐ ${finalStars}</p>

      <div class="sequence">
        <div class="tile">👀</div>
        <div class="arrow">➡</div>
        <div class="tile">🔁</div>
        <div class="arrow">➡</div>
        <div class="tile">✅</div>
      </div>
    `);
  }
}

function finalAnswer(btn, correct) {
  if (correct) {
    btn.classList.add("good");
    finalStars++;
    setFeedback("✅", "ok");
    confetti(10);

    setTimeout(() => {
      finalStep++;
      drawFinal();
    }, 700);
  } else {
    btn.classList.add("bad");
    setFeedback("❌ Look again", "no");
    setTimeout(() => btn.classList.remove("bad"), 450);
  }
}

function finalDog(btn, isDog) {
  if (btn.classList.contains("selected")) return;

  btn.classList.add("selected");
  dogPicked.push(isDog);
  setFeedback("✅");
}

function checkFinalDogs() {
  const good = dogPicked.filter(x => x).length;
  const bad = dogPicked.filter(x => !x).length;

  if (good === 2 && bad === 0) {
    finalStars++;
    setFeedback("✅", "ok");
    confetti(10);

    setTimeout(() => {
      finalStep++;
      drawFinal();
    }, 700);
  } else if (bad > 0) {
    setFeedback("❌ Robot confused", "no");
  } else {
    setFeedback("More dogs 👆");
  }
}

/* 12 */

function finish() {
  card(`
    <h2 class="title">Great Job!</h2>

    <div class="huge">🏆</div>
    <div class="ai-face">🤩</div>

    <p class="text">AI looks at examples.</p>
    <p class="text">AI guesses what comes next.</p>

    <div class="sequence">
      <div class="tile">👀</div>
      <div class="arrow">➡</div>
      <div class="tile">🔁</div>
      <div class="arrow">➡</div>
      <div class="tile">✅</div>
    </div>

    <p class="text">Stars: ⭐ ${stars}</p>

    <div class="row">
      <button onclick="restart()">Play Again 🔁</button>
    </div>
  `, { noNext: true });
}

function restart() {
  screen = 0;
  stars = 0;
  locked = false;
  made = [];
  catPicked = [];
  finalStep = 0;
  finalStars = 0;
  dogPicked = [];
  render();
}

render();