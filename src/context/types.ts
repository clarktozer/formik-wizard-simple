export interface WizardContextProps {
    step: number;
    isLastStep: boolean;
    onNextStep: () => void;
    onPreviousStep: () => void;
    onSetStep: (value: number) => void;
    totalSteps: number;
}
