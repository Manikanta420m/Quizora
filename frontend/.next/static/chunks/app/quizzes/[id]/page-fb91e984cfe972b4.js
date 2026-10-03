(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[818],{2831:(e,s,t)=>{"use strict";t.d(s,{A:()=>r});var a=t(2355);let r={getQuizzes:async({search:e="",topic:s="all",difficulty:t="all",page:r=1,limit:i=12}={})=>{let n=new URLSearchParams;e&&e.trim()&&n.append("search",e.trim()),s&&"all"!==s&&n.append("topic",s),t&&"all"!==t&&n.append("difficulty",t),r&&n.append("page",r),i&&n.append("limit",i);let l=n.toString(),d=l?`/quizzes?${l}`:"/quizzes";return await (0,a.AT)(d)},getQuizById:async e=>await (0,a.AT)(`/quizzes/${e}`),createQuiz:async(e,s)=>{let t={};return s&&(t.Authorization=`Bearer ${s}`),await (0,a.AT)("/quizzes",{method:"POST",headers:t,body:JSON.stringify(e)})},deleteQuiz:async(e,s)=>{let t={};return s&&(t.Authorization=`Bearer ${s}`),await (0,a.AT)(`/quizzes/${e}`,{method:"DELETE",headers:t})},seedQuizzes:async e=>{let s={};return e&&(s.Authorization=`Bearer ${e}`),await (0,a.AT)("/quizzes/seed",{method:"POST",headers:s})},generateQuiz:async(e,s)=>{let t={};return s&&(t.Authorization=`Bearer ${s}`),await (0,a.AT)("/quizzes/generate",{method:"POST",headers:t,body:JSON.stringify(e)})},generateFlashcards:async(e,s)=>{let t={};return s&&(t.Authorization=`Bearer ${s}`),await (0,a.AT)("/quizzes/generate-flashcards",{method:"POST",headers:t,body:JSON.stringify(e)})},generateQuizFromDocument:async(e,s)=>{let t={};return s&&(t.Authorization=`Bearer ${s}`),await (0,a.AT)("/quizzes/from-document",{method:"POST",headers:t,body:e})},submitQuiz:async(e,s,t)=>{let r={};return t&&(r.Authorization=`Bearer ${t}`),await (0,a.AT)(`/quizzes/${e}/submit`,{method:"POST",headers:r,body:JSON.stringify(s)})},getQuizLeaderboard:async e=>await (0,a.AT)(`/quizzes/${e}/leaderboard`)}},2886:(e,s,t)=>{"use strict";t.d(s,{A:()=>p});var a=t(5155),r=t(2115),i=t(8500),n=t.n(i),l=t(3321),d=t(9005),o=t(6304),c=t(4511),x=t(5392),m=t(9484),h=t(1487);let p=function(){let e=(0,l.usePathname)(),{isAuthenticated:s,logout:t}=(0,c.As)(),[i,p]=(0,r.useState)(!1),[u,f]=(0,r.useState)(null),b=()=>p(!1),g=e=>{e.includes("#")?v(e.substring(e.indexOf("#"))):"/"===e&&v(""),p(!1)},[j,v]=(0,r.useState)("");(0,r.useEffect)(()=>{v(window.location.hash);let e=()=>{v(window.location.hash)};window.addEventListener("hashchange",e);let s=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&v(`#${e.target.id}`)}),window.scrollY<100&&v("")},{root:null,rootMargin:"-30% 0px -50% 0px",threshold:0}),t=document.querySelectorAll("section[id]");return t.forEach(e=>s.observe(e)),()=>{window.removeEventListener("hashchange",e),t.forEach(e=>s.unobserve(e))}},[]);let w=s=>{if(s.includes("#")){let t=s.substring(s.indexOf("#"));return"/"===e&&j===t}return"/"===s?"/"===e&&!j:e?.startsWith(s)};return(0,a.jsxs)("header",{className:"sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-sm transition-all",children:[(0,a.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between",children:[(0,a.jsxs)(n(),{href:s?"/dashboard":"/",className:"flex items-center gap-3 group",children:[(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("div",{className:"absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300"}),(0,a.jsx)("img",{src:"/images/quizora-icon.png",alt:"Quizora",className:"relative w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform duration-300 shadow-sm"})]}),(0,a.jsx)("span",{className:"font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight",children:"Quizora"})]}),(0,a.jsx)("nav",{className:"hidden md:flex items-center gap-1 relative px-1.5 py-1.5 bg-slate-100/50 border border-slate-200/80 rounded-full shadow-[inset_0_1px_4px_rgba(0,0,0,0.04)]",onMouseLeave:()=>f(null),children:[{name:s?"Dashboard":"Home",href:s?"/dashboard":"/"},{name:"Features",href:"/#features"},{name:"How It Works",href:"/#how-it-works"},{name:"Leaderboard",href:"/#leaderboard"},{name:"Categories",href:"/#categories"}].map((e,s)=>{let t=w(e.href);return(0,a.jsxs)(n(),{href:e.href,onClick:()=>g(e.href),onMouseEnter:()=>f(s),className:`relative px-4 py-1.5 text-sm font-semibold transition-colors z-10 ${t?"text-[#0F172A]":"text-[#64748B] hover:text-[#0F172A]"}`,children:[t&&(0,a.jsx)(h.P.div,{layoutId:"active-nav-pill",className:"absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-slate-200/80",transition:{type:"spring",stiffness:500,damping:30}}),!t&&u===s&&(0,a.jsx)(h.P.div,{layoutId:"hover-nav-pill",className:"absolute inset-0 bg-slate-200/60 rounded-full -z-10",transition:{type:"spring",stiffness:500,damping:30}}),(0,a.jsx)("span",{className:"relative z-10",children:e.name})]},e.name)})}),(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsx)(m.A,{size:"sm"}),s?(0,a.jsxs)("div",{className:"hidden sm:flex items-center gap-3",children:[(0,a.jsx)(n(),{href:"/dashboard",className:"text-sm font-medium text-[#0F172A] hover:text-[#2563EB] transition-colors",children:"Dashboard"}),(0,a.jsx)("button",{type:"button",onClick:t,className:"text-sm font-medium text-[#64748B] hover:text-[#EF4444] transition-colors cursor-pointer",children:"Logout"})]}):(0,a.jsxs)("div",{className:"hidden sm:flex items-center gap-4",children:[(0,a.jsx)(n(),{href:"/login",className:"text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors",children:"Login"}),(0,a.jsx)(n(),{href:"/register",children:(0,a.jsx)(x.A,{variant:"primary",size:"sm",className:"bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors",children:"Get Started"})})]}),(0,a.jsx)("button",{type:"button",onClick:()=>p(e=>!e),"aria-label":"Toggle Navigation Menu",className:"md:hidden p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer",children:i?(0,a.jsx)(d.A,{className:"w-5 h-5"}):(0,a.jsx)(o.A,{className:"w-5 h-5"})})]})]}),i&&(0,a.jsxs)("div",{className:"md:hidden border-b border-[#E2E8F0] bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-lg",children:[(0,a.jsxs)("nav",{className:"flex flex-col space-y-1",children:[(0,a.jsx)(n(),{href:s?"/dashboard":"/",onClick:()=>g(s?"/dashboard":"/"),className:`px-3 py-2 rounded-lg text-sm font-medium ${(s?w("/dashboard"):w("/")&&"/"===e)?"text-[#2563EB] bg-blue-50 font-semibold":"text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"}`,children:s?"Dashboard":"Home"}),(0,a.jsx)(n(),{href:"/#features",onClick:()=>g("/#features"),className:`px-3 py-2 rounded-lg text-sm font-medium ${w("/#features")?"text-[#2563EB] bg-blue-50 font-semibold":"text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"}`,children:"Features"}),(0,a.jsx)(n(),{href:"/#how-it-works",onClick:()=>g("/#how-it-works"),className:`px-3 py-2 rounded-lg text-sm font-medium ${w("/#how-it-works")?"text-[#2563EB] bg-blue-50 font-semibold":"text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"}`,children:"How It Works"}),(0,a.jsx)(n(),{href:"/#leaderboard",onClick:()=>g("/#leaderboard"),className:`px-3 py-2 rounded-lg text-sm font-medium ${w("/#leaderboard")?"text-[#2563EB] bg-blue-50 font-semibold":"text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"}`,children:"Leaderboard"}),(0,a.jsx)(n(),{href:"/#categories",onClick:()=>g("/#categories"),className:`px-3 py-2 rounded-lg text-sm font-medium ${w("/#categories")?"text-[#2563EB] bg-blue-50 font-semibold":"text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"}`,children:"Categories"}),s&&(0,a.jsx)(n(),{href:"/dashboard",onClick:b,className:"px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]",children:"Dashboard"})]}),s?(0,a.jsx)("div",{className:"pt-2 border-t border-[#E2E8F0]",children:(0,a.jsx)("button",{type:"button",onClick:()=>{t(),b()},className:"w-full py-2 text-center text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer",children:"Logout"})}):(0,a.jsxs)("div",{className:"pt-2 border-t border-[#E2E8F0] flex items-center gap-2",children:[(0,a.jsx)(n(),{href:"/login",onClick:b,className:"flex-1",children:(0,a.jsx)(x.A,{variant:"secondary",size:"md",className:"w-full text-xs",children:"Login"})}),(0,a.jsx)(n(),{href:"/register",onClick:b,className:"flex-1",children:(0,a.jsx)(x.A,{variant:"primary",size:"md",className:"w-full text-xs",children:"Get Started"})})]})]})]})}},3505:(e,s,t)=>{"use strict";t.d(s,{A:()=>n});var a=t(5155);t(2115);var r=t(9277);let i={default:"bg-[#F1F5F9] text-[#0F172A] border-[#E2E8F0]",success:"bg-emerald-50 text-emerald-700 border-emerald-200",warning:"bg-amber-50 text-amber-700 border-amber-200",danger:"bg-rose-50 text-rose-700 border-rose-200",info:"bg-sky-50 text-[#0284C7] border-sky-200",ai:"bg-sky-50 text-[#0369A1] border-[#38BDF8]/50 shadow-xs",indigo:"bg-blue-50 text-[#2563EB] border-blue-200",purple:"bg-blue-50 text-[#2563EB] border-blue-200",navy:"bg-[#0F172A] text-white border-[#0F172A]"},n=function({children:e,variant:s="default",className:t,...n}){return(0,a.jsx)("span",{className:(0,r.cn)("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",i[s]||i.default,t),...n,children:e})}},4389:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>H});var a=t(5155),r=t(2115),i=t(3321),n=t(8500),l=t.n(n),d=t(5625),o=t(4109),c=t(8934),x=t(5484),m=t(9585),h=t(5879),p=t(6272),u=t(7356),f=t(6923),b=t(6154),g=t(3744),j=t(6619),v=t(557),w=t(3565),N=t(981),y=t(4511),A=t(2886),F=t(5392),k=t(8026),E=t(3505),z=t(2831),C=t(3246),B=t(2298),S=t(9005),q=t(4962),$=t(1189),T=t(8780),L=t(6721),P=t(6827);function I({quiz:e,isOpen:s,onClose:t}){let{playSound:i}=(0,P.fA)(),[n,l]=(0,r.useState)(()=>(e?.questions||[]).map((e,s)=>({...e,cardId:`card_${s}`,originalIndex:s}))),[d,o]=(0,r.useState)(e),[c,x]=(0,r.useState)(0),[m,h]=(0,r.useState)(!1),[u,f]=(0,r.useState)(new Set);e!==d&&(o(e),l((e?.questions||[]).map((e,s)=>({...e,cardId:`card_${s}`,originalIndex:s}))),x(0),h(!1),f(new Set));let g=(0,r.useCallback)(()=>{i("flip"),h(e=>!e)},[i]),j=(0,r.useCallback)(()=>{i("click"),h(!1),x(e=>(e+1)%n.length)},[n.length,i]),w=(0,r.useCallback)(()=>{i("click"),h(!1),x(e=>(e-1+n.length)%n.length)},[n.length,i]),N=(0,r.useCallback)(()=>{i("click"),h(!1),l(e=>{let s=[...e];for(let e=s.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[s[e],s[t]]=[s[t],s[e]]}return s}),x(0)},[i]),y=(0,r.useCallback)(()=>{i("click"),e?.questions&&(h(!1),l(e.questions.map((e,s)=>({...e,cardId:`card_${s}`,originalIndex:s}))),x(0),f(new Set))},[e,i]);if((0,r.useEffect)(()=>{if(!s)return;let e=e=>{"Space"===e.code?(e.preventDefault(),g()):"ArrowRight"===e.code?(e.preventDefault(),j()):"ArrowLeft"===e.code?(e.preventDefault(),w()):"Escape"===e.code&&(e.preventDefault(),t())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[s,g,j,w,t]),!s||!n.length)return null;let A=n[c],k=A&&u.has(A.cardId),z=u.size,D=Math.round(z/n.length*100),O=Number(A?.correctAnswer||0),Q=A?.options?.[O]||"Option "+(O+1),M=String.fromCharCode(65+O);return(0,a.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200",children:(0,a.jsxs)("div",{className:"w-full max-w-3xl flex flex-col max-h-[92vh] space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100",children:(0,a.jsx)(v.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("h3",{className:"font-bold text-[#0F172A] text-base truncate max-w-[240px] sm:max-w-md",children:e.title}),(0,a.jsx)("span",{className:"text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 uppercase",children:e.topic})]}),(0,a.jsxs)("p",{className:"text-xs text-[#64748B]",children:["Card ",c+1," of ",n.length," • Flashcard Study Mode"]})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:N,title:"Shuffle Cards",className:"text-[#64748B] hover:text-[#0F172A] p-2",children:(0,a.jsx)(C.A,{className:"w-4 h-4"})}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:y,title:"Reset Mastery & Progress",className:"text-[#64748B] hover:text-[#0F172A] p-2",children:(0,a.jsx)(B.A,{className:"w-4 h-4"})}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:t,title:"Close Flashcards",className:"text-[#64748B] hover:text-[#EF4444] p-2",children:(0,a.jsx)(S.A,{className:"w-5 h-5"})})]})]}),(0,a.jsxs)("div",{className:"px-2",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between text-xs text-[#64748B] mb-1.5 font-medium",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-emerald-600 font-semibold",children:[(0,a.jsx)(b.A,{className:"w-3.5 h-3.5"}),"Mastered: ",z," of ",n.length," Cards"]}),(0,a.jsxs)("span",{children:[D,"% Complete"]})]}),(0,a.jsx)("div",{className:"h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden",children:(0,a.jsx)("div",{className:"h-full bg-[#2563EB] transition-all duration-300",style:{width:`${D}%`}})})]}),(0,a.jsx)("div",{onClick:g,className:"perspective-1000 w-full h-[360px] sm:h-[400px] cursor-pointer select-none group",children:(0,a.jsxs)("div",{className:`transform-style-3d relative w-full h-full duration-500 transition-transform ${m?"rotate-y-180":""}`,children:[(0,a.jsxs)("div",{className:"backface-hidden absolute inset-0 rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between shadow-xl group-hover:border-[#2563EB]/40 transition-colors",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)(E.A,{variant:"indigo",className:"text-xs font-mono",children:["Question #",c+1]}),k?(0,a.jsxs)(E.A,{variant:"success",className:"gap-1",children:[(0,a.jsx)(q.A,{className:"w-3 h-3"})," Mastered"]}):(0,a.jsx)(E.A,{variant:"default",children:"Reviewing"})]}),(0,a.jsx)("div",{className:"my-auto py-4",children:(0,a.jsx)("h4",{className:"text-xl sm:text-2xl font-bold text-[#0F172A] leading-relaxed tracking-tight",children:A.question})}),(0,a.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-[#2563EB] font-medium",children:[(0,a.jsx)($.A,{className:"w-3.5 h-3.5 animate-pulse"}),"Click or press [Space] to reveal answer"]}),(0,a.jsx)("span",{className:"hidden sm:inline",children:"Use ← / → arrow keys"})]})]}),(0,a.jsxs)("div",{className:"backface-hidden rotate-y-180 absolute inset-0 rounded-3xl bg-[#F8FAFC] border border-[#2563EB]/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full",children:[(0,a.jsx)(q.A,{className:"w-3.5 h-3.5 text-emerald-600"})," Correct Answer: (",M,")"]}),(0,a.jsxs)(E.A,{variant:"indigo",className:"text-xs font-mono",children:["Card #",c+1]})]}),(0,a.jsxs)("div",{className:"my-auto space-y-4 py-2 overflow-y-auto max-h-[220px] pr-2",children:[(0,a.jsx)("div",{className:"text-lg sm:text-xl font-bold text-[#0F172A] bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs",children:Q}),A.explanation&&(0,a.jsxs)("div",{className:"text-sm text-[#111827] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs",children:[(0,a.jsxs)("div",{className:"font-semibold text-[#2563EB] text-xs uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,a.jsx)(p.A,{className:"w-3 h-3 text-[#38BDF8]"})," Concept Breakdown"]}),A.explanation]})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-[#2563EB]",children:[(0,a.jsx)($.A,{className:"w-3.5 h-3.5"})," Click or press [Space] to flip back"]}),(0,a.jsx)("span",{className:"text-emerald-600 font-medium",children:"Ready to self-grade below"})]})]})]})}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-3 pt-1",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start",children:[(0,a.jsxs)(F.A,{variant:"secondary",size:"md",onClick:w,className:"gap-1 px-3 text-xs",children:[(0,a.jsx)(T.A,{className:"w-4 h-4"}),(0,a.jsx)("span",{children:"Previous"})]}),(0,a.jsxs)("span",{className:"text-xs text-[#64748B] font-mono px-2 font-medium",children:[c+1," / ",n.length]}),(0,a.jsxs)(F.A,{variant:"secondary",size:"md",onClick:j,className:"gap-1 px-3 text-xs",children:[(0,a.jsx)("span",{children:"Next"}),(0,a.jsx)(L.A,{className:"w-4 h-4"})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 w-full sm:w-auto justify-end",children:[(0,a.jsxs)(F.A,{variant:"secondary",size:"md",onClick:()=>{A&&(i("click"),f(e=>{let s=new Set(e);return s.delete(A.cardId),s}),h(!1),x(e=>(e+1)%n.length))},className:"gap-1.5 text-xs text-amber-700 hover:text-amber-800 border-amber-200 hover:bg-amber-50",children:[(0,a.jsx)(B.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Still Learning"})]}),(0,a.jsxs)(F.A,{variant:"primary",size:"md",onClick:()=>{A&&(i("correct"),f(e=>{let s=new Set(e);return s.add(A.cardId),s}),h(!1),x(e=>(e+1)%n.length))},className:"gap-1.5 text-xs shadow-sm",children:[(0,a.jsx)(q.A,{className:"w-4 h-4 text-white"}),(0,a.jsx)("span",{children:"Mark Mastered"})]})]})]})]})})}var D=t(6483),O=t(9339),Q=t(825),M=t(5745);let _=(e,s,t="text/plain;charset=utf-8")=>{let a=new Blob([e],{type:t}),r=URL.createObjectURL(a),i=document.createElement("a");i.href=r,i.download=s,document.body.appendChild(i),i.click(),setTimeout(()=>{document.body.removeChild(i),URL.revokeObjectURL(r)},100)};function R(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function U({quiz:e,isOpen:s,onClose:t}){let[i,n]=(0,r.useState)(!1),[l,d]=(0,r.useState)(null);if(!s||!e)return null;let o=(e.title||"quiz").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,40),c=e=>{d(e),setTimeout(()=>{d(null)},2500)};return(0,a.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200",children:(0,a.jsxs)("div",{className:"w-full max-w-lg bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-6 space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between pb-3 border-b border-[#E2E8F0]",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center",children:(0,a.jsx)(w.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-bold text-[#0F172A] text-base",children:"Export & Print Assessment"}),(0,a.jsx)("p",{className:"text-xs text-[#64748B]",children:"Export for offline study, printing, or archival"})]})]}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:t,className:"text-[#64748B] hover:text-[#0F172A] p-1.5",children:(0,a.jsx)(S.A,{className:"w-5 h-5"})})]}),(0,a.jsxs)("div",{className:"p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-xs font-semibold text-[#0F172A]",children:"Include Solution & Answer Key"}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Appends answer key and pedagogical breakdowns to exports"})]}),(0,a.jsxs)("label",{className:"relative inline-flex items-center cursor-pointer",children:[(0,a.jsx)("input",{type:"checkbox",checked:i,onChange:e=>n(e.target.checked),className:"sr-only peer"}),(0,a.jsx)("div",{className:"w-9 h-5 bg-[#CBD5E1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]"})]})]}),(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0",children:(0,a.jsx)(w.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-semibold text-[#0F172A]",children:"Printable Exam Paper / PDF"}),(0,a.jsx)("div",{className:"text-xs text-[#64748B]",children:"Formatted A4/Letter test sheet with student name & date lines"})]})]}),(0,a.jsxs)(F.A,{variant:"primary",size:"sm",onClick:()=>{((e,{includeAnswerKey:s=!1}={})=>{if(!e)return;let t=window.open("","_blank","width=900,height=800");if(!t)return alert("Please allow popups for this site to open the printable exam sheet.");let a=e.title||"Examination Assessment",r=(e.topic||"General").toUpperCase(),i=(e.difficulty||"medium").toUpperCase(),n=e.timeLimit?`${e.timeLimit} Minutes`:"Untimed",l=e.questions||[],d=l.map((e,s)=>{let t=(e.options||[]).map((e,s)=>{let t=String.fromCharCode(65+s);return`
            <div class="option-row">
              <span class="bubble"></span>
              <span class="letter">(${t})</span>
              <span class="option-text">${R(e)}</span>
            </div>
          `}).join("");return`
        <div class="question-block">
          <div class="question-header">
            <span class="question-num">${s+1}.</span>
            <div class="question-title">${R(e.question)}</div>
          </div>
          <div class="options-container">
            ${t}
          </div>
        </div>
      `}).join(""),o=s?`
      <div class="page-break"></div>
      <div class="answer-key-section">
        <h2 class="answer-key-title">🔑 Answer Key & Scoring Guide</h2>
        <table class="key-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Key</th>
              <th>Correct Option</th>
              <th>Explanation Summary</th>
            </tr>
          </thead>
          <tbody>
            ${l.map((e,s)=>{let t=Number(e.correctAnswer),a=String.fromCharCode(65+t),r=e.options?.[t]||"",i=e.explanation||"Direct curriculum standard.";return`
                <tr>
                  <td><strong>${s+1}</strong></td>
                  <td><span class="key-badge">${a}</span></td>
                  <td>${R(r)}</td>
                  <td class="expl-text">${R(i)}</td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    `:"",c=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${R(a)} - Printable Exam</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 18mm 16mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background: #ffffff;
          margin: 0;
          padding: 24px;
          line-height: 1.5;
        }
        .exam-header {
          border-bottom: 2px solid #0f172a;
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .exam-title {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .exam-badges {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
        }
        .header-meta {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-top: 14px;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background: #f8fafc;
          font-size: 13px;
        }
        .student-fields {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 16px;
          margin-top: 14px;
          font-size: 13px;
        }
        .field-line {
          border-bottom: 1px solid #475569;
          min-height: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #334155;
          margin-bottom: 4px;
        }
        .instructions {
          margin: 16px 0 24px 0;
          padding: 10px 14px;
          background: #f1f5f9;
          border-left: 4px solid #6366f1;
          font-size: 12px;
          color: #334155;
        }
        .question-block {
          margin-bottom: 20px;
          page-break-inside: avoid;
        }
        .question-header {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }
        .question-num {
          font-weight: 800;
          font-size: 15px;
          color: #0f172a;
        }
        .question-title {
          font-weight: 600;
          font-size: 15px;
          color: #0f172a;
        }
        .options-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
          padding-left: 20px;
        }
        .option-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #1e293b;
        }
        .bubble {
          width: 14px;
          height: 14px;
          border: 1.5px solid #64748b;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .letter {
          font-weight: 700;
          color: #475569;
        }
        .option-text {
          word-break: break-word;
        }
        .page-break {
          page-break-before: always;
        }
        .answer-key-section {
          margin-top: 30px;
        }
        .answer-key-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          border-bottom: 2px solid #6366f1;
          padding-bottom: 6px;
          margin-bottom: 16px;
        }
        .key-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .key-table th, .key-table td {
          border: 1px solid #cbd5e1;
          padding: 8px 10px;
          text-align: left;
        }
        .key-table th {
          background: #f1f5f9;
          font-weight: 700;
        }
        .key-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #6366f1;
          color: #ffffff;
          border-radius: 4px;
          font-weight: 800;
          font-size: 11px;
        }
        .expl-text {
          color: #475569;
        }
        @media screen {
          body {
            max-width: 820px;
            margin: 20px auto;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            border-radius: 12px;
          }
          .no-print-bar {
            position: sticky;
            top: 0;
            background: #0f172a;
            color: #ffffff;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            z-index: 100;
          }
          .print-btn {
            background: #6366f1;
            color: #ffffff;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
          }
        }
        @media print {
          .no-print-bar {
            display: none !important;
          }
          body {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print-bar">
        <span>📄 Printable Exam Sheet Ready</span>
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
      </div>

      <div class="exam-header">
        <div class="header-top">
          <h1 class="exam-title">${R(a)}</h1>
          <span class="exam-badges">${R(r)} &bull; ${R(i)}</span>
        </div>

        <div class="header-meta">
          <div><strong>Assessment:</strong> ${l.length} Questions</div>
          <div><strong>Time Allotted:</strong> ${R(n)}</div>
          <div><strong>Passing Grade:</strong> 70%</div>
        </div>

        <div class="student-fields">
          <div>
            <div class="field-label">Student Name:</div>
            <div class="field-line"></div>
          </div>
          <div>
            <div class="field-label">Date:</div>
            <div class="field-line"></div>
          </div>
          <div>
            <div class="field-label">Score / Grade:</div>
            <div class="field-line"></div>
          </div>
        </div>
      </div>

      <div class="instructions">
        <strong>Directions:</strong> Select the best response for each multiple choice question by filling in the corresponding circle completely. Mark only one option per question.
      </div>

      <div class="exam-body">
        ${d}
      </div>

      ${o}

      <script>
        // Automatically open system print dialog after DOM render
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 300);
        });
      </script>
    </body>
    </html>
  `;t.document.open(),t.document.write(c),t.document.close()})(e,{includeAnswerKey:i})},className:"gap-1.5 shrink-0 text-xs shadow-xs",children:[(0,a.jsx)(w.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Print / PDF"})]})]}),(0,a.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0",children:(0,a.jsx)(D.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-semibold text-[#0F172A]",children:"Markdown Study Guide (.md)"}),(0,a.jsx)("div",{className:"text-xs text-[#64748B]",children:"Formatted for Notion, Obsidian, GitHub with answer spoilers"})]})]}),(0,a.jsx)(F.A,{variant:"secondary",size:"sm",onClick:()=>{_(((e,{includeAnswers:s=!0}={})=>{if(!e)return"";let t=e.title||"Untitled Quiz",a=e.topic||"General",r=(e.difficulty||"medium").toUpperCase(),i=e.timeLimit?`${e.timeLimit} minutes`:"Untimed",n=e.questions||[],l=`# 📝 ${t}

`;return l+=`> **Topic:** ${a} | **Difficulty:** ${r} | **Time Limit:** ${i} | **Total Questions:** ${n.length}

`,e.description&&(l+=`${e.description}

`),l+=`---

## Questions

`,n.forEach((e,t)=>{l+=`### ${t+1}. ${e.question}

`;let a=e.options||[],r=Number(e.correctAnswer);a.forEach((e,t)=>{let a=String.fromCharCode(65+t);s&&t===r?l+=`- [x] **(${a})** ${e} *(Correct Answer)*
`:l+=`- [ ] **(${a})** ${e}
`}),s&&e.explanation&&(l+=`
<details>
<summary>💡 Explanation & Concept Breakdown</summary>

${e.explanation}
</details>
`),l+=`
`}),s&&(l+=`---

## 🔑 Answer Key

| Question | Correct Option | Answer Text |
|:---:|:---:|:---|
`,n.forEach((e,s)=>{let t=Number(e.correctAnswer),a=String.fromCharCode(65+t),r=e.options?.[t]||"";l+=`| ${s+1} | **${a}** | ${r} |
`}),l+=`
`),l+=`---
*Generated by Quizora AI Platform*
`})(e,{includeAnswers:i}),`${o}.md`,"text/markdown;charset=utf-8"),c("markdown")},className:"gap-1.5 shrink-0 text-xs",children:"markdown"===l?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(O.A,{className:"w-3.5 h-3.5 text-emerald-600"}),(0,a.jsx)("span",{className:"text-emerald-600",children:"Saved"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Q.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Download"})]})})]}),(0,a.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0",children:(0,a.jsx)(M.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-semibold text-[#0F172A]",children:"Raw Quiz Data (.json)"}),(0,a.jsx)("div",{className:"text-xs text-[#64748B]",children:"Portable structured JSON schema for backup or API import"})]})]}),(0,a.jsx)(F.A,{variant:"secondary",size:"sm",onClick:()=>{_(e?JSON.stringify({title:e.title,description:e.description,topic:e.topic,difficulty:e.difficulty,timeLimit:e.timeLimit,sourceType:e.sourceType,exportedAt:new Date().toISOString(),questions:(e.questions||[]).map(e=>({question:e.question,options:e.options,correctAnswer:e.correctAnswer,explanation:e.explanation}))},null,2):"{}",`${o}.json`,"application/json;charset=utf-8"),c("json")},className:"gap-1.5 shrink-0 text-xs",children:"json"===l?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(O.A,{className:"w-3.5 h-3.5 text-emerald-600"}),(0,a.jsx)("span",{className:"text-emerald-600",children:"Saved"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Q.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Download"})]})})]})]}),(0,a.jsxs)("div",{className:"pt-2 flex items-center justify-between text-xs text-slate-500",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1 text-slate-400",children:[(0,a.jsx)(p.A,{className:"w-3.5 h-3.5 text-purple-400"}),"Zero-configuration client-side export"]}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:t,className:"text-xs",children:"Done"})]})]})})}let G={easy:"success",medium:"warning",hard:"danger"};function H(){let e=(0,i.useParams)(),s=(0,i.useRouter)(),t=e?.id,{user:n,token:C}=(0,y.As)(),B=(0,d.jE)(),[S,q]=(0,r.useState)(null),[$,T]=(0,r.useState)(!1),[L,P]=(0,r.useState)(!1),{data:D,isLoading:O,isError:Q,error:M}=(0,o.I)({queryKey:["quiz",t],queryFn:()=>z.A.getQuizById(t),enabled:!!t}),_=D?.quiz,R=_?.userId?._id||_?.userId?.id||_?.userId,H=n?._id||n?.id,J=H&&(H===R||n?.role==="admin"),K=(0,c.n)({mutationFn:()=>z.A.deleteQuiz(t,C),onSuccess:()=>{B.invalidateQueries({queryKey:["quizzes"]}),s.push("/quizzes")},onError:e=>{q({text:e.message||"Failed to delete quiz",type:"error"})}});if(O)return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-transparent text-[#111827]",children:[(0,a.jsx)(A.A,{}),(0,a.jsxs)("main",{className:"flex-1 max-w-4xl w-full mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4",children:[(0,a.jsx)("div",{className:"w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin"}),(0,a.jsx)("p",{className:"text-xs text-[#64748B]",children:"Loading quiz details and questions..."})]})]});if(Q||!_)return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-transparent text-[#111827]",children:[(0,a.jsx)(A.A,{}),(0,a.jsxs)("main",{className:"flex-1 max-w-xl w-full mx-auto px-4 py-16 text-center space-y-4",children:[(0,a.jsx)("div",{className:"w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-[#EF4444]",children:(0,a.jsx)(x.A,{className:"w-7 h-7"})}),(0,a.jsx)("h2",{className:"text-2xl font-bold text-[#0F172A]",children:"Quiz Not Found"}),(0,a.jsx)("p",{className:"text-sm text-[#64748B]",children:M?.message||"The quiz you are looking for doesn't exist or has been removed."}),(0,a.jsx)(l(),{href:"/quizzes",children:(0,a.jsxs)(F.A,{variant:"secondary",size:"md",children:[(0,a.jsx)(m.A,{className:"w-4 h-4"}),"Back to Catalog"]})})]})]});let Z=_.questions?.length||0,W=10*Z,X=_.userId?.name||"Community Contributor";return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/20",children:[(0,a.jsx)(A.A,{}),S&&(0,a.jsx)("div",{className:"fixed bottom-6 right-6 z-50 animate-bounce",children:(0,a.jsxs)("div",{className:"flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-rose-50 border-rose-300 text-rose-800 text-sm font-medium",children:[(0,a.jsx)(x.A,{className:"w-4 h-4 text-[#EF4444]"}),(0,a.jsx)("span",{children:S.text})]})}),(0,a.jsxs)("main",{className:"flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)(l(),{href:"/quizzes",className:"inline-flex items-center gap-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors",children:[(0,a.jsx)(m.A,{className:"w-4 h-4"}),"Back to Quiz Catalog"]}),J&&(0,a.jsxs)(F.A,{variant:"danger",size:"sm",onClick:()=>{confirm("Are you sure you want to permanently delete this quiz?")&&K.mutate()},isLoading:K.isPending,className:"text-xs gap-1.5",children:[(0,a.jsx)(h.A,{className:"w-3.5 h-3.5"}),"Delete Quiz"]})]}),(0,a.jsxs)(k.Zp,{className:"border-[#E2E8F0] bg-white shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden",children:[(0,a.jsx)("div",{className:"absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-30 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]",style:{backgroundImage:"url('/images/hero-bg.jpg')"},"aria-hidden":"true"}),(0,a.jsxs)("div",{className:"flex flex-wrap items-center gap-2.5 relative z-10",children:[(0,a.jsx)("span",{className:"text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20",children:_.topic}),(0,a.jsx)(E.A,{variant:G[_.difficulty]||"default",className:"capitalize",children:_.difficulty}),"ai"===_.sourceType&&(0,a.jsxs)(E.A,{variant:"ai",className:"gap-1",children:[(0,a.jsx)(p.A,{className:"w-3 h-3 text-[#2563EB]"}),"AI Generated"]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("h1",{className:"text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight",children:_.title}),(0,a.jsx)("p",{className:"text-base text-[#64748B] max-w-2xl leading-relaxed",children:_.description||"Sharpen your understanding with this curated assessment. Test questions evaluate fundamental understanding and common pitfalls."})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2",children:[(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0",children:(0,a.jsx)(u.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-bold text-[#0F172A] font-mono",children:Z}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Total Questions"})]})]}),(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-[#F59E0B] shrink-0",children:(0,a.jsx)(f.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"text-sm font-bold text-[#0F172A] font-mono",children:[_.timeLimit||10," min"]}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Time Limit"})]})]}),(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#22C55E] shrink-0",children:(0,a.jsx)(b.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"text-sm font-bold text-[#0F172A] font-mono",children:["+",W," XP"]}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Max Reward"})]})]}),(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0",children:(0,a.jsx)(g.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{className:"truncate",children:[(0,a.jsx)("div",{className:"text-sm font-bold text-[#0F172A] truncate",children:X}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Quiz Author"})]})]})]}),(0,a.jsxs)("div",{className:"pt-2 flex flex-wrap items-center gap-3",children:[(0,a.jsxs)(F.A,{variant:"primary",size:"lg",onClick:()=>{s.push(`/quizzes/${t}/play`)},className:"shadow-sm gap-2",children:[(0,a.jsx)(j.A,{className:"w-4 h-4 fill-white"}),"Start Quiz Challenge"]}),(0,a.jsxs)(F.A,{variant:"secondary",size:"lg",onClick:()=>T(!0),className:"gap-2",children:[(0,a.jsx)(v.A,{className:"w-4 h-4 text-[#2563EB]"}),"Flashcards Study"]}),(0,a.jsxs)(F.A,{variant:"secondary",size:"lg",onClick:()=>P(!0),className:"gap-2",children:[(0,a.jsx)(w.A,{className:"w-4 h-4 text-[#64748B]"}),"Export & Print"]}),(0,a.jsx)(l(),{href:"/quizzes",children:(0,a.jsx)(F.A,{variant:"ghost",size:"lg",className:"text-[#64748B] hover:text-[#0F172A]",children:"Explore More"})})]})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between border-b border-[#E2E8F0] pb-2",children:[(0,a.jsxs)("h2",{className:"text-lg font-bold text-[#0F172A] flex items-center gap-2",children:[(0,a.jsx)(u.A,{className:"w-5 h-5 text-[#2563EB]"}),"Question Outline (",Z,")"]}),(0,a.jsx)("span",{className:"text-xs text-[#64748B]",children:"Correct answers hidden before quiz"})]}),(0,a.jsx)("div",{className:"space-y-3",children:_.questions?.map((e,s)=>(0,a.jsx)(k.Zp,{className:"border-[#E2E8F0] bg-white p-4 shadow-sm",children:(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[(0,a.jsx)("span",{className:"w-6 h-6 rounded-md bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center text-xs font-bold text-[#2563EB] shrink-0 mt-0.5",children:s+1}),(0,a.jsxs)("div",{className:"space-y-2 flex-1",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-[#0F172A] leading-snug",children:e.question}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2 text-xs text-[#64748B]",children:[(0,a.jsxs)("span",{className:"px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]",children:[e.options?.length||4," Multiple Choices"]}),(0,a.jsx)("span",{className:"px-2 py-0.5 rounded bg-[#EFF6FF] border border-[#2563EB]/20 text-[#2563EB]",children:"Includes In-depth Explanation"})]})]})]})},s))})]}),(0,a.jsxs)(k.Zp,{className:"border-[#E2E8F0] bg-white shadow-sm p-6 space-y-3",children:[(0,a.jsxs)("h3",{className:"text-sm font-bold text-[#0F172A] flex items-center gap-2",children:[(0,a.jsx)(N.A,{className:"w-4 h-4 text-[#22C55E]"}),"Rules & Scoring Guidelines"]}),(0,a.jsxs)("ul",{className:"text-xs text-[#64748B] space-y-1.5 list-disc pl-5",children:[(0,a.jsxs)("li",{children:["Each correct answer awards ",(0,a.jsx)("strong",{children:"+10 XP"})," toward your profile level."]}),(0,a.jsx)("li",{children:"Finishing this quiz will maintain your daily learning streak."}),(0,a.jsx)("li",{children:"Take your time: questions test practical code comprehension and edge cases."})]})]})]}),(0,a.jsx)(I,{quiz:_,isOpen:$,onClose:()=>T(!1)}),(0,a.jsx)(U,{quiz:_,isOpen:L,onClose:()=>P(!1)})]})}},7830:(e,s,t)=>{Promise.resolve().then(t.bind(t,4389))}},e=>{e.O(0,[206,143,148,693,487,436,311,441,794,358],()=>e(e.s=7830)),_N_E=e.O()}]);