// ── GAME DATA ──
const levels = [
  {
    title: "AI Is Around You",
    sub: "Mission 1 · Spot AI",
    icon: "🌍",
    roboIntro: [
      "Hey Explorer! 👋 I'm Robo, your AI guide.",
      "Did you know AI is all around you? It's not just robots — it lives inside apps and devices you use every day!",
      "I'll show you things one at a time. Your job: decide if it uses AI or not. 👇"
    ],
    roboStart: "Here's the next one! What do you think? 👇",
    complete: "You can now spot AI everywhere! That's the very first step to using it wisely. 🌟",
    choices: [
      { id: "ai",  icon: "🤖", label: "Uses AI",  sub: "Smart & learns",  color: "teal" },
      { id: "not", icon: "—",  label: "No AI",    sub: "Just a tool",     color: "gray" }
    ],
    tasks: [
      { emoji: "📺", label: "Video App",    text: "The app picks what to watch next — just for you.",       answer: "ai",  correct: "Yes! It watches what you like and learns your taste.",           wrong: "Look again — it actually learns what you enjoy!" },
      { emoji: "🗺️", label: "Navigation",  text: "The map reroutes you when the road is busy.",             answer: "ai",  correct: "Exactly! It predicts traffic using AI patterns.",                 wrong: "Think again — it makes smart decisions in real time!" },
      { emoji: "🎤", label: "Voice Helper", text: "You speak a question and it answers you instantly.",      answer: "ai",  correct: "Right! It uses AI to understand your words.",                    wrong: "It understands speech — that takes real AI!" },
      { emoji: "✏️", label: "Object",       text: "You hold it and write on paper.",                         answer: "not", correct: "Correct! Simple and useful — but zero AI inside.",               wrong: "No AI here — it's just a pencil! 😄" },
      { emoji: "📸", label: "Camera App",   text: "It recognises your face and groups photos automatically.", answer: "ai",  correct: "Yes! That's AI-powered photo recognition.",                     wrong: "Recognising faces automatically? That's definitely AI!" }
    ]
  },
  {
    title: "What Can AI Do?",
    sub: "Mission 2 · AI Superpowers",
    icon: "⚡",
    roboIntro: [
      "Great job on Level 1! 🎉 You're a natural.",
      "Now let's explore what AI is actually good at — and where it falls short.",
      "AI can explain things, help you practise, translate languages… but it's not perfect at everything.",
      "Is each example a ✅ smart use of AI — or ❌ not the best idea?"
    ],
    roboStart: "Here we go! Trust your gut 👇",
    complete: "You now know AI's superpowers — and its limits. Smart thinking! 🧠",
    choices: [
      { id: "good", icon: "✅", label: "Smart use",    sub: "AI helps here",  color: "green" },
      { id: "bad",  icon: "❌", label: "Not the best", sub: "AI isn't ideal", color: "red"   }
    ],
    tasks: [
      { emoji: "💬", label: "Explain",   text: "You ask AI to explain a hard word in simple language.",    answer: "good", correct: "Yes! AI is great at breaking down tricky words.",               wrong: "Actually, this is a great use — AI explains things clearly!" },
      { emoji: "📝", label: "Practice",  text: "AI gives you quiz questions to practise before a test.",  answer: "good", correct: "Smart! Practising with AI builds real skills.",                 wrong: "AI makes an excellent quiz partner — try it!" },
      { emoji: "🌍", label: "Translate", text: "You translate a word from Arabic to English.",            answer: "good", correct: "Perfect — AI is great at language help!",                      wrong: "Translation is one of AI's best skills!" },
      { emoji: "📋", label: "Homework",  text: "AI writes your whole homework and you copy it.",          answer: "bad",  correct: "Right! Copying stops you from actually learning.",              wrong: "If AI does it all, you learn nothing. Not great!" },
      { emoji: "🏥", label: "Medicine",  text: "AI tells you exactly what medicine to take.",             answer: "bad",  correct: "Correct! Always ask a real doctor for health advice.",          wrong: "Health advice needs a real doctor — AI can get this wrong!" }
    ]
  },
  {
    title: "Check Before You Trust",
    sub: "Mission 3 · Fact Check",
    icon: "🔍",
    roboIntro: [
      "Here's a big secret about AI… 🤫",
      "Even I can get things wrong sometimes!",
      "AI can sound very confident — but that doesn't always mean it's right.",
      "For each piece of info, tell me: is it fine to use, or should you check it first?"
    ],
    roboStart: "Ready to be a fact-checker? Go! 👇",
    complete: "Brilliant! You know to always verify important info. That makes you smarter than AI! 🏆",
    choices: [
      { id: "ok",    icon: "✓",  label: "Looks fine", sub: "Simple fact",     color: "green"  },
      { id: "check", icon: "🔍", label: "Check it",   sub: "Needs verifying", color: "violet" }
    ],
    tasks: [
      { emoji: "➕",  label: "Maths",     text: "AI answers: 2 + 2 = 4.",                           answer: "ok",    correct: "Yes, simple maths — you can trust this one!",          wrong: "Basic maths is correct, no check needed!" },
      { emoji: "🐱",  label: "Wild Fact", text: "AI says: 'Cats can fly like birds.'",              answer: "check", correct: "Always check strange claims like this!",                wrong: "That's clearly wrong! Always check unexpected facts." },
      { emoji: "📰",  label: "News",      text: "AI tells you something big happened today.",        answer: "check", correct: "Right! AI's knowledge has limits — check the news!",   wrong: "AI might not know today's events — always verify!" },
      { emoji: "💊",  label: "Health",    text: "AI recommends a specific medicine for your cough.",answer: "check", correct: "Yes! Medical advice needs a real professional.",        wrong: "Never follow AI medical advice without a doctor's OK." },
      { emoji: "📚",  label: "Source",    text: "AI names a website as the source of a fact.",      answer: "check", correct: "Smart! Always verify that the source actually exists.",  wrong: "AI sometimes invents sources — always double-check!" }
    ]
  },
  {
    title: "Stay Safe Online",
    sub: "Mission 4 · Privacy & Safety",
    icon: "🔒",
    roboIntro: [
      "Almost there, Explorer! 🌟",
      "This is the most important mission: staying safe when you use AI and apps.",
      "Some things are fine to share — others need an adult's help first.",
      "Decide: safe to share, or ask a trusted adult?"
    ],
    roboStart: "Your safety matters most! Choose carefully 👇",
    complete: "You're now a Safety Champion! 🛡️ Remember: when in doubt, ask a trusted adult. Mission complete!",
    choices: [
      { id: "safe", icon: "✅", label: "Safe to share",  sub: "Not private",     color: "green"  },
      { id: "ask",  icon: "🙋", label: "Ask an adult",   sub: "Private or risky", color: "orange" }
    ],
    tasks: [
      { emoji: "🎨", label: "Simple",   text: "You tell an AI app your favourite colour is blue.",      answer: "safe", correct: "That's harmless — favourite colours aren't private.",           wrong: "This is actually totally fine to share!" },
      { emoji: "🏠", label: "Address",  text: "An app asks for your home address and phone number.",    answer: "ask",  correct: "Yes! Never share your address without an adult.",               wrong: "Address and phone number are private — always ask an adult!" },
      { emoji: "🔑", label: "Password", text: "AI asks for your school account password to 'help'.",   answer: "ask",  correct: "Correct! No app ever needs your password.",                      wrong: "Never give out passwords — not even to AI!" },
      { emoji: "😄", label: "Nickname", text: "You use a fun nickname like 'StarExplorer' in the app.",answer: "safe", correct: "Smart! A nickname keeps your real name private.",                wrong: "A nickname is great — it protects your real name!" },
      { emoji: "😈", label: "Unsafe",   text: "Someone online asks you to keep your chat a secret.",   answer: "ask",  correct: "Right! Secrets from adults are a warning sign. Tell someone!", wrong: "Secrets from trusted adults are never OK — tell someone!" }
    ]
  }
];

