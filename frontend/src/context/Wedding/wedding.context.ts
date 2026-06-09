import { createContext } from "react";
import { WeddingContextData } from "./wedding.type";

type CreateContext = WeddingContextData | undefined;

export const WeddingContext = createContext<CreateContext>(undefined);
