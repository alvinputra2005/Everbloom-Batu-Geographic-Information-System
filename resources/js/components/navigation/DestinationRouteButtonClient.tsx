import 'leaflet/dist/leaflet.css';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { DestinationCoordinates } from '@/features/destination/types';
import { cn } from '@/lib/utils';
import { ExternalLink, LoaderCircle, LocateFixed, MapPinned, Navigation, Route } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CircleMarker, MapContainer, Polyline, TileLayer, useMap } from 'react-leaflet';

type RoutePoint = [number, number];

interface OsrmRoute {
    distance: number;
    duration: number;
    geometry: RoutePoint[];
}

interface DestinationRouteButtonClientProps {
    destinationName: string;
    coordinates: DestinationCoordinates;
    mapHref: string;
    navigationHref: string;
    variant?: 'icon' | 'full';
    className?: string;
}

function formatDistance(distance: number) {
    if (distance >= 1000) {
        return `${(distance / 1000).toFixed(1)} km`;
    }

    return `${Math.round(distance)} m`;
}

function formatDuration(duration: number) {
    const totalMinutes = Math.round(duration / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        return `${hours} jam ${minutes} menit`;
    }

    return `${minutes} menit`;
}

function createLocationErrorMessage(error: GeolocationPositionError) {
    if (error.code === error.PERMISSION_DENIED) {
        return 'Izin lokasi ditolak. Aktifkan GPS atau izin lokasi browser agar rute bisa dihitung otomatis.';
    }

    if (error.code === error.POSITION_UNAVAILABLE) {
        return 'Lokasi saat ini belum bisa didapatkan. Coba pindah ke area dengan sinyal GPS yang lebih stabil.';
    }

    return 'Permintaan lokasi terlalu lama. Silakan coba lagi.';
}

function buildCompactCoordinateLabel(point: RoutePoint | null) {
    if (!point) {
        return 'Menunggu GPS perangkat';
    }

    return `${point[0].toFixed(5)}, ${point[1].toFixed(5)}`;
}

function RouteViewport({ points }: { points: RoutePoint[] }) {
    const map = useMap();

    useEffect(() => {
        if (points.length === 0) {
            return;
        }

        if (points.length === 1) {
            map.flyTo(points[0], 15, {
                animate: true,
                duration: 1,
            });
            return;
        }

        map.fitBounds(points, {
            animate: true,
            duration: 1,
            padding: [32, 32],
        });
    }, [map, points]);

    return null;
}

