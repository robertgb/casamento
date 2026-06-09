import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import { initialWeddingDetails } from "../../config/geral";
import GiftService, { Gift } from "../../services/GiftService";
import { WeddingDetails } from "../../types";

import { WeddingContext } from "./wedding.context";

export function WeddingProvider({ children }: PropsWithChildren) {
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>(() => {
    const saved = localStorage.getItem("weddingDetails");
    return saved ? JSON.parse(saved) : initialWeddingDetails;
  });

  const [gifts, setGifts] = useState<Gift[]>([]);
  const [giftsIsLoading, setGiftsIsLoading] = useState(false);

  const getGiftList = useCallback(async () => {
    try {
      if (gifts.length > 0) return;

      setGiftsIsLoading(true);

      let attempts = 0;
      const maxAttempts = 3; // Define o número máximo de tentativas

      while (attempts < maxAttempts) {
        try {
          const response = await GiftService.index();
          setGifts(response.data);
          setGiftsIsLoading(false);
          return; // Sai da função após o sucesso
        } catch (error: any) {
          console.log("Ocorreu um erro na consulta:", error.message);
          attempts++;
          console.log("Tentativa", attempts, "de", maxAttempts);
        }
      }

      console.log(
        "Não foi possível fazer a consulta após",
        maxAttempts,
        "tentativas",
      );
      setGiftsIsLoading(false);
    } catch {
      setGiftsIsLoading(false);
    }
  }, [gifts.length]);

  useEffect(() => {
    getGiftList();
  }, [getGiftList]);

  useEffect(() => {
    localStorage.setItem("weddingDetails", JSON.stringify(weddingDetails));
  }, [weddingDetails]);

  const updateWeddingDetails = (details: WeddingDetails) => {
    setWeddingDetails(details);
  };

  const value = {
    giftsIsLoading,
    gifts,
    setGifts,
    weddingDetails,
    updateWeddingDetails,
  };

  return (
    <WeddingContext.Provider value={value}>{children}</WeddingContext.Provider>
  );
}
