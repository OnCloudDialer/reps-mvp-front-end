
import { Map, MapMouseEvent, Marker } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import MapProvider from './MapProvider';
import { PositionType } from './type';
import useCurrentLocation from './hooks/useCurrentLocation';




interface ChooseLocationMapProps {
    onFinish: (data: PositionType) => void;
    currentLocation?: PositionType;
}

const ChooseLocationMap: React.FC<ChooseLocationMapProps> = ({ onFinish, currentLocation }) => {
    const { currentPosition } = useCurrentLocation();
    const [marker, setMarker] = useState<PositionType | null>(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const loc = { lat: latitude, lng: longitude };
                        setMarker(loc);
                        console.log("📍 Fetched current location:", loc);
                    },
                    (error) => console.error('Geolocation error 😕', error)
                );
            } else {
                console.warn('Geolocation not supported 🚫');
            }
        };

        if (currentLocation) {
            setMarker(currentLocation);
            console.log("📌 Using provided currentLocation:", currentLocation);
        } else {
            getLocation();
        }
        return () => {
            setMarker(null);
        }
    }, []);


    const handleMapClick = (event: MapMouseEvent) => {
        const { latLng } = event.detail;
        if (latLng) {
            const clickedLocation: PositionType = {
                lat: latLng.lat,
                lng: latLng.lng,
            };
            setMarker(clickedLocation);
            onFinish(clickedLocation);
        }
    };

    return (
        <>
            <MapProvider>
                {currentPosition && (
                    <Map
                        defaultCenter={currentPosition}
                        zoom={8}
                        className='w-full min-h-80 h-80'
                        onClick={handleMapClick}
                    >

                        {marker && <Marker position={marker} />}
                    </Map>
                )}
            </MapProvider>
        </>
    )
}

export default ChooseLocationMap