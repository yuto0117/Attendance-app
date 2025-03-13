import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';


type Member = {
    id: number;
    name: string;
    member_id: number;
    phonetic_reading: string;
    gender: string,
    birthday: string,
    start_date: string,
    end_date: string,
}


type Auth = {
    user: {
        id: number;
        name: string;
        employee_id: number;
        phonetic_reading: string;
        email: string,
        type: string,
        password: number,
        password_confirmation: number,
        status: boolean,

    };
    token: string;
}


const MemberMaster: React.FC<{ auth: Auth }> = ({ auth }) => {

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        axios.get('/api/member')
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);


    const editMember = (member: Member): void => {
        router.visit('/member-edit', {
            method: 'post',
            data: member,
        })
    }

    const deleteMember = (member: Member): void => {
        router.visit('/member-delete-confirmation', {
            method: 'post',
            data: member,
        })
    }

    return (
        <div className="mt-6 text-center min-h-screen">
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">メンバーマスター</span>   ログインID: {auth.user.employee_id}    名前: {auth.user.name}
            </h1>
            <h2 className="text-center">メンバー一覧</h2>
            <div>
                <table className="max-w-md mx-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバーID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー名</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー名（かな）</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">性別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">誕生日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">開始日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">終了日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {members.map(member => (
                            <tr className="min-w-full divide-y divide-gray-200" key={member.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{member.member_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{member.phonetic_reading}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{member.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{member.birthday}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{member.start_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{member.end_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => editMember(member)} className="mr-4">変更</button></td>
                                <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => deleteMember(member)} className="mr-4">削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center gap-4">
                <Link
                    href="/member-register"
                    className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                >
                    新規登録
                </Link>
                <Link
                    href="/home"
                    className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200"
                >
                    メニュー
                </Link>
            </div>
        </div>
    );
};

export default MemberMaster;