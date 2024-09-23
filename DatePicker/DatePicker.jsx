"use client";
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const DatePicker = ({ availableSlots, setSelectedDate, selectedDate }) => {
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    // Extract available dates from the availableSlots
    const availableDates = availableSlots.map(slot => slot.date);

    // Set the default selected date to the first available date if none is selected
    useEffect(() => {
        if (!selectedDate && availableDates.length > 0) {
            setSelectedDate(dayjs(availableDates[0]));
        }
    }, [availableDates, selectedDate, setSelectedDate]);

    // Get all days for the current month
    const daysInMonth = currentMonth.daysInMonth();
    const firstDayOfMonth = currentMonth.startOf('month').day();

    // Handle date selection, disabled for unavailable dates
    const handleDateClick = (date) => {
        const isAvailable = isDateAvailable(date);
        if (isAvailable) {
            setSelectedDate(date);
        }
    };

    // Handle month navigation
    const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, 'month'));
    const goToPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, 'month'));

    // Function to check if a date is available
    const isDateAvailable = (date) => {
        return availableDates.includes(date.format('YYYY-MM-DD'));
    };

    // Create an array to fill empty spots for the first week
    const emptyDays = Array.from({ length: firstDayOfMonth });

    return (
        <div className="w-full max-w-xl mx-auto my-5 px-2">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={goToPreviousMonth}
                    className="bg-indigo-200 text-primaryColor active:scale-90 hover:bg-primaryColor hover:text-white transition font-semibold px-2 rounded-md"
                >
                    &lt; Prev
                </button>
                <h2 className="text-xl font-semibold">{currentMonth.format('MMMM YYYY')}</h2>
                <button
                    onClick={goToNextMonth}
                    className="bg-indigo-200 text-primaryColor active:scale-90 hover:bg-primaryColor hover:text-white transition font-semibold px-2 rounded-md"
                >
                    Next &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-4 px-2">
                {/* Weekdays */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-semibold">
                        {day}
                    </div>
                ))}

                {/* Empty slots for days of the previous month */}
                {emptyDays.map((_, index) => (
                    <div key={index}></div>
                ))}

                {/* Render the days of the current month */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                    const date = currentMonth.date(index + 1);
                    const isAvailable = isDateAvailable(date);

                    return (
                        <div
                            key={date}
                            onClick={() => handleDateClick(date)}
                            className={`text-center cursor-pointer  p-2 rounded-lg
                            ${isAvailable ? 'bg-indigo-200 text-primaryColor font-semibold' : 'bg-gray-200 cursor-not-allowed'} 
                            ${selectedDate && selectedDate.isSame(date, 'day') ? 'border-2 border-primaryColor' : ''}`}

                        >
                            {date.date()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DatePicker;
