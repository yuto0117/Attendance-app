import { report } from 'process';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

type CombinedData = {
    date: string;
    attendance_status?: string;
    report?: string;
    employee_id?: number;

}

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

const DailyReportRecord: React.FC<{ attendanceMembers: Member[], employees: User[] , startdate: string, enddate: string}> = ({ attendanceMembers, employees, startdate, enddate }) => {

    const [members, setMembers] = useState<Member[]>(attendanceMembers);
    const [combinedData, setCombinedData] = useState<{ [key: string]: CombinedData[][] }>({});
    const [startDate, setStartDate] = useState<string>(startdate);
    const [endDate, setEndDate] = useState<string>(enddate);
    const [memberId, setMemberId] = useState<number>();
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(members);
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setEndDate(selectedDate);
    };

    const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMemberId = Number(e.target.value);
        setMemberId(selectedMemberId);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${apiUrl}/api/daily-reports-record`, {
                startDate: startDate,
                endDate: endDate,
                memberId: memberId,
            });

            console.log(response.data);
            setMembers(response.data)

        } catch (error) {
            console.error('Error updating:', error);
        }
    };

    useEffect(() => {
        mergeData(members[0]?.attendances, members[0]?.daily_reports);
    }, [members]);

    const mergeData = (attendances: Attendance[], dailyReports: Report[]) => {
        const combined: { [key: string]: CombinedData[][] } = {};

        attendances?.forEach((attendance) => {
            const date = attendance.date;
            if (!combined[date]) {
                combined[date] = [[]];
            }
            if (!combined[date][0]) {
                combined[date][0] = [];
            }
            combined[date][0].push({
                date: date,
                attendance_status: attendance.attendance_status,
            });
        });

        dailyReports?.forEach((report) => {
            const date = report.report_date;
            if (!combined[date]) {
                combined[date] = [[]];
            }
            if (!combined[date][1]) {
                combined[date][1] = [];
            }
            combined[date][1].push({
                date: date,
                report: report.report,
                employee_id: report.employee_id,
            });
        });

        setCombinedData(combined);
    };

    return (
        <div className="mt-6 text-center min-h-screen">
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">支援記録照会(メンバー別)</span>
            </h1>
            <div className="flex items-center justify-center mb-8 space-x-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex text-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <p>営業日指定 : </p>
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                className="border p-2 rounded"
                            />
                            <span>～</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <p>メンバーid : </p>
                            <input
                                type="number"
                                value={memberId}
                                onChange={handleMemberIdChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="border p-2 rounded bg-gray-500 text-white hover:bg-gray-600">再表示</button>
                    </div>

                </form>
            </div>
            <h1 className="text-center">一覧表示 (メンバー名<span className="px-2">:</span>{members[0]?.name})</h1>
            <table className="max-w-md mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr >
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">日付</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">支援内容</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Object.keys(combinedData)?.map((date) => (
                        <tr className="min-w-full divide-y divide-gray-200" key={date}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {combinedData[date][0][0].date} {combinedData[date][0][0].attendance_status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {combinedData[date][1]?.map((report) => {
                                    const matchedEmployee = employees.find((employee) => employee.employee_id === report.employee_id);
                                    return (
                                        <div key={report.employee_id} >
                                            <span className="mr-2 text-left">{matchedEmployee ? matchedEmployee.name : "該当なし"}</span>
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

export default DailyReportRecord;