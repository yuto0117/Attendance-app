import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { router } from '@inertiajs/react'

export default function EmployeeRegister() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        member_id: '',
        phonetic_reading: '',
        gender: '',
        birthday: '',
        start_date: '',
        end_date: '',
    });


    useEffect(() => {
        const handlePopState = (): void => {
            localStorage.removeItem('employeedata');
            localStorage.removeItem('employeeolddata');
            localStorage.removeItem('url');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('MemberConfirmation'), {
        });
    };

    const cancelRegistration = (): void => {
        router.visit('/employee-master', {
            method: 'get',
        })
    }

    return (

        <div className="mt-6 text-center min-h-screen">

            <Head title="Register" />
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">メンバーマスター</span>
            </h1>
            <h2 className="text-center">メンバー情報の登録</h2>
            <form onSubmit={submit}>
                <table className="">
                    <thead className="bg-gray-50">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバーID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー名</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">メンバー名（かな）</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">性別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">誕生日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">開始日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">終了日</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        <tr className="min-w-full divide-y divide-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="member_id"
                                    type="number"
                                    name="member_id"
                                    value={data.member_id}
                                    className="mt-1 block w-full"
                                    autoComplete="employee_id"
                                    onChange={(e) => setData('member_id', e.target.value)}
                                    required
                                    min={1}
                                />
                                <InputError message={errors.member_id} className="mt-2" /></td>
                            <td className="px-6 py-4 ">
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="phonetic_reading"
                                    name="phonetic_reading"
                                    value={data.phonetic_reading}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('phonetic_reading', e.target.value)}
                                    required
                                />
                                <InputError message={errors.phonetic_reading} className="mt-2" /></td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    id="gender"
                                    name="gender"
                                    value={data.gender}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('gender', e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="男性">男性</option>
                                    <option value="女性">女性</option>
                                    <option value="不明">不明</option>
                                </select>
                                <InputError message={errors.gender} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="birthday"
                                    type="date"
                                    name="birthday"
                                    value={data.birthday}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) => setData('birthday', e.target.value)}
                                    required
                                />
                                <InputError message={errors.birthday} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_date} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="flex justify-center gap-4">
                    <button type="submit" className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">
                        入力完了
                    </button>
                    <button
                        type="button"
                        onClick={cancelRegistration}
                        className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">
                        取り消し
                    </button>
                </div>
            </form>
        </div>

    );
}
