import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import Heading from '@enact/moonstone/Heading';
import './Calendar.css';

const Calendar = kind({
    name: 'Calendar',

    defaultProps: {
        currentDate: new Date(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear()
    },

    handlers: {
        handlePrevMonth: (ev, {onUpdateMonth, currentMonth, currentYear}) => {
            if (onUpdateMonth) {
                if (currentMonth === 0) {
                    onUpdateMonth(11, currentYear - 1);
                } else {
                    onUpdateMonth(currentMonth - 1, currentYear);
                }
            }
        },

        handleNextMonth: (ev, {onUpdateMonth, currentMonth, currentYear}) => {
            if (onUpdateMonth) {
                if (currentMonth === 11) {
                    onUpdateMonth(0, currentYear + 1);
                } else {
                    onUpdateMonth(currentMonth + 1, currentYear);
                }
            }
        },

        handleToday: (ev, {onUpdateMonth}) => {
            if (onUpdateMonth) {
                const today = new Date();
                onUpdateMonth(today.getMonth(), today.getFullYear());
            }
        }
    },

    computed: {
        calendarDays: ({currentYear, currentMonth, currentDate}) => {
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const startingDay = firstDay.getDay();
            const monthLength = lastDay.getDate();
            const days = [];
            let date = 1;
            const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
            let prevMonthStartDate = prevMonthLastDate - startingDay + 1;
            for (let i = 0; i < startingDay; i++) {
                days.push({
                    date: prevMonthStartDate,
                    isOtherMonth: true
                });
                prevMonthStartDate++;
            }
            while (date <= monthLength) {
                const isToday = 
                    date === currentDate.getDate() &&
                    currentMonth === currentDate.getMonth() &&
                    currentYear === currentDate.getFullYear();
                days.push({
                    date,
                    isToday,
                    isOtherMonth: false
                });
                date++;
            }
            let nextMonthDate = 1;
            while (days.length < 42) {
                days.push({
                    date: nextMonthDate,
                    isOtherMonth: true
                });
                nextMonthDate++;
            }
            return days;
        }
    },

    render: ({calendarDays, handlePrevMonth, handleNextMonth, handleToday, currentYear, currentMonth}) => (
        <div className="calendar">
            <div className="header">
                <Heading>
                    {currentYear}년 {currentMonth + 1}월
                </Heading>
                <div className="controls">
                    <Button onClick={handlePrevMonth}>arrowleft</Button>
                    <Button onClick={handleToday}>Today</Button>
                    <Button onClick={handleNextMonth}>arrowright</Button>
                </div>
            </div>
            <div className="grid">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                    <div key={day} className="weekday">
                        {day}
                    </div>
                ))}
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`day ${day.isOtherMonth ? 'otherMonth' : ''} ${day.isToday ? 'today' : ''}`}
                    >
                        <span>{day.date}</span>
                    </div>
                ))}
            </div>
        </div>
    )
});

export default Calendar;