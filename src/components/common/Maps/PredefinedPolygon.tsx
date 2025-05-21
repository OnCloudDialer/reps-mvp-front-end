import React, { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';


interface PredefinedPolygonProps {
    paths: any;
    onPathUpdate: (data: any) => void;
}

const PredefinedPolygon: React.FC<PredefinedPolygonProps> = ({ paths, onPathUpdate }) => {
    const map = useMap();
    const polygonRef = useRef<google.maps.Polygon | null>(null);

    useEffect(() => {
        if (!map || !paths?.length) return;

        // Cleanup previous polygon
        if (polygonRef.current) {
            polygonRef.current.setMap(null);
        }

        const polygon = new google.maps.Polygon({
            paths,
            editable: true,
            draggable: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
        });

        polygon.setMap(map);
        polygonRef.current = polygon;

        const path = polygon.getPath();

        const handlePathChange = () => {
            const newPath = path.getArray().map((latLng) => ({
                lat: latLng.lat(),
                lng: latLng.lng(),
            }));
            console.log("✏️ Polygon updated:", newPath);
            onPathUpdate?.(newPath);
        };

        path.addListener('insert_at', handlePathChange);
        path.addListener('set_at', handlePathChange);
        path.addListener('remove_at', handlePathChange);

        return () => {
            polygon.setMap(null);
        };
    }, [map, paths, onPathUpdate]);

    return null;
};

export default PredefinedPolygon;