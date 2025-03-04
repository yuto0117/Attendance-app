import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';



interface Auth {
    user: {
        id: number;
        name: string;
        employee_id: number;
        phonetic_reading: string;
        email: string,
        type: string,
        status: boolean,

    };
    token: string;
}

const App: React.FC<{ auth: Auth }> = ({ auth }) => {



    return (
        <>
            <div className="mt-6 text-center min-h-screen">
                <h2 className="text-lg font-semibold mb-4">
                    <span className="text-red-600 pr-4">メニュー</span> ログインID: {auth.user.employee_id} 名前: {auth.user.name}
                </h2>
                <div className="p-12 max-w-md mx-auto border border-gray-300 shadow rounded">
                    <div className="space-y-2 p-2 border-4 border-gray-400">
                        <Link
                            href="/attendance"
                            className="block w-full bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                        >
                            【出 欠 入 力】
                        </Link>
                        <Link
                            href="/report"
                            className="block w-full bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                        >
                            【日 報 入 力】
                        </Link>
                        <Link
                            href="/daily-report-record"
                            className="block w-full bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                        >
                            【日報照会（メンバー別）】
                        </Link>
                        <Link
                            href="/daily-report-by-date"
                            className="block w-full bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                        >
                            【日報照会（日付別）】
                        </Link>
                        <Link
                            href="/employee-master"
                            className="block w-full bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                        >
                            【社員マスターメンテナンス】
                        </Link>
                        <Link
                            href="/member-master"
                            className="block w-full bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                        >
                            【メンバーマスターメンテナンス】
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            className="block w-full bg-red-600 border border-red-600 text-center py-2 rounded text-white hover:bg-red-700 mt-4 mb-4"
                        >
                            【ログアウト】
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
};

export default App;