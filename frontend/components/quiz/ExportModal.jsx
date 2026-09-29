'use client';

import React, { useState } from 'react';
import {
  X,
  Printer,
  FileText,
  FileCode,
  Download,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { exportQuizToMarkdown, exportQuizToJSON, printQuizExam, downloadBlob } from '@/lib/exportUtils';

export default function ExportModal({ quiz, isOpen, onClose }) {
  const [includeAnswerKey, setIncludeAnswerKey] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  if (!isOpen || !quiz) return null;

  const safeFilename = (quiz.title || 'quiz')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 40);

  const handlePrint = () => {
    printQuizExam(quiz, { includeAnswerKey });
  };

  const handleDownloadMarkdown = () => {
    const md = exportQuizToMarkdown(quiz, { includeAnswers: includeAnswerKey });
    downloadBlob(md, `${safeFilename}.md`, 'text/markdown;charset=utf-8');
    triggerFeedback('markdown');
  };

  const handleDownloadJSON = () => {
    const jsonStr = exportQuizToJSON(quiz);
    downloadBlob(jsonStr, `${safeFilename}.json`, 'application/json;charset=utf-8');
    triggerFeedback('json');
  };

  const triggerFeedback = (type) => {
    setDownloadSuccess(type);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-6 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#0F172A] text-base">Export & Print Assessment</h3>
              <p className="text-xs text-[#64748B]">Export for offline study, printing, or archival</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0F172A] p-1.5"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Answer Key Toggle */}
        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#0F172A]">Include Solution & Answer Key</div>
            <div className="text-[11px] text-[#64748B]">
              Appends answer key and pedagogical breakdowns to exports
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswerKey}
              onChange={(e) => setIncludeAnswerKey(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#CBD5E1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2563EB]"></div>
          </label>
        </div>

        {/* Export Options Cards */}
        <div className="space-y-3">
          {/* 1. Print Exam / Save as PDF */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F172A]">Printable Exam Paper / PDF</div>
                <div className="text-xs text-[#64748B]">
                  Formatted A4/Letter test sheet with student name & date lines
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 shrink-0 text-xs shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </Button>
          </div>

          {/* 2. Download Markdown (.md) */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F172A]">Markdown Study Guide (.md)</div>
                <div className="text-xs text-[#64748B]">
                  Formatted for Notion, Obsidian, GitHub with answer spoilers
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadMarkdown}
              className="gap-1.5 shrink-0 text-xs"
            >
              {downloadSuccess === 'markdown' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </Button>
          </div>

          {/* 3. Download JSON (.json) */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:bg-[#F8FAFC]/50 transition-colors flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F172A]">Raw Quiz Data (.json)</div>
                <div className="text-xs text-[#64748B]">
                  Portable structured JSON schema for backup or API import
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownloadJSON}
              className="gap-1.5 shrink-0 text-xs"
            >
              {downloadSuccess === 'json' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Saved</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Zero-configuration client-side export
          </span>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