// ── STATE ──
let levelIdx = 0, taskIdx = 0, activeTasks = [], answeredCount = 0, locked = false;

// ── DOM HELPERS ──
const $ = id => document.getElementById(id);

const chatArea   = $('chatArea');
const modal      = $('modal');
const modalIcon  = $('modalIcon');
const modalKicker= $('modalKicker');
const modalTitle = $('modalTitle');
const modalText  = $('modalText');
const modalNext  = $('modalNext');
const modalBtn   = $('modalBtn');
const levelTitle = $('levelTitle');
const levelSub   = $('levelSub');
const levelIcon  = $('levelIcon');
const stepDots   = $('stepDots');
const sceneCard  = $('sceneCard');
const sceneEmoji = $('sceneEmoji');
const sceneLabel = $('sceneLabel');
const choicesEl  = $('choices');
const nextBtn    = $('nextBtn');
const restartBtn = $('restartBtn');
const levelPills = $('levelPills');
const eyeL       = $('eyeL');
const eyeR       = $('eyeR');
const roboMouth  = $('roboMouth');
const roboMood   = $('roboMood');

// ── ROBO EMOTION ──
function setMood(mood) {
  eyeL.className = eyeR.className = `robo-eye ${mood}`;
  const mouthMap = { happy: 'smile', sad: 'frown', think: '', '': '' };
  roboMouth.className = `robo-mouth ${mouthMap[mood] || ''}`;
  const labels = { happy: 'Celebrating! 🎉', sad: 'Hmm, try again…', think: 'Thinking… 🤔', '': 'Your AI Guide' };
  roboMood.textContent = labels[mood] || 'Your AI Guide';
}

