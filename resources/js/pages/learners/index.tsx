import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Learner {
    id: number;
    learner_id: string;
    name: string;
    email: string;
    phone: string | null;
    status: string;
    created_at: string;
    xapi_statements_count: number;
}

interface PaginatedLearners {
    data: Learner[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    learners: PaginatedLearners;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Learners',
        href: '/learners',
    },
];

export default function LearnersIndex({ learners }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Learner Management" />
            <div className="p-6">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👥 Learner Management</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Manage learner profiles and track their learning activities
                        </p>
                    </div>
                    <Link
                        href={route('learners.create')}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        ➕ Add New Learner
                    </Link>
                </div>
                
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">👥</div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{learners.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Learners</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">✅</div>
                            <div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {learners.data.filter(l => l.status === 'active').length}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Learners</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="text-3xl mr-4">⚡</div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {learners.data.reduce((sum, learner) => sum + learner.xapi_statements_count, 0)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Total Statements</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Learners Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Learner Directory</h2>
                    </div>
                    
                    {learners.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-900">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Learner
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Contact
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Activity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Joined
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {learners.data.map((learner) => (
                                            <tr key={learner.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">{learner.name}</div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">{learner.learner_id}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-sm text-gray-900 dark:text-white">{learner.email}</div>
                                                        {learner.phone && (
                                                            <div className="text-sm text-gray-600 dark:text-gray-400">{learner.phone}</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        learner.status === 'active' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                        {learner.status === 'active' ? '✅' : '❌'} {learner.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg">⚡</span>
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {learner.xapi_statements_count} statements
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(learner.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('learners.show', learner.learner_id)}
                                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('learners.edit', learner.learner_id)}
                                                            className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {learners.last_page > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing {((learners.current_page - 1) * learners.per_page) + 1} to{' '}
                                        {Math.min(learners.current_page * learners.per_page, learners.total)} of{' '}
                                        {learners.total} results
                                    </div>
                                    <div className="flex gap-2">
                                        {learners.current_page > 1 && (
                                            <Link
                                                href={`${route('learners.index')}?page=${learners.current_page - 1}`}
                                                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {learners.current_page < learners.last_page && (
                                            <Link
                                                href={`${route('learners.index')}?page=${learners.current_page + 1}`}
                                                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No learners found</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Get started by adding your first learner to the system.
                            </p>
                            <Link
                                href={route('learners.create')}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                ➕ Add First Learner
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}