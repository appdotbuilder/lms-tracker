import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Metrics {
    totalLearners: number;
    activeLearners: number;
    totalStatements: number;
    recentActivity: number;
}

interface Verb {
    verb: string;
    count: number;
}

interface Statement {
    id: number;
    verb: string;
    object_name: string | null;
    statement_timestamp: string;
    learner: {
        name: string;
        learner_id: string;
    };
}

interface DailyActivity {
    date: string;
    count: number;
}

interface Props {
    metrics: Metrics;
    topVerbs: Verb[];
    recentStatements: Statement[];
    dailyActivity: DailyActivity[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ metrics, topVerbs, recentStatements, dailyActivity }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Learning MIS Dashboard" />
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📚 Learning MIS Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Comprehensive overview of learner engagement and compliance metrics</p>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">👥</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalLearners.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Learners</div>
                                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                                    {metrics.activeLearners} active
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⚡</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalStatements.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">xAPI Statements</div>
                                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Total recorded</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">📊</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.recentActivity.toLocaleString()}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Recent Activity</div>
                                <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">Last 7 days</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {Math.round((metrics.recentActivity / Math.max(metrics.totalStatements, 1)) * 100)}%
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</div>
                                <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Weekly average</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Top Learning Activities */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            🎯 Top Learning Activities
                        </h2>
                        <div className="space-y-4">
                            {topVerbs.map((verb) => {
                                const percentage = Math.round((verb.count / Math.max(metrics.totalStatements, 1)) * 100);
                                const verbEmojis: Record<string, string> = {
                                    completed: '✅',
                                    experienced: '🎯',
                                    attempted: '🔄',
                                    passed: '🏆',
                                    failed: '❌',
                                    answered: '💭',
                                    interacted: '👋',
                                };
                                
                                return (
                                    <div key={`${verb.verb}-${verb.count}`} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg">{verbEmojis[verb.verb] || '📝'}</span>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white capitalize">{verb.verb}</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">{verb.count.toLocaleString()} statements</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-gray-900 dark:text-white">{percentage}%</div>
                                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Activity Trend */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            📈 Daily Activity Trend
                        </h2>
                        <div className="h-48 flex items-end justify-between gap-1 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            {dailyActivity.slice(-14).map((day, dayIndex) => {
                                const maxCount = Math.max(...dailyActivity.map(d => d.count));
                                const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                                
                                return (
                                    <div key={day.date} className="flex-1 flex flex-col items-center">
                                        <div 
                                            className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600 cursor-pointer"
                                            style={{ height: `${height}%`, minHeight: height > 0 ? '4px' : '2px' }}
                                            title={`${day.date}: ${day.count} statements`}
                                        ></div>
                                        {dayIndex % 2 === 0 && (
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 transform rotate-45 origin-left">
                                                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                            Last 14 days of learning activity
                        </div>
                    </div>
                </div>
                
                {/* Recent Statements */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            🕒 Recent xAPI Statements
                        </h2>
                        <Link 
                            href={route('learners.index')}
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                        >
                            View All Learners →
                        </Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">Learner</th>
                                    <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">Activity</th>
                                    <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">Object</th>
                                    <th className="text-left py-2 text-gray-600 dark:text-gray-400 font-medium">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentStatements.map((statement) => {
                                    const verbEmojis: Record<string, string> = {
                                        completed: '✅',
                                        experienced: '🎯',
                                        attempted: '🔄',
                                        passed: '🏆',
                                        failed: '❌',
                                        answered: '💭',
                                        interacted: '👋',
                                    };
                                    
                                    return (
                                        <tr key={statement.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <td className="py-3">
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{statement.learner.name}</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">{statement.learner.learner_id}</div>
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <div className="flex items-center gap-2">
                                                    <span>{verbEmojis[statement.verb] || '📝'}</span>
                                                    <span className="capitalize font-medium text-gray-900 dark:text-white">{statement.verb}</span>
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <div className="text-gray-900 dark:text-white">
                                                    {statement.object_name || 'Learning Object'}
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    {new Date(statement.statement_timestamp).toLocaleString()}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    {recentStatements.length === 0 && (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">📭</div>
                            <div className="text-gray-600 dark:text-gray-400">No recent xAPI statements</div>
                            <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                Statements will appear here as learners interact with content
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Quick Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href={route('learners.index')}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        👥 Manage Learners
                    </Link>
                    <Link
                        href={route('learners.create')}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        ➕ Add New Learner
                    </Link>
                    <a
                        href={route('xapi.statements.index')}
                        className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                        ⚡ View xAPI Statements
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}