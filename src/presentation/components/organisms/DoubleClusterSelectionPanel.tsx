// /presentation/components/organisms/DoubleClusterSelectionPanel.tsx
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CustomButton } from "../atoms/CustomButton";
import { useDoubleClusterViewModel } from "@/application/viewModels/CohortViewModel";

const clusters = ["PCL", "SubscriptionType", "FavGenre", "LastLogin"];

export function DoubleClusterSelectionPanel() {
  const {
    firstCluster,
    setFirstCluster,
    secondCluster,
    setSecondCluster,
    requestAnalysis,
    loading,
  } = useDoubleClusterViewModel();

  const renderClusterDropdown = (
    value: string,
    setValue: (val: string) => void,
    placeholder: string,
    exclude: string
  ) => {
    const filtered = clusters.filter((c) => c !== exclude);

    return (
      <div className="w-72">
        <Listbox value={value} onChange={setValue}>
          {({ open }) => (
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-4 pr-10 text-left shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg">
                <span className={`block truncate ${!value ? "text-gray-400" : ""}`}>
                  {value || placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                </span>
              </Listbox.Button>
              {open && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-2 px-4 text-sm text-gray-500 font-semibold">
                    {value || "선택되지 않음"}
                  </div>
                  <div className="border-t border-gray-300 mb-1" />
                  <Listbox.Options static className="max-h-60 overflow-y-auto text-base focus:outline-none sm:text-sm">
                    {filtered.map((cluster, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={cluster}
                        className={({ active }) =>
                          `cursor-pointer select-none py-3 pl-4 pr-4 ${
                            active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                          }`
                        }
                      >
                        {cluster}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              )}
            </div>
          )}
        </Listbox>
      </div>
    );
  };

  return (
    <div className="w-[90%] h-[500px] mx-auto my-2 bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-10">분석 군집 선택 (양측 비교)</h2>
      <div className="flex items-center space-x-6">
        {renderClusterDropdown(firstCluster, setFirstCluster, "비교 대상 1", secondCluster)}
        <span className="text-2xl font-extrabold text-black">VS</span>
        {renderClusterDropdown(secondCluster, setSecondCluster, "비교 대상 2", firstCluster)}
        <CustomButton title="분석 시작" loading={loading} onClick={requestAnalysis} />
      </div>
    </div>
  );
}