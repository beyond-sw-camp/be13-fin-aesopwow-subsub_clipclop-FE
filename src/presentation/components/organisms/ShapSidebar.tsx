// // 📁 /presentation/components/organisms/ShapSidebar.tsx
// import { useEffect, useState } from "react";

// interface Props {
//   onChange: (keywords: string[], filters: Record<string, any>) => void;
// }

// export function ShapSidebar({ onChange }: Props) {
//   const [keywords, setKeywords] = useState<string[]>(["Spring", "Smart", "Modern"]);
//   const [filters, setFilters] = useState<Record<string, any>>({
//     price: [0, 100],
//     color: ["Red", "Blue", "Green"],
//     size: ["S", "M", "L"],
//   });

//   // ✅ 상위 컴포넌트로 전달
//   useEffect(() => {
//     onChange(keywords, filters);
//   }, [keywords, filters]);

//   const handleKeywordRemove = (keyword: string) => {
//     setKeywords((prev) => prev.filter((k) => k !== keyword));
//   };

//   return (
//     <div className="w-[260px] p-4 bg-white rounded-xl shadow-md space-y-6">
//       <div>
//         <h3 className="text-sm font-semibold mb-2">Keywords</h3>
//         <div className="flex flex-wrap gap-2">
//           {keywords.map((k) => (
//             <span
//               key={k}
//               onClick={() => handleKeywordRemove(k)}
//               className="bg-gray-200 text-sm px-2 py-1 rounded-full cursor-pointer"
//             >
//               {k} ✕
//             </span>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3 className="text-sm font-semibold mb-2">General Filters</h3>
//         <div className="space-y-2">
//           {[...Array(3)].map((_, i) => (
//             <label key={i} className="flex items-start space-x-2 text-sm">
//               <input type="checkbox" defaultChecked disabled />
//               <div>
//                 <div className="font-medium">Label</div>
//                 <div className="text-gray-500 text-xs">Description</div>
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3 className="text-sm font-semibold mb-2">Price</h3>
//         <div className="text-xs text-gray-500 mb-1">Label $0-100</div>
//         <input type="range" min={0} max={100} defaultValue={50} className="w-full" disabled />
//       </div>

//       <div>
//         <h3 className="text-sm font-semibold mb-2">Color</h3>
//         <div className="space-y-1 text-sm">
//           {["Red", "Blue", "Green"].map((color) => (
//             <label key={color} className="block">
//               <input type="checkbox" className="mr-2" defaultChecked disabled />
//               {color}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3 className="text-sm font-semibold mb-2">Size</h3>
//         <div className="space-y-1 text-sm">
//           {["S", "M", "L"].map((size) => (
//             <label key={size} className="block">
//               <input type="checkbox" className="mr-2" defaultChecked disabled />
//               {size}
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
