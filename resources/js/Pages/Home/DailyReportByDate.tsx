import React, { useState } from 'react';
import axios from 'axios';


type User = {
    id: number;
    name: string;
    employee_id: number;
    phonetic_reading: string;
    password: string;
    email: string;
    type: string;
    status: boolean;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
};

type Attendance = {
    id: number;
    member_id: number;
    date: string;
    attendance_status: string;
    created_at: string;
    updated_at: string;
};

type Report = {
    id: number;
    member_id: number;
    employee_id: number;
    report_date: string;
    report: string;
}

type Member = {
    id: number;
    member_id: number;
    name: string;
    phonetic_reading: string;
    gender: string;
    birthday: string;
    start_date: string;
    end_date: string;
    attendances: Attendance[];
    daily_reports: Report[];
    created_at: string;
    updated_at: string;
};

type GeneralReports = {
    id: number;
    handover_content: string;
    general_report_content: string;
    general_report_date: string;
    employee_id: number;
    created_at: string;
    updated_at: string;
};

type ApiResponse = {
    attendanceMembers: Member[];
    generalReports: GeneralReports[];
};

const DailyReportByDate: React.FC<{ attendanceMembers: Member[], employees: User[], date: string, authEmployeeId: number, generalReports: GeneralReports[] }> = ({ attendanceMembers, employees, date, authEmployeeId, generalReports }) => {

    const [members, setMembers] = useState<Member[]>(attendanceMembers);
    const [Date, setDate] = useState<string>(date);
    const [GeneralReports, setGeneralReports] = useState<GeneralReports[]>(generalReports);


    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<ApiResponse>('http://127.0.0.1:8000/api/daily-reports-by-date',
                {
                    date: Date,
                    authEmployeeId: authEmployeeId,
                },
            );

            setGeneralReports(response.data.generalReports)
            setMembers(response.data.attendanceMembers)

        }
        catch (error) {
            console.error('Error updating:', error);
        }
    };
    return (
        <div className="mt-6 text-center min-h-screen">
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">支援記録照会(日付別)</span>
            </h1>
            <div className="flex items-center justify-center mb-8 space-x-4">
                <p>営業日指定 :</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        value={Date}
                        onChange={handleDateChange}
                        className="border p-2 rounded"
                    />
                    <button type="submit" className="border p-2 rounded bg-gray-500 text-white hover:bg-gray-600">再表示</button>
                </form>
            </div>
            <table className="max-w-md mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr >
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">職員</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">全体報告</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">申し送り</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {GeneralReports?.map((GeneralReport) => {
                        const matchedEmployee = employees.find((employee) => employee.employee_id === GeneralReport.employee_id);
                        return (
                            <tr className="min-w-full divide-y divide-gray-200" key={GeneralReport.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                {matchedEmployee ? matchedEmployee.name : "該当なし"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                   {GeneralReport.general_report_content}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                   {GeneralReport.handover_content}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <table className="my-12 max-w-md mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr >
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">支援内容</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {members?.map((member) => (
                        <tr className="min-w-full divide-y divide-gray-200" key={member.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {member.name} ({member.attendances[0].attendance_status})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {member.daily_reports?.map((report) => {
                                    const matchedEmployee = employees.find((employee) => employee.employee_id === report.employee_id);
                                    return (
                                        <div key={report.employee_id} >
                                            <span className="mr-4 text-left">{matchedEmployee ? matchedEmployee.name : "該当なし"}</span>
                                            <span>{report.report}</span>
                                        </div>
                                    )
                                })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DailyReportByDate;