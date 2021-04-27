import React from "react";
import { StepProps } from "./types";

export function Step<T>({ children }: StepProps<T>) {
    return <>{children}</>;
}
