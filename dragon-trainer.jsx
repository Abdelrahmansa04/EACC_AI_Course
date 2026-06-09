import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────── DATA ─────────────── */
const ANIMALS = [
  { id:"cat",emoji:"🐱",name:"Cat",traits:"soft fur, whiskers, says meow, loves naps",clues:["🐾 Has soft whiskers","🥛 Loves drinking milk","😺 Says meow"] },
  { id:"dog",emoji:"🐶",name:"Dog",traits:"wagging tail, says woof, loves fetch, loyal",clues:["🦴 Loves chewing bones","🎾 Loves to play fetch","🐾 Wags its tail a lot"] },
  { id:"rabbit",emoji:"🐰",name:"Rabbit",traits:"long ears, fluffy tail, hops around, loves carrots",clues:["🥕 Really loves carrots","👂 Has very long ears","🐇 Hops everywhere it goes"] },
  { id:"bird",emoji:"🐦",name:"Bird",traits:"feathers, beak, sings, can fly",clues:["🪶 Covered in feathers","🎵 Loves to sing songs","✈️ Can fly through the sky"] },
  { id:"fish",emoji:"🐟",name:"Fish",traits:"fins, scales, swims, lives in water",clues:["💧 Lives inside water","🏊 Swims using its fins","✨ Has shiny scales all over"] },
  { id:"frog",emoji:"🐸",name:"Frog",traits:"green, jumps, says ribbit, loves lily pads",clues:["🍃 Sits on lily pads","💚 Is colored bright green","🎤 Makes a ribbit sound"] },
  { id:"elephant",emoji:"🐘",name:"Elephant",traits:"big ears, long trunk, grey, very smart",clues:["🐘 Has a very long trunk","👂 Has enormous floppy ears","🧠 Is one of the smartest animals"] },
  { id:"lion",emoji:"🦁",name:"Lion",traits:"big mane, roars loudly, powerful, king of jungle",clues:["👑 Called the king of the jungle","🦁 Has a big fluffy mane","📢 Has a very loud roar"] },
  { id:"penguin",emoji:"🐧",name:"Penguin",traits:"black and white, waddles, lives in cold places, can't fly",clues:["⚫ Is black and white colored","🧊 Lives in very cold places","🐧 Waddles when it walks"] },
  { id:"butterfly",emoji:"🦋",name:"Butterfly",traits:"colorful wings, flies, starts as a caterpillar",clues:["🌈 Has colorful pretty wings","🐛 Started life as a caterpillar","🌸 Loves flying near flowers"] },
];

const DRAGON_STAGES = [
  { emoji:"🥚", label:"Just an Egg" },
  { emoji:"🐣", label:"Baby Dragon" },
  { emoji:"🐲", label:"Young Dragon" },
  { emoji:"🐉", label:"Super Dragon!" },
];

const PERSONALITIES = [
  { threshold:0,  mood:"🙂", tag:"Happy" },
  { threshold:3,  mood:"🤩", tag:"Excited" },
  { threshold:5,  mood:"😎", tag:"Confident" },
  { threshold:8,  mood:"👑", tag:"Genius Dragon!" },
];

const PATTERN_ROUNDS = [
  { seq:["🐱","🐱","🐱"], answer:"🐱", choices:["🐱","🐶","🐰"], label:["Cat","Dog","Rabbit"] },
  { seq:["🔴","🔴","🔴"], answer:"🔴", choices:["🔵","🔴","🟢"], label:["Blue","Red","Green"] },
  { seq:["⭐","⭐","⭐"], answer:"⭐", choices:["⭐","🌙","☀️"], label:["Star","Moon","Sun"] },
  { seq:["🎵","🎵","🎵"], answer:"🎵", choices:["🎸","🥁","🎵"], label:["Guitar","Drum","Music"] },
];

const MISTAKE_LAB = [
  { show:"🍕", sparkSays:"CAT?!", correct:"Pizza" },
  { show:"🚗", sparkSays:"FISH?!", correct:"Car" },
  { show:"⚽", sparkSays:"BIRD?!", correct:"Ball" },
  { show:"🌈", sparkSays:"DOG?!", correct:"Rainbow" },
  { show:"🎂", sparkSays:"FROG?!", correct:"Cake" },
];

const CONFETTI_COLORS = ["#FF6B6B","#FFE66D","#4ECDC4","#A8E6CF","#FF8B94","#B4F0A7","#97C1F7","#FFCBA4","#DDA0DD","#98FB98"];

/* ─────────────── API ─────────────── */
function callClaude(messages, systemPrompt) {
  return fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:100, system:systemPrompt, messages }),
  }).then(r=>r.json()).then(d=>d.content?.map(b=>b.text||"").join("")||"");
}

function sparkSpeak(situation, brainLevel=0, trainedAnimals=[]) {
  const mood = PERSONALITIES.filter(p=>p.threshold<=brainLevel).at(-1);
  const sys = `You are Spark, a baby dragon learning about the world from a child. Brain level: ${brainLevel}/10. Mood: ${mood.tag}.
Trained animals: ${trainedAnimals.join(", ")||"none yet"}.
Rules: max 2 sentences, max 14 words total, child-friendly (age 5-9), enthusiastic, cute.
Respond ONLY with Spark's words. No quotes. No stage directions.`;
  return callClaude([{role:"user",content:situation}], sys);
}

/* ─────────────── UI ATOMS ─────────────── */
function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>
      {Array.from({length:50},(_,i)=>(
        <div key={i} style={{
          position:"absolute",top:-24,
          left:`${(i*7.3+Math.random()*20)%100}%`,
          width:9+Math.random()*8,height:9+Math.random()*8,
          backgroundColor:CONFETTI_COLORS[i%CONFETTI_COLORS.length],
          borderRadius:Math.random()>.5?"50%":"2px",
          animation:`confFall ${1.4+Math.random()*1.2}s ease-in forwards`,
          animationDelay:`${Math.random()*1.2}s`,
        }}/>
      ))}
    </div>
  );
}

function DragonAvatar({stage,bounce,sparkle,size="md"}) {
  const d = DRAGON_STAGES[stage];
  const fs = size==="lg"?100:size==="sm"?52:72;
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
      animation:bounce?"dBounce .5s ease":sparkle?"dSpin .6s ease":"none"}}>
      <div style={{fontSize:fs,lineHeight:1,
        filter:sparkle?"drop-shadow(0 0 18px gold)":"none",
        transition:"font-size .4s ease"}}>{d.emoji}</div>
      <div style={{
        background:stage===3?"linear-gradient(135deg,#FFD700,#FF6B35)":"rgba(124,58,237,.85)",
        color:"#fff",borderRadius:20,padding:"3px 12px",fontSize:12,fontWeight:800}}>
        {d.label}
      </div>
    </div>
  );
}

