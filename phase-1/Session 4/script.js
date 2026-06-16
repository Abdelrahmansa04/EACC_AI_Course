const levels = [
  {
    title: "Find AI",
    sub: "Mission 1",
    icon: "🌍",
    pathText: "Find AI",
    roboIntro: [
      "Hi! I'm Robo.",
      "First, find where AI is hiding.",
      "Tap Yes or No."
    ],
    roboStart: "Is this AI?",
    complete: "Great! You can find AI.",
    choices: [
      { id: "ai", icon: "✓", label: "Yes", sub: "AI helps", color: "teal" },
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
    title: "Use AI Well",
    sub: "Mission 2",
    icon: "⚡",
    pathText: "Use AI",
    roboIntro: [
      "Nice work!",
      "Now choose good AI help.",
      "Good help teaches you."
    ],
    roboStart: "Good help?",
    complete: "You know good AI help.",
    choices: [
      { id: "good", icon: "✓", label: "Good", sub: "Helps me learn", color: "green" },
      { id: "bad", icon: "✗", label: "Not Good", sub: "Does my work", color: "red" }
    ],
    tasks: [
      { emoji: "💬", label: "Explain", text: "AI explains a hard word.", answer: "good", correct: "Good. It helps you learn.", wrong: "This helps you learn." },
      { emoji: "📝", label: "Practice", text: "AI gives quiz questions.", answer: "good", correct: "Good. Practice helps.", wrong: "Quiz time helps you learn." },
      { emoji: "🌍", label: "Translate", text: "AI translates a word.", answer: "good", correct: "Good. It helps with words.", wrong: "This helps with words." },
      { emoji: "📋", label: "Copy Work", text: "AI writes all homework.", answer: "bad", correct: "Not helpful. Learn, don't copy.", wrong: "Copying stops learning." },
      { emoji: "🏥", label: "Medicine", text: "AI picks your medicine.", answer: "bad", correct: "Not helpful. Ask a doctor.", wrong: "Health needs a real doctor." }
    ]
  },
  {
    title: "Check Facts",
    sub: "Mission 3",
    icon: "🔍",
    pathText: "Check",
    roboIntro: [
      "AI can be wrong.",
      "Big facts need a check."
    ],
    roboStart: "OK or check?",
    complete: "Smart! You check important facts.",
    choices: [
      { id: "ok", icon: "✓", label: "OK", sub: "Easy fact", color: "green" },
      { id: "check", icon: "?", label: "Check", sub: "Ask or look", color: "violet" }
    ],
    tasks: [
      { emoji: "➕", label: "Math", text: "2 + 2 = 4", answer: "ok", correct: "Fine. Simple math.", wrong: "Basic math is OK." },
      { emoji: "🐱", label: "Wild Fact", text: "Cats can fly.", answer: "check", correct: "Check it. That's wrong.", wrong: "Strange facts need checking." },
      { emoji: "📰", label: "News", text: "Big news from AI today.", answer: "check", correct: "Check it. AI may not know.", wrong: "Check news with a grown-up." },
      { emoji: "💊", label: "Health", text: "AI picks medicine.", answer: "check", correct: "Check with a doctor.", wrong: "Always ask a doctor." },
      { emoji: "📚", label: "Source", text: "AI names a website.", answer: "check", correct: "Check if it's real.", wrong: "Sources can be wrong." }
    ]
  },
  {
    title: "Stay Safe",
    sub: "Mission 4",
    icon: "🔒",
    pathText: "Stay Safe",
    roboIntro: [
      "Last mission: safety.",
      "Some things need a grown-up."
    ],
    roboStart: "Safe or ask?",
    complete: "You finished all missions!",
    choices: [
      { id: "safe", icon: "✓", label: "Safe", sub: "OK to share", color: "green" },
      { id: "ask", icon: "!", label: "Ask", sub: "Get help", color: "orange" }
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
const missionRoadmap = $("missionRoadmap");
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

function renderRoadmap() {
  missionRoadmap.innerHTML = levels
    .map((l, i) => {
      let cls = "roadmap-item";
      if (i < levelIdx) cls += " done";
      else if (i === levelIdx) cls += " active";
      return `
        <div class="${cls}">
          <span class="roadmap-number">${i + 1}</span>
          <span class="roadmap-icon">${l.icon}</span>
          <span class="roadmap-label">${l.pathText || l.title}</span>
        </div>`;
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

  sceneCard.className = "scene-card focused";
  void sceneCard.offsetWidth;
  sceneCard.classList.add("task-enter");
  setTimeout(() => sceneCard.classList.remove("task-enter"), 460);

  sceneEmoji.textContent = task.emoji;
  sceneTitle.textContent = task.label;
  sceneLabel.textContent = task.text;

  const count = level.choices.length;
  const cols = count === 2 ? "two" : count === 3 ? "three" : "four";
  choicesEl.className = `choices ${cols}`;
  choicesEl.innerHTML = "";

  level.choices.forEach((c) => {
    const btn = document.createElement("button");
    const baseClass = `choice-btn choice-${c.color || "teal"}`;
    btn.className = baseClass;
    btn.dataset.baseClass = baseClass;
    btn.type = "button";
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
  locked = false;
  renderDots();
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
    if (c.id === id) {
      buttons[i].classList.add(correct ? "selected-correct" : "selected-wrong");
    } else {
      buttons[i].classList.add("not-selected");
    }
  });

  sceneCard.classList.add(correct ? "correct" : "wrong");
  addChat("user", choiceName);
  answeredCount++;
  renderDots();

  if (correct) {
    setMood("happy");
    addChat("robo", task.correct, "correct");
    spawnConfetti();
  } else {
    setMood("sad");
    addChat("robo", task.wrong, "wrong");
  }

  nextBtn.disabled = false;
}

function nextTask() {
  taskIdx++;
  if (taskIdx < activeTasks.length) {
    showTask();
    return;
  }
  finishLevel();
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
  renderRoadmap();
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
  const items = ["✨", "🌟", "🎉", "⭐"];
  for (let i = 0; i < 8; i++) {
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
  modalTitle.textContent = "Robo Guide";
  modalText.textContent = "Follow 4 steps: Find AI, Use AI, Check, Stay Safe.";
  modalNext.hidden = false;
  modalNext.innerHTML = "<span>1</span> Start with <strong>Find AI</strong>";
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
