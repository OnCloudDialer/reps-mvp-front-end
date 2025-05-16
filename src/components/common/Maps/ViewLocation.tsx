
import { Map, Marker } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import MapProvider from './MapProvider';


interface PositionType { lat: number, lng: number }


interface ViewLocationProps {
    currentLocation?: PositionType;
}

const ViewLocation: React.FC<ViewLocationProps> = ({ currentLocation }) => {

    const [currentPosition, setCurrentPosition] = useState<PositionType | null>(null);
    const [marker, setMarker] = useState<PositionType | null>(null);

    useEffect(() => {
        if (currentLocation) {
            setCurrentPosition(currentLocation);
            setMarker(currentLocation);
            console.log("📌 Using provided currentLocation:", currentLocation);
        } else {
            setMarker(null);
            setCurrentPosition(null);
        }
    }, []);


    return (
        <>
            <MapProvider>
                {currentPosition && (
                    <Map
                        defaultCenter={currentPosition}
                        zoom={8}
                        className='w-full h-80'
                    >
                        {marker && <Marker position={marker} />}
                    </Map>
                )}
            </MapProvider>
        </>
    )
}

export default ViewLocation