function Bubble({text,loading,color="#FBBF24",bg="#FFF9F0",textColor="#92400E"}) {
  return (
    <div style={{background:bg,border:`2.5px solid ${color}`,borderRadius:18,
      padding:"12px 18px",position:"relative",textAlign:"center",minHeight:48}}>
      {loading?(
        <div style={{display:"flex",gap:6,justifyContent:"center",alignItems:"center",height:24}}>
          {[0,1,2].map(i=><div key={i} style={{width:9,height:9,borderRadius:"50%",background:color,
            animation:"dotB .8s ease-in-out infinite",animationDelay:`${i*.2}s`}}/>)}
        </div>
      ):(
        <span style={{fontSize:15,fontWeight:700,color:textColor,lineHeight:1.5}}>{text}</span>
      )}
      <div style={{position:"absolute",bottom:-13,left:"50%",transform:"translateX(-50%)",
        width:0,height:0,borderLeft:"9px solid transparent",borderRight:"9px solid transparent",
        borderTop:`13px solid ${bg}`,zIndex:1}}/>
      <div style={{position:"absolute",bottom:-16,left:"50%",transform:"translateX(-50%)",
        width:0,height:0,borderLeft:"11px solid transparent",borderRight:"11px solid transparent",
        borderTop:`15px solid ${color}`,zIndex:0}}/>
    </div>
  );
}

function CrystalBar({crystals}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
      <span style={{fontSize:12,fontWeight:800,color:"#A78BFA"}}>Crystals</span>
      <div style={{display:"flex",gap:3}}>
        {Array.from({length:10},(_,i)=>(
          <span key={i} style={{fontSize:i<crystals%10||crystals>=10&&i<10?18:14,
            filter:i<(crystals%10||crystals>=10?10:crystals)?"none":"grayscale(1) opacity(.25)",
            transition:"all .3s ease"}}>💎</span>
        ))}
      </div>
      <span style={{fontSize:12,fontWeight:800,color:"#FFD700"}}>{crystals}</span>
    </div>
  );
}

function ProgressBar({value,max,color="#7C3AED",label}) {
  return (
    <div>
      {label&&<div style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,.6)",marginBottom:4}}>{label}</div>}
      <div style={{height:10,background:"rgba(255,255,255,.1)",borderRadius:99,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${Math.min(100,(value/max)*100)}%`,
          background:`linear-gradient(90deg,${color},#A78BFA)`,
          borderRadius:99,transition:"width .5s ease"}}/>
      </div>
    </div>
  );
}

const CARD = {background:"rgba(255,255,255,.07)",backdropFilter:"blur(14px)",
  border:"1px solid rgba(255,255,255,.13)",borderRadius:22,padding:"20px 16px"};

function MiniBtn({children,onClick,color="#7C3AED",disabled,style={}}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background:`${color}cc`,color:"#fff",border:`2px solid ${color}`,
      borderRadius:14,padding:"12px 10px",fontSize:14,fontWeight:800,
      fontFamily:"inherit",cursor:disabled?"not-allowed":"pointer",
      opacity:disabled?.6:1,transition:"all .15s ease",
      display:"flex",alignItems:"center",justifyContent:"center",gap:6,...style
    }}
    onMouseEnter={e=>{if(!disabled)e.currentTarget.style.transform="scale(1.05)"}}
    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)"}}
    >{children}</button>
  );
}

function MainBtn({children,onClick,gradient="linear-gradient(135deg,#7C3AED,#4F46E5)",style={}}) {
  return (
    <button onClick={onClick} style={{
      background:gradient,color:"#fff",border:"none",borderRadius:20,
      padding:"15px 34px",fontSize:18,fontWeight:900,fontFamily:"inherit",
      cursor:"pointer",boxShadow:"0 4px 20px rgba(124,58,237,.5)",
      transition:"all .15s ease",letterSpacing:.3,...style
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px) scale(1.04)";e.currentTarget.style.boxShadow="0 8px 30px rgba(124,58,237,.7)"}}
    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 20px rgba(124,58,237,.5)"}}
    >{children}</button>
  );
}

/* ─────────────── SCENE COMPONENTS ─────────────── */
function SceneEgg({onHatch}) {
  const [cracking,setCracking]=useState(false);
  const crack=()=>{setCracking(true);setTimeout(onHatch,1100);};
  return (
    <div style={{...CARD,textAlign:"center",padding:"44px 20px",animation:"fadeUp .5s ease"}}>
      <p style={{color:"#C4B5FD",fontSize:15,fontWeight:700,marginBottom:24}}>A mysterious egg is glowing... ✨</p>
      <div onClick={crack} style={{fontSize:104,lineHeight:1,display:"inline-block",cursor:"pointer",
        animation:cracking?"eggShake .35s ease infinite":"pulse 2.2s ease infinite",
        filter:cracking?"drop-shadow(0 0 28px gold)":"none",transition:"filter .3s"}}>
        {cracking?"🐣":"🥚"}
      </div>
      <p style={{color:"#FFD700",fontSize:17,fontWeight:700,marginTop:16}}>
        {cracking?"It's hatching! 🌟":"Tap the egg to meet your dragon!"}
      </p>
      {!cracking&&<MainBtn onClick={crack} style={{marginTop:20}}>Hatch My Dragon! 🥚</MainBtn>}
    </div>
  );
}

function SceneIntro({sparkMsg,loading,onStart}) {
  return (
    <div style={{...CARD,textAlign:"center",padding:"32px 20px",animation:"fadeUp .5s ease"}}>
      <DragonAvatar stage={1} size="lg"/>
      <div style={{margin:"20px 0"}}><Bubble text={sparkMsg} loading={loading}/></div>
      {!loading&&<MainBtn onClick={onStart}>Let's Teach You! 🎓</MainBtn>}
    </div>
  );
}

function SceneBadAI({onAnswer,crystals}) {
  const [answered,setAnswered]=useState(null);
  const [showReward,setShowReward]=useState(false);
  const opts=[
    {label:"Spark is sleepy 😴",emoji:"😴",correct:false},
    {label:"Spark saw too few examples ✅",emoji:"📚",correct:true},
    {label:"Spark forgot his glasses 👓",emoji:"👓",correct:false},
  ];
  const pick=(o)=>{
    if(answered)return;
    setAnswered(o);
    if(o.correct)setTimeout(()=>setShowReward(true),700);
  };
  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{...CARD,marginBottom:12}}>
        <p style={{color:"#FFD700",fontSize:14,fontWeight:800,textAlign:"center",margin:"0 0 12px"}}>⚠️ Before You Train Spark…</p>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontSize:60}}>🐱</div>
            <div style={{background:"rgba(124,58,237,.3)",borderRadius:10,padding:"4px 8px",fontSize:12,fontWeight:700,color:"#C4B5FD",marginTop:4}}>Spark only saw: 1 animal</div>
          </div>
          <div style={{flex:2}}>
            <Bubble text={"Uh oh! I only saw ONE animal! Let me try to guess…"} textColor="#92400E"/>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",justifyContent:"center",marginBottom:8}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:60}}>🦁</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",fontWeight:600}}>What animal is this?</div>
          </div>
          <div style={{fontSize:28}}>→</div>
          <Bubble text={"DOG?! 🐶"} color="#F87171" bg="#FFF5F5" textColor="#991B1B"/>
        </div>
      </div>
      <div style={{...CARD,marginBottom:12}}>
        <p style={{color:"#fff",fontSize:14,fontWeight:800,textAlign:"center",marginBottom:12}}>
          🤔 Why was Spark wrong?
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {opts.map((o,i)=>(
            <button key={i} onClick={()=>pick(o)} style={{
              background:answered?.correct===false&&o===answered?"rgba(220,38,38,.25)":answered&&o.correct?"rgba(22,163,74,.25)":answered?"rgba(255,255,255,.05)":"rgba(255,255,255,.08)",
              border:`2px solid ${answered?.correct===false&&o===answered?"#F87171":answered&&o.correct?"#4ADE80":"rgba(255,255,255,.2)"}`,
              borderRadius:14,padding:"12px 16px",color:"#fff",fontSize:14,fontWeight:700,
              fontFamily:"inherit",cursor:answered?"default":"pointer",textAlign:"left",
              display:"flex",alignItems:"center",gap:10,transition:"all .2s"
            }}>
              <span style={{fontSize:22}}>{o.emoji}</span>{o.label}
              {answered&&o.correct&&<span style={{marginLeft:"auto"}}>✅</span>}
            </button>
          ))}
        </div>
      </div>
      {showReward&&(
        <div style={{...CARD,textAlign:"center",animation:"fadeUp .4s ease"}}>
          <div style={{fontSize:48,marginBottom:8}}>🌟</div>
          <Bubble text={"That's right! I need LOTS of examples to learn!"} color="#4ADE80" bg="#F0FFF4" textColor="#14532D"/>
          <div style={{marginTop:12,background:"rgba(255,215,0,.1)",borderRadius:14,padding:"10px 14px"}}>
            <p style={{color:"#FFD700",fontSize:13,fontWeight:800,margin:0}}>💎 +1 Crystal earned!</p>
          </div>
          <MainBtn onClick={()=>onAnswer(1)} style={{marginTop:16}}>Now let's train Spark! 🐲</MainBtn>
        </div>
      )}
    </div>
  );
}

