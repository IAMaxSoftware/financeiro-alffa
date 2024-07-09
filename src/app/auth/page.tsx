import AuthForm from './_components/auth-form';

export default function Login() {
  return (
    <div className="flex h-screen w-full bg-gray-900 bg-cover bg-no-repeat bg-[url('../../src/assets/financeiro.png')]">
      <AuthForm />
    </div>
  );
}
