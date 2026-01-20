import { ResetPasswordForm } from '@/components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background via-blue-50 to-cyan-100 p-4">
      <div className="w-full max-w-md animate-in fade-in-50 zoom-in-95 duration-500">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
