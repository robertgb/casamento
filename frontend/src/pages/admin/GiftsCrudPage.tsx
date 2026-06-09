import { useCallback, useEffect, useRef, useState } from "react";

import { Edit2, Plus, Trash2 } from "lucide-react";

import GiftService, { Gift } from "../../services/GiftService";
import { GiftFormValidator } from "../../validators/GiftForm";

import Alert from "../../components/ui/Alerts/Alert";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { ModalRef } from "../../components/ui/Modal";
import AdminLayout from "../../components/admin/AdminLayout";
import GiftFormModal from "../../components/admin/GiftFormModal";

type TAlert = {
  type: "error" | "success" | "warning";
  message: string;
};

export default function GiftsCrudPage() {

  const formModalRef = useRef<ModalRef>(null);

  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<TAlert>();
  const [selectedGift, setSelectedGift] = useState<Gift | undefined>();

  const loadGifts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GiftService.index();
      setGifts(response.data ?? []);
    } catch (error: any) {
      setAlert({
        type: "error",
        message: "Erro ao carregar presentes",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGifts();
  }, [loadGifts]);

  const handleCreateClick = () => {
    setSelectedGift(undefined);
    formModalRef.current?.open();
  };

  const handleEditClick = (gift: Gift) => {
    setSelectedGift(gift);
    formModalRef.current?.open();
  };

  const handleDeleteClick = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este presente?")) {
      return;
    }

    try {
      await GiftService.delete(id);
      setAlert({
        type: "success",
        message: "Presente deletado com sucesso!",
      });
      await loadGifts();
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error.message || "Erro ao deletar presente",
      });
    }
  };

  const handleFormSubmit = async (data: GiftFormValidator) => {
    try {
      setIsSubmitting(true);

      if (selectedGift) {
        await GiftService.update(selectedGift.id, data);
        setAlert({
          type: "success",
          message: "Presente atualizado com sucesso!",
        });
      } else {
        await GiftService.create(data);
        setAlert({
          type: "success",
          message: "Presente criado com sucesso!",
        });
      }

      await loadGifts();
    } catch (error: any) {
      setAlert({
        type: "error",
        message: error.message || "Erro ao salvar presente",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(undefined), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <AdminLayout title="Presentes">
      {!!alert && (
        <div className="mb-6">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(undefined)}
          />
        </div>
      )}

      <div className="mb-6">
        <Button variant="primary" onClick={handleCreateClick}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Presente
        </Button>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : gifts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum presente cadastrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Descrição</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Preço</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reservado</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {gifts.map((gift) => (
                  <tr key={gift.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">{gift.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{gift.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      R$ {parseFloat(gift.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {gift.reserved ? (
                        <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">Sim</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Não</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(gift)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteClick(gift.id)}>
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <GiftFormModal
        ref={formModalRef}
        onSubmit={handleFormSubmit}
        isLoading={isSubmitting}
        initialData={selectedGift}
      />
    </AdminLayout>
  );
}
