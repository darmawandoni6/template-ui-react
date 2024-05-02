'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { type SubmitHandler, useForm } from 'react-hook-form';

import Button from '@src/components/Button';
import FormInput from '@src/components/FormInput';
import Input from '@src/components/Input';

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    router.push('/');
  };

  return (
    <>
      <header>
        <h3>Sign In</h3>
        <p>Sign in to your account to start using W3CRM</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Email" error={errors.email?.message}>
          <Input placeholder="hello@example.com" {...register('email', { required: 'Required!' })} />
        </FormInput>
        <FormInput label="Password" error={errors.password?.message}>
          <Input placeholder="*****" password {...register('password', { required: 'Required!' })} />
        </FormInput>
        <div className="text-center mb-4">
          <Button type="submit" className="btn-primary">
            Sign In
          </Button>
        </div>
        <p className="text-center">
          Not registered?&nbsp;
          <Link className="btn-link" href="/register">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
