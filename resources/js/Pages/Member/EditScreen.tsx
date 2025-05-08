import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Errors } from '@inertiajs/core';


type Data = {
    id: number;
    name: string;
    member_id: number;
    phonetic_reading: string;
    gender: string,
    birthday: string,
    start_date: string,
    end_date: string,
}

const EditEmployeeDetails: React.FC<{ memberdata: Data }> = ({ memberdata }) => {

    const [formData, setFormData] = useState<Data>(memberdata);
    const [errors, setErrors] = useState<Errors>({});


    useEffect(() => {
        if (memberdata) {
            localStorage.setItem('currentEmployeeData', JSON.stringify(memberdata));
            setFormData(memberdata);
        } else {
            const storedData = localStorage.getItem('currentEmployeeData');
            if (storedData) {
                setFormData(JSON.parse(storedData));
            }

        }
    }, [memberdata]);

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

        router.post('/member-update-confirmation', formData, {
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
                <span className="text-red-600 pr-4">メンバーマスター</span>
            </h1>
            <h2 className="text-center">メンバー情報の変更</h2>
            <form onSubmit={submit}>
                <table className="overflow-x-auto max-w-full">
                    <thead className="min-w-full table-auto">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メンバーID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> メンバー名(かな) </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 性別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 誕生日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">開始日</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">終了日</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        <tr className="min-w-full divide-y divide-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="number"
                                    name="member_id"
                                    value={formData?.member_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.member_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.member_id}</p>
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
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData?.gender}
                                    className="mt-1 block w-full"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value='男性'>男性</option>
                                    <option value='女性'>女性</option>
                                    <option value='不明'>不明</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData?.birthday}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.birthday && (
                                    <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData?.start_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.start_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                                )}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData?.end_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.end_date && (
                                    <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                                )}
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div className="flex justify-center gap-4">
                    <button type="submit"
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