import React, { useState, useEffect, FormEventHandler } from 'react';
import { router } from '@inertiajs/react'

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




const RegistrationConfirmation: React.FC<{ memberdata: Data, url: string, btn: string, heading: string }> = ({ memberdata, url, btn, heading }) => {

  const [data, setData] = useState<Data | undefined>(memberdata);

  useEffect(() => {
    if (memberdata) {
      localStorage.setItem('memberdata', JSON.stringify(memberdata));
      setData(memberdata);
    } else {
      const storedData = localStorage.getItem('memberdata');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [memberdata]);

  useEffect(() => {
    const handlePopState = (): void => {
      localStorage.removeItem('memberdata');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const memberRegist = (): void => {

    localStorage.removeItem('memberdata');
    localStorage.removeItem('currentEmployeeData');

    router.visit(url, {
      method: 'post',
      data: data,
    })
  }

  const cancelRegistration = (): void => {

    localStorage.removeItem('memberdata');
    localStorage.removeItem('currentEmployeeData');


    router.visit('/employee-master', {
      method: 'get',
    })
  }

  return (


    <div className="mt-6 text-center min-h-screen">
      <h1 className="text-lg mb-4">
        <span className="text-red-600 pr-4">メンバーマスター</span>
      </h1>
      <h2 className="text-center">{heading}</h2>
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="min-w-full divide-y divide-gray-200" >
            <td className="px-6 py-4 whitespace-nowrap">{data?.member_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.phonetic_reading}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.gender}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.birthday}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.start_date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{data?.end_date}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-4">
        <button onClick={memberRegist} className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">{btn}</button>
        <button onClick={cancelRegistration} className="bg-gray-100 border border-gray-400 text-center py-2 rounded hover:bg-gray-200">取り消し</button>
      </div>
    </div>

  );
}
export default RegistrationConfirmation;