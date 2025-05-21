import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps';
import { useDrawingManager } from './hooks/useDrawingManager';
import { UndoRedoControl } from './UndoRedoControls';
import React, { useEffect } from 'react';
import PredefinedPolygon from './PredefinedPolygon';
import useCurrentLocation from './hooks/useCurrentLocation';


interface MapDrawingMangerProps {
    onDone: (pathData: any) => void;
    data?: any;
}

const MapDrawingManger: React.FC<MapDrawingMangerProps> = ({ onDone, data }) => {
    const drawingManager = useDrawingManager();
    const { currentPosition } = useCurrentLocation()
    useEffect(() => {
        if (!drawingManager) return;

        const listener = google.maps.event.addListener(
            drawingManager,
            "overlaycomplete",
            (event: any) => {
                const shapeType = event.type; // "polygon", "circle", "rectangle"
                const overlay = event.overlay;

                let shapeData = {};

                if (shapeType === "polygon") {
                    const path = overlay.getPath().getArray().map((latlng: any) => ({
                        lat: latlng.lat(),
                        lng: latlng.lng(),
                    }));
                    shapeData = { paths: path };
                }

                if (shapeType === "circle") {
                    shapeData = {
                        center: {
                            lat: overlay.getCenter().lat(),
                            lng: overlay.getCenter().lng(),
                        },
                        radius: overlay.getRadius(),
                    };
                }

                if (shapeType === "rectangle") {
                    const bounds = overlay.getBounds();
                    shapeData = {
                        bounds: {
                            north: bounds.getNorthEast().lat(),
                            east: bounds.getNorthEast().lng(),
                            south: bounds.getSouthWest().lat(),
                            west: bounds.getSouthWest().lng(),
                        },
                    };
                }
                onDone(shapeData);
            }
        );

        return () => {
            google.maps.event.removeListener(listener);
        };
    }, [drawingManager]);
    return (
        <>
            <Map
                defaultZoom={8}
                // @ts-ignore
                defaultCenter={data ? undefined : currentPosition}
                gestureHandling={'greedy'}
                className='w-full min-h-80 h-80'
                disableDefaultUI={true}
            />
            {
                data &&
                <PredefinedPolygon onPathUpdate={(data) => {
                    onDone({ paths: data });
                }} paths={data} />

            }

            <MapControl position={ControlPosition.TOP_CENTER}>
                <UndoRedoControl drawingManager={drawingManager} />
            </MapControl>

        </>
    );
};

export default MapDrawingManger;
