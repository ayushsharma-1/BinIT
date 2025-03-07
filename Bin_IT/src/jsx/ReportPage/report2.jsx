import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from '../Commen-Components/header';
import '../../css/report-page.css';

function Stepper({ componentList, formData, handleSubmit, handleFormDataChange }) {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const n = componentList.length;

  const isStepComplete = () => {
    const currentStepData = componentList[step].props.formData;
    if (step === 0) {
      return currentStepData.areaType && currentStepData.pollutionPlace && currentStepData.pollutionType;
    } else if (step === 1) {
      return currentStepData.city && currentStepData.pincode && currentStepData.location;
    } else if (step === 2) {
      return currentStepData.latitude && currentStepData.longitude;
    }
    return false;
  };

  const onPrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const onNext = () => {
    if (step < n - 1) setStep(step + 1);
  };

  const handleFinalSubmit = async () => {
    await handleSubmit(); // Submit form
    toast.success("Report submitted successfully!", { autoClose: 2000 });

    // Redirect to home page after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const StepElements = ({ currentStep }) => {
    return [...Array(n)].map((_, i) => (
      <span key={i} className={currentStep >= i ? "active" : "deactive"}>
        {i + 1}
      </span>
    ));
  };

  return (
    <>
      <Header />
      <div className="report-submit">
        <div id="step-wrapper">
          <StepElements currentStep={step} />
          <div id="progress-container">
            <div id="progress" style={{ width: `${(step / (n - 1)) * 100}%`, visibility: step === 0 ? 'hidden' : 'visible' }}></div>
          </div>
        </div>
        <div id="component-container">{componentList[step]}</div>
        <div className="prev-next-btn">
          <button onClick={onPrevious} disabled={step === 0}>
            Previous
          </button>
          {step === n - 1 ? (
            <button onClick={handleFinalSubmit} disabled={!isStepComplete()}>
              Submit Report
            </button>
          ) : (
            <button onClick={onNext} disabled={!isStepComplete()}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Stepper;
