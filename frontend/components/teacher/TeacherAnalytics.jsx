'use client';

import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Target,
  Users,
  Award,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Search,
  X,
  Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherAnalytics({
  teacherData,
  onGeneratePracticeQuiz,
}) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [activeClassFilter, setActiveClassFilter] = useState('All');

  const classes = teacherData?.classes || [
    { id: 'cls_webdev', name: 'Web Development', averageScore: 87, studentsCount: 42, completionRate: 94 },
    { id: 'cls_datastruct', name: 'Data Structures', averageScore: 81, studentsCount: 35, completionRate: 89 },
    { id: 'cls_js', name: 'JavaScript Mastery', averageScore: 84, studentsCount: 28, completionRate: 92 },
    { id: 'cls_ai', name: 'AI Fundamentals', averageScore: 76, studentsCount: 21, completionRate: 85 },
  ];

  const classWeakAreas = teacherData?.classWeakAreas || [
    { topic: 'Dynamic Programming', accuracy: 58, studentCount: 28, urgency: 'high' },
    { topic: 'Graphs', accuracy: 64, studentCount: 22, urgency: 'high' },
    { topic: 'Recursion', accuracy: 71, studentCount: 16, urgency: 'medium' },
    { topic: 'Trees', accuracy: 79, studentCount: 12, urgency: 'low' },
    { topic: 'Arrays', accuracy: 91, studentCount: 4, urgency: 'mastered' },
  ];

  const studentsList = [
    {
      id: 'std_1',
      name: 'Rahul Kumar',
      email: 'rahul.k@univ.edu',
      className: 'Data Structures',
      overallScore: 86,
      quizzesCompleted: 18,
      accuracy: 89,
      strongTopics: ['Arrays', 'Strings', 'Sorting'],
      needsPractice: ['Dynamic Programming', 'Graphs'],
      quizHistory: [
        { quiz: 'Arrays & Two Pointers', score: 92, date: 'Sep 18, 2026' },
        { quiz: 'Graph Traversals', score: 68, date: 'Sep 16, 2026' },
        { quiz: 'Sorting Algorithms', score: 94, date: 'Sep 14, 2026' },
        { quiz: 'Dynamic Programming I', score: 62, date: 'Sep 10, 2026' },
      ],
    },
    {
      id: 'std_2',
      name: 'Priya Sharma',
      email: 'priya.s@univ.edu',
      className: 'Web Development',
      overallScore: 94,
      quizzesCompleted: 22,
      accuracy: 96,
      strongTopics: ['React Hooks', 'CSS Grid', 'ES6'],
      needsPractice: ['WebSockets'],
      quizHistory: [
        { quiz: 'React Hooks & State', score: 98, date: 'Sep 18, 2026' },
        { quiz: 'JavaScript Async/Await', score: 94, date: 'Sep 15, 2026' },
      ],
    },
    {
      id: 'std_3',
      name: 'Alex Rivera',
      email: 'alex.r@univ.edu',
      className: 'Web Development',
      overallScore: 88,
      quizzesCompleted: 20,
      accuracy: 91,
      strongTopics: ['Node.js', 'Express', 'JWT'],
      needsPractice: ['Docker', 'Caching'],
      quizHistory: [
        { quiz: 'Node.js Event Loop', score: 90, date: 'Sep 17, 2026' },
        { quiz: 'RESTful API Design', score: 86, date: 'Sep 14, 2026' },
      ],
    },
    {
      id: 'std_4',
      name: 'Marcus Vance',
      email: 'marcus.v@univ.edu',
      className: 'AI Fundamentals',
      overallScore: 78,
      quizzesCompleted: 15,
      accuracy: 81,
      strongTopics: ['Supervised Learning', 'Linear Algebra'],
      needsPractice: ['Backpropagation', 'Attention Mechanisms'],
      quizHistory: [
        { quiz: 'Prompt Engineering', score: 85, date: 'Sep 16, 2026' },
        { quiz: 'Neural Architectures', score: 71, date: 'Sep 12, 2026' },
      ],
    },
    {
      id: 'std_5',
      name: 'Elena Rostova',
      email: 'elena.r@univ.edu',
      className: 'Data Structures',
      overallScore: 85,
      quizzesCompleted: 17,
      accuracy: 88,
      strongTopics: ['Hash Tables', 'Stacks', 'Queues'],
      needsPractice: ['Dynamic Programming', 'Tries'],
      quizHistory: [
        { quiz: 'Hash Maps & Collisions', score: 92, date: 'Sep 17, 2026' },
        { quiz: 'Recursion Depth', score: 78, date: 'Sep 13, 2026' },
      ],
    },
  ];

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = 'ID,Name,Email,Class,Overall Score %,Quizzes Completed,Accuracy %\n';
    const rows = studentsList
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.className}",${s.overallScore},${s.quizzesCompleted},${s.accuracy}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Quizora_Class_Performance_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Students
  const filteredStudents = studentsList.filter((s) => {
    if (activeClassFilter !== 'All' && s.className !== activeClassFilter) return false;
    if (studentSearch) {
      return (
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.email.toLowerCase().includes(studentSearch.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Student Analytics &amp; Pedagogical Insights
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Detect conceptual weak topics, drill into student trajectories, and export reports.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            <Printer className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Print PDF</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleExportCSV}
            className="gap-1.5 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Class Comparison Metrics Grid */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-base text-[#0F172A]">Class Performance Comparison</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <Card
              key={cls.id}
              className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-2xs space-y-3 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A]">{cls.name}</span>
                <Badge variant={cls.averageScore >= 80 ? 'success' : 'warning'}>
                  {cls.averageScore}% Avg
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#64748B]">
                  <span>Class Mastery</span>
                  <span className="font-mono font-bold text-[#0F172A]">{cls.averageScore}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full"
                    style={{ width: `${cls.averageScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] flex justify-between text-xs text-[#64748B]">
                <span>{cls.studentsCount} Students</span>
                <span>{cls.completionRate}% Completion</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 🎯 WEAK TOPIC DETECTION & 1-CLICK PRACTICE QUIZ GENERATION */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-[#EF4444] border border-rose-200">
                <Target className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-lg text-[#0F172A]">
                Class Weak Topic Detection
              </h3>
            </div>
            <p className="text-xs text-[#64748B]">
              Quizora analyzes quiz submissions across cohorts to detect concepts below the 80% mastery threshold.
            </p>
          </div>

          <Badge variant="danger" className="self-start sm:self-auto px-3 py-1">
            Action Recommended
          </Badge>
        </div>

        {/* Weak Topics List with 1-Click Generator */}
        <div className="space-y-3.5">
          {classWeakAreas.map((item, idx) => {
            let badgeVariant = 'danger';
            let barColor = 'bg-[#EF4444]';
            if (item.accuracy >= 80) {
              badgeVariant = 'success';
              barColor = 'bg-[#22C55E]';
            } else if (item.accuracy >= 70) {
              badgeVariant = 'warning';
              barColor = 'bg-amber-500';
            }

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#0F172A]">{item.topic}</span>
                    <Badge variant={badgeVariant}>{item.accuracy}% Accuracy</Badge>
                    <span className="text-[11px] text-[#64748B]">
                      {item.studentCount} students need support
                    </span>
                  </div>

                  <div className="w-full max-w-md h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-500`}
                      style={{ width: `${item.accuracy}%` }}
                    />
                  </div>
                </div>

                {/* 1-Click Remedial Practice Quiz Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (onGeneratePracticeQuiz) {
                      onGeneratePracticeQuiz(item.topic);
                    } else {
                      alert(`Auto-generating 10 remedial questions targeting: ${item.topic}`);
                    }
                  }}
                  className="text-xs gap-1.5 bg-white hover:bg-blue-50 text-[#2563EB] border-[#BFDBFE] shrink-0 self-start sm:self-auto shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Generate Practice Quiz</span>
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 👤 INDIVIDUAL STUDENT PERFORMANCE DRILLDOWN */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <h3 className="font-extrabold text-lg text-[#0F172A]">
              Individual Student Performance
            </h3>
            <p className="text-xs text-[#64748B]">
              Click any learner to inspect their topic mastery, accuracy breakdown, and historical quiz attempts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter by class */}
            <select
              value={activeClassFilter}
              onChange={(e) => setActiveClassFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Classes</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Structures">Data Structures</option>
              <option value="AI Fundamentals">AI Fundamentals</option>
            </select>

            {/* Search student */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((s) => (
            <Card
              key={s.id}
              onClick={() => setSelectedStudent(s)}
              className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-4 rounded-2xl shadow-2xs hover:shadow-sm transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] font-bold flex items-center justify-center text-xs">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {s.name}
                    </h4>
                    <span className="text-[10px] text-[#64748B] block font-mono">{s.className}</span>
                  </div>
                </div>

                <span className="text-sm font-black font-mono text-emerald-600">
                  {s.overallScore}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1 border-t border-[#E2E8F0]">
                <div className="p-2 rounded-xl bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] block">Quizzes</span>
                  <span className="font-bold font-mono text-[#0F172A]">{s.quizzesCompleted}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#64748B] block">Accuracy</span>
                  <span className="font-bold font-mono text-[#2563EB]">{s.accuracy}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#2563EB] font-semibold pt-1">
                <span>View Full Profile</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* STUDENT PROFILE DRILLDOWN MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative">
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute right-5 top-5 p-1 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-[#E2E8F0]">
              <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white font-black text-xl flex items-center justify-center shadow-md">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0F172A]">{selectedStudent.name}</h3>
                <span className="text-xs text-[#64748B] font-mono">{selectedStudent.email} &bull; {selectedStudent.className}</span>
              </div>
            </div>

            {/* High Level Stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] text-emerald-800 font-semibold block">Overall Score</span>
                <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
                  {selectedStudent.overallScore}%
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[11px] text-[#64748B] block">Quizzes Done</span>
                <span className="text-2xl font-black text-[#0F172A] font-mono mt-1 block">
                  {selectedStudent.quizzesCompleted}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-[11px] text-blue-800 font-semibold block">Accuracy</span>
                <span className="text-2xl font-black text-[#2563EB] font-mono mt-1 block">
                  {selectedStudent.accuracy}%
                </span>
              </div>
            </div>

            {/* Strong Topics vs Needs Practice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strong Topics</span>
                </span>
                <div className="space-y-1">
                  {selectedStudent.strongTopics.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-emerald-950 font-medium">
                      <span>✓</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                  <span>Needs Practice</span>
                </span>
                <div className="space-y-1">
                  {selectedStudent.needsPractice.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-rose-950 font-medium">
                      <span>⚠</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz History */}
            <div className="space-y-2.5">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B]">
                Quiz History
              </h4>
              <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAFC] text-[#64748B] text-[10px] uppercase font-mono border-b border-[#E2E8F0]">
                    <tr>
                      <th className="py-2.5 px-3">Quiz</th>
                      <th className="py-2.5 px-3 text-center">Score</th>
                      <th className="py-2.5 px-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] font-medium">
                    {selectedStudent.quizHistory.map((h, idx) => (
                      <tr key={idx} className="hover:bg-[#F8FAFC]">
                        <td className="py-2 px-3 text-[#0F172A]">{h.quiz}</td>
                        <td className="py-2 px-3 text-center font-mono font-bold">
                          <span className={h.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}>
                            {h.score}%
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right text-[#64748B]">{h.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
