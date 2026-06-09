import { CalendarHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ReserveGiftValidation,
  ReserveGiftValidator,
} from "../validators/ReserveGift";

import Layout from "../components/layout/Layout";
import Alert from "../components/ui/Alerts/Alert";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import GuestService from "../services/GuestService";

type TAlert = {
  type: "error" | "success" | "warning";
  message: string;
};

export default function ConfirmPresencePage() {
  const navigate = useNavigate();

  const [alert, setAlert] = useState<TAlert>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReserveGiftValidator>({
    resolver: zodResolver(ReserveGiftValidation),
  });

  const onSubmit = async (data: ReserveGiftValidator) => {
    try {
      await GuestService.create({ name: data.nome });

      setAlert({
        type: "success",
        message: "Sua presença foi confirmada com sucesso!",
      });
    } catch (error) {
      const err = error as any;
      setAlert({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Ocorreu um erro ao confirmar presença.",
      });
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(undefined), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <Layout>
      <Helmet>
        <title>Confirmar Presença — Robert & Millena</title>
        <meta
          name="description"
          content="Confirme sua presença no casamento de Robert e Millena no dia 19 de julho de 2026."
        />
      </Helmet>

      <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20 pb-12 px-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
              <CalendarHeart size={28} className="text-primary-600" />
            </div>
            <p className="font-script text-3xl text-primary-500 mb-1">
              Aguardamos você
            </p>
            <h1 className="text-3xl font-serif text-neutral-800">
              Confirmação de Presença
            </h1>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="p-8">
              {alert && (
                <Alert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(undefined)}
                />
              )}

              <p className="text-neutral-500 mb-6 leading-relaxed text-sm">
                Sua presença é muito importante para nós! Por favor, informe seu
                nome completo para confirmar sua participação. Não esqueça de
                confirmar o nome dos outros convidados da sua família.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-5">
                  <Input
                    fullWidth
                    name="nome"
                    label="Nome completo"
                    placeholder="Digite seu nome completo"
                    register={register}
                    error={errors.nome?.message}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate("/")}
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="primary"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-600 hover:bg-primary-700"
                  >
                    {isSubmitting ? "Confirmando..." : "Confirmar presença"}
                  </Button>
                </div>
              </form>
            </div>

            <div className="px-8 py-5 bg-neutral-50 border-t border-neutral-100">
              <p className="text-neutral-400 text-xs leading-relaxed">
                Se precisar ajustar sua presença ou mudar o presente, entre em
                contato conosco. Pedimos a gentileza de nos avisar com pelo
                menos um mês de antecedência.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
