import { useEffect, useState } from 'react';
import { PositionType } from '../type';

const useCurrentLocation = () => {
    const [currentPosition, setCurrentPosition] = useState<PositionType | null>(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const loc = { lat: latitude, lng: longitude };
                        setCurrentPosition(loc);
                        console.log("📍 Fetched current location:", loc);
                    },
                    (error) => console.error('Geolocation error 😕', error)
                );
            } else {
                console.warn('Geolocation not supported 🚫');
            }
        };

        getLocation();
        return () => {
            setCurrentPosition(null);
        }
    }, []);
    return { currentPosition };
}

export default useCurrentLocation