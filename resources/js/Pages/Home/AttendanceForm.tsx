import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Attendance = {
    id: number;
    member_id: string;
    date: string;
    attendance_status: string;
    created_at: string;
    updated_at: string;
};

type Member = {
    id: number;
    member_id: string;
    name: string;
    phonetic_reading: string;
    gender: string;
    birthday: string;
    start_date: string;
    end_date: string;
    attendances: Attendance[];
    created_at: string;
    updated_at: string;
};


const AttendanceForm: React.FC<{ attendanceMembers: Member[] }> = ({ attendanceMembers }) => {

    const [members, setMembers] = useState<Member[]>(attendanceMembers);
    const [Date, setDate] = useState<string>(members[0].attendances[0].date);
    const apiUrl = process.env.REACT_APP_API_URL

    const updateAttendanceStatus = async (memberId: string, date: string, newStatus: string) => {
        try {

            const response = await axios.post(`${apiUrl}/api/update-attendance`, {
                member_id: memberId,
                date: date,
                attendance_status: newStatus,
            });

            setMembers(response.data)

        } catch (error) {
            console.error('Error updating attendance status:', error);
        }
    };

    const fetchAttendance = async (selectedDate: string) => {
        try {
            const response = await axios.post(`${apiUrl}/api/date-attendance`, {
                date: selectedDate,
            });
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        if (selectedDate) {
            fetchAttendance(selectedDate);
        }
    };

    return (
        <div className="mt-6 text-center min-h-screen">
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">出席情報</span>
            </h1>
            <div className="flex items-center justify-center">
                <p className="">営業日指定</p>
                <span className="px-2"> : </span>
                <input
                    type="date"
                    value={Date}
                    onChange={handleDateChange}
                    className="border p-2 rounded"
                />
            </div>
            <div className="my-8">
                <table className="max-w-md mx-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">出欠</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.map(member => (
                            <tr className="min-w-full divide-y divide-gray-200" key={member.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><select
                                    value={member.attendances[0].attendance_status}
                                    onChange={(e) => updateAttendanceStatus(member.member_id, member.attendances[0].date, e.target.value)}
                                >
                                    <option value=""></option>
                                    <option value="出席">出席</option>
                                    <option value="欠席">欠席</option>
                                    <option value="遅刻">遅刻</option>
                                    <option value="早退">早退</option>
                                </select></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
};

export default AttendanceForm;