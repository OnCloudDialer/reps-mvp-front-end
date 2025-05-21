import { useReducer, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

import reducer, {
    useDrawingManagerEvents,
    useOverlaySnapshots
} from './undo-redo';
import { DrawingActionKind } from './type';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


interface Props {
    drawingManager: google.maps.drawing.DrawingManager | null;
}

export const UndoRedoControl = ({ drawingManager }: Props) => {
    const map = useMap();

    const [state, dispatch] = useReducer(reducer, {
        past: [],
        now: [],
        future: []
    });

    const overlaysShouldUpdateRef = useRef<boolean>(false);

    useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch);
    useOverlaySnapshots(map, state, overlaysShouldUpdateRef);

    return (
        <div className="bg-white p-2 mt-1 space-x-4 cursor-pointer">
            <button
                onClick={() => dispatch({ type: DrawingActionKind.UNDO })}
                disabled={!state.past.length}>
                <LeftOutlined />
            </button>
            <button
                onClick={() => dispatch({ type: DrawingActionKind.REDO })}
                disabled={!state.future.length}>
                <RightOutlined />
            </button>
        </div>
    );
};
