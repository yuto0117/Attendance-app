import React, { useState, useEffect } from 'react';
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


type GeneralReport = {
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
    generalReport: GeneralReport;
};

const ReportForm: React.FC<{ attendanceMembers: Member[], employees: User[] , generalReport: GeneralReport}> = ({ attendanceMembers, employees, generalReport}) => {

    const [members, setMembers] = useState<Member[]>(attendanceMembers);
    const [Date, setDate] = useState<string>(members[0]?.attendances[0]?.date);
    const [EmployeeId, setEmployeeId] = useState<number>(generalReport.employee_id);
    const [genelalContent, setgenelalContent] = useState<string>(generalReport.general_report_content);
    const [handoverContent, sethandoverContent] = useState<string>(generalReport.handover_content);
    const [newData, setNewData] = useState<ApiResponse | null>(null);

    

    const getEmployeeNameById = (employeeId: number) => {
        const employee = employees.find(emp => emp.employee_id === employeeId);
        return employee ? employee.name : null;
    };
    const employeeName = getEmployeeNameById(members[0]?.daily_reports[0]?.employee_id);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
    };

    const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedEmployeeId = Number(e.target.value);
        setEmployeeId(selectedEmployeeId);
    };

    const handleGenelalContent = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        setgenelalContent(e.target.value);
    };

    const handleHandoverContent = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        sethandoverContent(e.target.value);
    };


    const handleReportChange = (memberId: number, value: string) => {
        setMembers(prevMembers =>
            prevMembers.map(member => {
                if (member.member_id === memberId) {
                    const updatedReports = member.daily_reports?.map(report => {
                        if (report.member_id === memberId) {
                            return { ...report, report: value };
                        }
                        return report;
                    });
                    return { ...member, daily_reports: updatedReports };
                }
                return member;
            })
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = members.flat();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/update-reports', {
                reports: payload,
                employeeId: EmployeeId,
                generalReport: generalReport,
                genelalContent: genelalContent,
                handoverContent: handoverContent,
                date: members[0]?.attendances[0]?.date,
            });

            setMembers(response.data)

        } catch (error) {
            console.error('Error updating:', error);
        }
    };

    const handleNewDataSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<ApiResponse>('http://127.0.0.1:8000/api/employee-reports', {
                date: Date,
                employeeId: EmployeeId,
            });
            setMembers(response.data.attendanceMembers);
            setgenelalContent(response.data.generalReport.general_report_content ?? "");
            sethandoverContent(response.data.generalReport.handover_content ?? "");

        } catch (error) {
            console.error('Error updating:', error);
        }
    };
    return (
        <div className="mt-6 text-center min-h-screen">
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">日報入力</span>
            </h1>
            <h2 className="text-center">営業日 : {members[0]?.attendances[0]?.date}</h2>
            <h2 className="text-center">職員名 : {employeeName}</h2>
            <div className="flex items-center justify-center space-x-4">
                <form onSubmit={handleNewDataSubmit}>
                    <div className="flex text-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <p>営業日指定 : </p>
                            <input
                                type="date"
                                value={Date}
                                onChange={handleDateChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <p>職員コード : </p>
                            <input
                                type="number"
                                value={EmployeeId}
                                onChange={handleEmployeeIdChange}
                                className="border p-2 rounded"
                            />
                        </div>
                        <button type="submit" className="border p-2 rounded bg-gray-500 text-white hover:bg-gray-600">再表示</button>
                    </div>

                </form>
            </div>
            <div className="my-8">
                {/* <h1 className="text-center">一覧表示</h1> */}

                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <p>全体報告</p>
                            <textarea
                                value={genelalContent}
                                onChange={(e) => handleGenelalContent(e)}
                                placeholder="全体報告を記入"
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div>
                            <p>申し送り</p>
                            <textarea
                                value={handoverContent}
                                onChange={(e) => handleHandoverContent(e)}
                                placeholder="申し送りを記入"
                                className="mt-1 block w-full"
                            />
                        </div>
                    </div>
                    <table className="mt-12 max-w-md mx-auto divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー(出欠)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">支援内容</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map(member => (
                                <tr className="min-w-full divide-y divide-gray-200" key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.name} 【{member.attendances[0].attendance_status}】</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <textarea
                                            value={member.daily_reports[0]?.report}
                                            onChange={(e) => handleReportChange(member.member_id, e.target.value)}
                                            placeholder="日報を記入"
                                            className="mt-1 block w-full"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="submit" className="border p-2 rounded bg-gray-500 text-white hover:bg-gray-600">送信</button>
                </form>
            </div>

        </div>

    );
};

export default ReportForm;