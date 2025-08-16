import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';
import { type BreadcrumbItem } from '@/types';

interface LearnerFormData {
    learner_id: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
    status: string;
    [key: string]: string;
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
    {
        title: 'Create',
        href: '/learners/create',
    },
];

export default function CreateLearner() {
    const { data, setData, post, processing, errors } = useForm<LearnerFormData>({
        learner_id: '',
        name: '',
        email: '',
        phone: '',
        notes: '',
        status: 'active'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('learners.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Learner" />
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
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">➕ Add New Learner</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Create a new learner profile to track their learning activities
                    </p>
                </div>

                {/* Form */}
                <div className="max-w-2xl">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="space-y-6">
                            {/* Learner ID */}
                            <div>
                                <label htmlFor="learner_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Learner ID *
                                </label>
                                <input
                                    type="text"
                                    id="learner_id"
                                    value={data.learner_id}
                                    onChange={(e) => setData('learner_id', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., LRN-12345 or student@university.edu"
                                />
                                {errors.learner_id && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.learner_id}</div>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Enter learner's full name"
                                />
                                {errors.name && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="learner@example.com"
                                />
                                {errors.email && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</div>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Optional phone number"
                                />
                                {errors.phone && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="active">✅ Active</option>
                                    <option value="inactive">❌ Inactive</option>
                                </select>
                                {errors.status && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</div>
                                )}
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    rows={4}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Optional notes about the learner..."
                                />
                                {errors.notes && (
                                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.notes}</div>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Link
                                href={route('learners.index')}
                                className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Creating...' : '✅ Create Learner'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}