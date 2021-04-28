import { FormikConfig, FormikFormProps } from "formik";
import { ReactNode } from "react";
import { StepProps } from "../Step/types";

export interface WizardProps<T> extends Omit<FormikConfig<T>, "validationSchema"> {
    children: React.ReactElement<StepProps<T>> | React.ReactElement<StepProps<T>>[];
    resetTouchedOnStep?: boolean;
    onRenderActions: ReactNode;
    onRenderStepper?: ReactNode;
    initialStep?: number;
    formProps?: FormikFormProps;
}
