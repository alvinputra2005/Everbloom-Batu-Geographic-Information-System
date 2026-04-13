import type { LandmarkOption } from '@/features/recommendations/types';

interface RecommendationLandmarkFilterProps {
    isOpen: boolean;
    landmarks: LandmarkOption[];
    selectedLandmarks: string[];
    onToggleLandmark: (landmarkId: string) => void;
}

export default function RecommendationLandmarkFilter({
    isOpen,
    landmarks,
    selectedLandmarks,
    onToggleLandmark,
}: RecommendationLandmarkFilterProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="space-y-3 p-5 pt-0">
            {landmarks.map((landmark) => (
                <label key={landmark.id} className="group flex cursor-pointer items-center gap-3">
                    <input
                        type="checkbox"
                        checked={selectedLandmarks.includes(landmark.id)}
                        onChange={() => onToggleLandmark(landmark.id)}
                        className="h-5 w-5 rounded border-[var(--rec-outline-variant)] text-[var(--rec-secondary)] focus:ring-[var(--rec-secondary)]/20"
                    />
                    <span className="text-sm font-medium text-[var(--rec-on-surface)] transition-colors group-hover:text-[var(--rec-secondary)]">
                        {landmark.name}
                    </span>
                </label>
            ))}
        </div>
    );
}
