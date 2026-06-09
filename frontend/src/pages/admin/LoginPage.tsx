import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";

import { useAdmin } from "../../context/Admin/admin.hook";
import { LoginValidation, LoginValidator } from "../../validators/Login";

import Alert from "../../components/ui/Alerts/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAdmin();

  const [alert, setAlert] = useState<{
    type: "error" | "success" | "warning";
    message: string;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidator>({
    resolver: zodResolver(LoginValidation),
  });

  const onSubmit = async (data: LoginValidator) => {
    try {
      await login(data.email, data.password);
      setAlert({
        type: "success",
        message: "Login realizado com sucesso!",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error.message || "Erro ao fazer login",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/presentes");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(undefined), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 rounded-full p-4">
              <Lock className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-serif text-neutral-800 mb-2">
            Painel Admin
          </h1>
          <p className="text-neutral-500">
            Entre com suas credenciais para acessar
          </p>
        </div>

        {/* Login Card */}
        <Card className="border border-gray-200">
          <Card.Body>
            {!!alert && (
              <div className="mb-4">
                <Alert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(undefined)}
                />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-4">
                <Input
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="seu@email.com"
                  type="email"
                  register={register}
                  error={errors.email?.message}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-6">
                <Input
                  fullWidth
                  name="password"
                  label="Senha"
                  placeholder="••••••••"
                  type="password"
                  register={register}
                  error={errors.password?.message}
                  disabled={isLoading}
                />
              </div>

              <Button
                fullWidth
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Conectando..." : "Entrar"}
              </Button>
            </form>
          </Card.Body>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-neutral-500 text-sm">
            Robert & Millena — Casamento 2026
          </p>
        </div>
      </div>
    </div>
  );
}
