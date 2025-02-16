import React, { useState, useEffect } from 'react';
import AttendanceForm from '@/Pages/Home/AttendanceForm';
import ReportForm from '@/Pages/Home/ReportForm';
import AttendanceRecord from '@/Pages/Home/DailyReportRecord';
import EmployeeMaster from '@/Pages/Home/EmployeeMaster';
import MemberMaster from '@/Pages/Home/MemberMaster';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

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
        <AuthenticatedLayout
        >
            <Head title="Dashboard" />


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
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default App;