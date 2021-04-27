import { FormikConfig } from "formik";
import { ReactNode } from "react";
import { StepProps } from "../Step/types";

export interface WizardProps<T> extends FormikConfig<T> {
    children: React.ReactElement<StepProps<T>> | React.ReactElement<StepProps<T>>[];
    resetTouchedOnStep?: boolean;
    onRenderActions: ReactNode;
    onRenderStepper?: ReactNode;
    initialStep?: number;
}
