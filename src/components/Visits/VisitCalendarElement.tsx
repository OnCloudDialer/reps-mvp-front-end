import { Badge } from 'antd';
import React from 'react'
import { Visit } from '../../services/visits/type';
import { getVisitBadgeColor } from './utils';


interface VisitCalendarElementProps {
    visit: Visit;
    onClick: (data: Visit) => void;
}

const VisitCalendarElement: React.FC<VisitCalendarElementProps> = ({ onClick, visit }) => {
    return (
        <div>
            <Badge onClick={(e) => {
                e.stopPropagation();
                onClick(visit);
            }} status={getVisitBadgeColor(visit.visitType)} text={`Visiting ${visit.contact.name} at ${visit.store.name}`} />
        </div>
    )
}

export default VisitCalendarElement