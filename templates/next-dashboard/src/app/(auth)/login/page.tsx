import { LoginForm } from '@/components/auth';

export const metadata = {
  title: 'Login - Acme Dashboard',
  description: 'Login to your Acme Dashboard account',
};

export default function LoginPage() {
  return <LoginForm className="w-full" />;
}
