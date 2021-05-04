# formik-wizard-simple

![CI Status](https://img.shields.io/github/workflow/status/clarktozer/formik-wizard-simple/CI)
[![npm version](https://img.shields.io/npm/v/formik-wizard-simple.svg)](https://www.npmjs.com/package/formik-wizard-simple)

Simple multi-step form wizard with Formik.

You are required to implement the stepper, plus the next and previous buttons yourself for flexibility of the UI.

Only peer dependencies are React and Formik.

## Wizard

React component to wrap a series of steps.

```js
import React, { FC } from "react";
import { Wizard } from "formik-wizard-simple";

const App: FC = () => {
    return (
        <Wizard
            initialValues={{
                email: "",
                firstName: "",
                lastName: ""
            }}
            onSubmit={onSubmit}
            onRenderAfterStep={<Actions />}
            onRenderBeforeStep={<Stepper />}
            resetTouchedOnMove
        >
            {...}
        </Wizard>
    );
};
```

#### Options:

Takes all properties of the FormikConfig except for the validationSchema which is at the Wizard.Step level. Below is a list of addtional properties.

| option              | default | Description                                                                                   |
| ------------------- | ------- | --------------------------------------------------------------------------------------------- |
| resetTouchedOnMove? | false   | When moving between steps, reset the touched elements.                                        |
| initialStep?        | 0       | Set the initial step.                                                                         |
| onRenderBeforeStep? | -       | React component for displaying a stepper or any other element.                                |
| onRenderAfterStep   | -       | React component for displaying the buttons needed to move between steps or any other element. |
| formProps?          | -       | FormikFormProps for the Form element.                                                         |

## Wizard.Step

React component for each step. These must be a child of the Wizard component.

```js
import React, { FC } from "react";
import { Wizard } from "formik-wizard-simple";

const { Step } = Wizard;

const App: FC = () => {
    return (
        <Wizard
            initialValues={{
                email: "",
                firstName: "",
                lastName: ""
            }}
            onSubmit={onSubmit}
            onRenderAfterStep={<Actions />}
            onRenderBeforeStep={<Stepper />}
        >
            <Step
                validationSchema={Yup.object({
                    firstName: Yup.string().required("required"),
                    lastName: Yup.string().required("required")
                })}
            >
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field
                        autoComplete="given-name"
                        component="input"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                    />
                    <ErrorMessage className="error" component="div" name="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field autoComplete="family-name" component="input" id="lastName" name="lastName" placeholder="Last Name" type="text" />
                    <ErrorMessage className="error" component="div" name="lastName" />
                </div>
            </Step>
            <Step
                validationSchema={Yup.object({
                    email: Yup.string().email("Invalid email address").required("required")
                })}
            >
                <div>
                    <label htmlFor="email">Email</label>
                    <Field autoComplete="email" component="input" id="email" name="email" placeholder="Email" type="text" />
                    <ErrorMessage className="error" component="div" name="email" />
                </div>
            </Step>
        </Wizard>
    );
};
```

#### Options:

| option            | default | Description                                                                |
| ----------------- | ------- | -------------------------------------------------------------------------- |
| onSubmit?         | -       | Called whenever the submit/next button is clicked with the current values. |
| validationSchema? | -       | Yup schema for validating the step.                                        |
| id?               | -       | Optional id for the step. Useful for when using nested validation schemas. |

## useWizard

A React hook for getting the current state of the Wizard. This hook will primarily be used in the onRenderAfterStep and onRenderBeforeStep components like the example below.

```js
import React, { FC } from "react";
import { Steps, Button } from "antd";
import { useFormikContext } from "formik";
import { useWizard } from "formik-wizard-simple";

export const Actions = () => {
    const { isLastStep, step, onPreviousStep } = useWizard();
    const { isSubmitting } = useFormikContext();

    return (
        <div className="actions">
            {step > 0 && (
                <Button disabled={isSubmitting} onClick={onPreviousStep}>
                    Back
                </Button>
            )}
            <Button disabled={isSubmitting} htmlType="submit" type="primary">
                {isLastStep ? "Submit" : "Next"}
            </Button>
        </div>
    );
};

export const Stepper: FC = () => {
    const { step } = useWizard();

    return (
        <Steps className="stepper" current={step}>
            <Steps.Step title="Personal" />
            <Steps.Step title="Business" />
            <Steps.Step title="Confirm" />
        </Steps>
    );
};
```

#### Properties:

| option         | default | Description                          |
| -------------- | ------- | ------------------------------------ |
| step           | 0       | The current step.                    |
| isLastStep     | -       | Is the current step the last.        |
| onNextStep     | -       | Move to the next step.               |
| onPreviousStep | -       | Go back to the previous step.        |
| onSetStep      | -       | Go to any step.                      |
| totalSteps     | -       | Count of step children components    |
| stepId?        | -       | id property of the current step node |