function SceneTraining({animal,brainLevel,trainedCount,totalNeeded,sparkMsg,sparkLoading,feedback,onAnswer,dragonStage,bounce,sparkle}) {
  const choices=useRef(null);
  if(!choices.current||choices.current[0]?.id!==animal?.id){
    if(animal){
      const others=ANIMALS.filter(a=>a.id!==animal.id).sort(()=>Math.random()-.5).slice(0,3);
      choices.current=[...others,animal].sort(()=>Math.random()-.5);
    }
  }
  if(!animal)return null;
  const chs=choices.current||[];
  return (
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{...CARD,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{color:"#C4B5FD",fontSize:12,fontWeight:800}}>📚 Training Session</span>
          <span style={{color:"#FFD700",fontSize:12,fontWeight:800}}>Taught: {trainedCount}/{totalNeeded}</span>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <div style={{flex:1}}><DragonAvatar stage={dragonStage} bounce={bounce} sparkle={sparkle} size="sm"/></div>
          <div style={{flex:2}}><Bubble text={sparkMsg} loading={sparkLoading}/></div>
        </div>
        <div style={{marginTop:10}}><ProgressBar value={trainedCount} max={totalNeeded} label="Training progress"/></div>
      </div>
      <div style={{...CARD,textAlign:"center",marginBottom:12}}>
        <p style={{color:"#C4B5FD",fontSize:13,fontWeight:700,margin:"0 0 6px"}}>What animal is this?</p>
        <div style={{fontSize:82,margin:"4px 0 2px"}}>{animal.emoji}</div>
        <p style={{color:"rgba(255,255,255,.35)",fontSize:11,margin:0}}>Help Spark learn by choosing the right answer!</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {chs.map(c=>{
          const isCorrect=c.id===animal.id;
          const bgCol=feedback&&isCorrect?"rgba(22,163,74,.35)":feedback&&!isCorrect?"rgba(220,38,38,.2)":"rgba(255,255,255,.08)";
          const bdCol=feedback&&isCorrect?"#4ADE80":feedback&&!isCorrect?"#F87171":"rgba(255,255,255,.25)";
          return (
            <MiniBtn key={c.id} onClick={()=>!feedback&&onAnswer(c)} disabled={!!feedback}
              style={{background:bgCol,border:`2px solid ${bdCol}`,opacity:feedback&&!isCorrect?.5:1}}>
              <span style={{fontSize:22}}>{c.emoji}</span>
              <span>{c.name}</span>
              {feedback&&isCorrect&&<span>✅</span>}
            </MiniBtn>
          );
        })}
      </div>
    </div>
  );
}

function ScenePatternDetective({onComplete,onSparkMsg}) {
  const [round,setRound]=useState(0);
  const [answered,setAnswered]=useState(null);
  const [earned,setEarned]=useState(0);
  const [done,setDone]=useState(false);
  const q=PATTERN_ROUNDS[round];
  const pick=(i)=>{
    if(answered!==null)return;
    const correct=q.choices[i]===q.answer;
    setAnswered(i);
    if(correct)setEarned(e=>e+1);
    setTimeout(()=>{
      if(round<PATTERN_ROUNDS.length-1){setRound(r=>r+1);setAnswered(null);}
      else setDone(true);
    },900);
  };
  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{...CARD,marginBottom:12,textAlign:"center"}}>
        <p style={{color:"#FFD700",fontSize:14,fontWeight:800,margin:"0 0 4px"}}>🔍 Pattern Detective!</p>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:12,margin:"0 0 14px"}}>What comes next in the pattern?</p>
        {!done&&(
          <>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10,marginBottom:18,fontSize:40}}>
              {q.seq.map((s,i)=><span key={i}>{s}</span>)}
              <span style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"0 12px",fontSize:36,color:"#FFD700"}}>❓</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {q.choices.map((c,i)=>{
                const correct=c===q.answer;
                const bg=answered===i&&correct?"rgba(22,163,74,.35)":answered===i?"rgba(220,38,38,.2)":answered!==null&&correct?"rgba(22,163,74,.2)":"rgba(255,255,255,.08)";
                const bd=answered===i&&correct?"#4ADE80":answered===i?"#F87171":answered!==null&&correct?"#4ADE80":"rgba(255,255,255,.25)";
                return (
                  <MiniBtn key={i} onClick={()=>pick(i)} disabled={answered!==null}
                    style={{background:bg,border:`2px solid ${bd}`,fontSize:22,justifyContent:"center"}}>
                    {c} <span style={{fontSize:13,marginLeft:4}}>{q.label[i]}</span>
                  </MiniBtn>
                );
              })}
            </div>
            <p style={{color:"rgba(255,255,255,.4)",fontSize:11,marginTop:10,marginBottom:0}}>
              Round {round+1} of {PATTERN_ROUNDS.length}
            </p>
          </>
        )}
        {done&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            <div style={{fontSize:60,marginBottom:8}}>🎉</div>
            <Bubble text={`Patterns help me learn! I got ${earned} right!`} color="#4ADE80" bg="#F0FFF4" textColor="#14532D"/>
            <div style={{marginTop:12,background:"rgba(255,215,0,.1)",borderRadius:14,padding:"10px 14px"}}>
              <p style={{color:"#FFD700",fontSize:13,fontWeight:800,margin:0}}>💎 +{earned} Crystals earned!</p>
            </div>
            <MainBtn onClick={()=>onComplete(earned)} style={{marginTop:16}}>Next! →</MainBtn>
          </div>
        )}
      </div>
    </div>
  );
}

