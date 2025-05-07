interface StepProgressProps {
  currentStep: number;
  steps: number[];
}

export function StepProgress({ currentStep, steps }: StepProgressProps) {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-white p-4 rounded-lg w-full max-w-xl">
        <div className="flex items-center space-x-4 w-full">
          {steps.map((step, index) => (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center border
                  ${
                    currentStep === step
                      ? "bg-black text-white border-black"
                      : "bg-gray-200 text-gray-600 border-gray-300"
                  }`}
              >
                {step}
              </div>
              {index !== steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
