'use client';

import { type SubmitHandler, useForm } from 'react-hook-form';

import Button from '@src/components/Button';
import FormInput from '@src/components/FormInput';
import Input from '@src/components/Input';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>();

  const onSubmit: SubmitHandler<TRegister> = (data) => console.log(data);

  return (
    <>
      <header>
        <h3>Sign up your account</h3>
        <p>Sign in to your account to start using W3CRM</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Username" error={errors.username?.message}>
          <Input placeholder="hello11" {...register('username', { required: 'Required!' })} />
        </FormInput>
        <FormInput label="Email" error={errors.email?.message}>
          <Input placeholder="hello@example.com" {...register('email', { required: 'Required!' })} />
        </FormInput>
        <FormInput label="Password" error={errors.password?.message}>
          <Input placeholder="*****" password {...register('password', { required: 'Required!' })} />
        </FormInput>
        <div className="text-center mb-4">
          <Button type="submit" className="btn-primary">
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
