import 'leaflet/dist/leaflet.css';

import { LocateFixed } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';

const batuCenter: [number, number] = [-7.8716, 112.5283];

type LocationState = [number, number] | null;

function RecenterMap({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, 15, {
            animate: true,
            duration: 1.2,
        });
    }, [center, map]);

    return null;
}

export default function LiveLocationMapClient() {
    const [userLocation, setUserLocation] = useState<LocationState>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [status, setStatus] = useState('Klik tombol lokasi untuk mendeteksi posisimu di peta.');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [trackingVersion, setTrackingVersion] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const requestFromHash = () => {
            if (window.location.hash === '#map') {
                setTrackingVersion((current) => current + 1);
            }
        };

        requestFromHash();
        window.addEventListener('hashchange', requestFromHash);

        return () => window.removeEventListener('hashchange', requestFromHash);
    }, []);

    useEffect(() => {
        if (trackingVersion === 0) {
            return;
        }

        if (!('geolocation' in navigator)) {
            setStatus('Browser ini belum mendukung geolocation.');
            setErrorMessage('Perangkat atau browser tidak menyediakan akses lokasi.');
            return;
        }

        setStatus('Meminta izin lokasi dan mencari posisimu...');
        setErrorMessage(null);

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
                setAccuracy(position.coords.accuracy);
                setStatus('Lokasimu berhasil ditemukan dan akan terus diperbarui secara otomatis.');
            },
            (error) => {
                const nextMessage =
                    error.code === error.PERMISSION_DENIED
                        ? 'Izin lokasi ditolak. Izinkan akses lokasi di browser untuk menampilkan titikmu.'
                        : 'Lokasi belum bisa diambil. Coba lagi dalam beberapa saat.';

                setStatus(nextMessage);
                setErrorMessage(error.message);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 15000,
            },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [trackingVersion]);

    return (
        <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_45px_rgba(27,28,25,0.08)]">
            <div className="flex flex-col gap-4 border-b border-stone-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div>
                    <h3 className="text-xl font-bold text-[var(--app-text)]">Peta Lokasi Kamu</h3>
                    <p className="mt-1 text-sm text-[var(--app-text-muted)]">{status}</p>
                </div>
                <button
                    type="button"
                    onClick={() => setTrackingVersion((current) => current + 1)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--app-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--app-primary-strong)]"
                >
                    <LocateFixed className="h-4 w-4" />
                    Tampilkan lokasi saya
                </button>
            </div>

            <MapContainer center={userLocation ?? batuCenter} zoom={13} scrollWheelZoom className="h-[26rem] w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecenterMap center={userLocation ?? batuCenter} />

                {userLocation ? (
                    <>
                        <Circle
                            center={userLocation}
                            radius={accuracy ?? 60}
                            pathOptions={{
                                color: '#135227',
                                fillColor: '#135227',
                                fillOpacity: 0.12,
                            }}
                        />
                        <CircleMarker
                            center={userLocation}
                            radius={10}
                            pathOptions={{
                                color: '#ffffff',
                                weight: 3,
                                fillColor: '#135227',
                                fillOpacity: 1,
                            }}
                        >
                            <Popup>
                                Kamu berada di sekitar titik ini.
                                <br />
                                Akurasi: {accuracy ? `${Math.round(accuracy)} meter` : 'sedang diproses'}
                            </Popup>
                        </CircleMarker>
                    </>
                ) : (
                    <CircleMarker
                        center={batuCenter}
                        radius={8}
                        pathOptions={{
                            color: '#ffffff',
                            weight: 2,
                            fillColor: '#2f6b3d',
                            fillOpacity: 0.85,
                        }}
                    >
                        <Popup>Titik awal peta berada di area Kota Batu.</Popup>
                    </CircleMarker>
                )}
            </MapContainer>

            <div className="grid gap-3 border-t border-stone-100 bg-[var(--app-surface-muted)] px-6 py-4 text-sm text-[var(--app-text-muted)] md:grid-cols-2">
                <div>
                    <span className="font-semibold text-[var(--app-text)]">Koordinat aktif:</span>{' '}
                    {userLocation ? `${userLocation[0].toFixed(6)}, ${userLocation[1].toFixed(6)}` : 'belum tersedia'}
                </div>
                <div>
                    <span className="font-semibold text-[var(--app-text)]">Status izin:</span> {errorMessage ? errorMessage : 'siap digunakan'}
                </div>
            </div>
        </div>
    );
}
