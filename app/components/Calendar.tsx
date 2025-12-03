"use client";

import { useState } from "react";

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({ selectedDate, onDateSelect, minDate, maxDate }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (date < today) return true; // Can't select past dates
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    const dateStr = date.toISOString().split("T")[0];
    onDateSelect(dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    days.push(date);
  }

  return (
    <div className="calendar bg-transparent">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const todayClass = isToday(date);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={`
                aspect-square rounded-lg text-center transition-all
                ${disabled
                  ? "text-gray-600 cursor-not-allowed opacity-30"
                  : selected
                    ? "bg-white text-black font-bold"
                    : todayClass
                      ? "bg-white/20 text-white border-2 border-white/50"
                      : "bg-gray-800/50 text-white hover:bg-gray-700/50"
                }
              `}
            >
              <div className="text-base md:text-lg font-medium">{date.getDate()}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