// ── CHAT ──
function addChat(who, text, type = '') {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${who}`;
  if (who === 'robo') {
    msg.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble ${type}">${text}</div>`;
  } else {
    msg.innerHTML = `<div class="chat-bubble user ${type}">${text}</div>`;
  }
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function roboType(messages, delay, cb) {
  delay = delay || 0;
  let i = 0;

  function next() {
    if (i >= messages.length) { if (cb) cb(); return; }
    const typing = document.createElement('div');
    typing.className = 'chat-msg robo';
    typing.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble"><div class="typing-dot"><span></span><span></span><span></span></div></div>`;
    chatArea.appendChild(typing);
    chatArea.scrollTop = chatArea.scrollHeight;
    setMood('think');

    setTimeout(function () {
      typing.remove();
      addChat('robo', messages[i]);
      setMood('');
      i++;
      setTimeout(next, 600);
    }, 900 + delay);
    delay = 0;
  }

  setTimeout(next, 400);
}

// ── LEVEL PILLS ──
function renderPills() {
  levelPills.innerHTML = levels.map(function (l, i) {
    var cls = '';
    if (i < levelIdx) cls = 'done';
    else if (i === levelIdx) cls = 'active';
    return `<div class="level-pill ${cls}" title="${l.title}">${l.icon}</div>`;
  }).join('');
}

// ── STEP DOTS ──
function renderDots() {
  stepDots.innerHTML = activeTasks.map(function (_, i) {
    var cls = i < answeredCount ? 'done' : i === taskIdx ? 'active' : '';
    return `<div class="step-dot ${cls}"></div>`;
  }).join('');
}

// ── SHOW TASK ──
function showTask() {
  const level = levels[levelIdx];
  const task  = activeTasks[taskIdx];

  sceneCard.className = 'scene-card';
  sceneEmoji.textContent = task.emoji;
  sceneLabel.textContent = task.text;

  const count = level.choices.length;
  const cols  = count === 2 ? 'two' : count === 3 ? 'three' : 'four';
  choicesEl.className = `choices ${cols}`;
  choicesEl.innerHTML = '';

  level.choices.forEach(function (c) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.type = 'button';
    btn.innerHTML = `
      <div class="choice-icon">${c.icon}</div>
      <div class="choice-text">
        <span class="choice-label">${c.label}</span>
        <span class="choice-sub">${c.sub}</span>
      </div>`;
    btn.onclick = function () { pick(c.id); };
    choicesEl.appendChild(btn);
  });

  nextBtn.disabled = true;
  locked = false;
  renderDots();
}