function SceneClueDetective({onComplete}) {
  const [animalIdx]=useState(()=>Math.floor(Math.random()*ANIMALS.length));
  const animal=ANIMALS[animalIdx];
  const [clueShown,setClueShown]=useState(0);
  const [answered,setAnswered]=useState(null);
  const choices=useRef(ANIMALS.filter(a=>a.id!==animal.id).sort(()=>Math.random()-.5).slice(0,3).concat(animal).sort(()=>Math.random()-.5));
  const revealNext=()=>setClueShown(n=>Math.min(n+1,animal.clues.length));
  const pick=(a)=>{
    if(answered)return;
    setAnswered(a);
    setTimeout(()=>onComplete(a.id===animal.id?2:0,a.id===animal.id),1200);
  };
  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{...CARD,marginBottom:12}}>
        <p style={{color:"#FFD700",fontSize:14,fontWeight:800,textAlign:"center",margin:"0 0 12px"}}>🕵️ Mystery Animal Clues!</p>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          {animal.clues.slice(0,clueShown).map((clue,i)=>(
            <div key={i} style={{background:"rgba(167,139,250,.15)",border:"1px solid rgba(167,139,250,.35)",
              borderRadius:12,padding:"10px 14px",animation:"fadeUp .3s ease"}}>
              <span style={{color:"#C4B5FD",fontSize:14,fontWeight:700}}>Clue {i+1}: {clue}</span>
            </div>
          ))}
          {clueShown<animal.clues.length&&(
            <button onClick={revealNext} style={{background:"rgba(255,255,255,.06)",border:"2px dashed rgba(255,255,255,.2)",
              borderRadius:12,padding:"10px 14px",color:"rgba(255,255,255,.5)",
              fontSize:13,fontWeight:700,fontFamily:"inherit",cursor:"pointer"}}>
              🔍 Reveal Clue {clueShown+1}
            </button>
          )}
        </div>
        {clueShown>0&&(
          <>
            <p style={{color:"#fff",fontSize:13,fontWeight:800,textAlign:"center",marginBottom:10}}>
              What animal is it?
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {choices.current.map(c=>{
                const isCorrect=c.id===animal.id;
                const bg=answered&&isCorrect?"rgba(22,163,74,.35)":answered?.id===c.id?"rgba(220,38,38,.2)":"rgba(255,255,255,.08)";
                const bd=answered&&isCorrect?"#4ADE80":answered?.id===c.id?"#F87171":"rgba(255,255,255,.25)";
                return (
                  <MiniBtn key={c.id} onClick={()=>pick(c)} disabled={!!answered}
                    style={{background:bg,border:`2px solid ${bd}`}}>
                    <span style={{fontSize:20}}>{c.emoji}</span>{c.name}
                    {answered&&isCorrect&&<span>✅</span>}
                  </MiniBtn>
                );
              })}
            </div>
          </>
        )}
        {clueShown===0&&(
          <p style={{color:"rgba(255,255,255,.4)",fontSize:12,textAlign:"center",margin:0}}>
            Reveal clues one at a time to figure out the mystery animal!
          </p>
        )}
      </div>
    </div>
  );
}

function SceneCompare({onComplete}) {
  const [chosen,setChosen]=useState(null);
  const [showLesson,setShowLesson]=useState(false);
  const pick=(b)=>{
    setChosen(b);
    if(b)setTimeout(()=>setShowLesson(true),600);
  };
  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{...CARD,marginBottom:12}}>
        <p style={{color:"#FFD700",fontSize:14,fontWeight:800,textAlign:"center",margin:"0 0 14px"}}>
          🆚 Smart Dragon vs Super Dragon
        </p>
        <div style={{display:"flex",gap:10,marginBottom:14}}>
          {[
            {label:"Dragon A",trained:3,emoji:"🐣",guess:"DOG?!",color:"#F87171"},
            {label:"Dragon B",trained:10,emoji:"🐉",guess:"LION!",color:"#4ADE80"},
          ].map((d,i)=>(
            <div key={i} style={{flex:1,background:"rgba(255,255,255,.06)",borderRadius:16,padding:"14px 10px",textAlign:"center",
              border:`2px solid ${i===1?"rgba(74,222,128,.3)":"rgba(255,255,255,.1)"}`}}>
              <div style={{fontSize:44}}>{d.emoji}</div>
              <div style={{color:"#fff",fontSize:13,fontWeight:800,marginTop:4}}>{d.label}</div>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>Learned {d.trained} animals</div>
              <div style={{marginTop:10}}>
                <div style={{fontSize:32}}>🦁</div>
                <div style={{background:`${d.color}33`,border:`2px solid ${d.color}`,
                  borderRadius:10,padding:"5px 8px",marginTop:6,color:d.color,fontSize:13,fontWeight:800}}>
                  "{d.guess}"
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{color:"#fff",fontSize:13,fontWeight:800,textAlign:"center",marginBottom:10}}>
          Which dragon learned better?
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <MiniBtn onClick={()=>pick(false)} disabled={chosen!==null}
            style={{background:chosen===false?"rgba(220,38,38,.3)":"rgba(255,255,255,.08)",
              border:`2px solid ${chosen===false?"#F87171":"rgba(255,255,255,.2)"}`}}>
            🐣 Dragon A
          </MiniBtn>
          <MiniBtn onClick={()=>pick(true)} disabled={chosen!==null}
            style={{background:chosen===true?"rgba(22,163,74,.3)":"rgba(255,255,255,.08)",
              border:`2px solid ${chosen===true?"#4ADE80":"rgba(255,255,255,.2)"}`}}>
            🐉 Dragon B ✅
          </MiniBtn>
        </div>
      </div>
      {showLesson&&(
        <div style={{...CARD,textAlign:"center",animation:"fadeUp .4s ease"}}>
          <Bubble text={"The dragon with more examples learned more!"} color="#4ADE80" bg="#F0FFF4" textColor="#14532D"/>
          <div style={{marginTop:12,background:"rgba(255,215,0,.1)",borderRadius:14,padding:"10px 14px"}}>
            <p style={{color:"#FFD700",fontSize:13,fontWeight:800,margin:0}}>💡 More examples = smarter AI! 💎 +1 Crystal</p>
          </div>
          <MainBtn onClick={()=>onComplete(1)} style={{marginTop:16}}>Got it! →</MainBtn>
        </div>
      )}
    </div>
  );
}