export default function DestinationRouteButtonClient({
    destinationName,
    coordinates,
    mapHref,
    navigationHref,
    variant = 'icon',
    className,
}: DestinationRouteButtonClientProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<RoutePoint | null>(null);
    const [route, setRoute] = useState<OsrmRoute | null>(null);

    const destinationPoint: RoutePoint = [coordinates.lat, coordinates.lng];

    const requestRoute = async () => {
        if (typeof window === 'undefined' || !('geolocation' in navigator)) {
            setErrorMessage('Browser ini belum mendukung geolocation, jadi rute otomatis tidak bisa dihitung.');
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const currentPosition = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                });
            });

            const currentPoint: RoutePoint = [currentPosition.coords.latitude, currentPosition.coords.longitude];
            setUserLocation(currentPoint);

            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${currentPoint[1]},${currentPoint[0]};${coordinates.lng},${coordinates.lat}?overview=full&geometries=geojson&alternatives=false&steps=true`,
            );

            if (!response.ok) {
                throw new Error('OSRM request failed');
            }

            const payload = (await response.json()) as {
                code?: string;
                routes?: Array<{
                    distance: number;
                    duration: number;
                    geometry: {
                        coordinates: [number, number][];
                    };
                }>;
            };

            const bestRoute = payload.routes?.[0];

            if (payload.code !== 'Ok' || !bestRoute) {
                throw new Error('No route found');
            }

            setRoute({
                distance: bestRoute.distance,
                duration: bestRoute.duration,
                geometry: bestRoute.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
            });
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error) {
                setErrorMessage(createLocationErrorMessage(error as GeolocationPositionError));
            } else {
                setErrorMessage('Rute OSRM belum berhasil dihitung. Kamu masih bisa buka destinasi ini di Maps sebagai cadangan.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open && !route && !isLoading && !errorMessage) {
            void requestRoute();
        }
    }, [errorMessage, isLoading, open, route]);

    const triggerClassName =
        variant === 'full'
            ? 'chlorophyll-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white shadow-md transition-all hover:scale-[1.02]'
            : 'flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--rec-surface-high)] text-[var(--rec-on-surface-variant)] transition-colors hover:bg-[var(--rec-surface-highest)]';

    const routePoints = route?.geometry ?? (userLocation ? [userLocation, destinationPoint] : [destinationPoint]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button type="button" aria-label={`Cari rute ke ${destinationName}`} className={cn(triggerClassName, className)}>
                    <Navigation size={16} />
                    {variant === 'full' ? 'Navigate' : null}
                </button>
            </DialogTrigger>

            <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[min(92vw,860px)] overflow-hidden rounded-[1.9rem] border-0 bg-[var(--detail-surface-lowest)] p-0 shadow-[0_30px_90px_rgba(16,24,40,0.28)] sm:max-h-[90vh]">
                <DialogHeader className="border-b border-black/5 bg-[linear-gradient(135deg,rgba(19,82,39,0.08),rgba(180,83,9,0.06))] px-5 py-5 text-left sm:px-6">
                    <DialogTitle className="flex items-center gap-2 text-lg text-[var(--detail-primary)] sm:text-xl">
                        <Route className="h-5 w-5" />
                        Rute ke {destinationName}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[var(--detail-on-surface-variant)]">
                        Sistem akan memakai GPS perangkatmu dan OSRM untuk menghitung rute mobil terbaik menuju destinasi ini.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto px-5 py-5 pb-6 sm:max-h-[calc(90vh-8rem)] sm:px-6">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-3">
                            <div className="mb-1 text-xs font-bold tracking-[0.2em] text-[var(--detail-on-surface-variant)] uppercase">Status</div>
                            <div className="text-sm font-semibold text-[var(--detail-on-surface)]">
                                {isLoading ? 'Menghitung rute...' : route ? 'Rute siap dipakai' : errorMessage ? 'Butuh tindakan' : 'Menyiapkan GPS'}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-3">
                            <div className="mb-1 text-xs font-bold tracking-[0.2em] text-[var(--detail-on-surface-variant)] uppercase">Jarak</div>
                            <div className="text-sm font-semibold text-[var(--detail-on-surface)]">
                                {route ? formatDistance(route.distance) : '-'}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-3">
                            <div className="mb-1 text-xs font-bold tracking-[0.2em] text-[var(--detail-on-surface-variant)] uppercase">Estimasi</div>
                            <div className="text-sm font-semibold text-[var(--detail-on-surface)]">
                                {route ? formatDuration(route.duration) : '-'}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-3">
                            <div className="mb-1 text-xs font-bold tracking-[0.2em] text-[var(--detail-on-surface-variant)] uppercase">Tujuan</div>
                            <div className="text-sm font-semibold text-[var(--detail-on-surface)]">
                                {buildCompactCoordinateLabel(destinationPoint)}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-black/5">
                        <MapContainer center={destinationPoint} zoom={13} scrollWheelZoom className="h-[18rem] w-full sm:h-[21rem]">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <RouteViewport points={routePoints} />

                            {userLocation ? (
                                <CircleMarker
                                    center={userLocation}
                                    radius={8}
                                    pathOptions={{
                                        color: '#ffffff',
                                        weight: 3,
                                        fillColor: '#135227',
                                        fillOpacity: 1,
                                    }}
                                />
                            ) : null}

                            <CircleMarker
                                center={destinationPoint}
                                radius={8}
                                pathOptions={{
                                    color: '#ffffff',
                                    weight: 3,
                                    fillColor: '#b45309',
                                    fillOpacity: 1,
                                }}
                            />

                            {route ? (
                                <Polyline
                                    positions={route.geometry}
                                    pathOptions={{
                                        color: '#135227',
                                        weight: 5,
                                        opacity: 0.85,
                                    }}
                                />
                            ) : null}
                        </MapContainer>
                    </div>

                    <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-4 text-sm text-[var(--detail-on-surface-variant)]">
                            {isLoading ? (
                                <span className="inline-flex items-center gap-2">
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Meminta lokasi GPS dan menghitung rute OSRM...
                                </span>
                            ) : errorMessage ? (
                                errorMessage
                            ) : route ? (
                                <span className="inline-flex items-center gap-2">
                                    <LocateFixed className="h-4 w-4" />
                                    Titik awal diambil dari lokasi perangkatmu saat tombol ditekan.
                                </span>
                            ) : (
                                'Dialog dibuka, sistem sedang menyiapkan perhitungan rute.'
                            )}
                        </div>

                        <div className="rounded-2xl bg-[var(--detail-surface-high)] px-4 py-4 text-sm text-[var(--detail-on-surface-variant)]">
                            <div className="mb-2 text-xs font-bold tracking-[0.18em] uppercase">Koordinat aktif</div>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-semibold text-[var(--detail-on-surface)]">Asal:</span>{' '}
                                    {buildCompactCoordinateLabel(userLocation)}
                                </div>
                                <div>
                                    <span className="font-semibold text-[var(--detail-on-surface)]">Tujuan:</span>{' '}
                                    {buildCompactCoordinateLabel(destinationPoint)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-5 border-t border-black/5 px-0 pt-5">
                        <div className="grid w-full gap-3 sm:grid-cols-3">
                            <button
                                type="button"
                                onClick={() => void requestRoute()}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--detail-primary)] px-4 py-3 font-semibold text-[var(--detail-primary)] transition-colors hover:bg-[var(--detail-primary-fixed)]"
                            >
                                <LocateFixed className="h-4 w-4" />
                                Coba lagi
                            </button>
                            <a
                                href={mapHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 font-semibold text-[var(--detail-on-surface)] transition-colors hover:bg-[var(--detail-surface-high)]"
                            >
                                <MapPinned className="h-4 w-4" />
                                Lihat titik peta
                            </a>
                            <a
                                href={navigationHref}
                                target="_blank"
                                rel="noreferrer"
                                className="chlorophyll-gradient inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Buka di Google Maps
                            </a>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
