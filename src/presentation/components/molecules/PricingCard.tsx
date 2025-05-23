import React from 'react';
import { CustomButton } from '@/presentation/components/atoms/CustomButton';

interface PricingCardProps {
    title: string;
    price: number;
    period?: string;
    features: string[];
    onButtonClick?: () => void;
    buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    price,
    period = 'mo',
    features,
    onButtonClick,
    buttonText,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[350px] mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>

            <div className="flex items-end my-6">
                <span className="text-6xl font-extrabold leading-none">{price}</span>
                <span className="text-2xl font-bold mr-1 align-top">₩</span>
                <span className="text-lg text-gray-600 ml-1 align-bottom">/{period}</span>
            </div>

            <ul className="w-full my-6 mb-8 list-disc text-gray-500 text-lg pl-5">
                {features.map((item, idx) => (
                    <li key={idx} className="mb-3">{item}</li>
                ))}
            </ul>

            <div className="w-full flex justify-center">
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