function SceneMistakeLab({onComplete}) {
  const [idx,setIdx]=useState(0);
  const [fixed,setFixed]=useState(0);
  const [showFixed,setShowFixed]=useState(false);
  const item=MISTAKE_LAB[idx];
  const fix=()=>{
    setShowFixed(true);
    setTimeout(()=>{
      if(idx<MISTAKE_LAB.length-1){setIdx(i=>i+1);setFixed(f=>f+1);setShowFixed(false);}
      else onComplete(fixed+1);
    },1000);
  };
  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      <div style={{...CARD,marginBottom:12}}>
        <p style={{color:"#FF6B6B",fontSize:14,fontWeight:800,textAlign:"center",margin:"0 0 12px"}}>
          🔬 Funny Mistake Lab!
        </p>
        <div style={{textAlign:"center",marginBottom:4}}>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:12,margin:"0 0 4px"}}>Mistakes Fixed:</p>
          <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:12}}>
            {MISTAKE_LAB.map((_,i)=>(
              <div key={i} style={{width:24,height:24,borderRadius:6,
                background:i<fixed?"#4ADE80":"rgba(255,255,255,.1)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>
                {i<fixed?"✓":""}
              </div>
            ))}
          </div>
          <div style={{fontSize:72,marginBottom:8}}>{item.show}</div>
          <Bubble text={`${item.sparkSays} — Wait, is THAT right?!`} color="#F87171" bg="#FFF5F5" textColor="#991B1B"/>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:12,margin:"14px 0 8px"}}>
            That's a {item.correct}! Help Spark fix the mistake!
          </p>
          {!showFixed?(
            <MainBtn onClick={fix} gradient="linear-gradient(135deg,#DC2626,#991B1B)">
              Fix Spark's Mistake! 🔧
            </MainBtn>
          ):(
            <div style={{animation:"fadeUp .3s ease"}}>
              <Bubble text={"Thanks for helping me learn!"} color="#4ADE80" bg="#F0FFF4" textColor="#14532D"/>
              <p style={{color:"#4ADE80",fontSize:13,fontWeight:800,marginTop:8}}>💎 +1 Crystal! ⭐ +1 Star!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SceneSpeedTrain({onComplete}) {
  const [timeLeft,setTimeLeft]=useState(30);
  const [score,setScore]=useState(0);
  const [started,setStarted]=useState(false);
  const [current,setCurrent]=useState(null);
  const [feedback,setFeedback]=useState(null);
  const [done,setDone]=useState(false);
  const timerRef=useRef(null);
  const choicesRef=useRef([]);
  const pickAnimal=useCallback(()=>{
    const a=ANIMALS[Math.floor(Math.random()*ANIMALS.length)];
    const others=ANIMALS.filter(x=>x.id!==a.id).sort(()=>Math.random()-.5).slice(0,3);
    choicesRef.current=[...others,a].sort(()=>Math.random()-.5);
    setCurrent(a);setFeedback(null);
  },[]);
  const start=()=>{
    setStarted(true);pickAnimal();
    timerRef.current=setInterval(()=>{
      setTimeLeft(t=>{if(t<=1){clearInterval(timerRef.current);setDone(true);return 0;}return t-1;});
    },1000);
  };
  useEffect(()=>()=>clearInterval(timerRef.current),[]);
  const answer=(c)=>{
    if(feedback||done)return;
    const ok=c.id===current.id;
    setFeedback(ok?"correct":"wrong");
    if(ok)setScore(s=>s+1);
    setTimeout(pickAnimal,350);
  };
  const getRank=()=>{
    if(score>=12)return{label:"AI Champion",stars:5};
    if(score>=9)return{label:"Dragon Master",stars:4};
    if(score>=6)return{label:"Dragon Coach",stars:3};
    if(score>=3)return{label:"Super Trainer",stars:2};
    return{label:"Fast Trainer",stars:1};
  };
  const rank=getRank();
  const timerColor=timeLeft<=10?"#F87171":timeLeft<=20?"#FBBF24":"#4ADE80";
  return (
    <div style={{animation:"fadeUp .5s ease"}}>
      {!started&&!done&&(
        <div style={{...CARD,textAlign:"center"}}>
          <div style={{fontSize:60,marginBottom:12}}>⚡</div>
          <p style={{color:"#FFD700",fontSize:18,fontWeight:900,margin:"0 0 8px"}}>Speed Training!</p>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:14,margin:"0 0 20px",lineHeight:1.5}}>
            Answer as many as you can in 30 seconds!<br/>The faster you teach, the more Spark learns!
          </p>
          <MainBtn onClick={start} gradient="linear-gradient(135deg,#F59E0B,#D97706)">Start! ⚡</MainBtn>
        </div>
      )}
      {started&&!done&&current&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{background:`${timerColor}22`,border:`2px solid ${timerColor}`,borderRadius:14,
              padding:"8px 16px",fontSize:18,fontWeight:900,color:timerColor}}>
              ⏱️ {timeLeft}
            </div>
            <div style={{background:"rgba(255,215,0,.15)",border:"2px solid rgba(255,215,0,.4)",
              borderRadius:14,padding:"8px 16px",fontSize:16,fontWeight:900,color:"#FFD700"}}>
              ⭐ {score}
            </div>
          </div>
          <div style={{...CARD,textAlign:"center",marginBottom:10}}>
            <div style={{fontSize:74}}>{current.emoji}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {choicesRef.current.map(c=>{
              const isOk=c.id===current.id;
              const bg=feedback&&isOk?"rgba(22,163,74,.35)":feedback&&!isOk?"rgba(220,38,38,.15)":"rgba(255,255,255,.08)";
              const bd=feedback&&isOk?"#4ADE80":feedback&&!isOk?"#F87171":"rgba(255,255,255,.2)";
              return (
                <MiniBtn key={c.id} onClick={()=>answer(c)}
                  style={{background:bg,border:`2px solid ${bd}`,padding:"10px 8px",fontSize:13}}>
                  <span style={{fontSize:20}}>{c.emoji}</span>{c.name}
                </MiniBtn>
              );
            })}
          </div>
        </div>
      )}
      {done&&(
        <div style={{...CARD,textAlign:"center",animation:"fadeUp .4s ease"}}>
          <div style={{fontSize:60,marginBottom:8}}>⚡</div>
          <p style={{color:"#FFD700",fontSize:22,fontWeight:900,margin:"0 0 4px"}}>Time's Up!</p>
          <p style={{color:"#fff",fontSize:28,fontWeight:900,margin:"0 0 14px"}}>
            {score} correct!
          </p>
          <div style={{background:"rgba(255,215,0,.1)",borderRadius:16,padding:16,marginBottom:16,
            border:"2px solid rgba(255,215,0,.3)"}}>
            <p style={{color:"#FFD700",fontSize:16,fontWeight:900,margin:"0 0 6px"}}>
              {"⭐".repeat(rank.stars)}{"☆".repeat(5-rank.stars)}
            </p>
            <p style={{color:"#fff",fontSize:18,fontWeight:900,margin:0}}>{rank.label}</p>
          </div>
          <p style={{color:"rgba(255,255,255,.5)",fontSize:12,marginBottom:16}}>
            💎 +{rank.stars} Crystals earned!
          </p>
          <MainBtn onClick={()=>onComplete(rank.stars)}>Continue! 🐲</MainBtn>
        </div>
      )}
    </div>
  );
}

