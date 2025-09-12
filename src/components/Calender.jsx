import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

const MDatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [realTime, setRealTime] = useState(new Date());

  // Update real time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const selectYear = (year) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const selectMonth = (monthIndex) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return selectedDate &&
           date &&
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Select a date';
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRealTime = () => {
    return realTime.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="  p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Real-time display */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-900 text-white p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-semibold">Live Time</span>
          </div>
          <div className="text-m font-mono font-bold tracking-wider">
            {formatRealTime()}
          </div>
          <div className="text-sm opacity-90">
            {realTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Selected date display */}
        <div 
          className=" p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Selected Date</div>
                <div className="font-semibold text-gray-800">
                  {formatSelectedDate()}
                </div>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </div>
        </div>

        {/* Date picker */}
        {isOpen && (
          <div className="p-4">
            {/* Month/Year navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMonthPicker(!showMonthPicker)}
                  className="px-4 py-2 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {months[currentDate.getMonth()]}
                </button>
                <button
                  onClick={() => setShowYearPicker(!showYearPicker)}
                  className="px-4 py-2 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {currentDate.getFullYear()}
                </button>
              </div>
              
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Year picker */}
            {showYearPicker && (
              <div className="mb-2 max-h-20 overflow-y-auto border rounded-lg bg-gray-50">
                <div className="grid grid-cols-5 ">
                  {generateYears().map(year => (
                    <button
                      key={year}
                      onClick={() => selectYear(year)}
                      className={`p-1 text-sm rounded-lg transition-colors ${
                        year === currentDate.getFullYear()
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-100 text-gray-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Month picker */}
            {showMonthPicker && (
              <div className="max-h-20 mb-2 overflow-y-auto border rounded-lg bg-gray-50 p-1">
                <div className="grid grid-cols-3 ">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => selectMonth(index)}
                      className={`p-1 text-sm rounded-lg transition-colors ${
                        index === currentDate.getMonth()
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-100 text-gray-700'
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-500 p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7  ">
              {getDaysInMonth(currentDate).map((date, index) => (
                <button
                  key={index}
                  onClick={() => date && selectDate(date)}
                  disabled={!date}
                  className={`
                    p-1 text-sm rounded-lg transition-all duration-200 
                    ${!date ? 'invisible' : ''}
                    ${isToday(date) 
                      ? 'bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold shadow-lg transform scale-105' 
                      : ''
                    }
                    ${isSelected(date) 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md' 
                      : ''
                    }
                    ${!isToday(date) && !isSelected(date) 
                      ? 'hover:bg-blue-100 text-gray-700 hover:scale-105 hover:shadow-md' 
                      : ''
                    }
                  `}
                >
                  {date && date.getDate()}
                </button>
              ))}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 mt-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => selectDate(new Date())}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Today
              </button>
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setIsOpen(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MDatePicker;