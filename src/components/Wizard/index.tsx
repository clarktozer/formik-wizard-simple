import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { WizardContext } from "../../context";
import { Step } from "../Step";
import { StepProps } from "../Step/types";
import { WizardProps } from "./types";

export function Wizard<T>({
    children,
    onSubmit,
    resetTouchedOnMove = false,
    onRenderAfterStep,
    onRenderBeforeStep,
    initialStep = 0,
    formProps,
    ...rest
}: WizardProps<T>) {
    const [step, setStep] = useState(initialStep);
    const steps = React.Children.toArray(children) as React.ReactElement<StepProps<T>>[];
    const stepNode = steps[step];
    const isLastStep = step === steps.length - 1;

    const onSetStep = (value: number) => setStep(value);

    const onNextStep = () => onSetStep(Math.min(step + 1, steps.length - 1));

    const onPreviousStep = () => onSetStep(Math.max(step - 1, 0));

    const onHandleSubmit = async (values: T, helpers: FormikHelpers<T>) => {
        if (stepNode.props.onSubmit) {
            await stepNode.props.onSubmit(values, helpers, step);
        }

        if (isLastStep) {
            onSubmit(values, helpers);
        } else {
            if (resetTouchedOnMove) {
                helpers.setTouched({});
            }

            onNextStep();
        }
    };

    return (
        <Formik {...rest} onSubmit={onHandleSubmit} validationSchema={stepNode.props.validationSchema}>
            <Form {...formProps}>
                <WizardContext.Provider
                    value={{
                        isLastStep,
                        onNextStep,
                        onPreviousStep,
                        step,
                        onSetStep
                    }}
                >
                    {onRenderBeforeStep}
                    {stepNode}
                    {onRenderAfterStep}
                </WizardContext.Provider>
            </Form>
        </Formik>
    );
}

Wizard.Step = Step;
