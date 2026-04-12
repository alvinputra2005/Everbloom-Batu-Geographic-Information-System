import { CloudRain, Droplets, Mountain, Thermometer, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

import type { RecommendationInsight } from '@/features/recommendations/types';

interface SmartInsightBoxProps {
    insight: RecommendationInsight;
}

interface MetricItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    status: number | string;
    colorClass: string;
    statusClass: string;
}

interface IntensityBarProps {
    label: string;
    percentage: number;
    colorClass: string;
}

export default function SmartInsightBox({ insight }: SmartInsightBoxProps) {
    return (
        <div className="ambient-bloom rounded-[2rem] bg-white p-8">
            <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight text-[var(--rec-on-surface)]">Monthly Insight</h3>
                <TrendingUp className="text-[var(--rec-tertiary)]" size={20} />
            </div>

            <div className="space-y-6">
                <MetricItem
                    icon={<CloudRain size={20} />}
                    label={insight.rainfall.label}
                    value={insight.rainfall.value}
                    status={insight.rainfall.status}
                    colorClass="bg-[var(--rec-tertiary-fixed)] text-[var(--rec-on-tertiary-fixed)]"
                    statusClass="text-[var(--rec-tertiary)]"
                />

                <MetricItem
                    icon={<Thermometer size={20} />}
                    label={insight.temperature.label}
                    value={insight.temperature.value}
                    status={insight.temperature.status}
                    colorClass="bg-[var(--rec-secondary-fixed)] text-[var(--rec-on-secondary-fixed)]"
                    statusClass="text-[var(--rec-primary)]"
                />

                <MetricItem
                    icon={<Droplets size={20} />}
                    label={insight.humidity.label}
                    value={insight.humidity.value}
                    status={insight.humidity.status}
                    colorClass="bg-[var(--rec-primary-container)] text-[var(--rec-on-primary-container)]"
                    statusClass="text-[var(--rec-on-secondary-container)]"
                />

                <hr className="border-[var(--rec-outline-variant)]/30" />

                <div className="space-y-4">
                    <IntensityBar label="Harvest Intensity" percentage={insight.harvestIntensity} colorClass="bg-[var(--rec-primary)]" />
                    <IntensityBar label="Bloom Intensity" percentage={insight.bloomIntensity} colorClass="bg-[var(--rec-secondary)]" />
                </div>

                <div className="mt-6 rounded-[1.25rem] bg-[var(--rec-surface-low)] p-4">
                    <div className="mb-2 flex items-center gap-2">
                        <Mountain className="text-[var(--rec-secondary)]" size={14} />
                        <span className="text-[10px] font-bold tracking-[0.22em] text-[var(--rec-on-surface-variant)] uppercase">Kondisi Lahan</span>
                    </div>
                    <p className="text-xs leading-relaxed font-medium text-[var(--rec-on-surface-variant)]">{insight.landCondition}</p>
                </div>
            </div>
        </div>
    );
}

function MetricItem({ icon, label, value, status, colorClass, statusClass }: MetricItemProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass}`}>{icon}</div>
                <div>
                    <p className="text-xs font-medium text-[var(--rec-on-surface-variant)]">{label}</p>
                    <p className="text-sm font-bold text-[var(--rec-on-surface)]">{value}</p>
                </div>
            </div>

            <span className={`text-xs font-bold ${statusClass}`}>{typeof status === 'number' ? `${status}%` : status}</span>
        </div>
    );
}

function IntensityBar({ label, percentage, colorClass }: IntensityBarProps) {
    return (
        <div>
            <div className="mb-2 flex justify-between text-xs font-bold tracking-[0.22em] text-[var(--rec-on-surface-variant)] uppercase">
                <span>{label}</span>
                <span>{percentage}%</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--rec-surface-highest)]">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${colorClass}`}
                />
            </div>
        </div>
    );
}
