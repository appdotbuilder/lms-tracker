import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Learning Management Information System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-gray-900 dark:to-blue-900 dark:text-[#EDEDEC]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-md border border-blue-200 bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
                            >
                                📊 Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-md border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-6xl flex-col lg:flex-row lg:gap-12">
                        {/* Hero Section */}
                        <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
                            <h1 className="mb-6 text-4xl lg:text-6xl font-bold leading-tight">
                                📚 Learning MIS
                                <span className="block text-blue-600 dark:text-blue-400">Management Made Simple</span>
                            </h1>
                            <p className="mb-8 text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                Comprehensive Management Information System for tracking learner data, 
                                monitoring xAPI statements, and ensuring compliance with educational standards.
                            </p>
                            
                            {/* Key Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <div className="text-2xl">👥</div>
                                    <div>
                                        <div className="font-semibold">Learner Profiles</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Manage comprehensive learner data</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <div className="text-2xl">⚡</div>
                                    <div>
                                        <div className="font-semibold">xAPI Integration</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Real-time learning activity tracking</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <div className="text-2xl">📊</div>
                                    <div>
                                        <div className="font-semibold">Compliance Dashboard</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Key metrics and engagement views</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <div className="text-2xl">🔒</div>
                                    <div>
                                        <div className="font-semibold">Secure & Compliant</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Built for compliance officers</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            📊 View Dashboard
                                        </Link>
                                        <Link
                                            href={route('learners.index')}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            👥 Manage Learners
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-white font-medium text-lg hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            🚀 Get Started
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-4 text-gray-700 font-medium text-lg hover:bg-gray-50 transition-colors duration-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            🔑 Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        {/* Visual Preview */}
                        <div className="flex-1 lg:max-w-xl">
                            <div className="relative">
                                {/* Dashboard Preview */}
                                <div className="rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                                    <div className="mb-4 flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                        <div className="ml-auto text-sm font-medium text-gray-600 dark:text-gray-400">MIS Dashboard</div>
                                    </div>
                                    
                                    {/* Metrics Cards */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-900/20">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Learners</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg dark:bg-green-900/20">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">8,592</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">xAPI Statements</div>
                                        </div>
                                    </div>
                                    
                                    {/* Activity Chart Placeholder */}
                                    <div className="mb-4">
                                        <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Recent Activity</div>
                                        <div className="h-20 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-md dark:from-blue-800 dark:to-indigo-800 flex items-end justify-around p-2">
                                            <div className="w-3 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                                            <div className="w-3 bg-blue-500 rounded-t" style={{height: '40%'}}></div>
                                            <div className="w-3 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
                                            <div className="w-3 bg-blue-500 rounded-t" style={{height: '55%'}}></div>
                                            <div className="w-3 bg-blue-500 rounded-t" style={{height: '75%'}}></div>
                                            <div className="w-3 bg-blue-500 rounded-t" style={{height: '45%'}}></div>
                                        </div>
                                    </div>
                                    
                                    {/* Common Verbs */}
                                    <div>
                                        <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Top Learning Activities</div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">✅ Completed</span>
                                                <span className="font-medium">45%</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">🎯 Experienced</span>
                                                <span className="font-medium">32%</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">🔄 Attempted</span>
                                                <span className="font-medium">23%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-blue-200 opacity-20 dark:bg-blue-800"></div>
                                <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-indigo-200 opacity-20 dark:bg-indigo-800"></div>
                            </div>
                        </div>
                    </main>
                </div>
                
                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Empowering compliance officers with intuitive learning analytics</p>
                    <p className="mt-2">Built with ❤️ by{" "}
                        <a 
                            href="https://app.build" 
                            target="_blank" 
                            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            app.build
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}