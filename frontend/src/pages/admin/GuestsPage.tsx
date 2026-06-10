import { useCallback, useEffect, useState } from "react";

import GuestService, { Guest } from "../../services/GuestService";

import Alert from "../../components/ui/Alerts/Alert";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import AdminLayout from "../../components/admin/AdminLayout";

type TAlert = {
  type: "error" | "success" | "warning";
  message: string;
};

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<TAlert>();

  const loadGuests = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GuestService.index();
      setGuests(response.data ?? []);
    } catch {
      setAlert({ type: "error", message: "Erro ao carregar convidados" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGuests();
  }, [loadGuests]);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(undefined), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const confirmed = guests.filter((g) => g.confirmed).length;
  const withGift = guests.filter((g) => g.giftId !== null).length;

  return (
    <AdminLayout title="Convidados">
      {!!alert && (
        <div className="mb-6">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(undefined)}
          />
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-semibold text-gray-800">{guests.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Confirmados</p>
          <p className="text-2xl font-semibold text-sky-700">{confirmed}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Com presente reservado</p>
          <p className="text-2xl font-semibold text-primary-600">{withGift}</p>
        </div>
      </div>

      {/* Guests table */}
      <Card>
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : guests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum convidado cadastrado
          </div>
        ) : (
          <>
            {/* Mobile: card list */}
            <div className="md:hidden divide-y divide-gray-100">
              {guests.map((guest) => (
                <div key={guest.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{guest.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">#{guest.id}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Presente: {guest.gift?.name ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {guest.confirmed ? (
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">Confirmado</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-medium">Pendente</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Presença</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Presente</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    <tr key={guest.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-400">{guest.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">{guest.name}</td>
                      <td className="px-6 py-4 text-sm">
                        {guest.confirmed ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Confirmado
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                            Pendente
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {guest.gift ? (
                          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-medium">
                            {guest.gift.name}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </AdminLayout>
  );
}
