'use client';

import React, { useState } from 'react';
import {
  ClipboardList,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Send,
  Bell,
  X,
  Calendar,
  Check,
  Filter,
  BarChart2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherAssignments({
  classesList,
  quizzesList,
}) {
  const [assignments, setAssignments] = useState([
    {
      id: 'asg_1',
      title: 'JavaScript Fundamentals Mid-Sprint',
      quizTitle: 'JavaScript Basics',
      className: 'Web Development',
      classId: 'cls_webdev',
      dueDate: '2026-09-25',
      attemptsAllowed: 2,
      timeLimitMinutes: 30,
      assignedCount: 42,
      completedCount: 31,
      inProgressCount: 6,
      notStartedCount: 5,
      shuffleQuestions: true,
      shuffleAnswers: true,
      showExplanations: true,
      status: 'active',
      studentsStatus: [
        { name: 'Rahul Kumar', email: 'rahul.k@univ.edu', status: 'completed', score: 86, timeSpent: '18m', submittedAt: 'Sep 18, 2:30 PM' },
        { name: 'Priya Sharma', email: 'priya.s@univ.edu', status: 'completed', score: 94, timeSpent: '14m', submittedAt: 'Sep 18, 4:15 PM' },
        { name: 'Alex Rivera', email: 'alex.r@univ.edu', status: 'completed', score: 88, timeSpent: '21m', submittedAt: 'Sep 19, 10:05 AM' },
        { name: 'Ananya Patel', email: 'ananya.p@univ.edu', status: 'completed', score: 96, timeSpent: '16m', submittedAt: 'Sep 19, 11:20 AM' },
        { name: 'Marcus Vance', email: 'marcus.v@univ.edu', status: 'in_progress', score: null, timeSpent: '8m', submittedAt: 'In Progress' },
        { name: 'Devon Miles', email: 'devon.m@univ.edu', status: 'not_started', score: null, timeSpent: '-', submittedAt: 'Not Started' },
        { name: 'Sofia Torres', email: 'sofia.t@univ.edu', status: 'not_started', score: null, timeSpent: '-', submittedAt: 'Not Started' },
      ],
    },
    {
      id: 'asg_2',
      title: 'Data Structures Problem Set 2',
      quizTitle: 'Binary Trees & Traversals',
      className: 'Data Structures',
      classId: 'cls_datastruct',
      dueDate: '2026-09-28',
      attemptsAllowed: 1,
      timeLimitMinutes: 25,
      assignedCount: 35,
      completedCount: 22,
      inProgressCount: 5,
      notStartedCount: 8,
      shuffleQuestions: true,
      shuffleAnswers: true,
      showExplanations: true,
      status: 'active',
      studentsStatus: [
        { name: 'Rahul Kumar', email: 'rahul.k@univ.edu', status: 'completed', score: 82, timeSpent: '20m', submittedAt: 'Sep 19, 1:10 PM' },
        { name: 'Elena Rostova', email: 'elena.r@univ.edu', status: 'completed', score: 88, timeSpent: '19m', submittedAt: 'Sep 19, 3:45 PM' },
        { name: 'Devon Miles', email: 'devon.m@univ.edu', status: 'not_started', score: null, timeSpent: '-', submittedAt: 'Not Started' },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'closed'
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reminderToast, setReminderToast] = useState('');

  // Form State
  const [formQuizTitle, setFormQuizTitle] = useState('JavaScript Basics');
  const [formClassName, setFormClassName] = useState('Web Development');
  const [formDueDate, setFormDueDate] = useState('2026-09-28');
  const [formAttempts, setFormAttempts] = useState('2');
  const [formTimeLimit, setFormTimeLimit] = useState('30');
  const [formShuffleQ, setFormShuffleQ] = useState(true);
  const [formShuffleA, setFormShuffleA] = useState(true);
  const [formShowExp, setFormShowExp] = useState(true);

  // Send Reminder
  const handleSendReminder = (studentEmail) => {
    setReminderToast(`Automated assignment reminder sent to ${studentEmail}!`);
    setTimeout(() => setReminderToast(''), 3000);
  };

  const handleSendAllReminders = () => {
    setReminderToast('Reminders dispatched to all unsubmitted learners!');
    setTimeout(() => setReminderToast(''), 3000);
  };

  // Handle Create Assignment
  const handleCreateAssignment = (e) => {
    e.preventDefault();

    const newAsg = {
      id: `asg_${Date.now()}`,
      title: `${formQuizTitle} Assignment`,
      quizTitle: formQuizTitle,
      className: formClassName,
      classId: 'cls_custom',
      dueDate: formDueDate,
      attemptsAllowed: Number(formAttempts),
      timeLimitMinutes: Number(formTimeLimit),
      assignedCount: 30,
      completedCount: 0,
      inProgressCount: 0,
      notStartedCount: 30,
      shuffleQuestions: formShuffleQ,
      shuffleAnswers: formShuffleA,
      showExplanations: formShowExp,
      status: 'active',
      studentsStatus: [
        { name: 'Rahul Kumar', email: 'rahul.k@univ.edu', status: 'not_started', score: null, timeSpent: '-', submittedAt: 'Not Started' },
        { name: 'Priya Sharma', email: 'priya.s@univ.edu', status: 'not_started', score: null, timeSpent: '-', submittedAt: 'Not Started' },
      ],
    };

    setAssignments([newAsg, ...assignments]);
    setSelectedAssignment(newAsg);
    setIsCreateModalOpen(false);
  };

  // Completion calculation
  const completionPercent = selectedAssignment
    ? Math.round((selectedAssignment.completedCount / selectedAssignment.assignedCount) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Reminder Notification Toast */}
      {reminderToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0F172A] text-white text-xs font-semibold flex items-center gap-2 shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
          <Bell className="w-4 h-4 text-[#38BDF8]" />
          <span>{reminderToast}</span>
        </div>
      )}

      {/* Header & Main CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Assignments &amp; Tracking
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Schedule cohorts, enforce time limits, and track student completion in real time.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </Button>
      </div>

      {/* Active Assignments Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((asg) => {
          const isSelected = selectedAssignment?.id === asg.id;
          const pct = Math.round((asg.completedCount / asg.assignedCount) * 100);
          return (
            <Card
              key={asg.id}
              onClick={() => setSelectedAssignment(asg)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-[#2563EB] bg-blue-50/40 shadow-md ring-2 ring-[#2563EB]/30'
                  : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs hover:shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB] border border-blue-200">
                    {asg.className}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Due {asg.dueDate}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[#0F172A]">{asg.title}</h3>
                  <span className="text-xs text-[#64748B] block mt-0.5">Quiz: {asg.quizTitle}</span>
                </div>

                {/* Progress Mini-bar */}
                <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B]">Completion</span>
                    <span className="font-bold text-[#0F172A] font-mono">{pct}% ({asg.completedCount}/{asg.assignedCount})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Assignment Real-Time Tracking Panel */}
      {selectedAssignment && (
        <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Tracking Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="primary" className="text-[10px]">
                  Real-Time Tracking
                </Badge>
                <span className="text-xs text-[#64748B]">
                  Class: <strong>{selectedAssignment.className}</strong>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                {selectedAssignment.title}
              </h3>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleSendAllReminders}
              className="gap-2 text-xs border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] self-start sm:self-auto"
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>Remind Unsubmitted Students ({selectedAssignment.notStartedCount})</span>
            </Button>
          </div>

          {/* 4 Status Breakdown Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-xs text-[#64748B] block">Total Assigned</span>
              <span className="text-2xl font-black text-[#0F172A] font-mono mt-1 block">
                {selectedAssignment.assignedCount}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs text-emerald-800 font-semibold block">Completed</span>
              <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
                {selectedAssignment.completedCount}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <span className="text-xs text-blue-800 font-semibold block">In Progress</span>
              <span className="text-2xl font-black text-[#2563EB] font-mono mt-1 block">
                {selectedAssignment.inProgressCount}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-xs text-amber-900 font-semibold block">Not Started</span>
              <span className="text-2xl font-black text-amber-700 font-mono mt-1 block">
                {selectedAssignment.notStartedCount}
              </span>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
              <span>Cohort Progress Ratio</span>
              <span className="font-mono text-[#2563EB]">{completionPercent}% Finished</span>
            </div>

            <div className="w-full h-3 rounded-full bg-[#F1F5F9] overflow-hidden flex">
              {/* Completed */}
              <div
                style={{ width: `${(selectedAssignment.completedCount / selectedAssignment.assignedCount) * 100}%` }}
                className="h-full bg-[#22C55E]"
                title="Completed"
              />
              {/* In Progress */}
              <div
                style={{ width: `${(selectedAssignment.inProgressCount / selectedAssignment.assignedCount) * 100}%` }}
                className="h-full bg-[#2563EB]"
                title="In Progress"
              />
              {/* Not Started */}
              <div
                style={{ width: `${(selectedAssignment.notStartedCount / selectedAssignment.assignedCount) * 100}%` }}
                className="h-full bg-slate-300"
                title="Not Started"
              />
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[#64748B] pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> Completed ({selectedAssignment.completedCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" /> In Progress ({selectedAssignment.inProgressCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Not Started ({selectedAssignment.notStartedCount})
              </span>
            </div>
          </div>

          {/* Student Submissions Table */}
          <div className="space-y-3 pt-2">
            <h4 className="font-extrabold text-sm text-[#0F172A]">Student Submission Status</h4>

            <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0]">
              <table className="w-full text-left text-xs text-[#0F172A]">
                <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-mono text-[10px] tracking-wider border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Score</th>
                    <th className="py-3 px-4 text-center">Time Spent</th>
                    <th className="py-3 px-4">Submission Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] bg-white font-medium">
                  {selectedAssignment.studentsStatus.map((s, idx) => {
                    let statusBadge = (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Completed
                      </span>
                    );
                    if (s.status === 'in_progress') {
                      statusBadge = (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#2563EB] border border-blue-200">
                          ⏳ In Progress
                        </span>
                      );
                    } else if (s.status === 'not_started') {
                      statusBadge = (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          ○ Not Started
                        </span>
                      );
                    }

                    return (
                      <tr key={idx} className="hover:bg-[#F8FAFC]/70 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <span className="font-bold text-[#0F172A] block">{s.name}</span>
                            <span className="text-[10px] text-[#64748B] font-mono">{s.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{statusBadge}</td>
                        <td className="py-3 px-4 text-center font-mono font-bold">
                          {s.score !== null ? (
                            <span className={s.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}>
                              {s.score}%
                            </span>
                          ) : (
                            <span className="text-[#64748B]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-[#64748B]">
                          {s.timeSpent}
                        </td>
                        <td className="py-3 px-4 text-[#64748B] text-[11px]">
                          {s.submittedAt}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {s.status === 'not_started' ? (
                            <button
                              type="button"
                              onClick={() => handleSendReminder(s.email)}
                              className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold transition-colors cursor-pointer"
                            >
                              Send Reminder
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-600 font-semibold">Recorded</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-lg text-[#0F172A]">Create Assignment</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              {/* Select Quiz */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Quiz *</label>
                <select
                  value={formQuizTitle}
                  onChange={(e) => setFormQuizTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="JavaScript Basics">JavaScript Basics (20 Qs)</option>
                  <option value="Binary Trees & Traversals">Binary Trees & Traversals (15 Qs)</option>
                  <option value="Advanced React Hooks">Advanced React Hooks (18 Qs)</option>
                  <option value="Generative AI Prompting">Generative AI Prompting (10 Qs)</option>
                </select>
              </div>

              {/* Select Class */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Class Cohort *</label>
                <select
                  value={formClassName}
                  onChange={(e) => setFormClassName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="Web Development">Web Development (42 Students)</option>
                  <option value="Data Structures">Data Structures (35 Students)</option>
                  <option value="JavaScript Mastery">JavaScript Mastery (28 Students)</option>
                  <option value="AI Fundamentals">AI Fundamentals (21 Students)</option>
                </select>
              </div>

              {/* Due Date & Attempts */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Maximum Attempts</label>
                  <select
                    value={formAttempts}
                    onChange={(e) => setFormAttempts(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    <option value="1">1 Attempt (Strict)</option>
                    <option value="2">2 Attempts</option>
                    <option value="3">3 Attempts</option>
                    <option value="99">Unlimited Practice</option>
                  </select>
                </div>
              </div>

              {/* Time Limit */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Time Limit</label>
                <select
                  value={formTimeLimit}
                  onChange={(e) => setFormTimeLimit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="15">15 Minutes</option>
                  <option value="30">30 Minutes</option>
                  <option value="45">45 Minutes</option>
                  <option value="60">60 Minutes</option>
                  <option value="0">No Time Limit</option>
                </select>
              </div>

              {/* Checkbox Options */}
              <div className="space-y-2 pt-1 border-t border-[#E2E8F0]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formShuffleQ}
                    onChange={(e) => setFormShuffleQ(e.target.checked)}
                    className="rounded text-[#2563EB]"
                  />
                  <span>Shuffle questions for each student</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formShuffleA}
                    onChange={(e) => setFormShuffleA(e.target.checked)}
                    className="rounded text-[#2563EB]"
                  />
                  <span>Shuffle answers and options</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formShowExp}
                    onChange={(e) => setFormShowExp(e.target.checked)}
                    className="rounded text-[#2563EB]"
                  />
                  <span>Show pedagogical explanations after final submission</span>
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                >
                  Assign Quiz
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
