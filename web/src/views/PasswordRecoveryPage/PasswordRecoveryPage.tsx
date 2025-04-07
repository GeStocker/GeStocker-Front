"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendPasswordResetCode, updatePassword, verifyResetCode } from '@/services/user/auth';
import { toast } from 'sonner';

const PasswordRecoveryPage = () => {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSendCode = async () => {
      if (!email) {
        setError('Por favor ingresa tu correo electrónico');
        return;
      }
  
      setIsLoading(true);
      try {
        await sendPasswordResetCode(email);
        toast.success('Código enviado a tu correo');
        setStep(2);
        setError('');
      } catch {
        toast.error('Error al enviar el código');
        setError('No pudimos enviar el código. Verifica tu correo e intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleVerifyCode = async () => {
      if (!code) {
        setError('Por favor ingresa el código recibido');
        return;
      }
  
      setIsLoading(true);
      try {
        await verifyResetCode(email, code);
        toast.success('Código verificado correctamente');
        setStep(3);
        setError('');
      } catch {
        toast.error('Código incorrecto');
        setError('El código ingresado no es válido. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleUpdatePassword = async () => {
      if (!newPassword || !confirmPassword) {
        setError('Por favor completa ambos campos');
        return;
      }
  
      if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
  
      setIsLoading(true);
      try {
        await updatePassword(email, code, newPassword);
        toast.success('Contraseña actualizada correctamente');
        router.push('/login');
      } catch {
        toast.error('Error al actualizar la contraseña');
        setError('Ocurrió un error al actualizar tu contraseña. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-custom-grisClarito p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-custom-textOscuro">
            Recuperar Contraseña
          </h2>
          <p className="mt-2 text-sm text-custom-textSubtitle">
            {step === 1 && 'Ingresa tu correo para recibir un código de verificación'}
            {step === 2 && 'Ingresa el código que enviamos a tu correo'}
            {step === 3 && 'Crea una nueva contraseña segura'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="text-red-700">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email">Correo electrónico</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 border-custom-casiNegro"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <Button
                onClick={handleSendCode}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Enviando código...' : 'Enviar código'}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="code">Código de verificación</label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1"
                  placeholder="123456"
                />
                <p className="mt-2 text-sm text-center text-custom-textSubtitle">
                  Revisa tu correo electrónico. Hemos enviado un código de 6 dígitos.
                </p>
              </div>

              <Button
                onClick={handleVerifyCode}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Verificando...' : 'Verificar código'}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword">Nueva contraseña</label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirmar nueva contraseña</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                  placeholder="••••••••"
                />
              </div>

              <Button
                onClick={handleUpdatePassword}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Actualizando...' : 'Actualizar contraseña'}
              </Button>
            </div>
          )}

          <div className="text-center text-sm">
            <button
              onClick={() => router.push('/login')}
              className="font-medium text-custom-textOscuro hover:text-custom-textSubtitle cursor-pointer"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;