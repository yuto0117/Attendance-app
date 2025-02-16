import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { router } from '@inertiajs/react'


export default function EmployeeRegister() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        employee_id: '',
        phonetic_reading: '',
        password: '',
        password_confirmation: '',
        email: '',
        type: '',
        status: false,
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

        post(route('EmployeeConfirmation'), {
            onFinish: () => reset('password', 'password_confirmation'),
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

            <form onSubmit={submit}>


                <table className="">
                    <thead className="bg-gray-50">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員名(かな)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">パスワード</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">パスワード確認</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        <tr className="min-w-full divide-y divide-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="employee_id"
                                    type="number"
                                    name="employee_id"
                                    value={data.employee_id}
                                    className="mt-1 block w-full"
                                    autoComplete="employee_id"
                                    onChange={(e) => setData('employee_id', e.target.value)}
                                    required
                                    min={1}
                                />
                                <InputError message={errors.employee_id} className="mt-2" /></td>
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
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="type"
                                    name="type"
                                    value={data.type}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('type', e.target.value)}
                                    required
                                />
                                <InputError message={errors.type} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    id="status"
                                    name="status"
                                    value={data.status ? '1' : '0'}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('status', e.target.value === '1')}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="1">有効</option>
                                    <option value="0">無効</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" /></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap"> <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                                <InputError message={errors.password_confirmation} className="mt-2" /></td>
                        </tr>

                    </tbody>
                </table>

                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">
                        入力完了
                    </button>
                    <button
                        type="button"
                        onClick={cancelRegistration}
                        className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">
                        取り消し
                    </button>
                </div>
                {/* <button type="submit" className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">
                    入力完了
                </button>
                <button onClick={cancelRegistration} className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">取り消し</button> */}
            </form>
        </div>

    );
}
