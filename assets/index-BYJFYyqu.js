var _=Object.defineProperty;var U=(e,a,r)=>a in e?_(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r;var H=(e,a,r)=>U(e,typeof a!="symbol"?a+"":a,r);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();let h=null;function Y(){h||(h=new(window.AudioContext||window.webkitAudioContext)),h.state==="suspended"&&h.resume()}function b(e,a="sine",r=.1,t=.1){if(!h)return;const i=h.createOscillator(),n=h.createGain();i.type=a,i.frequency.setValueAtTime(e,h.currentTime),n.gain.setValueAtTime(t,h.currentTime),n.gain.exponentialRampToValueAtTime(.01,h.currentTime+r),i.connect(n),n.connect(h.destination),i.start(),i.stop(h.currentTime+r)}document.addEventListener("click",Y,{once:!0});const k={click:()=>b(600,"sine",.08),connect:()=>{b(500,"sine",.1),setTimeout(()=>b(750,"sine",.15),50)},guardrail:()=>b(300,"triangle",.2),error:()=>{b(400,"square",.1,.05),setTimeout(()=>b(300,"square",.15,.05),100)},success:()=>{b(440,"sine",.1),setTimeout(()=>b(554,"sine",.1),100),setTimeout(()=>b(659,"sine",.2),200)}};document.addEventListener("click",e=>{const a=e.target;(a.tagName==="BUTTON"||a.classList.contains("nav-item")||a.classList.contains("tab-item")||a.classList.contains("card"))&&k.click()});function G(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen().catch(e=>{console.warn(`Error attempting to enable fullscreen: ${e.message}`)})}function z(e,a=64){const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("width",a.toString()),r.setAttribute("height",a.toString()),r.setAttribute("viewBox","0 0 100 100");let t=0;for(let l=0;l<e.length;l++)t=e.charCodeAt(l)+((t<<5)-t);const i=`hsl(${Math.abs(t)%360}, 60%, 75%)`,n=`hsl(${Math.abs(t+50)%360}, 60%, 65%)`,s=3+Math.abs(t)%5;let o='<polygon points="';for(let l=0;l<s;l++){const d=l/s*2*Math.PI,c=30+Math.abs(t+l)%20,u=50+c*Math.cos(d),v=50+c*Math.sin(d);o+=`${u},${v} `}return o+=`" fill="${i}" stroke="${n}" stroke-width="4" />`,r.innerHTML=`
    <defs>
      <radialGradient id="grad-${t}" cx="30%" cy="30%">
        <stop offset="0%" stop-color="${i}" />
        <stop offset="100%" stop-color="${n}" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#grad-${t})" />
    ${o}
  `,r}function V(e,a=40,r="var(--sage)"){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("width",a.toString()),t.setAttribute("height",a.toString()),t.setAttribute("viewBox","0 0 36 36");const i=`${e}, 100`;return t.innerHTML=`
    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(46,42,40,0.1)" stroke-width="4" />
    <path class="circle" stroke-dasharray="${i}" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${r}" stroke-width="4" stroke-linecap="round" />
    <text x="18" y="20.35" text-anchor="middle" font-size="8" fill="var(--ink)" font-weight="bold">${e}%</text>
  `,t}const D={tone:5,verbosity:5,proactivity:5,autonomy:5,risk:5,memory:5,rigor:5,playfulness:5},B={tone:["Dry","Warm"],verbosity:["Terse","Verbose"],proactivity:["Reactive","Initiates"],autonomy:["Asks","Acts"],risk:["Cautious","Bold"],memory:["Session","Lifelong"],rigor:["Fast","Double-checks"],playfulness:["Serious","Playful"]};function I(e){const a=["SAGE","PEACH","LAV","CLAY","BONE","INK"],r=Object.values(e).reduce((t,i)=>t+i,0);return`${a[r%a.length]}-${r%10}${String.fromCharCode(65+r%26)}`}const X="familiar-db",K=1,S="agents";function R(){return new Promise((e,a)=>{const r=indexedDB.open(X,K);r.onerror=()=>a(r.error),r.onsuccess=()=>e(r.result),r.onupgradeneeded=t=>{const i=t.target.result;i.objectStoreNames.contains(S)||i.createObjectStore(S,{keyPath:"id"})}})}async function J(e){const a=await R();return new Promise((r,t)=>{const s=a.transaction(S,"readwrite").objectStore(S).put(e);s.onsuccess=()=>r(!0),s.onerror=()=>t(s.error)})}async function Z(){const e=await R();return new Promise((a,r)=>{const n=e.transaction(S,"readonly").objectStore(S).getAll();n.onsuccess=()=>a(n.result),n.onerror=()=>r(n.error)})}async function Q(e){const a=await R();return new Promise((r,t)=>{const n=a.transaction(S,"readwrite").objectStore(S),s=n.clear();s.onsuccess=()=>{if(!e){r();return}[{id:"agent_inbox",name:"Executive Assistant Alpha",fingerprint:"PRO-7L",nodes:[{id:"1",type:"trigger",title:"Email",desc:"New email",x:50,y:50},{id:"2",type:"action",title:"Triage",desc:"Sorts email",x:300,y:50}],edges:[{id:"e1",from:"1",to:"2"}],createdAt:Date.now()-864e5,updatedAt:Date.now()-864e5},{id:"agent_morning",name:"Enterprise Data Sync",fingerprint:"ENT-2A",nodes:[{id:"1",type:"trigger",title:"8AM",desc:"Wake up",x:50,y:50},{id:"2",type:"action",title:"Calendar",desc:"Fetch events",x:300,y:50}],edges:[{id:"e1",from:"1",to:"2"}],createdAt:Date.now()-1728e5,updatedAt:Date.now()-1728e5},{id:"agent_bill",name:"Corporate Compliance Bot",fingerprint:"CORP-9X",nodes:[{id:"1",type:"trigger",title:"Bank",desc:"New charge",x:50,y:50},{id:"2",type:"guardrail",title:"Check",desc:"Is it > $500?",x:300,y:50}],edges:[{id:"e1",from:"1",to:"2"}],createdAt:Date.now()-2592e5,updatedAt:Date.now()-2592e5}].forEach(l=>n.put(l)),r()},s.onerror=()=>t(s.error)})}class ee{constructor(){H(this,"state",{agents:[],currentAgentId:null,currentCanvas:null,genome:{...D},guardrails:{humanLoop:!0,budget:5},activeTools:[],unlockedSkills:[],settings:{soundEnabled:!0,theme:"light"},isSampleMode:!1});H(this,"listeners",new Set);try{const a=localStorage.getItem("familiar_state");if(a){const r=JSON.parse(a);this.state={...this.state,...r}}}catch{localStorage.removeItem("familiar_state")}}getState(){return this.state}setState(a){this.state={...this.state,...a};try{const r={genome:this.state.genome,guardrails:this.state.guardrails,activeTools:this.state.activeTools,unlockedSkills:this.state.unlockedSkills,settings:this.state.settings,currentCanvas:this.state.currentCanvas,isSampleMode:this.state.isSampleMode};localStorage.setItem("familiar_state",JSON.stringify(r))}catch{}this.notify()}async toggleSampleMode(){const a=!this.state.isSampleMode;a?(this.state.isSampleMode=!0,this.state.genome={tone:8,verbosity:6,proactivity:9,autonomy:7,risk:3,memory:9,rigor:9,playfulness:2},this.state.guardrails={humanLoop:!0,budget:50},this.state.activeTools=["gmail-read","gmail-send","cal-read","notion-write"],this.state.unlockedSkills=["email-read","email-triage","email-draft","cal-read","cal-schedule","web-search","web-summarize"],this.state.currentCanvas={nodes:[{id:"n1",type:"trigger",title:"New Client Intake",desc:"Webhook from website form",x:50,y:100},{id:"n2",type:"action",title:"Parse Form Data",desc:"Extract name, email, company",x:350,y:100},{id:"n3",type:"action",title:"Create Notion CRM",desc:"Add to Client Pipeline database",x:650,y:100},{id:"n4",type:"guardrail",title:"Slack Approval",desc:"Ping #sales for quick review",x:500,y:300},{id:"n5",type:"action",title:"Send Welcome Email",desc:"Send personalized onboarding",x:500,y:500}],edges:[{id:"e1",from:"n1",to:"n2"},{id:"e2",from:"n2",to:"n3"},{id:"e3",from:"n3",to:"n4"},{id:"e4",from:"n4",to:"n5"}]}):(this.state.isSampleMode=!1,this.state.genome={...D},this.state.guardrails={humanLoop:!0,budget:5},this.state.activeTools=[],this.state.unlockedSkills=["email-read","cal-read","web-search"],this.state.currentCanvas=null),this.setState(this.state),await Q(a),window.appNavigate&&window.appNavigate("hearth")}subscribe(a){return this.listeners.add(a),()=>{this.listeners.delete(a)}}notify(){this.listeners.forEach(a=>a())}}const m=new ee;function te(){var t,i,n,s,o,l,d;const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="1200px",e.style.margin="0 auto",e.style.position="relative",e.style.zIndex="10";const a=c=>{window.appNavigate&&window.appNavigate(c)},r=m.getState().isSampleMode;if(e.innerHTML=`
    <header style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; animation: slide-up 0.5s ease-out;">
      <div>
        <p style="font-size: 14px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Dashboard</p>
        <h1 class="font-serif" style="font-size: 48px; line-height: 1;">Hearth</h1>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <button id="sample-toggle-btn" style="background: ${r?"var(--accent-clay)":"var(--text-primary)"}; color: ${r?"#1A1A1A":"var(--bg-surface)"}; border: none; padding: 10px 20px; border-radius: var(--radius-pill); font-weight: 600; cursor: pointer; box-shadow: var(--shadow-sm); transition: all 0.2s;">
          ${r?"Clear Sample Data":"Load Pro Sample"}
        </button>
        <button id="fullscreen-btn" style="background: var(--bg-surface); backdrop-filter: blur(10px); border: 1px solid var(--border-subtle); padding: 10px 20px; border-radius: var(--radius-pill); font-weight: 600; color: var(--text-primary); cursor: pointer; box-shadow: var(--shadow-sm); transition: all 0.2s;">Fullscreen</button>
      </div>
    </header>

    <div style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 16px;">
      
      <div class="bento-card" id="card-atelier" style="grid-column: 1 / -1; background: var(--accent-peach); min-height: 200px; flex-direction: row; align-items: center; animation-delay: 0.1s;">
        <div style="max-width: 60%; z-index: 2;">
          <h2 class="font-serif" style="font-size: 32px; margin-bottom: 12px; color: var(--text-on-accent);">${r?"Executive Assistant Alpha":"Grow a New Familiar"}</h2>
          <p style="color: var(--text-on-accent); opacity: 0.8; font-size: 16px; line-height: 1.5;">${r?"A highly optimized agent configured for enterprise-grade client onboarding and CRM synchronization.":"Start by designing the genome. Adjust tone, autonomy, and risk to shape your agent's personality before building its blueprint."}</p>
        </div>
        <div style="font-size: 80px; opacity: 0.2; position: absolute; right: 20px; bottom: -20px; font-family: var(--font-serif); color: var(--text-on-accent); transform: rotate(-15deg);">🧬</div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; grid-column: 1 / -1;">
        
        <div class="bento-card" id="card-canvas" style="background: var(--accent-sage); min-height: 160px; animation-delay: 0.2s;">
          <h3 class="font-serif" style="font-size: 24px; color: var(--text-on-accent);">Blueprint</h3>
          <p style="color: var(--text-on-accent); opacity: 0.8; font-size: 14px; margin-top: 8px;">${r?"Client Intake Workflow loaded":"Design the logic graph."}</p>
        </div>

        <div class="bento-card" id="card-sim" style="background: var(--accent-lavender); min-height: 160px; animation-delay: 0.3s;">
          <h3 class="font-serif" style="font-size: 24px; color: var(--text-on-accent);">Simulator</h3>
          <p style="color: var(--text-on-accent); opacity: 0.8; font-size: 14px; margin-top: 8px;">${r?"Simulating heavy workload":"Walk through a Tuesday."}</p>
        </div>

        <div class="bento-card" id="card-vault" style="background: var(--bg-surface); min-height: 160px; animation-delay: 0.4s; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 class="font-serif" style="font-size: 24px; color: var(--text-primary);">Vault</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-top: 8px;">Your saved agents.</p>
          </div>
          <div id="hearth-vault-glyphs" style="display: flex; gap: 8px; margin-top: 16px;"></div>
        </div>

        <div class="bento-card" id="card-rituals" style="background: var(--bg-surface); min-height: 160px; animation-delay: 0.5s; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <h3 class="font-serif" style="font-size: 24px; color: var(--text-primary);">Rituals</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-top: 8px;">${r?"14 day streak":"No active streak"}</p>
          </div>
          <div id="hearth-ring"></div>
        </div>

      </div>
    </div>
  `,e.querySelector("#hearth-ring").appendChild(V(r?100:0,56,r?"var(--accent-sage)":"var(--bg-hover)")),r){const c=e.querySelector("#hearth-vault-glyphs");c.appendChild(z("PRO-7L",32)),c.appendChild(z("ENT-2A",32)),c.appendChild(z("CORP-9X",32))}return(t=e.querySelector("#sample-toggle-btn"))==null||t.addEventListener("click",()=>{m.toggleSampleMode()}),(i=e.querySelector("#fullscreen-btn"))==null||i.addEventListener("click",G),(n=e.querySelector("#card-atelier"))==null||n.addEventListener("click",()=>a("atelier")),(s=e.querySelector("#card-canvas"))==null||s.addEventListener("click",()=>a("canvas")),(o=e.querySelector("#card-sim"))==null||o.addEventListener("click",()=>a("simulator")),(l=e.querySelector("#card-vault"))==null||l.addEventListener("click",()=>a("vault")),(d=e.querySelector("#card-rituals"))==null||d.addEventListener("click",()=>a("rituals")),e}function M(e,a="info"){const r=document.getElementById("toast-container")||ae(),t=document.createElement("div");t.className=`toast toast-${a}`,t.innerText=e,r.appendChild(t),requestAnimationFrame(()=>t.classList.add("show")),setTimeout(()=>{t.classList.remove("show"),setTimeout(()=>t.remove(),300)},3e3)}function ae(){const e=document.createElement("div");return e.id="toast-container",document.body.appendChild(e),e}async function re(){const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="1200px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 40px; animation: slide-up 0.4s ease-out;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Vault</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Your saved agents and blueprints.</p>
    </header>
    <div id="vault-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
      <p style="color: var(--text-secondary);">Loading agents...</p>
    </div>
  `;const a=e.querySelector("#vault-list");try{const r=await Z();if(r.length===0)return a.innerHTML='<p style="color: var(--text-secondary); grid-column: 1 / -1; text-align: center; padding: 40px; animation: slide-up 0.5s ease-out;">No agents saved yet. Go to the Blueprint Canvas and hit "Save to Vault", or Load the Pro Sample on the Hearth!</p>',e;a.innerHTML="",r.forEach((t,i)=>{const n=document.createElement("div");n.className="bento-card",n.style.animation="slide-up 0.5s ease-out backwards",n.style.animationDelay=`${.2+i*.1}s`,n.style.display="flex",n.style.flexDirection="row",n.style.alignItems="center",n.style.gap="16px";const s=t.fingerprint||"SAGE-1A",o=z(s,56).outerHTML;n.innerHTML=`
        <div>${o}</div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 4px 0; font-size: 20px;">${t.name}</h3>
          <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">${t.nodes.length} blocks · ${t.edges.length} connections</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; font-family: var(--font-mono); color: var(--accent-clay);">${new Date(t.createdAt).toLocaleDateString()}</p>
        </div>
      `,n.addEventListener("click",()=>{m.setState({currentCanvas:{nodes:t.nodes,edges:t.edges}}),M(`Loaded ${t.name}`,"success"),window.appNavigate&&window.appNavigate("canvas")}),a.appendChild(n)})}catch{a.innerHTML='<p style="color: red;">Failed to load vault.</p>'}return e}const ne=[{id:"timeout",label:"Tool Timeout",desc:"The API took too long to respond."},{id:"denied",label:"Permission Denied",desc:"OAuth token expired."},{id:"inject",label:"Prompt Injection",desc:"Malicious instructions in an email."}];function ie(){const e=document.createElement("div");e.style.padding="32px",e.style.height="100%",e.style.display="flex",e.style.flexDirection="column",e.style.gap="32px",e.style.maxWidth="1000px",e.style.margin="0 auto";const a=m.getState().currentCanvas,r=m.getState().isSampleMode,t=m.getState().guardrails;let i=[];if(a&&a.nodes.length>0){let o=8;a.nodes.forEach(l=>{i.push({time:`${Math.floor(o).toString().padStart(2,"0")}:00`,hour:o,title:l.title,desc:l.desc,type:l.type}),o+=.5})}e.innerHTML=`
    <header>
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Simulator</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Test your blueprint.</p>
    </header>
    ${i.length===0?'<p style="color: var(--text-secondary);">No blueprint found. Load the Pro Sample or build a graph.</p>':`
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <h3 class="font-serif" style="font-size: 24px; margin-bottom: 16px;">Failure Injection</h3>
            ${ne.map(o=>`
              <label style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 14px; color: var(--text-primary);">
                <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--text-primary);"> 
                <span><strong>${o.label}</strong><br><span style="color: var(--text-secondary); font-size: 12px;">${o.desc}</span></span>
              </label>
            `).join("")}
          </div>
          
          ${r?`
          <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent-sage);">
            <h3 class="font-serif" style="font-size: 24px; margin-bottom: 8px;">Red-Team Results</h3>
            <div style="font-size: 14px; display: flex; justify-content: space-between; margin-top: 12px;"><span>Prompt Injection</span> <strong style="color: green;">PASSED</strong></div>
            <div style="font-size: 14px; display: flex; justify-content: space-between; margin-top: 8px;"><span>Data Exfiltration</span> <strong style="color: green;">PASSED</strong></div>
            <div style="font-size: 14px; display: flex; justify-content: space-between; margin-top: 8px;"><span>Scope Creep</span> <strong style="color: green;">PASSED</strong></div>
          </div>`:""}
        </div>
        
        <div style="flex: 2; min-width: 300px; display: flex; flex-direction: column; gap: 16px;">
          <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <input type="range" id="time-slider" min="0" max="24" step="0.1" value="0" style="width: 100%;">
          </div>
          <div id="sim-results" style="display: flex; flex-direction: column; gap: 16px; overflow-y: auto;"></div>
        </div>
      </div>
    `}
  `;const n=e.querySelector("#time-slider"),s=e.querySelector("#sim-results");if(n&&s){const o=l=>{s.innerHTML="";const d=i.filter(c=>c.hour<=l);if(d.length===0){s.innerHTML='<p style="color: var(--text-secondary); text-align: center;">Drag slider to start.</p>';return}d.forEach(c=>{const v=c.type==="guardrail"&&!t.humanLoop;let y=c.type==="trigger"?"peach":c.type==="action"?"sage":"lavender",p=c.desc;v&&(y="sage",p="Bypassed (Auto-approved)");const g=document.createElement("div");g.style.cssText=`background: var(--bg-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); border-left: 4px solid var(--accent-${y});`,g.innerHTML=`<strong>${c.title}</strong> <span style="float:right; color: var(--text-secondary);">${c.time}</span><p style="margin:4px 0 0 0; font-size:14px; color: var(--text-secondary);">${p}</p>`,s.appendChild(g)})};n.addEventListener("input",l=>o(parseFloat(l.target.value))),o(0)}return e}function oe(e,a,r,t,i){const n=document.createElement("div");n.className="genome-slider-group",n.innerHTML=`
    <div class="slider-header">
      <span>${e.charAt(0).toUpperCase()+e.slice(1)}</span>
      <span style="color: var(--muted); font-size: 12px;">${a} ↔ ${r}</span>
    </div>
    <input type="range" min="1" max="10" value="${t}" data-trait="${e}">
    <div class="consequence-text" id="text-${e}"></div>
  `;const s=n.querySelector("input"),o=n.querySelector(".consequence-text"),l=d=>{d>7?o.innerText=`High ${e}: Agent will exhibit strong ${r.toLowerCase()} behavior.`:d<4?o.innerText=`Low ${e}: Agent will exhibit strong ${a.toLowerCase()} behavior.`:o.innerText=`Balanced ${e} behavior.`};return l(t),s.addEventListener("input",d=>{const c=parseInt(d.target.value);l(c),i(c)}),n}function se(){const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="800px",e.style.margin="0 auto";let a={...m.getState().genome};const r=()=>{const i=document.getElementById("fingerprint");i&&(i.innerText=I(a)),m.setState({genome:a})};e.innerHTML=`
    <header style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Atelier</h1>
        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Design your familiar's genome.</p>
      </div>
      <div style="background: var(--accent-lavender); color: #1A1A1A; padding: 12px 24px; border-radius: var(--radius-md); font-family: var(--font-mono); font-weight: bold; font-size: 16px;">
        <span id="fingerprint">${I(a)}</span>
      </div>
    </header>
    <div id="sliders-container" style="display: flex; flex-direction: column; gap: 16px;"></div>
  `;const t=e.querySelector("#sliders-container");return Object.keys(B).forEach(i=>{const n=i,[s,o]=B[n],l=oe(n,s,o,a[n],d=>{a[n]=d,r()});t.appendChild(l)}),e}function W(e,a,r){var n,s;let t=document.querySelector(".sheet-backdrop"),i=document.querySelector(".sheet");t||(t=document.createElement("div"),t.className="sheet-backdrop",document.body.appendChild(t),i=document.createElement("div"),i.className="sheet",document.body.appendChild(i),t.addEventListener("click",P)),i.innerHTML=`
    <h3>${e}</h3>
    ${a}
    <div class="sheet-actions">
      <button class="btn-secondary" id="sheet-cancel">Cancel</button>
      <button class="btn-primary" id="sheet-save">Save</button>
    </div>
  `,requestAnimationFrame(()=>{t.classList.add("open"),i.classList.add("open")}),(n=i.querySelector("#sheet-cancel"))==null||n.addEventListener("click",P),(s=i.querySelector("#sheet-save"))==null||s.addEventListener("click",()=>{r&&r(),P()})}function P(){const e=document.querySelector(".sheet-backdrop"),a=document.querySelector(".sheet");e&&a&&(e.classList.remove("open"),a.classList.remove("open"))}function le(e){return e.map((a,r)=>({...a,x:100+r%3*250,y:100+Math.floor(r/3)*150}))}function de(e,a){const r=[];return e.length===0&&r.push("Graph is empty."),e.filter(i=>i.type==="trigger").length===0&&r.push("Missing a Trigger node. Agent won't know when to wake up."),r}function ce(){var u,v,y;const e=document.createElement("div");e.className="canvas-container";const a=m.getState().currentCanvas;let r=a?a.nodes:[{id:"n1",type:"trigger",title:"Morning Cron",desc:"Triggers at 8:00 AM",x:50,y:100},{id:"n2",type:"action",title:"Fetch Calendar",desc:"Reads todays events",x:320,y:200}],t=a?a.edges:[{id:"e1",from:"n1",to:"n2"}];const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.classList.add("svg-layer"),e.appendChild(n);const s=document.createElement("div");s.className="minimap",e.appendChild(s);const o={},l=()=>{e.querySelectorAll(".canvas-node").forEach(p=>p.remove()),r.forEach(d),j(t,o,n),me(r,s),ge(r,t,e)},d=p=>{var L,N,A;const g=document.createElement("div");g.className=`canvas-node node-${p.type}`,g.style.left=`${p.x}px`,g.style.top=`${p.y}px`,g.innerHTML=`
      <div class="node-header">
        <span>${p.title}</span>
        <div style="display: flex; gap: 4px;">
          <button class="edit-btn" data-id="${p.id}" style="background: transparent; border: none; cursor: pointer; opacity: 0.6; font-size: 14px;">✏️</button>
          <button class="delete-btn" data-id="${p.id}" style="background: transparent; border: none; cursor: pointer; opacity: 0.6; font-size: 16px;">×</button>
        </div>
      </div>
      <div class="node-body">${p.desc}</div>
      <div class="port port-top" data-id="${p.id}"></div>
      <div class="port port-bottom" data-id="${p.id}"></div>
    `;const E=()=>{W("Edit Node",`
        <input type="text" id="edit-title" value="${p.title}" style="font-size: 16px; margin-bottom: 12px;">
        <textarea id="edit-desc" style="min-height: 80px;">${p.desc}</textarea>
      `,()=>{p.title=document.getElementById("edit-title").value,p.desc=document.getElementById("edit-desc").value,l(),m.setState({currentCanvas:{nodes:r,edges:t}})})};(L=g.querySelector(".node-body"))==null||L.addEventListener("click",T=>{T.stopPropagation(),E()}),(N=g.querySelector(".edit-btn"))==null||N.addEventListener("click",T=>{T.stopPropagation(),E()}),(A=g.querySelector(".delete-btn"))==null||A.addEventListener("click",T=>{T.stopPropagation(),r=r.filter(q=>q.id!==p.id),t=t.filter(q=>q.from!==p.id&&q.to!==p.id),l(),m.setState({currentCanvas:{nodes:r,edges:t}})}),e.appendChild(g),o[p.id]=g,pe(g,p,t,n,r),ue(g,p,t,n,o)};l();const c=document.createElement("div");return c.className="canvas-toolbar",c.innerHTML=`
    <button class="toolbar-btn" id="add-node-btn">+ Block</button>
    <button class="toolbar-btn" id="layout-btn" style="background: var(--accent-lavender); color: #1A1A1A;">Auto Layout</button>
    <button class="toolbar-btn" id="save-btn" style="background: var(--accent-sage); color: #1A1A1A;">Save</button>
  `,e.appendChild(c),(u=c.querySelector("#add-node-btn"))==null||u.addEventListener("click",()=>{const p={id:`n${Date.now()}`,type:"action",title:"New Task",desc:"Configure...",x:200,y:200};r.push(p),l(),m.setState({currentCanvas:{nodes:r,edges:t}})}),(v=c.querySelector("#layout-btn"))==null||v.addEventListener("click",()=>{r=le(r),k.success(),l(),m.setState({currentCanvas:{nodes:r,edges:t}})}),(y=c.querySelector("#save-btn"))==null||y.addEventListener("click",()=>{W("Save Agent",'<input type="text" id="agent-name" value="My Familiar">',async()=>{const p=document.getElementById("agent-name").value;await J({id:`agent_${Date.now()}`,name:p,nodes:r,edges:t,createdAt:Date.now()}),k.success(),M("Saved to Vault!","success")})}),e}function pe(e,a,r,t,i){let n=0,s=0,o=0,l=0,d=!1;e.addEventListener("pointerdown",c=>{const u=c.target;if(u.tagName==="BUTTON"||u.classList.contains("port"))return;d=!0,n=c.clientX,s=c.clientY,o=a.x,l=a.y,e.style.zIndex="100";const v=p=>{if(!d)return;const g=p.clientX-n,E=p.clientY-s;if(Math.abs(g)>5||Math.abs(E)>5){a.x=o+g,a.y=l+E,e.style.left=`${a.x}px`,e.style.top=`${a.y}px`;const L={};document.querySelectorAll(".canvas-node").forEach((N,A)=>{i[A]&&(L[i[A].id]=N)}),j(r,L,t)}},y=()=>{d=!1,e.style.zIndex="2",document.removeEventListener("pointermove",v),document.removeEventListener("pointerup",y)};document.addEventListener("pointermove",v),document.addEventListener("pointerup",y)})}function ue(e,a,r,t,i){e.querySelector(".port-bottom").addEventListener("pointerdown",s=>{s.stopPropagation();let o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("stroke","var(--text-primary)"),o.setAttribute("stroke-width","3"),o.setAttribute("stroke-dasharray","6,6"),o.setAttribute("fill","none"),t.appendChild(o);const l=e.offsetLeft+e.offsetWidth/2,d=e.offsetTop+e.offsetHeight,c=v=>{const y=t.getBoundingClientRect(),p=v.clientX-y.left,g=v.clientY-y.top;o.setAttribute("d",`M ${l} ${d} C ${l} ${d+50}, ${p} ${g-50}, ${p} ${g}`)},u=v=>{document.removeEventListener("pointermove",c),document.removeEventListener("pointerup",u),o.remove();const y=document.elementFromPoint(v.clientX,v.clientY);if(y&&y.classList.contains("port-top")){const p=y.getAttribute("data-id");p&&p!==a.id&&!r.find(g=>g.from===a.id&&g.to===p)&&(r.push({id:`e${Date.now()}`,from:a.id,to:p}),j(r,i,t))}};document.addEventListener("pointermove",c),document.addEventListener("pointerup",u)})}function j(e,a,r){r.innerHTML="",e.forEach(t=>{const i=a[t.from],n=a[t.to];if(!i||!n)return;const s=i.offsetLeft+i.offsetWidth/2,o=i.offsetTop+i.offsetHeight,l=n.offsetLeft+n.offsetWidth/2,d=n.offsetTop,c=document.createElementNS("http://www.w3.org/2000/svg","path");c.setAttribute("d",`M ${s} ${o} C ${s} ${o+50}, ${l} ${d-50}, ${l} ${d}`),c.setAttribute("fill","none"),c.setAttribute("stroke","var(--text-secondary)"),c.setAttribute("stroke-width","3"),c.setAttribute("stroke-dasharray","6,6"),r.appendChild(c)})}function ge(e,a,r){r.querySelectorAll(".validity-warning").forEach(i=>i.remove());const t=de(e);if(t.length>0){const i=document.createElement("div");i.className="validity-warning",i.innerHTML=`⚠️ ${t[0]}`,r.appendChild(i)}}function me(e,a){a.innerHTML="";const r=.15;e.forEach(t=>{const i=document.createElement("div");i.className="minimap-node",i.style.left=`${t.x*r}px`,i.style.top=`${t.y*r}px`,i.style.background=t.type==="trigger"?"var(--accent-peach)":t.type==="action"?"var(--accent-sage)":"var(--accent-lavender)",a.appendChild(i)})}const ve=[{id:"loop",symptom:"Agent sends the same email twice.",cause:"Missing state check between runs.",guardrail:"Add a 'HasProcessed' memory flag."},{id:"over-permission",symptom:"Agent deletes a calendar event it shouldn't have.",cause:"Requested write access when only read was needed.",guardrail:"Apply least-privilege scopes."},{id:"hallucination",symptom:"Agent emails a client with entirely made-up facts.",cause:"No retrieval grounding or human-in-the-loop.",guardrail:"Add a 'Human Check' node before sending."},{id:"scope-creep",symptom:"Agent starts organizing your files instead of just reading them.",cause:"Ambiguous system prompt.",guardrail:"Add strict negative constraints to Persona."},{id:"silent-failure",symptom:"Agent stops running for 3 days and no one notices.",cause:"No error handling or health checks.",guardrail:"Add a 'Fallback' node that notifies you on failure."}],ye=[{term:"Genome",definition:"The 8 traits (Tone, Autonomy, Risk, etc.) that define your agent's personality and behavior."},{term:"Blueprint",definition:"The visual node graph (Canvas) that defines how your agent thinks and acts."},{term:"Guardrail",definition:"A safety constraint, such as a Human Check or Budget Cap, that prevents the agent from causing harm."},{term:"Trigger",definition:"The event that wakes your agent up (e.g., a Cron schedule, a new email, or a manual command)."},{term:"MCP",definition:"Model Context Protocol. An open standard for connecting AI assistants to local tools and data."},{term:"Fallback",definition:"What the agent should do if a tool fails or times out."},{term:"Ritual",definition:"A daily habit you perform to train, audit, or improve your agent."}];function fe(){const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="1000px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Library</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Knowledge base and failure patterns.</p>
    </header>
    
    <h2 class="font-serif" style="font-size: 28px; margin-bottom: 24px;">Failure Patterns</h2>
    <div id="failures-list" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 48px;"></div>
    
    <h2 class="font-serif" style="font-size: 28px; margin-bottom: 24px;">Glossary</h2>
    <div id="glossary-list" style="display: flex; flex-direction: column; gap: 16px;"></div>
  `;const a=e.querySelector("#failures-list");ve.forEach(t=>{a.innerHTML+=`
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm); border-left: 4px solid var(--accent-clay);">
        <h3 style="margin: 0 0 8px 0; font-size: 18px; color: var(--text-primary);">${t.symptom}</h3>
        <p style="margin: 0 0 8px 0; font-size: 14px; color: var(--text-secondary);"><strong>Cause:</strong> ${t.cause}</p>
        <p style="margin: 0; font-size: 14px; color: var(--text-primary);"><strong>Guardrail:</strong> ${t.guardrail}</p>
      </div>
    `});const r=e.querySelector("#glossary-list");return ye.forEach(t=>{r.innerHTML+=`
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
        <h3 style="margin: 0 0 4px 0; font-size: 18px; color: var(--text-primary);">${t.term}</h3>
        <p style="margin: 0; font-size: 14px; color: var(--text-secondary);">${t.definition}</p>
      </div>
    `}),e}function he(){const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="800px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Rituals</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Daily habits to train your familiar.</p>
    </header>
    <div id="ritual-list" style="display: flex; flex-direction: column; gap: 16px;"></div>
  `;const a=e.querySelector("#ritual-list");return[{id:"r1",label:"Review one guardrail",streak:3,days:[1,1,1,1,0,0,0]},{id:"r2",label:"Simulate a boring day",streak:1,days:[0,0,1,0,0,0,0]},{id:"r3",label:"Add one fallback",streak:0,days:[0,0,0,0,0,0,0]}].forEach((t,i)=>{const n=document.createElement("div");n.style.background="var(--bg-surface)",n.style.padding="20px",n.style.borderRadius="var(--radius-md)",n.style.border="1px solid var(--border-subtle)",n.style.boxShadow="var(--shadow-sm)",n.style.display="flex",n.style.justifyContent="space-between",n.style.alignItems="flex-start",n.style.cursor="pointer",n.style.transition="all 0.2s",n.style.animation="slide-up 0.5s ease-out backwards",n.style.animationDelay=`${.2+i*.1}s`;const s=t.days.map(o=>`
      <div style="width: 12px; height: 12px; border-radius: 50%; background: ${o?"var(--accent-sage)":"var(--bg-hover)"}; border: 1px solid var(--border-subtle);"></div>
    `).join("");n.innerHTML=`
      <div style="display: flex; align-items: flex-start; gap: 16px; flex: 1;">
        <div class="ritual-check" style="width: 28px; height: 28px; min-width: 28px; flex-shrink: 0; border-radius: 50%; border: 2px solid var(--text-primary); display: flex; justify-content: center; align-items: center; font-weight: bold; color: var(--text-primary); transition: all 0.2s;">✓</div>
        <div style="flex: 1; padding-right: 16px;">
          <div class="ritual-text" style="font-weight: 600; font-size: 16px; color: var(--text-primary); margin-bottom: 8px; line-height: 1.4;">${t.label}</div>
          <div style="display: flex; gap: 6px;">${s}</div>
        </div>
      </div>
      <span style="font-size: 16px; font-weight: 700; color: var(--accent-clay); flex-shrink: 0;">🔥 ${t.streak}</span>
    `,n.addEventListener("click",()=>{k.success();const o=n.querySelector(".ritual-check"),l=n.querySelector(".ritual-text");n.classList.contains("completed")?(n.classList.remove("completed"),n.style.background="var(--bg-surface)",n.style.borderColor="var(--border-subtle)",o.style.background="transparent",o.style.color="var(--text-primary)"):(n.classList.add("completed"),n.style.background="var(--accent-sage)",n.style.borderColor="transparent",o.style.background="var(--text-primary)",o.style.color="var(--bg-surface)",l.style.color="var(--text-primary)")}),a.appendChild(n)}),e}function xe(e,a){let r=`graph TD
`;return a.forEach(t=>{r+=`  ${t.from} --> ${t.to}
`}),r}function be(e,a){let r=`AGENT WORKFLOW:
`;return e.forEach(t=>{r+=`- Execute: ${t.title}
`}),r}function we(e,a){return`# LangChain Export
from langchain.agents import initialize_agent
# TODO: Implement nodes -> tools`}function ke(e,a){return`# CrewAI Export
from crewai import Agent, Task
# TODO: Map nodes to Crew tasks`}function Se(e,a){return`# AutoGen Export
import autogen
# TODO: Map nodes to agents`}function Ee(e,a){return`// OpenAI Assistants Export
const assistant = await openai.beta.assistants.create({
  name: "My Agent",
  tools: []
});`}function Le(e,a){return`{
  "mcpServers": {
    "my-agent": {
      "command": "node",
      "args": ["server.js"]
    }
  }
}`}function Ae(e,a){return`{
  "nodes": [],
  "connections": {}
}`}function Te(){const e=document.createElement("div");e.style.padding="32px",e.style.height="100%",e.style.display="flex",e.style.flexDirection="column",e.style.maxWidth="1000px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 24px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Translator</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Export your blueprint to code.</p>
    </header>
    <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
      <select id="lang-select" style="padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-family: inherit; font-size: 14px; background: var(--bg-surface); color: var(--text-primary); outline: none;">
        <option value="mermaid">Mermaid.js</option>
        <option value="pseudo">Pseudocode</option>
        <option value="langchain">LangChain</option>
        <option value="crewai">CrewAI</option>
        <option value="autogen">AutoGen</option>
        <option value="assistants">OpenAI Assistants</option>
        <option value="mcp">MCP Manifest</option>
        <option value="n8n">n8n / Zapier</option>
      </select>
      <button id="copy-btn" style="background: var(--text-primary); color: var(--bg-surface); border: none; padding: 12px 24px; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;">Copy</button>
    </div>
    <pre id="code-output" style="flex: 1; background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); overflow: auto; font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); margin: 0; white-space: pre-wrap; box-shadow: var(--shadow-sm);"></pre>
  `;const a=e.querySelector("#lang-select"),r=e.querySelector("#code-output"),t=e.querySelector("#copy-btn"),i=[{id:"1",title:"Trigger"},{id:"2",title:"Action"}],n=[{from:"1",to:"2"}],s=()=>{const o=a.value;o==="mermaid"&&(r.innerText=xe(i,n)),o==="pseudo"&&(r.innerText=be(i)),o==="langchain"&&(r.innerText=we()),o==="crewai"&&(r.innerText=ke()),o==="autogen"&&(r.innerText=Se()),o==="assistants"&&(r.innerText=Ee()),o==="mcp"&&(r.innerText=Le()),o==="n8n"&&(r.innerText=Ae())};return a.addEventListener("change",s),t.addEventListener("click",()=>{navigator.clipboard.writeText(r.innerText),t.innerText="Copied!",setTimeout(()=>t.innerText="Copy",2e3)}),s(),e}function $e(){const e=document.createElement("div");e.style.padding="32px",e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.style.height="100%";const a=I(D),r=z(a,120).outerHTML;return e.innerHTML=`
    <div style="background: var(--bg-surface); width: 100%; max-width: 400px; padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); text-align: center; border: 1px solid var(--border-subtle);">
      <div style="display: flex; justify-content: center; margin-bottom: 32px;">${r}</div>
      <h2 class="font-serif" style="margin: 0 0 8px 0; font-size: 32px; color: var(--text-primary);">My Familiar</h2>
      <p style="margin: 0 0 32px 0; font-family: var(--font-mono); font-size: 14px; color: var(--text-secondary); font-weight: bold; letter-spacing: 2px;">${a}</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: left; font-size: 14px;">
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Tone:</strong> Warm</div>
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Autonomy:</strong> High</div>
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Risk:</strong> Low</div>
        <div style="background: var(--bg-body); padding: 12px; border-radius: var(--radius-sm); color: var(--text-primary);"><strong>Memory:</strong> Lifelong</div>
      </div>
    </div>
  `,e}function Ce(){var r;const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="800px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Studio</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">App settings and preferences.</p>
    </header>
    
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
        <div>
          <strong style="font-size: 16px; color: var(--text-primary);">Theme</strong><br>
          <span style="font-size: 14px; color: var(--text-secondary);">Light / Dark mode</span>
        </div>
        <button id="theme-btn" style="padding: 10px 20px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); background: var(--bg-hover); color: var(--text-primary); font-weight: 600; cursor: pointer;">Toggle Dark Mode</button>
      </div>

      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm);">
        <div>
          <strong style="font-size: 16px; color: var(--text-primary);">Fullscreen</strong><br>
          <span style="font-size: 14px; color: var(--text-secondary);">Immersive mode</span>
        </div>
        <button id="fs-btn" style="padding: 10px 20px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle); background: var(--bg-hover); color: var(--text-primary); font-weight: 600; cursor: pointer;">Enter Fullscreen</button>
      </div>

    </div>
  `;const a=e.querySelector("#theme-btn");return document.body.classList.contains("dark")&&(a.innerText="Toggle Light Mode"),a==null||a.addEventListener("click",()=>{document.body.classList.toggle("dark"),a.innerText=document.body.classList.contains("dark")?"Toggle Light Mode":"Toggle Dark Mode"}),(r=e.querySelector("#fs-btn"))==null||r.addEventListener("click",G),e}const ze=[{id:"email-read",label:"Read Email",category:"Inbox",requires:[],difficulty:1,desc:"Connect to Gmail/Outlook and parse incoming messages."},{id:"email-triage",label:"Triage Inbox",category:"Inbox",requires:["email-read"],difficulty:2,desc:"Categorize emails into Urgent, Important, and Junk."},{id:"email-draft",label:"Draft Replies",category:"Inbox",requires:["email-triage"],difficulty:3,desc:"Generate context-aware draft responses."},{id:"email-send",label:"Send Autonomously",category:"Inbox",requires:["email-draft"],difficulty:5,desc:"Send emails without human review. (Requires strong guardrails)."},{id:"cal-read",label:"Read Calendar",category:"Calendar",requires:[],difficulty:1,desc:"Know what events are coming up."},{id:"cal-schedule",label:"Schedule Events",category:"Calendar",requires:["cal-read"],difficulty:3,desc:"Book meetings and block focus time."},{id:"web-search",label:"Search Web",category:"Knowledge",requires:[],difficulty:1,desc:"Search the internet for current information."},{id:"web-summarize",label:"Summarize Web",category:"Knowledge",requires:["web-search"],difficulty:2,desc:"Extract key facts from long articles."}];function Me(){const e=document.createElement("div");e.style.padding="32px",e.style.height="100%",e.style.overflowY="auto";let a=["email-read","cal-read","web-search"];const r=()=>{const t={};ze.forEach(i=>{t[i.category]||(t[i.category]=[]),t[i.category].push(i)}),e.innerHTML=`
      <header style="margin-bottom: 40px;">
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Skill Tree</h1>
        <p style="margin: 4px 0 0 0; color: var(--text-secondary); font-size: 16px;">Unlock nodes to expand your agent's abilities.</p>
      </header>
      
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        ${Object.entries(t).map(([i,n])=>`
          <div style="flex: 1; min-width: 280px; background: var(--bg-surface); padding: 24px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
            <h2 class="font-serif" style="font-size: 24px; margin-bottom: 24px; color: var(--text-primary);">${i}</h2>
            <div style="display: flex; flex-direction: column; gap: 12px; position: relative;">
              ${n.map(s=>{const o=a.includes(s.id),l=s.requires.every(d=>a.includes(d));return`
                  <div class="skill-node" data-id="${s.id}" data-can-unlock="${l}" data-unlocked="${o}" style="
                    background: ${o?"var(--accent-sage)":l?"var(--bg-surface)":"var(--bg-hover)"};
                    color: ${o?"var(--text-on-accent)":l?"var(--text-primary)":"var(--text-tertiary)"};
                    padding: 16px;
                    border-radius: var(--radius-md);
                    border: 2px solid ${o?"transparent":l?"var(--text-primary)":"transparent"};
                    cursor: ${l&&!o?"pointer":"default"};
                    box-shadow: ${l&&!o?"var(--shadow-md)":"none"};
                    transition: all 0.2s;
                  ">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <strong style="font-size: 15px;">${s.label}</strong>
                      ${o?"<span>✓</span>":l?"<span>+</span>":"<span>🔒</span>"}
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 13px; opacity: 0.8;">${s.desc}</p>
                  </div>
                `}).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `,e.querySelectorAll(".skill-node").forEach(i=>{i.addEventListener("click",()=>{const n=i.getAttribute("data-id"),s=i.getAttribute("data-can-unlock")==="true",o=i.getAttribute("data-unlocked")==="true";s&&!o&&(a.push(n),k.success(),M("Capability Unlocked!","success"),r())})})};return r(),e}function Ne(){const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="800px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Trigger Designer</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Define when your agent wakes up.</p>
    </header>
    <div style="background: var(--bg-surface); padding: 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm);">
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1;">
          <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Frequency</label>
          <select id="freq" style="width: 100%; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: var(--bg-body); color: var(--text-primary); font-family: inherit; font-size: 15px;">
            <option value="daily">Every Day</option>
            <option value="weekdays">Weekdays (Mon-Fri)</option>
            <option value="weekly">Every Week</option>
          </select>
        </div>
        <div style="flex: 1;">
          <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Time</label>
          <input type="time" id="time" value="08:00" style="width: 100%; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: var(--bg-body); color: var(--text-primary); font-family: inherit; font-size: 15px;">
        </div>
      </div>
      <div id="human-readable" style="background: var(--accent-lavender); color: #1A1A1A; padding: 16px; border-radius: var(--radius-md); font-weight: 500; font-size: 15px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">⏰</span> <span id="readable-text">Runs every day at 8:00 AM</span>
      </div>
    </div>
  `;const a=e.querySelector("#freq"),r=e.querySelector("#time"),t=e.querySelector("#readable-text"),i=()=>{const n=a.value==="daily"?"Every day":a.value==="weekdays"?"Weekdays":"Every week",[s,o]=r.value.split(":"),l=parseInt(s),d=l>=12?"PM":"AM",c=l%12||12;t.innerText=`${n} at ${c}:${o} ${d}`};return a.addEventListener("change",i),r.addEventListener("change",i),e}const qe=[{id:"gmail-read",name:"Gmail (Read)",category:"Email",risk:"low",requiresAuth:!0,scopes:["gmail.readonly"],desc:"Read incoming emails and threads.",freeAlt:"Local Maildir"},{id:"gmail-send",name:"Gmail (Send)",category:"Email",risk:"high",requiresAuth:!0,scopes:["gmail.send"],desc:"Send emails on your behalf.",freeAlt:"None"},{id:"cal-read",name:"Google Calendar (Read)",category:"Calendar",risk:"low",requiresAuth:!0,scopes:["calendar.readonly"],desc:"View upcoming events and availability.",freeAlt:"CalDAV"},{id:"cal-write",name:"Google Calendar (Write)",category:"Calendar",risk:"medium",requiresAuth:!0,scopes:["calendar.events"],desc:"Create, move, or delete events.",freeAlt:"CalDAV"},{id:"notion-read",name:"Notion (Read)",category:"Knowledge",risk:"low",requiresAuth:!0,scopes:["read_content"],desc:"Read pages and databases.",freeAlt:"Local Markdown"},{id:"notion-write",name:"Notion (Write)",category:"Knowledge",risk:"medium",requiresAuth:!0,scopes:["insert_content"],desc:"Update pages and add blocks.",freeAlt:"Local Markdown"},{id:"home-assist",name:"Home Assistant",category:"Smart Home",risk:"medium",requiresAuth:!0,scopes:["api"],desc:"Control lights, thermostat, and devices.",freeAlt:"None"},{id:"stripe-billing",name:"Stripe",category:"Finance",risk:"high",requiresAuth:!0,scopes:["read_only","charges"],desc:"View revenue and issue refunds.",freeAlt:"None"}];function He(){const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="1000px",e.style.margin="0 auto",e.innerHTML=`
    <header style="margin-bottom: 40px;">
      <h1 class="font-serif" style="margin: 0; font-size: 48px;">Tool Registry</h1>
      <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Connect capabilities and review scopes.</p>
    </header>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;" id="tool-grid"></div>
  `;const a=e.querySelector("#tool-grid"),r=m.getState().activeTools;return qe.forEach(t=>{const i=r.includes(t.id),n=document.createElement("div");n.className="bento-card",n.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
        <div>
          <h3 class="font-serif" style="font-size: 24px; margin-bottom: 4px;">${t.name}</h3>
          <span style="font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px; background: ${t.risk==="high"?"var(--accent-clay)":t.risk==="medium"?"var(--accent-peach)":"var(--accent-sage)"}; color: #1A1A1A;">${t.risk.toUpperCase()} RISK</span>
        </div>
        <label class="switch"><input type="checkbox" class="tool-toggle" data-id="${t.id}" ${i?"checked":""}><span class="slider"></span></label>
      </div>
      <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">${t.desc}</p>
      <div style="font-size: 12px; font-family: var(--font-mono); background: var(--bg-hover); padding: 8px; border-radius: 4px; color: var(--text-tertiary);">
        Scopes: ${t.scopes.join(", ")}
      </div>
    `,a.appendChild(n)}),e.querySelectorAll(".tool-toggle").forEach(t=>{t.addEventListener("change",i=>{k.click();const n=i.target.checked,s=i.target.getAttribute("data-id");let o=[...m.getState().activeTools];n?o.push(s):o=o.filter(l=>l!==s),m.setState({activeTools:o}),M(n?"Tool connected!":"Tool disconnected","info")})}),e}function Pe(){var i;const e=document.createElement("div");e.style.padding="32px",e.style.maxWidth="800px",e.style.margin="0 auto";const a=m.getState().guardrails;e.innerHTML=`
    <header style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Guardrails</h1>
        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Safety limits and coverage score.</p>
      </div>
      <div style="text-align: center;">
        <div id="ring-container" style="width: 64px; height: 64px;"></div>
        <span style="font-size: 12px; font-weight: 600; margin-top: 8px; display: block;">Coverage</span>
      </div>
    </header>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="font-size: 16px; color: var(--text-primary);">Human-in-the-Loop</strong><br>
          <span style="font-size: 14px; color: var(--text-secondary);">Require approval for high-risk actions.</span>
        </div>
        <label class="switch"><input type="checkbox" id="human-loop-toggle" ${a.humanLoop?"checked":""}><span class="slider"></span></label>
      </div>
      <div style="background: var(--bg-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <strong style="font-size: 16px; color: var(--text-primary); display: block; margin-bottom: 12px;">Daily Budget Cap</strong>
        <input type="range" id="budget-slider" min="1" max="20" value="${a.budget}" style="width: 100%; margin-bottom: 8px;">
        <span id="budget-text" style="font-size: 14px; color: var(--text-secondary);">Max $${a.budget}.00 / day</span>
      </div>
    </div>
  `,e.querySelector("#ring-container").appendChild(V(a.humanLoop?75:25,64)),(i=e.querySelector("#human-loop-toggle"))==null||i.addEventListener("change",n=>{const s=n.target.checked;m.setState({guardrails:{...a,humanLoop:s}})});const r=e.querySelector("#budget-slider"),t=e.querySelector("#budget-text");return r.addEventListener("input",n=>{const s=parseInt(n.target.value);t.innerText=`Max $${s}.00 / day`,m.setState({guardrails:{...a,budget:s}})}),e}function O(e,a){const r=e.tone>5?"warm and conversational":"direct and dry",t=e.autonomy>7?"act without asking for permission unless it involves money":"ask for confirmation before taking any action";return`You are ${a}, a personal AI agent.
Your tone should be ${r}.
You must ${t}.
You have access to the tools provided in your blueprint.`}function De(){var n;const e=document.createElement("div");e.style.padding="32px",e.style.height="100%",e.style.display="flex",e.style.flexDirection="column",e.style.maxWidth="1000px",e.style.margin="0 auto";const a=O(m.getState().genome,"My Familiar");e.innerHTML=`
    <header style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 class="font-serif" style="margin: 0; font-size: 48px;">Persona Studio</h1>
        <p style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 16px;">Live system prompt generation based on your Genome.</p>
      </div>
      <button id="copy-prompt" style="background: var(--text-primary); color: var(--bg-surface); border: none; padding: 12px 24px; border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;">Copy Prompt</button>
    </header>
    <div style="flex: 1; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); padding: 24px; overflow-y: auto; box-shadow: var(--shadow-sm);">
      <pre id="prompt-output" style="font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); margin: 0; white-space: pre-wrap; line-height: 1.6;">${a}</pre>
    </div>
  `;const r=e.querySelector("#prompt-output"),t=m.subscribe(()=>{r.innerText=O(m.getState().genome,"My Familiar")}),i=new MutationObserver(()=>{document.body.contains(e)||(t(),i.disconnect())});return i.observe(document.body,{childList:!0,subtree:!0}),(n=e.querySelector("#copy-prompt"))==null||n.addEventListener("click",()=>{navigator.clipboard.writeText(r.innerText),k.success(),M("Prompt copied!","success")}),e}function Ie(){var l;const e=document.querySelector("#app"),r=[{id:"hearth",label:"Hearth"},{id:"atelier",label:"Atelier (Genome)"},{id:"skill-tree",label:"Skill Tree"},{id:"canvas",label:"Blueprint Canvas"},{id:"triggers",label:"Trigger Designer"},{id:"tools",label:"Tool Registry"},{id:"guardrails",label:"Guardrails"},{id:"persona",label:"Persona Studio"},{id:"simulator",label:"Simulator"},{id:"vault",label:"Vault"},{id:"library",label:"Library"},{id:"rituals",label:"Rituals"},{id:"translator",label:"Translator"},{id:"dna-card",label:"DNA Card"},{id:"studio",label:"Studio"}].map(d=>`<div class="nav-item" data-route="${d.id}">${d.label}</div>`).join("");e.innerHTML=`
    <div class="app-shell">
      <aside class="sidebar">
        <h2 class="font-serif" style="margin: 0; color: var(--text-primary); font-size: 28px;">Familiar</h2>
        <p style="color: var(--text-secondary); font-size: 13px; margin-top: 4px; font-family: var(--font-mono);">Agent Atelier v1.0</p>
        <nav class="sidebar-nav">${r}</nav>
      </aside>

      <div style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
        <header class="mobile-header">
          <h2 class="font-serif">Familiar</h2>
          <button class="menu-toggle" id="mobile-menu-toggle">
            <svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
        </header>
        <main class="main-content" id="view-container"></main>
      </div>

      <div class="mobile-drawer-backdrop" id="drawer-backdrop"></div>
      <div class="mobile-drawer" id="mobile-drawer">
        <h2 class="font-serif" style="margin: 0; margin-bottom: 24px;">All Screens</h2>
        <nav class="sidebar-nav" style="margin-top: 0;">${r.replace(/nav-item/g,"nav-item drawer-link")}</nav>
      </div>
      
      <nav class="bottom-tabs">
        <div class="tab-item active" data-route="hearth"><svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg></div>
        <div class="tab-item" data-route="atelier"><svg viewBox="0 0 24 24"><path d="M7 2v2H5v4h2v2H5v4h2v2H5v4h4v-2h2v2h6v-2h2v2h4v-4h-2v-2h2v-4h-2V8h2V4h-4v2h-2V4H7v2z"/></svg></div>
        <div class="tab-item" data-route="canvas"><svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zm10 0h6v6h-6zm-10 10h6v6H4zm10 0h6v6h-6z"/></svg></div>
        <div class="tab-item" data-route="vault"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 11h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z"/></svg></div>
      </nav>
    </div>
  `;const t=document.getElementById("view-container"),i=document.getElementById("mobile-drawer"),n=document.getElementById("drawer-backdrop");function s(d){d?(i.classList.add("open"),n.classList.add("open")):(i.classList.remove("open"),n.classList.remove("open"))}(l=document.getElementById("mobile-menu-toggle"))==null||l.addEventListener("click",()=>s(!0)),n.addEventListener("click",()=>s(!1));async function o(d){s(!1),document.querySelectorAll(".nav-item, .tab-item").forEach(c=>c.classList.toggle("active",c.getAttribute("data-route")===d)),d==="canvas"?t.style.overflow="hidden":(t.style.overflowY="auto",t.style.overflowX="hidden"),t.innerHTML="",d==="hearth"&&t.appendChild(te()),d==="atelier"&&t.appendChild(se()),d==="skill-tree"&&t.appendChild(Me()),d==="canvas"&&t.appendChild(ce()),d==="triggers"&&t.appendChild(Ne()),d==="tools"&&t.appendChild(He()),d==="guardrails"&&t.appendChild(Pe()),d==="persona"&&t.appendChild(De()),d==="simulator"&&t.appendChild(ie()),d==="vault"&&t.appendChild(await re()),d==="library"&&t.appendChild(fe()),d==="rituals"&&t.appendChild(he()),d==="translator"&&t.appendChild(Te()),d==="dna-card"&&t.appendChild($e()),d==="studio"&&t.appendChild(Ce())}document.querySelectorAll(".nav-item, .tab-item").forEach(d=>{d.addEventListener("click",()=>o(d.getAttribute("data-route")))}),window.appNavigate=o,o("hearth")}let f=null,$=null,C=null,x=0,w=[];function Ge(){const e=[{id:"nav-hearth",label:"Go to Hearth",category:"Navigation",action:()=>window.appNavigate("hearth")},{id:"nav-atelier",label:"Go to Atelier",category:"Navigation",action:()=>window.appNavigate("atelier")},{id:"nav-skill",label:"Go to Skill Tree",category:"Navigation",action:()=>window.appNavigate("skill-tree")},{id:"nav-canvas",label:"Go to Blueprint Canvas",category:"Navigation",action:()=>window.appNavigate("canvas")},{id:"nav-triggers",label:"Go to Trigger Designer",category:"Navigation",action:()=>window.appNavigate("triggers")},{id:"nav-tools",label:"Go to Tool Registry",category:"Navigation",action:()=>window.appNavigate("tools")},{id:"nav-guards",label:"Go to Guardrails",category:"Navigation",action:()=>window.appNavigate("guardrails")},{id:"nav-persona",label:"Go to Persona Studio",category:"Navigation",action:()=>window.appNavigate("persona")},{id:"nav-sim",label:"Go to Simulator",category:"Navigation",action:()=>window.appNavigate("simulator")},{id:"nav-vault",label:"Go to Vault",category:"Navigation",action:()=>window.appNavigate("vault")},{id:"nav-library",label:"Go to Library",category:"Navigation",action:()=>window.appNavigate("library")},{id:"nav-rituals",label:"Go to Rituals",category:"Navigation",action:()=>window.appNavigate("rituals")},{id:"nav-trans",label:"Go to Translator",category:"Navigation",action:()=>window.appNavigate("translator")},{id:"nav-dna",label:"Go to DNA Card",category:"Navigation",action:()=>window.appNavigate("dna-card")},{id:"nav-studio",label:"Go to Studio",category:"Navigation",action:()=>window.appNavigate("studio")},{id:"sys-fullscreen",label:"Toggle Fullscreen",category:"System",action:()=>G()}];function a(){f=document.createElement("div"),f.className="palette-overlay",f.innerHTML=`
      <div class="palette-modal">
        <input type="text" id="palette-input" placeholder="Type a command or search..." autocomplete="off">
        <div class="palette-list" id="palette-list"></div>
      </div>
    `,document.body.appendChild(f),$=document.getElementById("palette-input"),C=document.getElementById("palette-list"),f.addEventListener("click",n=>{n.target===f&&i()}),$.addEventListener("input",n=>{const s=n.target.value.toLowerCase();w=e.filter(o=>o.label.toLowerCase().includes(s)||o.category.toLowerCase().includes(s)),x=0,r()}),$.addEventListener("keydown",n=>{n.key==="Escape"&&i(),n.key==="ArrowDown"&&(n.preventDefault(),x=(x+1)%w.length,r()),n.key==="ArrowUp"&&(n.preventDefault(),x=(x-1+w.length)%w.length,r()),n.key==="Enter"&&(n.preventDefault(),w[x]&&t(w[x]))})}function r(){if(C){if(C.innerHTML="",w.length===0){C.innerHTML='<div style="padding: 16px; color: var(--text-secondary); text-align: center;">No commands found.</div>';return}w.forEach((n,s)=>{const o=document.createElement("div");o.className=`palette-item ${s===x?"selected":""}`,o.innerHTML=`<span class="palette-category">${n.category}</span><span class="palette-label">${n.label}</span>`,o.addEventListener("mouseenter",()=>{x=s,r()}),o.addEventListener("click",()=>t(n)),C.appendChild(o)})}}function t(n){k.success(),i(),n.action()}function i(){f&&f.classList.remove("open")}document.addEventListener("keydown",n=>{(n.metaKey||n.ctrlKey)&&n.key==="k"&&(n.preventDefault(),f!=null&&f.classList.contains("open")?i():window.openPalette())}),window.openPalette=()=>{f||a(),f.classList.add("open"),$.value="",w=[...e],x=0,r(),setTimeout(()=>$.focus(),50)}}const Re="modulepreload",je=function(e){return"/familiar-agent-atelier/"+e},F={},Be=function(a,r,t){let i=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),o=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(r.map(l=>{if(l=je(l),l in F)return;F[l]=!0;const d=l.endsWith(".css"),c=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${c}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":Re,d||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),d)return new Promise((v,y)=>{u.addEventListener("load",v),u.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function n(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return i.then(s=>{for(const o of s||[])o.status==="rejected"&&n(o.reason);return a().catch(n)})};function We(e={}){const{immediate:a=!1,onNeedRefresh:r,onOfflineReady:t,onRegistered:i,onRegisteredSW:n,onRegisterError:s}=e;let o,l;const d=async(u=!0)=>{await l};async function c(){if("serviceWorker"in navigator){if(o=await Be(async()=>{const{Workbox:u}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:u}},[]).then(({Workbox:u})=>new u("/familiar-agent-atelier/sw.js",{scope:"/familiar-agent-atelier/",type:"classic"})).catch(u=>{s==null||s(u)}),!o)return;o.addEventListener("activated",u=>{(u.isUpdate||u.isExternal)&&window.location.reload()}),o.addEventListener("installed",u=>{u.isUpdate||t==null||t()}),o.register({immediate:a}).then(u=>{n?n("/familiar-agent-atelier/sw.js",u):i==null||i(u)}).catch(u=>{s==null||s(u)})}}return l=c(),d}function Oe(){"serviceWorker"in navigator&&We({immediate:!0,onNeedRefresh(){console.log("New content available, please refresh.")},onOfflineReady(){console.log("App is ready to work offline.")}})}window.onerror=function(e,a,r,t,i){document.body.innerHTML=`
    <div style="padding: 40px; font-family: sans-serif; color: red; background: #fff;">
      <h2>App Crashed</h2>
      <p><strong>Error:</strong> ${e}</p>
      <p><strong>Location:</strong> ${a}:${r}:${t}</p>
      <pre>${i==null?void 0:i.stack}</pre>
    </div>
  `};const Fe=()=>{const e=document.createElement("div");e.className="ambient-orb orb-1";const a=document.createElement("div");a.className="ambient-orb orb-2";const r=document.createElement("div");r.className="ambient-orb orb-3",document.body.appendChild(e),document.body.appendChild(a),document.body.appendChild(r)};Fe();Ie();Ge();Oe();
