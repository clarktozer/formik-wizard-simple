import { createContext } from "react";
import { WizardContextProps } from "./types";

export const WizardContext = createContext<WizardContextProps>(null);
