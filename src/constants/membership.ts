export const MEMBERSHIP_PLANS = {
  monthly: [
    {
      title: 'Basic',
      price: 50000,
      features: [
        '대시보드 요약 리포트',
        '세그먼트 분석 제공',
        '직원 최대 5명 추가',
      ],
    },
    {
      title: 'Premium',
      price: 100000,
      features: [
        'Basic 포함',
        '행동 코호트 분석',
        '데이터 내보내기 지원',
        '직원 최대 10명 추가',
      ],
    },
    {
      title: 'Ultimate',
      price: 150000,
      features: [
        'Premium 포함',
        '구독 유지 예측 지표',
        '머신러닝 기반 분석',
        '문서형 리포트 제공',
        '직원 최대 20명 추가',
      ],
    },
  ],
  yearly: [
    {
      title: 'Basic',
      price: 570000, // 5% 할인
      features: [
        '대시보드 요약 리포트',
        '세그먼트 분석 제공',
        '직원 최대 5명 추가',
        '연간 결제 5% 할인',
      ],
    },
    {
      title: 'Premium',
      price: 1080000, // 10% 할인
      features: [
        'Basic 포함',
        '행동 코호트 분석',
        '데이터 내보내기 지원',
        '직원 최대 10명 추가',
        '연간 결제 10% 할인',
      ],
    },
    {
      title: 'Ultimate',
      price: 1530000, // 15% 할인
      features: [
        'Premium 포함',
        '구독 유지 예측 지표',
        '머신러닝 기반 분석',
        '문서형 리포트 제공',
        '직원 최대 20명 추가',
        '연간 결제 15% 할인',
      ],
    },
  ],
};