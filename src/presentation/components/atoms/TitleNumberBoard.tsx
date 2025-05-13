import React from 'react';

interface Props {
    title: string;
    number: number;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const TitleNumberBoard: React.FC<Props> = ({ title, number, icon: Icon }: Props) => {
    return (
        <div
            style={{
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '250px',
            }}
        >
            <Icon width={48} height={48} fill="#222" style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{number}</div>
            <div style={{ fontSize: 18, color: '#222' }}>{title}</div>
        </div>
    );
}