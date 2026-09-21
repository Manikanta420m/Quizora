'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import analyticsService from '@/services/analyticsService';
import leaderboardService from '@/services/leaderboardService';
import aiService from '@/services/aiService';
import achievementService from '@/services/achievementService';
import TeacherDashboard from '@/components/teacher/TeacherDashboard';
import StudentDashboard from '@/components/student/StudentDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, token, isAuthenticated } = useAuth();
  const [viewRole, setViewRole] = useState(null); // 'teacher' | 'student' | null
  const [isGeneratingWeakPractice, setIsGeneratingWeakPractice] = useState(false);

  // Fetch real teacher classroom analytics
  const { data: teacherAnalyticsResponse } = useQuery({
    queryKey: ['teacherAnalytics', user?._id || user?.id],
    queryFn: () => analyticsService.getTeacherStats(token),
    enabled: !!isAuthenticated && !!token,
    staleTime: 1000 * 15,
  });

  const effectiveRole = viewRole || (user?.role === 'teacher' ? 'teacher' : 'student');

  // Fetch real performance analytics
  const { data: analyticsResponse } = useQuery({
    queryKey: ['userAnalytics', user?._id || user?.id],
    queryFn: () => analyticsService.getUserStats(token),
    enabled: !!isAuthenticated && !!token,
    staleTime: 1000 * 15,
  });

  // Fetch real global rank details
  const { data: myRankResponse } = useQuery({
    queryKey: ['myRank', user?._id || user?.id],
    queryFn: () => leaderboardService.getMyRank(token),
    enabled: !!isAuthenticated && !!token,
    staleTime: 1000 * 15,
  });

  // Fetch real achievements & badge progression
  const { data: achievementsResponse } = useQuery({
    queryKey: ['userAchievements', user?._id || user?.id],
    queryFn: () => achievementService.getAchievements(token),
    enabled: !!isAuthenticated && !!token,
    staleTime: 1000 * 15,
  });

  // One-Click Adaptive Practice Generator
  const handleGenerateWeakPractice = async (specificTopics) => {
    if (isGeneratingWeakPractice) return;
    setIsGeneratingWeakPractice(true);
    try {
      const weakTopics = analyticsResponse?.data?.weakTopics || [];
      const topics = specificTopics || (weakTopics.length > 0 ? weakTopics.map((w) => w.topic) : ['javascript', 'react']);
      const res = await aiService.generateWeakPractice(
        {
          weakTopics: topics,
          difficulty: 'medium',
          numberOfQuestions: 5,
        },
        token
      );
      if (res?.quiz) {
        queryClient.invalidateQueries({ queryKey: ['dashboardQuizzes'] });
        queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        router.push(`/quizzes/${res.quiz._id || res.quiz.id}/play`);
      }
    } catch (err) {
      alert(err.message || 'Failed to generate remedial practice quiz');
    } finally {
      setIsGeneratingWeakPractice(false);
    }
  };

  if (effectiveRole === 'teacher') {
    return (
      <ProtectedRoute>
        <TeacherDashboard
          teacherData={teacherAnalyticsResponse?.data}
          onSwitchToStudentView={() => setViewRole('student')}
        />
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <StudentDashboard
        user={user}
        analyticsData={analyticsResponse?.data}
        myRankData={myRankResponse?.data}
        achievementsData={achievementsResponse?.data}
        onSwitchToTeacherView={() => setViewRole('teacher')}
        onGenerateWeakPractice={handleGenerateWeakPractice}
        isGeneratingWeakPractice={isGeneratingWeakPractice}
      />
    </ProtectedRoute>
  );
}