function SceneFinalExam({brainLevel,trainedAnimals,onComplete}) {
  const questions=useRef(buildExam());
  const [qIdx,setQIdx]=useState(0);
  const [answers,setAnswers]=useState([]);
  const [feedback,setFeedback]=useState(null);
  const [done,setDone]=useState(false);

  function buildExam() {
    const qs=[];
    // 3 animal ID
    const pool=[...ANIMALS].sort(()=>Math.random()-.5).slice(0,3);
    pool.forEach(a=>{
      const others=ANIMALS.filter(x=>x.id!==a.id).sort(()=>Math.random()-.5).slice(0,3);
      const choices=[...others,a].sort(()=>Math.random()-.5);
      qs.push({type:"animal",question:`What animal is this? ${a.emoji}`,choices:choices.map(c=>({label:`${c.emoji} ${c.name}`,correct:c.id===a.id}))});
    });
    // 2 patterns
    PATTERN_ROUNDS.slice(0,2).forEach(p=>{
      qs.push({type:"pattern",question:`${p.seq.join(" ")} ❓`,choices:p.choices.map((c,i)=>({label:`${c} ${p.label[i]}`,correct:c===p.answer}))});
    });
    // 2 clue
    ANIMALS.slice(0,2).forEach(a=>{
      qs.push({type:"clue",question:`Clue: ${a.clues[0]}`,choices:ANIMALS.filter(x=>x.id!==a.id).sort(()=>Math.random()-.5).slice(0,3).concat(a).sort(()=>Math.random()-.5).map(c=>({label:`${c.emoji} ${c.name}`,correct:c.id===a.id}))});
    });
    // 3 mistakes
    MISTAKE_LAB.slice(0,3).forEach(m=>{
      qs.push({type:"mistake",question:`Spark thinks ${m.show} is "${m.sparkSays}" — is Spark right?`,choices:[{label:"Yes, Spark is right!",correct:false},{label:`No! It's a ${m.correct}!`,correct:true}]});
    });
    return qs.sort(()=>Math.random()-.5).slice(0,10);
  }

  const q=questions.current[qIdx];
  const answer=(c)=>{
    if(feedback)return;
    setFeedback(c.correct?"correct":"wrong");
    setAnswers(a=>[...a,c.correct]);
    setTimeout(()=>{
      setFeedback(null);
      if(qIdx<questions.current.length-1)setQIdx(i=>i+1);
      else setDone(true);
    },900);
  };

  if(done){
    const correct=answers.filter(Boolean).length;
    const pct=Math.round((correct/10)*100);
    return (
      <div style={{...CARD,textAlign:"center",animation:"fadeUp .5s ease"}}>
        <div style={{fontSize:60,marginBottom:8}}>📋</div>
        <p style={{color:"#FFD700",fontSize:20,fontWeight:900,margin:"0 0 4px"}}>Exam Complete!</p>
        <p style={{color:"#fff",fontSize:28,fontWeight:900,margin:"0 0 4px"}}>{correct}/10 correct</p>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:16}}>{pct}% accuracy</p>
        <MainBtn onClick={()=>onComplete(correct)}>See Your Results! 🏆</MainBtn>
      </div>
    );
  }

  return (
    <div style={{animation:"fadeUp .4s ease"}}>
      <div style={{...CARD,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{color:"#C4B5FD",fontSize:12,fontWeight:800}}>📋 Final Exam</span>
          <span style={{color:"#FFD700",fontSize:12,fontWeight:800}}>Question {qIdx+1} of 10</span>
        </div>
        <ProgressBar value={qIdx} max={10}/>
      </div>
      <div style={{...CARD,marginBottom:12,textAlign:"center"}}>
        <p style={{color:"#fff",fontSize:16,fontWeight:800,margin:0,lineHeight:1.5}}>{q.question}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.choices.map((c,i)=>{
          const bg=feedback&&c.correct?"rgba(22,163,74,.35)":feedback==="wrong"&&!c.correct?"rgba(220,38,38,.15)":"rgba(255,255,255,.08)";
          const bd=feedback&&c.correct?"#4ADE80":feedback==="wrong"&&!c.correct?"#F87171":"rgba(255,255,255,.2)";
          return (
            <MiniBtn key={i} onClick={()=>answer(c)}
              style={{background:bg,border:`2px solid ${bd}`,justifyContent:"flex-start",padding:"12px 16px",fontSize:14}}>
              {c.label}{feedback&&c.correct&&<span style={{marginLeft:"auto"}}>✅</span>}
            </MiniBtn>
          );
        })}
      </div>
    </div>
  );
}

function SceneComplete({stats,onRestart}) {
  const total=stats.crystals;
  const getTitle=()=>{
    if(stats.examScore>=9)return{t:"AI Champion",s:5};
    if(stats.examScore>=7)return{t:"Dragon Master",s:4};
    if(stats.examScore>=5)return{t:"Expert Trainer",s:3};
    if(stats.examScore>=3)return{t:"Smart Trainer",s:2};
    return{t:"Beginner Trainer",s:1};
  };
  const rank=getTitle();
  return (
    <div style={{...CARD,textAlign:"center",padding:"28px 16px",animation:"fadeUp .5s ease"}}>
      <DragonAvatar stage={3} sparkle size="lg"/>
      <h2 style={{color:"#FFD700",fontSize:26,fontWeight:900,margin:"16px 0 6px",
        textShadow:"0 0 20px rgba(255,215,0,.8)"}}>You Did It! 🎉</h2>
      <p style={{color:"#C4B5FD",fontSize:14,fontWeight:600,lineHeight:1.6,margin:"0 0 16px"}}>
        You taught Spark using examples!<br/>The more examples you gave, the smarter Spark became!
      </p>
      <div style={{background:"rgba(255,215,0,.1)",borderRadius:20,padding:18,marginBottom:14,
        border:"2px solid rgba(255,215,0,.35)"}}>
        <p style={{color:"#FFD700",fontSize:12,fontWeight:800,margin:"0 0 6px",letterSpacing:1}}>🏆 DRAGON TRAINER CERTIFICATE</p>
        <p style={{color:"#fff",fontSize:19,fontWeight:900,margin:"0 0 6px"}}>{rank.t}</p>
        <p style={{color:"#FFD700",fontSize:20,margin:"0 0 10px"}}>{"⭐".repeat(rank.s)}{"☆".repeat(5-rank.s)}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
          {[
            {label:"Animals Taught",val:stats.trained},
            {label:"Patterns Solved",val:stats.patterns},
            {label:"Mistakes Fixed",val:stats.mistakesFix},
            {label:"Crystals Earned",val:`💎 ${stats.crystals}`},
            {label:"Exam Score",val:`${stats.examScore}/10`},
            {label:"Final Accuracy",val:`${Math.round(stats.examScore*10)}%`},
          ].map(({label,val})=>(
            <div key={label} style={{background:"rgba(255,255,255,.07)",borderRadius:12,padding:"8px 10px"}}>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:10,fontWeight:700,marginBottom:2}}>{label}</div>
              <div style={{color:"#fff",fontSize:16,fontWeight:900}}>{val}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"rgba(167,139,250,.1)",borderRadius:16,padding:"12px 14px",marginBottom:16,
        border:"1px solid rgba(167,139,250,.3)"}}>
        <p style={{color:"#C4B5FD",fontSize:13,fontWeight:600,margin:0,lineHeight:1.7}}>
          💡 Just like Spark, real AI learns from examples!<br/>
          It finds patterns 🔍, makes mistakes ❌, and gets smarter with more training! 🧠
        </p>
      </div>
      <MainBtn onClick={onRestart} gradient="linear-gradient(135deg,#059669,#047857)">Play Again! 🔄</MainBtn>
    </div>
  );
}

/* ─────────────── MAIN GAME ─────────────── */
const FLOW = ["egg","badAI","intro","training","pattern","clues","compare","mistakeLab","speedTrain","readyToTest","guessing","finalExam","complete"];

