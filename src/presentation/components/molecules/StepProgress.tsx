interface StepProgressProps {
  currentStep: number;
  steps: number[];
}

export function StepProgress({ currentStep, steps }: StepProgressProps) {
  return (
    <div className="w-full flex justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-lg p-6 shadow">
        <div className="flex items-center justify-between w-full">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center w-full">

              {index !== 0 && <div className="h-0.5 bg-gray-300 flex-1" />}

              <div
                className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center border z-10
                  ${
                    currentStep === step
                      ? "bg-black text-white border-black"
                      : "bg-gray-200 text-gray-600 border-gray-300"
                  }`}
              >
                {step}
              </div>

              {index !== steps.length - 1 && <div className="h-0.5 bg-gray-300 flex-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}