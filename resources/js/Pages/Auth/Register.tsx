import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (

        <GuestLayout>

            <Head title="Register" />

            <form onSubmit={submit}>


                <div className="mt-4">
                    <InputLabel htmlFor="employee_id" value="社員ID" />
                    <TextInput
                        id="employee_id"
                        type="number"
                        name="employee_id"
                        value={data.employee_id}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('employee_id', e.target.value)}
                        required
                    />
                    <InputError message={errors.employee_id} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="社員名" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phonetic_reading" value="社員名(かな)" />
                    <TextInput
                        id="phonetic_reading"
                        name="phonetic_reading"
                        value={data.phonetic_reading}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phonetic_reading', e.target.value)}
                        required
                    />
                    <InputError message={errors.phonetic_reading} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="メールアドレス" />
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
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="type" value="種別" />
                    <TextInput
                        id="type"
                        name="type"
                        value={data.type}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('type', e.target.value)}
                        required
                    />
                    <InputError message={errors.type} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="status" value="状態" />
                    <select
                        id="status"
                        name="status"
                        value={data.status ? '1' : '0'}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('status', e.target.value === '1')}
                        required
                    >
                        <option value="1">有効</option>
                        <option value="0">無効</option>
                    </select>
                    <InputError message={errors.status} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />
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
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード確認" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>

        </GuestLayout >
    );
}
