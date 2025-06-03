import { Calendar, CalendarProps, Skeleton } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Visit } from '../../../services/visits/type';
import VisitCalendarElement from './VisitCalendarElement';
import { getDailyVisits, getMonthlyVisits } from '../utils';


interface VisitCalendarProps {
    visits: Visit[];
    onDateSelect: (value: Dayjs) => void;
    onViewVisit: (value: Visit) => void;
    loading?: boolean;
}

const VisitCalendar: React.FC<VisitCalendarProps> = ({ visits, onDateSelect, onViewVisit, loading }) => {

    const monthCellRender = (value: Dayjs) => {
        const plannedVisit = getMonthlyVisits(visits, value);
        return plannedVisit.map((item) =>
            <div className="notes-month" key={item.id}>
                <VisitCalendarElement onClick={onViewVisit} visit={item} />
            </div>
        )

    };

    const dateCellRender = (value: Dayjs) => {
        const plannedVisit = getDailyVisits(visits, value);
        return (
            <ul className="events">
                {plannedVisit.map((item) => (
                    <li key={item.id}>
                        <VisitCalendarElement onClick={onViewVisit} visit={item} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    if (loading) {
        return <div className='flex flex-col items-start justify-start gap-4'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    }

    return (
        <Calendar
            disabledDate={(date) => date.isBefore(dayjs(), 'day')}
            onSelect={onDateSelect} cellRender={cellRender} />
    )
}

export default VisitCalendar