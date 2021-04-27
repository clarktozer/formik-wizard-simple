import { useContext } from "react";
import { WizardContext } from "../context";

export const useWizard = () => useContext(WizardContext);
