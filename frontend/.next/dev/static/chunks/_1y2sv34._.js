(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$ProtectedRoute$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth/ProtectedRoute.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$analyticsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/analyticsService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$leaderboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/leaderboardService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$aiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/aiService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$achievementService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/achievementService.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$teacher$2f$TeacherDashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/teacher/TeacherDashboard.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$StudentDashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/student/StudentDashboard.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { user, token, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [viewRole, setViewRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // 'teacher' | 'student' | null
    const [isGeneratingWeakPractice, setIsGeneratingWeakPractice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fetch real teacher classroom analytics
    const { data: teacherAnalyticsResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'teacherAnalytics',
            user?._id || user?.id
        ],
        queryFn: {
            "DashboardPage.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$analyticsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getTeacherStats(token)
        }["DashboardPage.useQuery"],
        enabled: !!isAuthenticated && !!token,
        staleTime: 1000 * 15
    });
    const effectiveRole = viewRole || (user?.role === 'teacher' ? 'teacher' : 'student');
    // Fetch real performance analytics
    const { data: analyticsResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'userAnalytics',
            user?._id || user?.id
        ],
        queryFn: {
            "DashboardPage.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$analyticsService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getUserStats(token)
        }["DashboardPage.useQuery"],
        enabled: !!isAuthenticated && !!token,
        staleTime: 1000 * 15
    });
    // Fetch real global rank details
    const { data: myRankResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'myRank',
            user?._id || user?.id
        ],
        queryFn: {
            "DashboardPage.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$leaderboardService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getMyRank(token)
        }["DashboardPage.useQuery"],
        enabled: !!isAuthenticated && !!token,
        staleTime: 1000 * 15
    });
    // Fetch real achievements & badge progression
    const { data: achievementsResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'userAchievements',
            user?._id || user?.id
        ],
        queryFn: {
            "DashboardPage.useQuery": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$achievementService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getAchievements(token)
        }["DashboardPage.useQuery"],
        enabled: !!isAuthenticated && !!token,
        staleTime: 1000 * 15
    });
    // One-Click Adaptive Practice Generator
    const handleGenerateWeakPractice = async (specificTopics)=>{
        if (isGeneratingWeakPractice) return;
        setIsGeneratingWeakPractice(true);
        try {
            const weakTopics = analyticsResponse?.data?.weakTopics || [];
            const topics = specificTopics || (weakTopics.length > 0 ? weakTopics.map((w)=>w.topic) : [
                'javascript',
                'react'
            ]);
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$aiService$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].generateWeakPractice({
                weakTopics: topics,
                difficulty: 'medium',
                numberOfQuestions: 5
            }, token);
            if (res?.quiz) {
                queryClient.invalidateQueries({
                    queryKey: [
                        'dashboardQuizzes'
                    ]
                });
                queryClient.invalidateQueries({
                    queryKey: [
                        'quizzes'
                    ]
                });
                router.push(`/quizzes/${res.quiz._id || res.quiz.id}/play`);
            }
        } catch (err) {
            alert(err.message || 'Failed to generate remedial practice quiz');
        } finally{
            setIsGeneratingWeakPractice(false);
        }
    };
    if (effectiveRole === 'teacher') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$ProtectedRoute$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$teacher$2f$TeacherDashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                teacherData: teacherAnalyticsResponse?.data,
                onSwitchToStudentView: ()=>setViewRole('student')
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.jsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.jsx",
            lineNumber: 85,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2f$ProtectedRoute$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$student$2f$StudentDashboard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            user: user,
            analyticsData: analyticsResponse?.data,
            myRankData: myRankResponse?.data,
            achievementsData: achievementsResponse?.data,
            onSwitchToTeacherView: ()=>setViewRole('teacher'),
            onGenerateWeakPractice: handleGenerateWeakPractice,
            isGeneratingWeakPractice: isGeneratingWeakPractice
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.jsx",
            lineNumber: 96,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/page.jsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "3WGPLtgrM7mZjpDbWmJdC6rCs9w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/achievementService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "achievementService",
    ()=>achievementService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/api.js [app-client] (ecmascript)");
;
const achievementService = {
    /**
   * Fetch all badges and user unlock progression
   */ getAchievements: async (token)=>{
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/achievements', {
            method: 'GET',
            headers
        });
    },
    /**
   * Manually trigger achievement evaluation
   */ evaluateAchievements: async (context = {}, token)=>{
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/achievements/evaluate', {
            method: 'POST',
            headers,
            body: JSON.stringify(context)
        });
    }
};
const __TURBOPACK__default__export__ = achievementService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/aiService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aiService",
    ()=>aiService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/api.js [app-client] (ecmascript)");
;
const aiService = {
    /**
   * Request an in-quiz conceptual hint
   */ getHint: async ({ question, options, topic }, token)=>{
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/ai/hint', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                question,
                options,
                topic
            })
        });
    },
    /**
   * Request deep pedagogical explanation and distractor analysis for a question
   */ getExplanation: async ({ question, options, correctAnswer, selectedOption, topic }, token)=>{
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/ai/explain', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                question,
                options,
                correctAnswer,
                selectedOption,
                topic
            })
        });
    },
    /**
   * Generate an aligned follow-up question testing the same concept
   */ getSimilarQuestion: async ({ question, topic, difficulty }, token)=>{
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/ai/similar-question', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                question,
                topic,
                difficulty
            })
        });
    },
    /**
   * Generate an adaptive remedial practice quiz targeting weak areas
   */ generateWeakPractice: async ({ weakTopics, difficulty = 'medium', numberOfQuestions = 5 }, token)=>{
        const headers = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/ai/weak-practice', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                weakTopics,
                difficulty,
                numberOfQuestions
            })
        });
    }
};
const __TURBOPACK__default__export__ = aiService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/analyticsService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyticsService",
    ()=>analyticsService,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/api.js [app-client] (ecmascript)");
;
const analyticsService = {
    /**
   * Get comprehensive performance analytics for current user
   */ getUserStats: async (token)=>{
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/analytics/user', {
            headers
        });
    },
    /**
   * Get aggregated classroom, quiz, and student performance metrics for Teacher Dashboard
   */ getTeacherStats: async (token)=>{
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/analytics/teacher', {
            headers
        });
    }
};
const __TURBOPACK__default__export__ = analyticsService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/leaderboardService.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "leaderboardService",
    ()=>leaderboardService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/api.js [app-client] (ecmascript)");
;
const leaderboardService = {
    /**
   * Fetch global leaderboard with optional pagination
   */ getLeaderboard: async ({ limit = 25, offset = 0 } = {})=>{
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        if (offset) params.append('offset', offset);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])(`/leaderboard?${params.toString()}`);
    },
    /**
   * Fetch current user's rank details (Requires token)
   */ getMyRank: async (token)=>{
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/leaderboard/me', {
            headers
        });
    },
    /**
   * Seed starter competitors into the leaderboard
   */ seedLeaderboard: async (token)=>{
        const headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])('/leaderboard/seed', {
            method: 'POST',
            headers
        });
    }
};
const __TURBOPACK__default__export__ = leaderboardService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1y2sv34._.js.map