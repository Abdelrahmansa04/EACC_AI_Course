const game = document.getElementById("game");

let screen = 0;
let aiPower = 0;
let score = 0;
let selectedDogs = [];

const screens = [
  welcome,
  trainAI,
  moreExamples,
  fastVsSmartAI,
  varietyMatters,
  dogGame,
  aiChallenge,
  celebration
];

function render() {
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

function aiMood() {
  if (aiPower >= 100) return "🤩";
  if (aiPower >= 75) return "😎";
  if (aiPower >= 50) return "😊";
  if (aiPower >= 25) return "🤔";
  return "😴";
}

function card(content, showDefaultNext = true) {
  game.innerHTML = `
    <div class="card">
      <div class="power-badge">🤖 AI Power: ${aiPower}%</div>

      ${content}

      ${
        showDefaultNext
          ? `
            <div class="nav">
              ${screen > 0 ? `<button class="blue" onclick="back()">⬅ Back</button>` : ""}
              ${screen < screens.length - 1 ? `<button onclick="next()">Next ➡</button>` : ""}
            </div>
          `
          : ""
      }
    </div>
  `;
}

function updatePower(value) {
  aiPower = Math.min(100, aiPower + value);

  const badge = document.querySelector(".power-badge");
  const face = document.getElementById("aiFace");

  if (badge) {
    badge.textContent = `🤖 AI Power: ${aiPower}%`;
  }

  if (face) {
    face.textContent = aiMood();
  }
}

function setFeedback(message) {
  const feedback = document.getElementById("feedback");

  if (feedback) {
    feedback.textContent = message;
  }
}

function unlockNext(text = "Continue ➡") {
  const btn = document.getElementById("nextBtn");

  if (!btn) return;

  btn.disabled = false;
  btn.classList.remove("locked");
  btn.innerHTML = text;
  btn.onclick = next;
}

/* WELCOME */

function welcome() {
  aiPower = 0;

  card(
    `
      <h2 class="title">Welcome AI Explorers!</h2>

      <div class="ai-face">🤖</div>

      <p class="text">Today you will train an AI.</p>
      <p class="text">Can you make it smarter?</p>

      <div class="row">
        <div class="box">
          <div class="box-title">Today's Mission</div>

          <p class="text">Train AI</p>
          <p class="text">Make AI smarter</p>
          <p class="text">Make AI stronger</p>
          <p class="text">Test AI</p>
        </div>
      </div>

      <div class="nav">
        <button onclick="next()">Start Mission 🚀</button>
      </div>
    `,
    false
  );
}

/* SCREEN 1 */

function trainAI() {
  aiPower = 0;
  const total = 4;

  card(
    `
      <h2 class="title">Train the AI</h2>

      <div id="aiFace" class="ai-face">${aiMood()}</div>

      <p class="text">Click ALL cat examples.</p>
      <p class="counter" id="counter">0 / ${total} examples</p>

      <div class="row">
        <button class="emoji-btn" onclick="trainCat(this, ${total})">🐱</button>
        <button class="emoji-btn" onclick="trainCat(this, ${total})">🐱</button>
        <button class="emoji-btn" onclick="trainCat(this, ${total})">🐱</button>
        <button class="emoji-btn" onclick="trainCat(this, ${total})">🐱</button>
      </div>

      <p id="feedback" class="feedback">Start clicking 👆</p>

      <div class="nav">
        <button class="blue" onclick="back()">⬅ Back</button>
        <button id="nextBtn" class="locked" disabled>Next 🔒</button>
      </div>
    `,
    false
  );
}

function trainCat(btn, total) {
  if (btn.disabled) return;

  btn.disabled = true;
  btn.innerHTML = "✅";
  btn.classList.add("done");

  updatePower(25);

  const clicked = document.querySelectorAll(".emoji-btn.done").length;
  document.getElementById("counter").textContent = `${clicked} / ${total} examples`;

  if (clicked < total) {
    setFeedback("Great! Click more examples 👆");
  } else {
    score++;
    setFeedback("AI is ready! 🤖✨");
    unlockNext("Next ➡");
  }
}

/* SCREEN 2 */

function moreExamples() {
  aiPower = 20;
  const total = 5;

  card(
    `
      <h2 class="title">More Examples</h2>

      <div id="aiFace" class="ai-face">${aiMood()}</div>

      <p class="text">Click ALL different cat examples.</p>
      <p class="counter" id="counter">0 / ${total} examples</p>

      <div class="row">
        <button class="emoji-btn" onclick="addMore(this, ${total})">😺</button>
        <button class="emoji-btn" onclick="addMore(this, ${total})">🐈</button>
        <button class="emoji-btn" onclick="addMore(this, ${total})">🐱</button>
        <button class="emoji-btn" onclick="addMore(this, ${total})">😸</button>
        <button class="emoji-btn" onclick="addMore(this, ${total})">🐈‍⬛</button>
      </div>

      <p class="text">Different examples make AI stronger.</p>
      <p id="feedback" class="feedback">Click every example 👆</p>

      <div class="nav">
        <button class="blue" onclick="back()">⬅ Back</button>
        <button id="nextBtn" class="locked" disabled>Test AI 🔒</button>
      </div>
    `,
    false
  );
}

function addMore(btn, total) {
  if (btn.disabled) return;

  btn.disabled = true;
  btn.innerHTML = "✅";
  btn.classList.add("done");

  updatePower(16);

  const clicked = document.querySelectorAll(".emoji-btn.done").length;
  document.getElementById("counter").textContent = `${clicked} / ${total} examples`;

  if (clicked < total) {
    setFeedback("Nice! Click more 👆");
  } else {
    aiPower = 100;
    document.querySelector(".power-badge").textContent = `🤖 AI Power: ${aiPower}%`;
    document.getElementById("aiFace").textContent = aiMood();

    setFeedback("Strong AI! Ready to test 🧪");

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = false;
    nextBtn.classList.remove("locked");
    nextBtn.innerHTML = "Test AI 🧪";
    nextBtn.onclick = testCat;
  }
}

function testCat() {
  score++;

  card(
    `
      <h2 class="title">Test AI</h2>

      <div id="aiFace" class="ai-face">${aiMood()}</div>

      <div class="big-emoji">🐈</div>

      <p class="text">AI sees a new cat.</p>
      <p class="text">What should AI guess?</p>

      <div class="row">
        <button onclick="setFeedback('Correct! AI learned CAT 🐱')">Cat 🐱</button>
        <button class="red" onclick="setFeedback('Oops! Try again.')">Dog 🐶</button>
        <button class="red" onclick="setFeedback('Oops! Try again.')">Apple 🍎</button>
      </div>

      <p id="feedback" class="feedback"></p>

      <div class="nav">
        <button class="blue" onclick="moreExamples()">⬅ Back</button>
        <button onclick="next()">Next ➡</button>
      </div>
    `,
    false
  );
}

/* SCREEN 3 */

function fastVsSmartAI() {
  aiPower = 100;

  card(
    `
      <h2 class="title">Which AI would you choose?</h2>

      <div class="row">
        <div class="box">
          <div class="box-title">AI A</div>
          <div class="big-emoji">🐱</div>
          <p class="text">Power: 20%</p>
        </div>

        <div class="box">
          <div class="box-title">AI B</div>
          <div class="big-emoji">🐱 🐱 🐱 🐱 🐱</div>
          <p class="text">Power: 100%</p>
        </div>
      </div>

      <p class="text">Which AI would you choose?</p>

      <div class="row">
        <button class="red" onclick="chooseFastAI()">AI A</button>
        <button onclick="chooseSmartAI()">AI B</button>
      </div>

      <p id="feedback" class="feedback">Choose one AI 👆</p>

      <div class="nav">
        <button class="blue" onclick="back()">⬅ Back</button>
        <button id="nextBtn" class="locked" disabled>Next 🔒</button>
      </div>
    `,
    false
  );
}

function chooseFastAI() {
  setFeedback("AI A saw only a few examples.");
  unlockNext("Continue ➡");
}

function chooseSmartAI() {
  score++;
  setFeedback("Correct! More examples = smarter AI 📚");
  unlockNext("Continue ➡");
}

/* SCREEN 4 */

function varietyMatters() {
  aiPower = 50;

  card(`
    <h2 class="title">Which AI is stronger?</h2>

    <div class="row">
      <div class="box">
        <div class="box-title">AI A</div>
        <div class="big-emoji">🐱 🐱 🐱</div>
      </div>

      <div class="box">
        <div class="box-title">AI B</div>
        <div class="big-emoji">🐱 😺 🐈 🐯</div>
      </div>
    </div>

    <p class="text">Same examples or different examples?</p>

    <div class="row">
      <button class="red" onclick="wrongVariety()">AI A</button>
      <button onclick="rightVariety()">AI B</button>
    </div>

    <p id="feedback" class="feedback">Choose one AI 👆</p>
  `);
}

function rightVariety() {
  aiPower = 100;
  score++;

  document.querySelector(".power-badge").textContent = `🤖 AI Power: ${aiPower}%`;
  setFeedback("Yes! Variety makes AI stronger 🌈");
}

function wrongVariety() {
  aiPower = 40;

  document.querySelector(".power-badge").textContent = `🤖 AI Power: ${aiPower}%`;
  setFeedback("AI A learned, but only one kind.");
}

/* SCREEN 5 */

function dogGame() {
  selectedDogs = [];
  aiPower = 0;

  card(`
    <h2 class="title">Build a Dog AI</h2>

    <p class="text">Click only dog examples.</p>

    <div class="row">
      ${dogCard("🐶", true)}
      ${dogCard("🐕", true)}
      ${dogCard("🦮", true)}
      ${dogCard("🐩", true)}
      ${dogCard("🐱", false)}
      ${dogCard("🐭", false)}
      ${dogCard("🚗", false)}
      ${dogCard("🍎", false)}
    </div>

    <div class="row">
      <button onclick="checkDogGame()">Train AI ✅</button>
      <button class="blue" onclick="dogGame()">Reset 🔁</button>
    </div>

    <p id="feedback" class="feedback">Choose examples 👆</p>
  `);
}

function dogCard(emoji, correct) {
  return `
    <div class="emoji-card" onclick="pickDog(this, '${emoji}', ${correct})">
      ${emoji}
    </div>
  `;
}

function pickDog(el, emoji, correct) {
  el.classList.toggle("selected");

  const exists = selectedDogs.find(item => item.emoji === emoji);

  if (exists) {
    selectedDogs = selectedDogs.filter(item => item.emoji !== emoji);
  } else {
    selectedDogs.push({ emoji, correct });
  }

  setFeedback(`${selectedDogs.length} selected`);
}

function checkDogGame() {
  const correct = selectedDogs.filter(item => item.correct).length;
  const wrong = selectedDogs.filter(item => !item.correct).length;

  if (selectedDogs.length === 0) {
    setFeedback("Choose examples first 👀");
    return;
  }

  if (wrong > 0) {
    aiPower = 30;
    setFeedback("Wrong examples confuse AI ⚠️");
  } else if (correct < 4) {
    aiPower = 60;
    setFeedback("Good! More dog examples make AI smarter 📚");
  } else {
    aiPower = 100;
    score += 2;
    setFeedback("Amazing! Strong Dog AI 🐶💪");
  }

  document.querySelector(".power-badge").textContent = `🤖 AI Power: ${aiPower}%`;
}

/* SCREEN 6 */

function aiChallenge() {
  aiPower = 80;

  card(`
    <h2 class="title">AI Challenge</h2>

    <div class="big-emoji">🐘</div>

    <p class="text">AI learned cats and dogs.</p>
    <p class="text">Can AI know elephant?</p>

    <div class="row">
      <button class="red" onclick="challengeWrong()">Yes</button>
      <button onclick="challengeRight()">No</button>
      <button class="yellow" onclick="challengeMaybe()">Maybe</button>
    </div>

    <p id="feedback" class="feedback">Choose one answer 👆</p>
  `);
}

function challengeRight() {
  score++;
  setFeedback("Correct! AI needs elephant examples 🐘");
}

function challengeWrong() {
  setFeedback("Not yet! AI did not train on elephant.");
}

function challengeMaybe() {
  setFeedback("Maybe it guesses, but it may be wrong 🤔");
}

/* SCREEN 7 */

function celebration() {
  aiPower = 100;

  card(
    `
      <h2 class="title">Great Job!</h2>

      <div class="confetti">🎉 🎊 ⭐ 🎉 🎊</div>
      <div class="ai-face">🤩</div>

      <p class="text">You trained AI!</p>

      <div class="row">
        <div class="box">
          <div class="box-title">Remember</div>
          <div class="text">👀 AI sees examples</div>
          <div class="text">📚 More = smarter</div>
          <div class="text">🌈 Variety = stronger</div>
          <div class="text">⚠️ Wrong = confused</div>
        </div>
      </div>

      <p class="text">Stars: ${score} ⭐</p>

      <div class="nav">
        <button onclick="restart()">Play Again 🔁</button>
      </div>
    `,
    false
  );
}

function restart() {
  screen = 0;
  aiPower = 0;
  score = 0;
  selectedDogs = [];
  render();
}

render();