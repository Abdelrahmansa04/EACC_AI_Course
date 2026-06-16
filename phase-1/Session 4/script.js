const levels = [
  {
    title: "Spot AI",
    sub: "Mission 1",
    icon: "🌍",
    roboIntro: [
      "Hi! I'm Robo.",
      "AI is in apps you use every day.",
      "Does each one use AI? Pick below."
    ],
    roboStart: "What do you think?",
    complete: "Great! You can spot AI now.",
    choices: [
      { id: "ai", icon: "✓", label: "Yes", sub: "Uses AI", color: "teal" },
      { id: "not", icon: "✗", label: "No", sub: "Not AI", color: "gray" }
    ],
    tasks: [
      { emoji: "📺", label: "YouTube", text: "Picks the next video.", answer: "ai", correct: "Yes. AI picks videos.", wrong: "It learns what you like." },
      { emoji: "🗺️", label: "Maps", text: "Finds a fast road.", answer: "ai", correct: "Yes. AI checks traffic.", wrong: "Maps use AI for routes." },
      { emoji: "🎤", label: "Voice Helper", text: "Answers when you speak.", answer: "ai", correct: "Yes. AI hears you.", wrong: "Voice helpers use AI." },
      { emoji: "✏️", label: "Pencil", text: "You write on paper.", answer: "not", correct: "Right. Not AI.", wrong: "A pencil is not AI." },
      { emoji: "📸", label: "Photo App", text: "Groups faces in photos.", answer: "ai", correct: "Yes. AI sees faces.", wrong: "Face groups use AI." }
    ]
  },
  {
    title: "Helpful AI",
    sub: "Mission 2",
    icon: "⚡",
    roboIntro: [
      "Nice work!",
      "Some AI helps. Some does not.",
      "Is this a smart use?"
    ],
    roboStart: "Helpful or not?",
    complete: "You know when AI helps.",
    choices: [
      { id: "good", icon: "✓", label: "Helpful", sub: "Good use", color: "green" },
      { id: "bad", icon: "✗", label: "Not Helpful", sub: "Not ideal", color: "red" }
    ],
    tasks: [
      { emoji: "💬", label: "Explain", text: "AI explains a hard word.", answer: "good", correct: "Helpful. Good for learning.", wrong: "This is a good use." },
      { emoji: "📝", label: "Practice", text: "AI gives quiz questions.", answer: "good", correct: "Helpful. Practice helps.", wrong: "Quizzes can help you learn." },
      { emoji: "🌍", label: "Translate", text: "AI translates a word.", answer: "good", correct: "Helpful. Great for words.", wrong: "Translation is helpful." },
      { emoji: "📋", label: "Copy Work", text: "AI writes all homework.", answer: "bad", correct: "Not helpful. Learn, don't copy.", wrong: "Copying stops learning." },
      { emoji: "🏥", label: "Medicine", text: "AI picks your medicine.", answer: "bad", correct: "Not helpful. Ask a doctor.", wrong: "Health needs a real doctor." }
    ]
  },
  {
    title: "Check Facts",
    sub: "Mission 3",
    icon: "🔍",
    roboIntro: [
      "AI can be wrong.",
      "Trust facts — or check first."
    ],
    roboStart: "Fine or check?",
    complete: "Smart! You check important facts.",
    choices: [
      { id: "ok", icon: "✓", label: "Looks Fine", sub: "Simple", color: "green" },
      { id: "check", icon: "?", label: "Check It", sub: "Verify", color: "violet" }
    ],
    tasks: [
      { emoji: "➕", label: "Math", text: "2 + 2 = 4", answer: "ok", correct: "Fine. Simple math.", wrong: "Basic math is OK." },
      { emoji: "🐱", label: "Wild Fact", text: "Cats can fly.", answer: "check", correct: "Check it. That's wrong.", wrong: "Strange facts need checking." },
      { emoji: "📰", label: "News", text: "Big news from AI today.", answer: "check", correct: "Check it. AI may not know.", wrong: "Verify news elsewhere." },
      { emoji: "💊", label: "Health", text: "AI picks medicine.", answer: "check", correct: "Check with a doctor.", wrong: "Always ask a doctor." },
      { emoji: "📚", label: "Source", text: "AI names a website.", answer: "check", correct: "Check if it's real.", wrong: "Sources can be wrong." }
    ]
  },
  {
    title: "Stay Safe",
    sub: "Mission 4",
    icon: "🔒",
    roboIntro: [
      "Last mission: safety.",
      "Some info is OK. Some needs an adult."
    ],
    roboStart: "Safe or ask adult?",
    complete: "You finished all missions!",
    choices: [
      { id: "safe", icon: "✓", label: "Safe", sub: "OK to share", color: "green" },
      { id: "ask", icon: "!", label: "Ask Adult", sub: "Private", color: "orange" }
    ],
    tasks: [
      { emoji: "🎨", label: "Color", text: "Favorite color is blue.", answer: "safe", correct: "Safe. Not private.", wrong: "Colors are fine to share." },
      { emoji: "🏠", label: "Address", text: "App asks your home address.", answer: "ask", correct: "Ask an adult. Keep private.", wrong: "Address is private." },
      { emoji: "🔑", label: "Password", text: "App wants your password.", answer: "ask", correct: "Never share passwords.", wrong: "Passwords stay secret." },
      { emoji: "😄", label: "Nickname", text: "Fun nickname in app.", answer: "safe", correct: "Safe. Nicknames are OK.", wrong: "Nicknames protect you." },
      { emoji: "😈", label: "Secret Chat", text: "Someone says keep it secret.", answer: "ask", correct: "Tell an adult.", wrong: "Tell a trusted adult." }
    ]
  }
];

