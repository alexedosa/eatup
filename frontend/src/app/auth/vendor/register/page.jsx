"use client";

import { useState } from "react";
import Step0 from "./step0";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";

export default function VendorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [onboardingId, setOnboardingId] = useState(null);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step0 nextStep={nextStep} updateFormData={updateFormData} />;
      case 1:
        return <Step1 nextStep={nextStep} updateFormData={updateFormData} formData={formData} setOnboardingId={setOnboardingId} onboardingId={onboardingId} />;
      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} onboardingId={onboardingId} />;
      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} onboardingId={onboardingId} />;
      case 4:
        return <Step4 nextStep={nextStep} prevStep={prevStep} updateFormData={updateFormData} formData={formData} onboardingId={onboardingId} />;
      case 5:
        return <Step5 formData={formData} onboardingId={onboardingId} />;
      default:
        return <Step0 nextStep={nextStep} updateFormData={updateFormData} />;
    }
  };

  return renderStep();
}