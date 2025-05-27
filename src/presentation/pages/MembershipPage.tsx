import React, { useState } from 'react';
import { Header } from '@/presentation/layout/Header';
import PricingCard from '@/presentation/components/molecules/PricingCard';
import { MEMBERSHIP_PLANS } from '@/constants/membership';

const MembershipPage: React.FC = () => {
    const [isMonthly, setIsMonthly] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

    const plans = isMonthly ? MEMBERSHIP_PLANS.monthly : MEMBERSHIP_PLANS.yearly;

    const handleSubscribe = (title: string, price: number) => {
        alert(`${title} ${isMonthly ? '월간' : '연간'} 플랜 가입 완료 (가격: ₩${price.toLocaleString()})`);
    };

    return (
        <div className="min-h-screen w-screen bg-orange-400 overflow-x-hidden text-gray-800 flex flex-col">
            <div className="pt-6">
                <Header />
            </div>

            <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-12">
                <h1 className="text-white text-4xl font-extrabold mb-8">멤버십 구독 플랜</h1>

                <div className="flex justify-center mb-10 space-x-4">
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition ${
                            isMonthly ? 'bg-white text-orange-500' : 'bg-orange-300 text-white'
                        }`}
                        onClick={() => setIsMonthly(true)}
                    >
                        월간
                    </button>
                    <button
                        className={`px-4 py-2 rounded-full font-semibold transition ${
                            !isMonthly ? 'bg-white text-orange-500' : 'bg-orange-300 text-white'
                        }`}
                        onClick={() => setIsMonthly(false)}
                    >
                        연간
                    </button>
                </div>

                <div className="flex justify-center gap-12 flex-wrap max-w-[100vw] px-4">
                    {plans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            buttonText="가입하기"
                            onButtonClick={() => handleSubscribe(plan.title, plan.price)}
                            period={isMonthly ? '월' : '년'}
                            onClick={() => setSelectedPlan(plan.title)}
                            isSelected={selectedPlan === plan.title}
                            badge={
                                plan.title === 'Premium'
                                    ? 'BEST'
                                    : plan.title === 'Ultimate'
                                        ? isMonthly ? '2개월 무료' : '15% 할인'
                                        : undefined
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;