export default function DragonTrainer() {
  const [scene,setScene]=useState("egg");
  const [dragonStage,setDragonStage]=useState(0);
  const [brainScore,setBrainScore]=useState(0);
  const [crystals,setCrystals]=useState(0);
  const [stars,setStars]=useState(0);
  const [sparkMsg,setSparkMsg]=useState("");
  const [msgLoading,setMsgLoading]=useState(false);
  const [trained,setTrained]=useState({});
  const [currentAnimal,setCurrentAnimal]=useState(null);
  const [trainFeedback,setTrainFeedback]=useState(null);
  const [confetti,setConfetti]=useState(false);
  const [bounce,setBounce]=useState(false);
  const [sparkle,setSparkle]=useState(false);
  const [guessAnimal,setGuessAnimal]=useState(null);
  const [dragonGuess,setDragonGuess]=useState("");
  const [guessLoading,setGuessLoading]=useState(false);
  const [stats,setStats]=useState({trained:0,patterns:0,mistakesFix:0,crystals:0,examScore:0});
  const trainingCount=Object.keys(trained).length;
  const TRAIN_NEEDED=6;
  const BRAIN_MAX=10;

  const trainedList=Object.keys(trained);
  const mood=PERSONALITIES.filter(p=>p.threshold<=brainScore).at(-1);

  const addCrystals=(n)=>{
    setCrystals(c=>{
      const next=c+n;
      if(Math.floor(next/5)>Math.floor(c/5)){
        setConfetti(true);setTimeout(()=>setConfetti(false),3000);
        const ns=Math.min(3,Math.floor(next/5));
        if(ns>dragonStage){setSparkle(true);setTimeout(()=>setSparkle(false),700);setDragonStage(ns);}
      }
      return next;
    });
  };

  const doBounce=()=>{setBounce(true);setTimeout(()=>setBounce(false),600);};

  const say=(situation,ctx="")=>{
    setMsgLoading(true);
    return sparkSpeak(situation,brainScore,trainedList).then(m=>{setSparkMsg(m||"Yay I'm learning!");setMsgLoading(false);return m;});
  };

  const pickAnimal=(exclude={})=>{
    const pool=ANIMALS.filter(a=>!exclude[a.id]);
    return pool.length?pool[Math.floor(Math.random()*pool.length)]:ANIMALS[Math.floor(Math.random()*ANIMALS.length)];
  };

  /* TRAINING ANSWER */
  const handleTrainAnswer=(chosen)=>{
    if(trainFeedback)return;
    const correct=chosen.id===currentAnimal.id;
    const newTrained={...trained,[currentAnimal.id]:(trained[currentAnimal.id]||0)+1};
    setTrained(newTrained);
    setTrainFeedback(correct?"correct":"wrong");
    doBounce();
    if(correct){setBrainScore(s=>Math.min(BRAIN_MAX,s+1));addCrystals(1);}
    say(correct?`The child correctly labeled a ${currentAnimal.name}! Cheer!`:`Oops — child picked ${chosen.name} but it was ${currentAnimal.name}. React funny.`);
    setTimeout(()=>{
      setTrainFeedback(null);
      const tc=Object.keys(newTrained).length;
      if(tc>=TRAIN_NEEDED){
        setScene("pattern");
        setStats(s=>({...s,trained:tc}));
        say("You've trained me on lots of animals! Get excited for a pattern game!");
      } else {
        const next=pickAnimal(newTrained);
        setCurrentAnimal(next);
        say(`Ready to learn about a ${next.name}!`);
      }
    },1800);
  };

  /* GUESSING */
  const startGuessing=()=>{
    setScene("guessing");
    const a=pickAnimal({});
    setGuessAnimal(a);
    makeDragonGuess(a);
  };

  const makeDragonGuess=async(animal)=>{
    setGuessLoading(true);setDragonGuess("");
    const isKnown=trainedList.includes(animal.id);
    const wrong=ANIMALS.filter(a=>a.id!==animal.id)[Math.floor(Math.random()*(ANIMALS.length-1))];
    const sys=`You are Spark dragon. You know: ${trainedList.join(",")||"nothing"}. 
    Max 1 sentence, max 10 words, excited. ${!isKnown?"You haven't seen this so guess something silly!":"You might know this!"}`;
    const shouldWrong=!isKnown||Math.random()<.3;
    const target=shouldWrong?wrong:animal;
    const m=await callClaude([{role:"user",content:`You see a ${target.name}. Guess what it is?`}],sys);
    setDragonGuess(m||`Is this a ${target.name}?!`);setGuessLoading(false);
  };

  const handleGuessJudge=async(wasCorrect)=>{
    if(wasCorrect){addCrystals(1);setSparkle(true);setTimeout(()=>setSparkle(false),700);}
    else doBounce();
    await say(wasCorrect?"You confirmed my correct guess! Celebrate!":"I got it wrong about the animal. React funnily!");
    setTimeout(()=>{
      if(crystals>=15||stars>=4){setScene("finalExam");}
      else {
        const next=pickAnimal({});setGuessAnimal(next);makeDragonGuess(next);
      }
    },2000);
  };

  /* SCENE INIT */
  useEffect(()=>{
    if(scene==="intro")say("Introduce yourself as Spark! You just hatched, know nothing about animals, ask them to teach you!","just hatched");
    if(scene==="readyToTest")say("You trained on lots of animals! Tell the child you want to try guessing yourself!","feeling confident");
  },[scene]);

  /* NAVIGATION */
  const goNext=(sc)=>setScene(sc);

  const restart=()=>{
    setScene("egg");setDragonStage(0);setBrainScore(0);setCrystals(0);setStars(0);
    setTrained({});setCurrentAnimal(null);setTrainFeedback(null);
    setGuessAnimal(null);setDragonGuess("");setSparkMsg("");
    setStats({trained:0,patterns:0,mistakesFix:0,crystals:0,examScore:0});
  };

  /* TOP BAR */
  const showBar=!["egg","complete"].includes(scene);

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#0f0025 0%,#1a0545 40%,#062040 100%)",
      fontFamily:"'Nunito','Comic Sans MS',system-ui,sans-serif",
      padding:"14px 12px 48px",
      position:"relative",overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes confFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
        @keyframes dBounce{0%,100%{transform:translateY(0)}30%{transform:translateY(-18px) scale(1.08)}60%{transform:translateY(-6px)}}
        @keyframes dSpin{0%{transform:scale(1) rotate(0)}50%{transform:scale(1.25) rotate(15deg)}100%{transform:scale(1) rotate(0)}}
        @keyframes dotB{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
        @keyframes eggShake{0%,100%{transform:rotate(0)}20%{transform:rotate(-8deg) scale(1.05)}40%{transform:rotate(8deg) scale(1.05)}60%{transform:rotate(-5deg)}80%{transform:rotate(5deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .star-bg{position:absolute;border-radius:50%;background:rgba(255,255,255,.55)}
      `}</style>
      <Confetti active={confetti}/>
      {Array.from({length:25},(_,i)=>(
        <div key={i} className="star-bg" style={{
          left:`${(i*13.7+5)%100}%`,top:`${(i*11.3+8)%100}%`,
          width:i%5===0?4:2,height:i%5===0?4:2,opacity:.15+.1*(i%4)
        }}/>
      ))}

      <div style={{maxWidth:520,margin:"0 auto"}}>
        {/* TITLE */}
        <div style={{textAlign:"center",marginBottom:12}}>
          <h1 style={{color:"#FFD700",fontSize:24,fontWeight:900,margin:0,
            textShadow:"0 0 20px rgba(255,215,0,.6)",letterSpacing:.3}}>
            🐲 Train Your Baby Dragon!
          </h1>
          <p style={{color:"rgba(255,255,255,.45)",fontSize:12,margin:"3px 0 0",fontWeight:700}}>
            Teach Spark about the world
          </p>
        </div>

        {/* TOP BAR */}
        {showBar&&(
          <div style={{...CARD,marginBottom:12,padding:"12px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:12,fontWeight:800,color:"rgba(255,255,255,.5)"}}>Mood:</span>
                <span style={{fontSize:16}}>{mood.mood}</span>
                <span style={{fontSize:11,fontWeight:700,color:"#C4B5FD"}}>{mood.tag}</span>
              </div>
              <div style={{display:"flex",gap:4}}>
                {Array.from({length:5},(_,i)=>(
                  <span key={i} style={{fontSize:16,filter:i<stars?"none":"grayscale(1) opacity(.2)",transition:"filter .3s"}}>⭐</span>
                ))}
              </div>
            </div>
            <CrystalBar crystals={crystals}/>
            <div style={{marginTop:8}}>
              <ProgressBar value={brainScore} max={BRAIN_MAX} color="#7C3AED" label={`🧠 Dragon Brain  ${brainScore}/${BRAIN_MAX}`}/>
            </div>
          </div>
        )}

        {/* SCENES */}
        {scene==="egg"&&<SceneEgg onHatch={()=>{setDragonStage(1);setScene("badAI");}}/>}

        {scene==="badAI"&&(
          <SceneBadAI onAnswer={(c)=>{addCrystals(c);setStars(s=>Math.min(5,s+1));setScene("intro");}} crystals={crystals}/>
        )}

        {scene==="intro"&&(
          <SceneIntro sparkMsg={sparkMsg} loading={msgLoading} onStart={()=>{
            const a=pickAnimal({});setCurrentAnimal(a);setScene("training");
            say(`Get ready to learn about a ${a.name}!`);
          }}/>
        )}

        {scene==="training"&&(
          <SceneTraining
            animal={currentAnimal} brainLevel={brainScore}
            trainedCount={trainingCount} totalNeeded={TRAIN_NEEDED}
            sparkMsg={sparkMsg} sparkLoading={msgLoading}
            feedback={trainFeedback} onAnswer={handleTrainAnswer}
            dragonStage={dragonStage} bounce={bounce} sparkle={sparkle}
          />
        )}

        {scene==="pattern"&&(
          <ScenePatternDetective
            onComplete={(c)=>{addCrystals(c);setStats(s=>({...s,patterns:s.patterns+c}));setScene("clues");say("I'm getting so good at patterns! Now let's try clues!");}}
            onSparkMsg={say}
          />
        )}

        {scene==="clues"&&(
          <SceneClueDetective
            onComplete={(c,ok)=>{
              addCrystals(c);
              if(ok){setStars(s=>Math.min(5,s+1));doBounce();}
              setScene("compare");
              say(ok?"Amazing clue detective work! I learned from the clues!":"Good try! Clues help me learn things!");
            }}
          />
        )}

        {scene==="compare"&&(
          <SceneCompare onComplete={(c)=>{addCrystals(c);setScene("mistakeLab");say("Wow more examples really DO help! Now let's try fixing my mistakes!");}}/>
        )}

        {scene==="mistakeLab"&&(
          <SceneMistakeLab
            onComplete={(fixed)=>{
              addCrystals(fixed);setStars(s=>Math.min(5,s+fixed));
              setStats(s=>({...s,mistakesFix:fixed}));
              setScene("speedTrain");say("Thanks for fixing my mistakes! You make me so much smarter!");
            }}
          />
        )}

        {scene==="speedTrain"&&(
          <SceneSpeedTrain
            onComplete={(s)=>{addCrystals(s);setStars(st=>Math.min(5,st+Math.floor(s/2)));setScene("readyToTest");}}
          />
        )}

        {scene==="readyToTest"&&(
          <div style={{...CARD,textAlign:"center",padding:"32px 20px",animation:"fadeUp .5s ease"}}>
            <DragonAvatar stage={dragonStage} bounce={bounce} sparkle={sparkle}/>
            <div style={{margin:"18px 0"}}><Bubble text={sparkMsg} loading={msgLoading}/></div>
            <div style={{background:"rgba(255,215,0,.1)",borderRadius:14,padding:"10px 14px",marginBottom:18}}>
              <p style={{color:"#FFD700",fontSize:13,fontWeight:800,margin:0}}>
                🎉 Spark trained on {trainingCount} animals!<br/>
                <span style={{fontSize:11,color:"rgba(255,215,0,.7)"}}>Now let's see what Spark learned…</span>
              </p>
            </div>
            {!msgLoading&&<MainBtn onClick={startGuessing}>Let Spark Guess! 🐲</MainBtn>}
          </div>
        )}

        {scene==="guessing"&&guessAnimal&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            <div style={{...CARD,marginBottom:12}}>
              <p style={{color:"#C4B5FD",fontSize:12,fontWeight:800,margin:"0 0 10px"}}>🔮 Spark is guessing…</p>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{flex:1}}><DragonAvatar stage={dragonStage} bounce={bounce} sparkle={sparkle} size="sm"/></div>
                <div style={{flex:2}}><Bubble text={guessLoading?"":dragonGuess} loading={guessLoading}/></div>
              </div>
            </div>
            <div style={{...CARD,textAlign:"center",marginBottom:12}}>
              <p style={{color:"#C4B5FD",fontSize:12,fontWeight:700,margin:"0 0 4px"}}>Show Spark this animal:</p>
              <div style={{fontSize:76,margin:"4px 0 2px"}}>{guessAnimal.emoji}</div>
              <p style={{color:"#fff",fontSize:15,fontWeight:900,margin:0}}>{guessAnimal.name}</p>
            </div>
            {!guessLoading&&dragonGuess&&(
              <>
                <div style={{...CARD,marginBottom:10}}>
                  <p style={{color:"#fff",fontSize:13,fontWeight:800,textAlign:"center",marginBottom:10}}>Was Spark right?</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <MiniBtn onClick={()=>handleGuessJudge(true)} style={{background:"rgba(22,163,74,.2)",border:"2px solid #4ADE80",fontSize:15}}>✅ Correct!</MiniBtn>
                    <MiniBtn onClick={()=>handleGuessJudge(false)} style={{background:"rgba(220,38,38,.2)",border:"2px solid #F87171",fontSize:15}}>❌ Not Quite</MiniBtn>
                  </div>
                </div>
                {sparkMsg&&<Bubble text={sparkMsg} loading={msgLoading}/>}
              </>
            )}
            <div style={{textAlign:"center",marginTop:12}}>
              <button onClick={()=>setScene("finalExam")} style={{
                background:"none",border:"1px solid rgba(255,255,255,.2)",borderRadius:12,
                padding:"8px 20px",color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:700,
                fontFamily:"inherit",cursor:"pointer"}}>
                Skip to Final Exam →
              </button>
            </div>
          </div>
        )}

        {scene==="finalExam"&&(
          <SceneFinalExam
            brainLevel={brainScore} trainedAnimals={trainedList}
            onComplete={(score)=>{
              setStats(s=>({...s,examScore:score,crystals:crystals+score}));
              addCrystals(score);
              setConfetti(true);setTimeout(()=>setConfetti(false),4000);
              setScene("complete");
            }}
          />
        )}

        {scene==="complete"&&(
          <SceneComplete
            stats={{...stats,crystals,trained:trainingCount,examScore:stats.examScore||0}}
            onRestart={restart}
          />
        )}
      </div>
    </div>
  );
}
