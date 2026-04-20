import 'leaflet/dist/leaflet.css';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { DestinationCoordinates } from '@/features/destination/types';
import { cn } from '@/lib/utils';
import { Map as MapIcon, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { CircleMarker, MapContainer, TileLayer, useMap } from 'react-leaflet';

type MapPoint = [number, number];

interface DestinationPointMapButtonClientProps {
    destinationName: string;
    coordinates: DestinationCoordinates;
    address: string;
    className?: string;
}

function RecenterMap({ center }: { center: MapPoint }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, 16, {
            animate: true,
            duration: 1,
        });
    }, [center, map]);

    return null;
}

export default function DestinationPointMapButtonClient({ destinationName, coordinates, address, className }: DestinationPointMapButtonClientProps) {
    const point: MapPoint = [coordinates.lat, coordinates.lng];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        'flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--detail-primary)] bg-white px-4 py-3 font-bold text-[var(--detail-primary)] transition-colors hover:bg-[var(--detail-primary-fixed)]',
                        className,
                    )}
                >
                    <MapIcon size={16} /> Lihat Peta
                </button>
            </DialogTrigger>

            <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[min(92vw,760px)] overflow-hidden rounded-[1.75rem] border-0 bg-[var(--detail-surface-lowest)] p-0 shadow-[0_30px_90px_rgba(16,24,40,0.24)] sm:max-h-[90vh]">
                <DialogHeader className="border-b border-black/5 px-5 py-5 text-left sm:px-6">
                    <DialogTitle className="flex items-center gap-2 text-xl text-[var(--detail-primary)]">
                        <MapIcon className="h-5 w-5" />
                        Titik Lokasi {destinationName}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[var(--detail-on-surface-variant)]">
                        Peta ini menampilkan titik presisi destinasi saja.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[calc(100dvh-8rem)] space-y-4 overflow-y-auto px-5 py-5 pb-6 sm:max-h-[calc(90vh-8rem)] sm:px-6">
                    <div className="overflow-hidden rounded-[1.5rem] border border-black/5">
                        <MapContainer center={point} zoom={16} scrollWheelZoom className="h-[20rem] w-full sm:h-[24rem]">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <RecenterMap center={point} />
                            <CircleMarker
                                center={point}
                                radius={10}
                                pathOptions={{
                                    color: '#ffffff',
                                    weight: 3,
                                    fillColor: '#135227',
                                    fillOpacity: 1,
                                }}
                            />
                        </MapContainer>
                    </div>

                    <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-4 text-sm text-[var(--detail-on-surface-variant)]">
                        <div className="mb-2 inline-flex items-center gap-2 font-semibold text-[var(--detail-on-surface)]">
                            <MapPin className="h-4 w-4 text-[var(--detail-primary)]" />
                            {address}
                        </div>
                        <div>
                            Koordinat: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
