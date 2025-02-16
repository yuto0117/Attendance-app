import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';


type Employee = {
    id: number;
    name: string;
    employee_id: number;
    phonetic_reading: string;
    email: string,
    type: string,
    password: number,
    password_confirmation: number,
    status: boolean,
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


const EmployeeMaster: React.FC<{ auth: Auth }> = ({ auth }) => {

    const [employees, setEmployees] = useState<Employee[]>([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);


    const editEmployee = (employee: Employee): void => {
        router.visit('/employee-edit', {
            method: 'post',
            data: employee,
        })
    }

    const deleteEmployee = (employee: Employee): void => {
        router.visit('/employee-delete-confirmation', {
            method: 'post',
            data: employee,
        })
    }

    return (
        <div className="mt-6 text-center min-h-screen">
            <h1 className="text-lg mb-4">
                <span className="text-red-600 pr-4">社員マスター</span>   ログインID: {auth.user.employee_id}    名前: {auth.user.name}
            </h1>
            <h2 className="text-center">社員一覧</h2>
            <div>
                <table className="max-w-md mx-auto divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr >
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員名</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">仮名呼び</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種別</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr className="min-w-full divide-y divide-gray-200" key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.employee_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.phonetic_reading}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.status ? "有効" : "無効"}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => editEmployee(employee)} className="mr-4">変更</button></td>
                                {Number(employee.id) !== Number(auth.user.employee_id) ? <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => deleteEmployee(employee)} className="mr-4">削除</button></td>: null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center gap-4">
                <Link
                    href="/emplyee-register"
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

export default EmployeeMaster;