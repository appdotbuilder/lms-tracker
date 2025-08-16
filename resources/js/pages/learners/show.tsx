import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';
import { type BreadcrumbItem } from '@/types';

interface Learner {
    id: number;
    learner_id: string;
    name: string;
    email: string;
    phone: string | null;
    notes: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

interface VerbStat {
    verb: string;
    count: number;
}

interface Statement {
    id: number;
    statement_id: string;
    verb: string;
    object_name: string | null;
    object_id: string;
    statement_timestamp: string;
}

interface Props {
    learner: Learner;
    verbStats: VerbStat[];
    recentStatements: Statement[];
    [key: string]: unknown;
}

export default function ShowLearner({ learner, verbStats, recentStatements }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Learners',
            href: '/learners',
        },
        {
            title: learner.name,
            href: `/learners/${learner.learner_id}`,
        },
    ];

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${learner.name}? This action cannot be undone.`)) {
            router.delete(route('learners.destroy', learner.learner_id));
        }
    };

    const verbEmojis: Record<string, string> = {
        completed: '✅',
        experienced: '🎯',
        attempted: '🔄',
        passed: '🏆',
        failed: '❌',
        answered: '💭',
        interacted: '👋',
    };

    const totalStatements = verbStats.reduce((sum, stat) => sum + stat.count, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${learner.name} - Learner Profile`} />
            <div className="p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link
                            href={route('learners.index')}
                            className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            ← Back to Learners
                        </Link>
                    </div>
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                👤 {learner.name}
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    learner.status === 'active' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                }`}>
                                    {learner.status === 'active' ? '✅' : '❌'} {learner.status}
                                </span>
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Learner ID: {learner.learner_id}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href={route('learners.edit', learner.learner_id)}
                                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                ✏️ Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                📋 Profile Information
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                    <div className="mt-1 text-gray-900 dark:text-white">{learner.email}</div>
                                </div>
                                
                                {learner.phone && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
                                        <div className="mt-1 text-gray-900 dark:text-white">{learner.phone}</div>
                                    </div>
                                )}
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</label>
                                    <div className="mt-1 text-gray-900 dark:text-white">
                                        {new Date(learner.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                                    <div className="mt-1 text-gray-900 dark:text-white">
                                        {new Date(learner.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                
                                {learner.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</label>
                                        <div className="mt-1 text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                            {learner.notes}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Activity Summary */}
                        <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                📊 Activity Summary
                            </h2>
                            
                            <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalStatements}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total xAPI Statements</div>
                            </div>
                            
                            {verbStats.length > 0 ? (
                                <div className="space-y-3">
                                    {verbStats.map((stat) => {
                                        const percentage = Math.round((stat.count / totalStatements) * 100);
                                        return (
                                            <div key={stat.verb} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{verbEmojis[stat.verb] || '📝'}</span>
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                                        {stat.verb}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                        {stat.count}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <div className="text-2xl mb-2">📭</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">No learning activity yet</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent xAPI Statements */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                ⚡ Recent xAPI Statements
                            </h2>
                            
                            {recentStatements.length > 0 ? (
                                <div className="space-y-4">
                                    {recentStatements.map((statement) => (
                                        <div key={statement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-3">
                                                    <div className="text-2xl mt-1">
                                                        {verbEmojis[statement.verb] || '📝'}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white capitalize">
                                                            {statement.verb}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            {statement.object_name || 'Learning Object'}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                                            ID: {statement.statement_id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(statement.statement_timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📭</div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        No xAPI statements yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Learning activities will appear here as the learner interacts with content.
                                    </p>
                                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            <strong>💡 Pro tip:</strong> xAPI statements are automatically ingested when learning 
                                            systems send data to the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/xapi/statements</code> endpoint.
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}