let levelIdx = 0;
let taskIdx = 0;
let activeTasks = [];
let answeredCount = 0;
let locked = false;

const $ = (id) => document.getElementById(id);

const chatArea = $("chatArea");
const modal = $("modal");
const modalIcon = $("modalIcon");
const modalKicker = $("modalKicker");
const modalTitle = $("modalTitle");
const modalText = $("modalText");
const modalNext = $("modalNext");
const modalBtn = $("modalBtn");
const levelTitle = $("levelTitle");
const levelSub = $("levelSub");
const levelIcon = $("levelIcon");
const stepDots = $("stepDots");
const sceneCard = $("sceneCard");
const sceneEmoji = $("sceneEmoji");
const sceneTitle = $("sceneTitle");
const sceneLabel = $("sceneLabel");
const choicesEl = $("choices");
const nextBtn = $("nextBtn");
const restartBtn = $("restartBtn");
const levelPills = $("levelPills");
const eyeL = $("eyeL");
const eyeR = $("eyeR");
const roboMouth = $("roboMouth");
const roboMood = $("roboMood");

function setMood(mood) {
  eyeL.className = eyeR.className = `robo-eye ${mood}`;
  const mouthMap = { happy: "smile", sad: "frown", think: "", "": "" };
  roboMouth.className = `robo-mouth ${mouthMap[mood] || ""}`;
  const labels = { happy: "Great!", sad: "Try again", think: "Thinking…", "": "Your guide" };
  roboMood.textContent = labels[mood] || "Your guide";
}

