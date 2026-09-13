import { RegisterForm } from '@/components/auth';

export const metadata = {
  title: 'Register - Acme Dashboard',
  description: 'Create an Acme Dashboard account',
};

export default function RegisterPage() {
  return <RegisterForm className="w-full" />;
}
