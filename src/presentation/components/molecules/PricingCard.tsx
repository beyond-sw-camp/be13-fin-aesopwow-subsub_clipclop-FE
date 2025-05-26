import React from 'react';
import { CustomButton } from '@/presentation/components/atoms/CustomButton';

interface PricingCardProps {
    title: string;
    price: number;
    period?: string;
    features: string[];
    onButtonClick?: () => void;
    buttonText: string;
    onClick?: () => void;
    isSelected?: boolean;
    badge?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    period = 'mo',
    features,
    onButtonClick,
    buttonText,
    onClick,
    badge,
    isSelected = false
}) => {
    return (
        <div
            onClick={onClick}
            className={`relative rounded-2xl p-6 w-[320px] flex flex-col justify-between items-center cursor-pointer
                transition-all duration-300
                ${
                    isSelected
                        ? 'bg-black text-white scale-110 shadow-2xl z-10'
                        : 'bg-white text-gray-800 shadow-lg hover:bg-gray-200 hover:text-black hover:shadow-xl'
                }`}
        >
            {badge && (
                <div className="absolute -top-5 -left-5 bg-yellow-300 text-black text-lg font-bold px-5 py-2 rounded-full shadow-xl z-10">
                    {badge}
                </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{title}</h2>

            <div className="flex items-baseline my-4">
                <span className="text-3xl font-bold mr-1">₩</span>
                <span className="text-6xl font-extrabold leading-none">
                    {price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 ml-1">/{period}</span>
            </div>

            <ul className="w-full my-4 list-disc text-gray-500 text-base pl-5 space-y-2">
                {features.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <div className="w-full flex justify-center mt-2">
                <CustomButton
                    onClick={onButtonClick}
                    title={buttonText}
                    loading={false}
                />
            </div>
        </div>
    );
};

export default PricingCard;
