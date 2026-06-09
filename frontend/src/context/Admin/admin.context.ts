import { createContext } from "react";
import { AdminContextData } from "./admin.type";

type CreateContext = AdminContextData | undefined;

export const AdminContext = createContext<CreateContext>(undefined);
