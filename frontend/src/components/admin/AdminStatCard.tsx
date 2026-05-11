type AdminStatCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClassName?: string;
    iconWrapClassName?: string;
    cardBorderClassName?: string;
};

export default function AdminStatCard({
    icon,
    label,
    value,
    valueClassName = 'text-[#2A2A2A]',
    iconWrapClassName = 'bg-[#FDF1F0] text-[#FF9A9E]',
    cardBorderClassName = 'border-white',
}: AdminStatCardProps) {
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-[0_4px_20px_-8px_rgba(255,154,158,0.2)] border flex flex-col gap-4 ${cardBorderClassName}`}>
            <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconWrapClassName}`}>
                    {icon}
                </div>
            </div>
            <div>
                <span className="text-[10px] font-bold tracking-[0.15em] text-[#2A2A2A]/40 uppercase block mb-1">
                    {label}
                </span>
                <span className={`text-2xl font-black italic tracking-tighter ${valueClassName}`}>
                    {value}
                </span>
            </div>
        </div>
    );
}