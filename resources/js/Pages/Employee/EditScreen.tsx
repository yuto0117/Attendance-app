import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Errors } from '@inertiajs/core';
import InputError from '@/Components/InputError';


type Data = {
    id: number;
    name: string;
    employee_id: number;
    phonetic_reading: string;
    email: string,
    type: string,
    password: number,
    password_confirmation: number,
    status: string,
}

const EditEmployeeDetails: React.FC<{ employeedata: Data }> = ({ employeedata }) => {

    const [formData, setFormData] = useState<Data>(employeedata);
    const [errors, setErrors] = useState<Errors>({});



    useEffect(() => {
        if (employeedata) {
            localStorage.setItem('currentEmployeeData', JSON.stringify(employeedata));
            setFormData(employeedata);
        } else {
            const storedData = localStorage.getItem('currentEmployeeData');
            if (storedData) {
                setFormData(JSON.parse(storedData));
            }

        }
    }, [employeedata]);

    useEffect(() => {
        const handlePopState = (): void => {
            localStorage.removeItem('currentEmployeeData');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/employee-update-confirmation', formData, {
            onError: (err) => {
                setErrors(err);
            },
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
                <span className="text-red-600 pr-4">社員マスター</span>
            </h1>
            <h2 className="text-center">社員情報の変更</h2>

            <form onSubmit={submit}>


                <table className="overflow-x-auto max-w-full">
                    <thead className="min-w-full table-auto">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 社員名(かな) </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> メールアドレス</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 種別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">パスワード</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">パスワード確認</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        <tr className="min-w-full divide-y divide-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="number"
                                    name="employee_id"
                                    value={formData?.employee_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.employee_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>
                                )}
                            </td>

                            <td className="px-6 py-4 ">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData?.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="text"
                                    name="phonetic_reading"
                                    value={formData?.phonetic_reading}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.phonetic_reading && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phonetic_reading}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData?.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="text"
                                    name="type"
                                    value={formData?.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.type && (
                                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                    id="status"
                                    name="status"
                                    value={formData?.status}
                                    className="mt-1 block w-full"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value='1'>有効</option>
                                    <option value='0'>無効</option>
                                </select>
                                {errors.status && (
                                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData?.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData?.password_confirmation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                                )}
                            </td>
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
            </form>

        </div>

    );
}
export default EditEmployeeDetails;