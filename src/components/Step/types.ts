import { FormikHelpers } from "formik";
import React from "react";

export interface StepProps<T> {
    onSubmit?: (values: T, helpers: FormikHelpers<T>, currentStep: number) => Promise<void> | void;
    children?: React.ReactNode;
    validationSchema?: any;
    id?: string;
}
