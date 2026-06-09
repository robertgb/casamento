import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Gift } from "../../services/GiftService";
import {
  GiftFormValidation,
  GiftFormValidator,
} from "../../validators/GiftForm";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal, { ModalRef } from "../ui/Modal";

interface GiftFormModalProps {
  onSubmit: (data: GiftFormValidator) => Promise<void>;
  isLoading?: boolean;
  initialData?: Gift;
}

const GiftFormModal = forwardRef<ModalRef, GiftFormModalProps>(
  ({ onSubmit: onFormSubmit, isLoading = false, initialData }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
    } = useForm<GiftFormValidator>({
      resolver: zodResolver(GiftFormValidation),
    });

    useEffect(() => {
      if (initialData) {
        setValue("name", initialData.name);
        setValue("description", initialData.description);
        setValue("price", Number(initialData.price));
        setValue("image", initialData.image);
        setValue("link", initialData.link);
      } else {
        reset();
      }
    }, [initialData, reset, setValue]);

    const onSubmit = async (data: GiftFormValidator) => {
      try {
        await onFormSubmit(data);
        reset();
        (ref as any)?.current?.close();
      } catch {
        // Erro é tratado pelo componente pai
      }
    };

    return (
      <Modal ref={ref}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {initialData ? "Editar presente" : "Novo presente"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-2">
            <Input
              fullWidth
              name="name"
              label="Nome"
              placeholder="Ex: Jogo de Cama"
              register={register}
              error={errors.name?.message}
              disabled={isLoading}
            />
          </div>

          <div className="mb-2">
            <Input
              fullWidth
              name="description"
              label="Descrição"
              placeholder="Ex: Jogo de cama king 400 fios"
              register={register}
              error={errors.description?.message}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <Input
              name="price"
              label="Preço (R$)"
              placeholder="0.00"
              type="number"
              step="0.01"
              register={register}
              error={errors.price?.message}
              disabled={isLoading}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reservado
              </label>
              <div className="rounded-md border border-gray-300 px-3 py-2 bg-gray-50">
                <input
                  type="checkbox"
                  disabled
                  className="cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <Input
              fullWidth
              name="image"
              label="URL da Imagem"
              placeholder="https://..."
              register={register}
              error={errors.image?.message}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <Input
              fullWidth
              name="link"
              label="Link do Produto"
              placeholder="https://..."
              register={register}
              error={errors.link?.message}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => (ref as any)?.current?.close()}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </Modal>
    );
  },
);

GiftFormModal.displayName = "GiftFormModal";

export default GiftFormModal;
