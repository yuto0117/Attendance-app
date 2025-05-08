import React, { useState, useEffect, FormEventHandler } from 'react';
import { router } from '@inertiajs/react'

type Data = {
  id: number;
  name: string;
  employee_id: number;
  phonetic_reading: string;
  email: string;
  type: string;
  password: number;
  password_confirmation: number;
  status: boolean;
}



const RegistrationConfirmation: React.FC<{ employeedata: Data, url: string, btn: string, heading: string }> = ({ employeedata, url, btn, heading }) => {

  const [data, setData] = useState<Data | undefined>(employeedata);
  
  useEffect(() => {
    if (employeedata) {
      localStorage.setItem('employeedata', JSON.stringify(employeedata));
      setData(employeedata);
    } else {
      const storedData = localStorage.getItem('employeedata');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [employeedata]);

  useEffect(() => {
    const handlePopState = (): void => {
      localStorage.removeItem('employeedata');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const employeeRegist = (): void => {

    localStorage.removeItem('employeedata');
    localStorage.removeItem('currentEmployeeData');
    router.visit(url, {
      method: 'post',
      data: data,
    })
  }

  const cancelRegistration = (): void => {

    localStorage.removeItem('employeedata');
    localStorage.removeItem('currentEmployeeData');


    router.visit('/employee-master', {
      method: 'get',
    })
  }

  return (


    <div className="mt-6 text-center min-h-screen">
      <h1 className="text-lg mb-4">
        <span className="text-red-600 pr-4">社員マスター</span>
      </h1>
      <h2 className="text-center">{heading}</h2>
      <table className="max-w-md mx-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr >
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">社員名</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">仮名呼び</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種別</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="min-w-full divide-y divide-gray-200" >
            <td className="px-6 py-4 whitespace-nowrap">{data?.employee_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.phonetic_reading}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.type}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.status === true ? "有効" : "無効"}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-4">
        <button onClick={employeeRegist} className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">{btn}</button>
        <button onClick={cancelRegistration} className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">取り消し</button>
      </div>
    </div>

  );
}
export default RegistrationConfirmation;