function addChat(who, text, type = "") {
  const msg = document.createElement("div");
  msg.className = `chat-msg ${who}`;
  if (who === "robo") {
    msg.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble ${type}">${text}</div>`;
  } else {
    msg.innerHTML = `<div class="chat-bubble user ${type}">${text}</div>`;
  }
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function roboType(messages, delay, cb) {
  let i = 0;
  delay = delay || 0;

  function next() {
    if (i >= messages.length) {
      if (cb) cb();
      return;
    }
    const typing = document.createElement("div");
    typing.className = "chat-msg robo";
    typing.innerHTML =
      '<div class="chat-avatar">🤖</div><div class="chat-bubble"><div class="typing-dot"><span></span><span></span><span></span></div></div>';
    chatArea.appendChild(typing);
    chatArea.scrollTop = chatArea.scrollHeight;
    setMood("think");

    setTimeout(() => {
      typing.remove();
      addChat("robo", messages[i]);
      setMood("");
      i++;
      setTimeout(next, 500);
    }, 700 + delay);
    delay = 0;
  }

  setTimeout(next, 300);
}

function renderPills() {
  levelPills.innerHTML = levels
    .map((l, i) => {
      let cls = "";
      if (i < levelIdx) cls = "done";
      else if (i === levelIdx) cls = "active";
      return `<div class="level-pill ${cls}" title="${l.title}">${l.icon}</div>`;
    })
    .join("");
}

function renderDots() {
  stepDots.innerHTML = activeTasks
    .map((_, i) => {
      let cls = "";
      if (i < answeredCount) cls = "done";
      else if (i === taskIdx) cls = "active";
      return `<div class="step-dot ${cls}"></div>`;
    })
    .join("");
}

function showTask() {
  const level = levels[levelIdx];
  const task = activeTasks[taskIdx];

  sceneCard.className = "scene-card focused is-entering";
  sceneEmoji.textContent = task.emoji;
  sceneEmoji.classList.remove("emoji-pop");
  void sceneEmoji.offsetWidth;
  sceneEmoji.classList.add("emoji-pop");
  sceneTitle.textContent = task.label;
  sceneLabel.textContent = task.text;

  window.setTimeout(() => {
    sceneCard.classList.remove("is-entering");
  }, 460);

  const count = level.choices.length;
  const cols = count === 2 ? "two" : count === 3 ? "three" : "four";
  choicesEl.className = `choices ${cols} choice-entering`;
  choicesEl.innerHTML = "";

  level.choices.forEach((c, index) => {
    const btn = document.createElement("button");
    btn.className = `choice-btn choice-${c.color}`;
    btn.style.setProperty("--stagger", index);
    btn.type = "button";
    btn.setAttribute("aria-label", `${c.label}: ${c.sub}`);
    btn.innerHTML = `
      <div class="choice-icon">${c.icon}</div>
      <div class="choice-text">
        <span class="choice-label">${c.label}</span>
        <span class="choice-sub">${c.sub}</span>
      </div>`;
    btn.addEventListener("click", () => pick(c.id));
    choicesEl.appendChild(btn);
  });

  nextBtn.disabled = true;
  nextBtn.classList.remove("ready");
  locked = false;
  renderDots();

  window.setTimeout(() => {
    choicesEl.classList.remove("choice-entering");
  }, 520);
}

function pick(id) {
  if (locked) return;
  locked = true;

  const level = levels[levelIdx];
  const task = activeTasks[taskIdx];
  const correct = id === task.answer;
  const choice = level.choices.find((c) => c.id === id);
  const choiceName = choice ? choice.label : id;
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  level.choices.forEach((c, i) => {
    buttons[i].disabled = true;
    buttons[i].setAttribute("aria-pressed", c.id === id ? "true" : "false");
    if (c.id === id) {
      buttons[i].classList.add(correct ? "selected-correct" : "selected-wrong");
    } else {
      buttons[i].classList.add("dimmed");
    }
  });

  sceneCard.classList.add(correct ? "correct" : "wrong");
  addChat("user", choiceName);

  if (correct) {
    setMood("happy");
    answeredCount++;
    renderDots();
    addChat("robo", task.correct, "correct");
    spawnConfetti();
    nextBtn.disabled = false;
    nextBtn.classList.add("ready");
  } else {
    setMood("sad");
    addChat("robo", task.wrong, "wrong");
    setTimeout(() => {
      locked = false;
      sceneCard.classList.remove("wrong");
      buttons.forEach((b, i) => {
        b.disabled = false;
        b.className = `choice-btn choice-${level.choices[i].color}`;
        b.removeAttribute("aria-pressed");
      });
      setMood("");
    }, 1200);
  }
}

function nextTask() {
  nextBtn.disabled = true;
  nextBtn.classList.remove("ready");
  sceneCard.classList.add("leaving");
  choicesEl.classList.add("choices-leaving");

  window.setTimeout(() => {
    taskIdx++;
    sceneCard.classList.remove("leaving");
    choicesEl.classList.remove("choices-leaving");

    if (taskIdx < activeTasks.length) {
      showTask();
      roboType([levels[levelIdx].roboStart]);
      return;
    }
    finishLevel();
  }, 220);
}

function finishLevel() {
  const level = levels[levelIdx];
  setMood("happy");
  addChat("robo", level.complete, "correct");

  if (levelIdx < levels.length - 1) {
    const next = levels[levelIdx + 1];
    modalIcon.textContent = "🎉";
    modalKicker.textContent = "Level done";
    modalTitle.textContent = level.title;
    modalText.textContent = level.complete;
    modalNext.hidden = false;
    modalNext.innerHTML = `<span>${next.icon}</span> Next: <strong>${next.title}</strong>`;
    modalBtn.textContent = "Next mission";
    modalBtn.onclick = () => {
      modal.hidden = true;
      levelIdx++;
      startLevel();
    };
  } else {
    modalIcon.textContent = "🏆";
    modalKicker.textContent = "All done";
    modalTitle.textContent = "You finished!";
    modalText.textContent = "You spot AI, use it well, check facts, and stay safe.";
    modalNext.hidden = true;
    modalBtn.textContent = "Play again";
    modalBtn.onclick = () => {
      modal.hidden = true;
      levelIdx = 0;
      startLevel();
    };
  }

  spawnConfetti();
  setTimeout(() => {
    modal.hidden = false;
  }, 600);
}

function startLevel() {
  const level = levels[levelIdx];
  taskIdx = 0;
  answeredCount = 0;
  locked = false;
  activeTasks = shuffle(level.tasks.slice());

  levelTitle.textContent = level.title;
  levelSub.textContent = level.sub;
  levelIcon.textContent = level.icon;

  chatArea.innerHTML = "";
  setMood("");
  renderPills();
  renderDots();
  showTask();

  roboType(level.roboIntro, 200, () => {
    roboType([level.roboStart]);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function spawnConfetti() {
  const items = ["✨", "🎉", "✅", "👏"];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.left = 8 + Math.random() * 84 + "%";
    el.style.top = Math.random() * 15 + "%";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}

function openIntro() {
  modalIcon.textContent = "🤖";
  modalKicker.textContent = "Session 4";
  modalTitle.textContent = "Meet Robo";
  modalText.textContent = "Four short missions. Robo will guide you.";
  modalNext.hidden = true;
  modalBtn.textContent = "Start";
  modalBtn.onclick = () => {
    modal.hidden = true;
    startLevel();
  };
  modal.hidden = false;
}

nextBtn.addEventListener("click", nextTask);
restartBtn.addEventListener("click", () => {
  levelIdx = 0;
  modal.hidden = true;
  chatArea.innerHTML = "";
  openIntro();
});

openIntro();