// ── PICK ──
function pick(id) {
  if (locked) return;
  locked = true;

  const level     = levels[levelIdx];
  const task      = activeTasks[taskIdx];
  const correct   = id === task.answer;
  const choice    = level.choices.find(function (c) { return c.id === id; });
  const choiceName= choice ? choice.label : id;
  const buttons   = choicesEl.querySelectorAll('.choice-btn');

  level.choices.forEach(function (c, i) {
    buttons[i].disabled = true;
    if (c.id === id) {
      buttons[i].className += correct ? ' selected-correct' : ' selected-wrong';
    }
  });

  sceneCard.classList.add(correct ? 'correct' : 'wrong');
  addChat('user', choiceName);

  if (correct) {
    setMood('happy');
    answeredCount++;
    renderDots();
    addChat('robo', '✅ ' + task.correct, 'correct');
    spawnConfetti();
    nextBtn.disabled = false;
  } else {
    setMood('sad');
    addChat('robo', '❌ ' + task.wrong, 'wrong');
    setTimeout(function () {
      locked = false;
      sceneCard.classList.remove('wrong');
      buttons.forEach(function (b) {
        b.disabled = false;
        b.className = 'choice-btn';
      });
      setMood('');
    }, 1400);
  }
}

// ── NEXT TASK ──
function nextTask() {
  taskIdx++;
  if (taskIdx < activeTasks.length) {
    showTask();
    roboType([levels[levelIdx].roboStart]);
    return;
  }
  finishLevel();
}

// ── FINISH LEVEL ──
function finishLevel() {
  const level = levels[levelIdx];
  setMood('happy');
  addChat('robo', '🏆 ' + level.complete, 'correct');

  if (levelIdx < levels.length - 1) {
    const next = levels[levelIdx + 1];
    modalIcon.textContent    = '🎉';
    modalKicker.textContent  = 'Level Complete!';
    modalTitle.textContent   = level.title;
    modalText.textContent    = level.complete;
    modalNext.style.display  = 'flex';
    modalNext.innerHTML      = `<span>${next.icon}</span> Next up: <strong>${next.title}</strong>`;
    modalBtn.textContent     = 'Next Level →';
    modalBtn.onclick = function () {
      modal.style.display = 'none';
      levelIdx++;
      startLevel();
    };
  } else {
    modalIcon.textContent   = '🏆';
    modalKicker.textContent = 'All Done!';
    modalTitle.textContent  = 'You are an AI Explorer!';
    modalText.textContent   = 'Amazing! You finished all missions. You can spot AI, use it wisely, check facts, and stay safe. The world needs smart thinkers like you!';
    modalNext.style.display = 'none';
    modalBtn.textContent    = 'Play Again 🔄';
    modalBtn.onclick = function () {
      modal.style.display = 'none';
      levelIdx = 0;
      startLevel();
    };
  }

  spawnConfetti();
  setTimeout(function () { modal.style.display = 'grid'; }, 700);
}

// ── START LEVEL ──
function startLevel() {
  const level = levels[levelIdx];
  taskIdx      = 0;
  answeredCount= 0;
  locked       = false;
  activeTasks  = shuffle(level.tasks.slice());

  levelTitle.textContent = level.title;
  levelSub.textContent   = level.sub;
  levelIcon.textContent  = level.icon;

  chatArea.innerHTML = '';
  setMood('');
  renderPills();
  renderDots();
  showTask();

  roboType(level.roboIntro, 300, function () {
    roboType([level.roboStart]);
  });
}

// ── UTILS ──
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function spawnConfetti() {
  var items = ['✨','🌟','🎉','⭐','💫','🤖','🎊','💜'];
  for (var i = 0; i < 12; i++) {
    var el = document.createElement('div');
    el.className   = 'confetti-piece';
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.left  = (8 + Math.random() * 84) + '%';
    el.style.top   = (Math.random() * 15) + '%';
    document.body.appendChild(el);
    (function (node) {
      setTimeout(function () { node.remove(); }, 1100);
    })(el);
  }
}

// ── INIT ──
function openIntro() {
  modalIcon.textContent    = '🤖';
  modalKicker.textContent  = 'AI Guide Mission';
  modalTitle.textContent   = 'Meet Robo!';
  modalText.textContent    = "Hi Explorer! I'm Robo, your AI buddy. I'll teach you what AI is, how to use it wisely, and how to stay safe — one level at a time. Let's go!";
  modalNext.style.display  = 'none';
  modalBtn.textContent     = 'Start Exploring 🚀';
  modalBtn.onclick = function () {
    modal.style.display = 'none';
    startLevel();
  };
  modal.style.display = 'grid';
}

nextBtn.onclick    = nextTask;
restartBtn.onclick = function () {
  levelIdx = 0;
  modal.style.display = 'none';
  chatArea.innerHTML  = '';
  openIntro();
};

openIntro();