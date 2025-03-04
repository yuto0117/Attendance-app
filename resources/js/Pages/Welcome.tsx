import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />



            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <header className="w-full max-w-3xl px-6 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                        日報管理システム
                    </h1>

                </header>

                <nav className="mt-6 flex space-x-4">
                    {auth.user ? (
                        <Link
                            href={route("Home")}
                            className="rounded-lg bg-[#FF2D20] px-5 py-3 text-white transition hover:bg-[#e6261d]"
                        >
                            ホーム画面へ
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="rounded-lg border border-black px-5 py-3 text-black transition hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                            >
                                ログイン
                            </Link>
                            <Link
                                href={route("register")}
                                className="rounded-lg border border-black bg-black px-5 py-3 text-white transition hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
                            >
                                登録
                            </Link>
                        </>
                    )}
                </nav>

                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF2D20]/20 blur-3xl"></div>
                </div>
            </div>

        </>
    );
}
