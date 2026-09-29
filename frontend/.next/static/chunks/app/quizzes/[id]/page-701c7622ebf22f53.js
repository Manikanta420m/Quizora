(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[818],{4389:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>K});var a=t(5155),i=t(2115),r=t(3321),n=t(8500),l=t.n(n),d=t(5625),o=t(4109),c=t(8934),x=t(5484),m=t(1966),p=t(5879),h=t(6272),u=t(7356),f=t(6923),b=t(6154),g=t(3744),j=t(6619),w=t(557),v=t(3565),N=t(981),y=t(4511),A=t(2886),F=t(5392),k=t(8026),E=t(3505),C=t(2831),z=t(3246),B=t(2298),q=t(9005),S=t(4962),$=t(1189),I=t(8780),P=t(6721),L=t(6827);function D({quiz:e,isOpen:s,onClose:t}){let{playSound:r}=(0,L.fA)(),[n,l]=(0,i.useState)(()=>(e?.questions||[]).map((e,s)=>({...e,cardId:`card_${s}`,originalIndex:s}))),[d,o]=(0,i.useState)(e),[c,x]=(0,i.useState)(0),[m,p]=(0,i.useState)(!1),[u,f]=(0,i.useState)(new Set);e!==d&&(o(e),l((e?.questions||[]).map((e,s)=>({...e,cardId:`card_${s}`,originalIndex:s}))),x(0),p(!1),f(new Set));let g=(0,i.useCallback)(()=>{r("flip"),p(e=>!e)},[r]),j=(0,i.useCallback)(()=>{r("click"),p(!1),x(e=>(e+1)%n.length)},[n.length,r]),v=(0,i.useCallback)(()=>{r("click"),p(!1),x(e=>(e-1+n.length)%n.length)},[n.length,r]),N=(0,i.useCallback)(()=>{r("click"),p(!1),l(e=>{let s=[...e];for(let e=s.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[s[e],s[t]]=[s[t],s[e]]}return s}),x(0)},[r]),y=(0,i.useCallback)(()=>{r("click"),e?.questions&&(p(!1),l(e.questions.map((e,s)=>({...e,cardId:`card_${s}`,originalIndex:s}))),x(0),f(new Set))},[e,r]);if((0,i.useEffect)(()=>{if(!s)return;let e=e=>{"Space"===e.code?(e.preventDefault(),g()):"ArrowRight"===e.code?(e.preventDefault(),j()):"ArrowLeft"===e.code?(e.preventDefault(),v()):"Escape"===e.code&&(e.preventDefault(),t())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[s,g,j,v,t]),!s||!n.length)return null;let A=n[c],k=A&&u.has(A.cardId),C=u.size,Q=Math.round(C/n.length*100),T=Number(A?.correctAnswer||0),M=A?.options?.[T]||"Option "+(T+1),O=String.fromCharCode(65+T);return(0,a.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200",children:(0,a.jsxs)("div",{className:"w-full max-w-3xl flex flex-col max-h-[92vh] space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100",children:(0,a.jsx)(w.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("h3",{className:"font-bold text-[#0F172A] text-base truncate max-w-[240px] sm:max-w-md",children:e.title}),(0,a.jsx)("span",{className:"text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 uppercase",children:e.topic})]}),(0,a.jsxs)("p",{className:"text-xs text-[#64748B]",children:["Card ",c+1," of ",n.length," • Flashcard Study Mode"]})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:N,title:"Shuffle Cards",className:"text-[#64748B] hover:text-[#0F172A] p-2",children:(0,a.jsx)(z.A,{className:"w-4 h-4"})}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:y,title:"Reset Mastery & Progress",className:"text-[#64748B] hover:text-[#0F172A] p-2",children:(0,a.jsx)(B.A,{className:"w-4 h-4"})}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:t,title:"Close Flashcards",className:"text-[#64748B] hover:text-[#EF4444] p-2",children:(0,a.jsx)(q.A,{className:"w-5 h-5"})})]})]}),(0,a.jsxs)("div",{className:"px-2",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between text-xs text-[#64748B] mb-1.5 font-medium",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-emerald-600 font-semibold",children:[(0,a.jsx)(b.A,{className:"w-3.5 h-3.5"}),"Mastered: ",C," of ",n.length," Cards"]}),(0,a.jsxs)("span",{children:[Q,"% Complete"]})]}),(0,a.jsx)("div",{className:"h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden",children:(0,a.jsx)("div",{className:"h-full bg-[#2563EB] transition-all duration-300",style:{width:`${Q}%`}})})]}),(0,a.jsx)("div",{onClick:g,className:"perspective-1000 w-full h-[360px] sm:h-[400px] cursor-pointer select-none group",children:(0,a.jsxs)("div",{className:`transform-style-3d relative w-full h-full duration-500 transition-transform ${m?"rotate-y-180":""}`,children:[(0,a.jsxs)("div",{className:"backface-hidden absolute inset-0 rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between shadow-xl group-hover:border-[#2563EB]/40 transition-colors",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)(E.A,{variant:"indigo",className:"text-xs font-mono",children:["Question #",c+1]}),k?(0,a.jsxs)(E.A,{variant:"success",className:"gap-1",children:[(0,a.jsx)(S.A,{className:"w-3 h-3"})," Mastered"]}):(0,a.jsx)(E.A,{variant:"default",children:"Reviewing"})]}),(0,a.jsx)("div",{className:"my-auto py-4",children:(0,a.jsx)("h4",{className:"text-xl sm:text-2xl font-bold text-[#0F172A] leading-relaxed tracking-tight",children:A.question})}),(0,a.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-[#2563EB] font-medium",children:[(0,a.jsx)($.A,{className:"w-3.5 h-3.5 animate-pulse"}),"Click or press [Space] to reveal answer"]}),(0,a.jsx)("span",{className:"hidden sm:inline",children:"Use ← / → arrow keys"})]})]}),(0,a.jsxs)("div",{className:"backface-hidden rotate-y-180 absolute inset-0 rounded-3xl bg-[#F8FAFC] border border-[#2563EB]/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full",children:[(0,a.jsx)(S.A,{className:"w-3.5 h-3.5 text-emerald-600"})," Correct Answer: (",O,")"]}),(0,a.jsxs)(E.A,{variant:"indigo",className:"text-xs font-mono",children:["Card #",c+1]})]}),(0,a.jsxs)("div",{className:"my-auto space-y-4 py-2 overflow-y-auto max-h-[220px] pr-2",children:[(0,a.jsx)("div",{className:"text-lg sm:text-xl font-bold text-[#0F172A] bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs",children:M}),A.explanation&&(0,a.jsxs)("div",{className:"text-sm text-[#111827] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs",children:[(0,a.jsxs)("div",{className:"font-semibold text-[#2563EB] text-xs uppercase tracking-wider mb-1 flex items-center gap-1",children:[(0,a.jsx)(h.A,{className:"w-3 h-3 text-[#38BDF8]"})," Concept Breakdown"]}),A.explanation]})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1.5 text-[#2563EB]",children:[(0,a.jsx)($.A,{className:"w-3.5 h-3.5"})," Click or press [Space] to flip back"]}),(0,a.jsx)("span",{className:"text-emerald-600 font-medium",children:"Ready to self-grade below"})]})]})]})}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-3 pt-1",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start",children:[(0,a.jsxs)(F.A,{variant:"secondary",size:"md",onClick:v,className:"gap-1 px-3 text-xs",children:[(0,a.jsx)(I.A,{className:"w-4 h-4"}),(0,a.jsx)("span",{children:"Previous"})]}),(0,a.jsxs)("span",{className:"text-xs text-[#64748B] font-mono px-2 font-medium",children:[c+1," / ",n.length]}),(0,a.jsxs)(F.A,{variant:"secondary",size:"md",onClick:j,className:"gap-1 px-3 text-xs",children:[(0,a.jsx)("span",{children:"Next"}),(0,a.jsx)(P.A,{className:"w-4 h-4"})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 w-full sm:w-auto justify-end",children:[(0,a.jsxs)(F.A,{variant:"secondary",size:"md",onClick:()=>{A&&(r("click"),f(e=>{let s=new Set(e);return s.delete(A.cardId),s}),p(!1),x(e=>(e+1)%n.length))},className:"gap-1.5 text-xs text-amber-700 hover:text-amber-800 border-amber-200 hover:bg-amber-50",children:[(0,a.jsx)(B.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Still Learning"})]}),(0,a.jsxs)(F.A,{variant:"primary",size:"md",onClick:()=>{A&&(r("correct"),f(e=>{let s=new Set(e);return s.add(A.cardId),s}),p(!1),x(e=>(e+1)%n.length))},className:"gap-1.5 text-xs shadow-sm",children:[(0,a.jsx)(S.A,{className:"w-4 h-4 text-white"}),(0,a.jsx)("span",{children:"Mark Mastered"})]})]})]})]})})}var Q=t(6483),T=t(9339),M=t(825),O=t(5745);let _=(e,s,t="text/plain;charset=utf-8")=>{let a=new Blob([e],{type:t}),i=URL.createObjectURL(a),r=document.createElement("a");r.href=i,r.download=s,document.body.appendChild(r),r.click(),setTimeout(()=>{document.body.removeChild(r),URL.revokeObjectURL(i)},100)};function R(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function U({quiz:e,isOpen:s,onClose:t}){let[r,n]=(0,i.useState)(!1),[l,d]=(0,i.useState)(null);if(!s||!e)return null;let o=(e.title||"quiz").toLowerCase().replace(/[^a-z0-9]+/g,"_").slice(0,40),c=e=>{d(e),setTimeout(()=>{d(null)},2500)};return(0,a.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200",children:(0,a.jsxs)("div",{className:"w-full max-w-lg bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-6 space-y-6",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between pb-3 border-b border-[#E2E8F0]",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center",children:(0,a.jsx)(v.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-bold text-[#0F172A] text-base",children:"Export & Print Assessment"}),(0,a.jsx)("p",{className:"text-xs text-[#64748B]",children:"Export for offline study, printing, or archival"})]})]}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:t,className:"text-[#64748B] hover:text-[#0F172A] p-1.5",children:(0,a.jsx)(q.A,{className:"w-5 h-5"})})]}),(0,a.jsxs)("div",{className:"p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-xs font-semibold text-[#0F172A]",children:"Include Solution & Answer Key"}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Appends answer key and pedagogical breakdowns to exports"})]}),(0,a.jsxs)("label",{className:"relative inline-flex items-center cursor-pointer",children:[(0,a.jsx)("input",{type:"checkbox",checked:r,onChange:e=>n(e.target.checked),className:"sr-only peer"}),(0,a.jsx)("div",{className:"w-9 h-5 bg-[#CBD5E1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]"})]})]}),(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0",children:(0,a.jsx)(v.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-semibold text-[#0F172A]",children:"Printable Exam Paper / PDF"}),(0,a.jsx)("div",{className:"text-xs text-[#64748B]",children:"Formatted A4/Letter test sheet with student name & date lines"})]})]}),(0,a.jsxs)(F.A,{variant:"primary",size:"sm",onClick:()=>{((e,{includeAnswerKey:s=!1}={})=>{if(!e)return;let t=window.open("","_blank","width=900,height=800");if(!t)return alert("Please allow popups for this site to open the printable exam sheet.");let a=e.title||"Examination Assessment",i=(e.topic||"General").toUpperCase(),r=(e.difficulty||"medium").toUpperCase(),n=e.timeLimit?`${e.timeLimit} Minutes`:"Untimed",l=e.questions||[],d=l.map((e,s)=>{let t=(e.options||[]).map((e,s)=>{let t=String.fromCharCode(65+s);return`
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
            ${l.map((e,s)=>{let t=Number(e.correctAnswer),a=String.fromCharCode(65+t),i=e.options?.[t]||"",r=e.explanation||"Direct curriculum standard.";return`
                <tr>
                  <td><strong>${s+1}</strong></td>
                  <td><span class="key-badge">${a}</span></td>
                  <td>${R(i)}</td>
                  <td class="expl-text">${R(r)}</td>
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
          <span class="exam-badges">${R(i)} &bull; ${R(r)}</span>
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
  `;t.document.open(),t.document.write(c),t.document.close()})(e,{includeAnswerKey:r})},className:"gap-1.5 shrink-0 text-xs shadow-xs",children:[(0,a.jsx)(v.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Print / PDF"})]})]}),(0,a.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0",children:(0,a.jsx)(Q.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-semibold text-[#0F172A]",children:"Markdown Study Guide (.md)"}),(0,a.jsx)("div",{className:"text-xs text-[#64748B]",children:"Formatted for Notion, Obsidian, GitHub with answer spoilers"})]})]}),(0,a.jsx)(F.A,{variant:"secondary",size:"sm",onClick:()=>{_(((e,{includeAnswers:s=!0}={})=>{if(!e)return"";let t=e.title||"Untitled Quiz",a=e.topic||"General",i=(e.difficulty||"medium").toUpperCase(),r=e.timeLimit?`${e.timeLimit} minutes`:"Untimed",n=e.questions||[],l=`# 📝 ${t}

`;return l+=`> **Topic:** ${a} | **Difficulty:** ${i} | **Time Limit:** ${r} | **Total Questions:** ${n.length}

`,e.description&&(l+=`${e.description}

`),l+=`---

## Questions

`,n.forEach((e,t)=>{l+=`### ${t+1}. ${e.question}

`;let a=e.options||[],i=Number(e.correctAnswer);a.forEach((e,t)=>{let a=String.fromCharCode(65+t);s&&t===i?l+=`- [x] **(${a})** ${e} *(Correct Answer)*
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
`,n.forEach((e,s)=>{let t=Number(e.correctAnswer),a=String.fromCharCode(65+t),i=e.options?.[t]||"";l+=`| ${s+1} | **${a}** | ${i} |
`}),l+=`
`),l+=`---
*Generated by Quizora AI Platform*
`})(e,{includeAnswers:r}),`${o}.md`,"text/markdown;charset=utf-8"),c("markdown")},className:"gap-1.5 shrink-0 text-xs",children:"markdown"===l?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(T.A,{className:"w-3.5 h-3.5 text-emerald-600"}),(0,a.jsx)("span",{className:"text-emerald-600",children:"Saved"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(M.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Download"})]})})]}),(0,a.jsxs)("div",{className:"p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0",children:(0,a.jsx)(O.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-semibold text-[#0F172A]",children:"Raw Quiz Data (.json)"}),(0,a.jsx)("div",{className:"text-xs text-[#64748B]",children:"Portable structured JSON schema for backup or API import"})]})]}),(0,a.jsx)(F.A,{variant:"secondary",size:"sm",onClick:()=>{_(e?JSON.stringify({title:e.title,description:e.description,topic:e.topic,difficulty:e.difficulty,timeLimit:e.timeLimit,sourceType:e.sourceType,exportedAt:new Date().toISOString(),questions:(e.questions||[]).map(e=>({question:e.question,options:e.options,correctAnswer:e.correctAnswer,explanation:e.explanation}))},null,2):"{}",`${o}.json`,"application/json;charset=utf-8"),c("json")},className:"gap-1.5 shrink-0 text-xs",children:"json"===l?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(T.A,{className:"w-3.5 h-3.5 text-emerald-600"}),(0,a.jsx)("span",{className:"text-emerald-600",children:"Saved"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(M.A,{className:"w-3.5 h-3.5"}),(0,a.jsx)("span",{children:"Download"})]})})]})]}),(0,a.jsxs)("div",{className:"pt-2 flex items-center justify-between text-xs text-slate-500",children:[(0,a.jsxs)("span",{className:"flex items-center gap-1 text-slate-400",children:[(0,a.jsx)(h.A,{className:"w-3.5 h-3.5 text-purple-400"}),"Zero-configuration client-side export"]}),(0,a.jsx)(F.A,{variant:"ghost",size:"sm",onClick:t,className:"text-xs",children:"Done"})]})]})})}let G={easy:"success",medium:"warning",hard:"danger"};function K(){let e=(0,r.useParams)(),s=(0,r.useRouter)(),t=e?.id,{user:n,token:z}=(0,y.As)(),B=(0,d.jE)(),[q,S]=(0,i.useState)(null),[$,I]=(0,i.useState)(!1),[P,L]=(0,i.useState)(!1),{data:Q,isLoading:T,isError:M,error:O}=(0,o.I)({queryKey:["quiz",t],queryFn:()=>C.A.getQuizById(t),enabled:!!t}),_=Q?.quiz,R=_?.userId?._id||_?.userId?.id||_?.userId,K=n?._id||n?.id,Z=K&&(K===R||n?.role==="admin"),H=(0,c.n)({mutationFn:()=>C.A.deleteQuiz(t,z),onSuccess:()=>{B.invalidateQueries({queryKey:["quizzes"]}),s.push("/quizzes")},onError:e=>{S({text:e.message||"Failed to delete quiz",type:"error"})}});if(T)return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-transparent text-[#111827]",children:[(0,a.jsx)(A.A,{}),(0,a.jsxs)("main",{className:"flex-1 max-w-4xl w-full mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4",children:[(0,a.jsx)("div",{className:"w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin"}),(0,a.jsx)("p",{className:"text-xs text-[#64748B]",children:"Loading quiz details and questions..."})]})]});if(M||!_)return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-transparent text-[#111827]",children:[(0,a.jsx)(A.A,{}),(0,a.jsxs)("main",{className:"flex-1 max-w-xl w-full mx-auto px-4 py-16 text-center space-y-4",children:[(0,a.jsx)("div",{className:"w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-[#EF4444]",children:(0,a.jsx)(x.A,{className:"w-7 h-7"})}),(0,a.jsx)("h2",{className:"text-2xl font-bold text-[#0F172A]",children:"Quiz Not Found"}),(0,a.jsx)("p",{className:"text-sm text-[#64748B]",children:O?.message||"The quiz you are looking for doesn't exist or has been removed."}),(0,a.jsx)(l(),{href:"/quizzes",children:(0,a.jsxs)(F.A,{variant:"secondary",size:"md",children:[(0,a.jsx)(m.A,{className:"w-4 h-4"}),"Back to Catalog"]})})]})]});let J=_.questions?.length||0,X=10*J,Y=_.userId?.name||"Community Contributor";return(0,a.jsxs)("div",{className:"min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/20",children:[(0,a.jsx)(A.A,{}),q&&(0,a.jsx)("div",{className:"fixed bottom-6 right-6 z-50 animate-bounce",children:(0,a.jsxs)("div",{className:"flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-rose-50 border-rose-300 text-rose-800 text-sm font-medium",children:[(0,a.jsx)(x.A,{className:"w-4 h-4 text-[#EF4444]"}),(0,a.jsx)("span",{children:q.text})]})}),(0,a.jsxs)("main",{className:"flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)(l(),{href:"/quizzes",className:"inline-flex items-center gap-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors",children:[(0,a.jsx)(m.A,{className:"w-4 h-4"}),"Back to Quiz Catalog"]}),Z&&(0,a.jsxs)(F.A,{variant:"danger",size:"sm",onClick:()=>{confirm("Are you sure you want to permanently delete this quiz?")&&H.mutate()},isLoading:H.isPending,className:"text-xs gap-1.5",children:[(0,a.jsx)(p.A,{className:"w-3.5 h-3.5"}),"Delete Quiz"]})]}),(0,a.jsxs)(k.Zp,{className:"border-[#E2E8F0] bg-white shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden",children:[(0,a.jsx)("div",{className:"absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-30 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]",style:{backgroundImage:"url('/images/hero-bg.jpg')"},"aria-hidden":"true"}),(0,a.jsxs)("div",{className:"flex flex-wrap items-center gap-2.5 relative z-10",children:[(0,a.jsx)("span",{className:"text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20",children:_.topic}),(0,a.jsx)(E.A,{variant:G[_.difficulty]||"default",className:"capitalize",children:_.difficulty}),"ai"===_.sourceType&&(0,a.jsxs)(E.A,{variant:"ai",className:"gap-1",children:[(0,a.jsx)(h.A,{className:"w-3 h-3 text-[#2563EB]"}),"AI Generated"]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("h1",{className:"text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight",children:_.title}),(0,a.jsx)("p",{className:"text-base text-[#64748B] max-w-2xl leading-relaxed",children:_.description||"Sharpen your understanding with this curated assessment. Test questions evaluate fundamental understanding and common pitfalls."})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2",children:[(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0",children:(0,a.jsx)(u.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"text-sm font-bold text-[#0F172A] font-mono",children:J}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Total Questions"})]})]}),(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-[#F59E0B] shrink-0",children:(0,a.jsx)(f.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"text-sm font-bold text-[#0F172A] font-mono",children:[_.timeLimit||10," min"]}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Time Limit"})]})]}),(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#22C55E] shrink-0",children:(0,a.jsx)(b.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"text-sm font-bold text-[#0F172A] font-mono",children:["+",X," XP"]}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Max Reward"})]})]}),(0,a.jsxs)("div",{className:"p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3",children:[(0,a.jsx)("div",{className:"w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0",children:(0,a.jsx)(g.A,{className:"w-5 h-5"})}),(0,a.jsxs)("div",{className:"truncate",children:[(0,a.jsx)("div",{className:"text-sm font-bold text-[#0F172A] truncate",children:Y}),(0,a.jsx)("div",{className:"text-[11px] text-[#64748B]",children:"Quiz Author"})]})]})]}),(0,a.jsxs)("div",{className:"pt-2 flex flex-wrap items-center gap-3",children:[(0,a.jsxs)(F.A,{variant:"primary",size:"lg",onClick:()=>{s.push(`/quizzes/${t}/play`)},className:"shadow-sm gap-2",children:[(0,a.jsx)(j.A,{className:"w-4 h-4 fill-white"}),"Start Quiz Challenge"]}),(0,a.jsxs)(F.A,{variant:"secondary",size:"lg",onClick:()=>I(!0),className:"gap-2",children:[(0,a.jsx)(w.A,{className:"w-4 h-4 text-[#2563EB]"}),"Flashcards Study"]}),(0,a.jsxs)(F.A,{variant:"secondary",size:"lg",onClick:()=>L(!0),className:"gap-2",children:[(0,a.jsx)(v.A,{className:"w-4 h-4 text-[#64748B]"}),"Export & Print"]}),(0,a.jsx)(l(),{href:"/quizzes",children:(0,a.jsx)(F.A,{variant:"ghost",size:"lg",className:"text-[#64748B] hover:text-[#0F172A]",children:"Explore More"})})]})]}),(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between border-b border-[#E2E8F0] pb-2",children:[(0,a.jsxs)("h2",{className:"text-lg font-bold text-[#0F172A] flex items-center gap-2",children:[(0,a.jsx)(u.A,{className:"w-5 h-5 text-[#2563EB]"}),"Question Outline (",J,")"]}),(0,a.jsx)("span",{className:"text-xs text-[#64748B]",children:"Correct answers hidden before quiz"})]}),(0,a.jsx)("div",{className:"space-y-3",children:_.questions?.map((e,s)=>(0,a.jsx)(k.Zp,{className:"border-[#E2E8F0] bg-white p-4 shadow-sm",children:(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[(0,a.jsx)("span",{className:"w-6 h-6 rounded-md bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center text-xs font-bold text-[#2563EB] shrink-0 mt-0.5",children:s+1}),(0,a.jsxs)("div",{className:"space-y-2 flex-1",children:[(0,a.jsx)("h3",{className:"text-sm font-semibold text-[#0F172A] leading-snug",children:e.question}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2 text-xs text-[#64748B]",children:[(0,a.jsxs)("span",{className:"px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]",children:[e.options?.length||4," Multiple Choices"]}),(0,a.jsx)("span",{className:"px-2 py-0.5 rounded bg-[#EFF6FF] border border-[#2563EB]/20 text-[#2563EB]",children:"Includes In-depth Explanation"})]})]})]})},s))})]}),(0,a.jsxs)(k.Zp,{className:"border-[#E2E8F0] bg-white shadow-sm p-6 space-y-3",children:[(0,a.jsxs)("h3",{className:"text-sm font-bold text-[#0F172A] flex items-center gap-2",children:[(0,a.jsx)(N.A,{className:"w-4 h-4 text-[#22C55E]"}),"Rules & Scoring Guidelines"]}),(0,a.jsxs)("ul",{className:"text-xs text-[#64748B] space-y-1.5 list-disc pl-5",children:[(0,a.jsxs)("li",{children:["Each correct answer awards ",(0,a.jsx)("strong",{children:"+10 XP"})," toward your profile level."]}),(0,a.jsx)("li",{children:"Finishing this quiz will maintain your daily learning streak."}),(0,a.jsx)("li",{children:"Take your time: questions test practical code comprehension and edge cases."})]})]})]}),(0,a.jsx)(D,{quiz:_,isOpen:$,onClose:()=>I(!1)}),(0,a.jsx)(U,{quiz:_,isOpen:P,onClose:()=>L(!1)})]})}},7830:(e,s,t)=>{Promise.resolve().then(t.bind(t,4389))}},e=>{e.O(0,[206,143,674,301,641,47,441,794,358],()=>e(e.s=7830)),_N_E=e.O()}]);