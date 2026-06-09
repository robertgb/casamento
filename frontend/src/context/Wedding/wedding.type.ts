import { Gift } from "../../services/GiftService";
import { WeddingDetails } from "../../types";

export type WeddingContextData = {
  giftsIsLoading: boolean;
  gifts: Gift[];
  setGifts: React.Dispatch<React.SetStateAction<Gift[]>>;
  weddingDetails: WeddingDetails;
  updateWeddingDetails: (details: WeddingDetails) => void;
};
