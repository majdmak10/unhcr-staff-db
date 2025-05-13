"use client";

import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

interface DateInputFieldProps {
  name: string; // Unique name for form submission
  label: string; // Label for the input
  initialDate?: string; // Expected format: YYYY-MM-DD
  placeholder?: string; // Custom placeholder (optional)
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  name,
  label,
  initialDate,
  placeholder,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dateInputRef = useRef<DatePicker | null>(null);

  // Convert initialDate (YYYY-MM-DD) to a Date object
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(new Date(initialDate));
    }
  }, [initialDate]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <main className="relative w-full ">
      <label className="block text-sm font-semibold text-gray-500 mb-2">
        {label}
      </label>

      {/* Date Input Field with Calendar Icon */}
      <div className="relative w-full rounded-md ring-[1.5px] ring-gray-300 hover:ring-mBlue focus:ring-mBlue focus:outline-none p-2 pr-10 transition-all duration-200 h-10">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText={placeholder || "DD/MM/YYYY"}
          className="w-full text-gray-400 focus:outline-none mr-8"
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          ref={dateInputRef} // ✅ Attach ref correctly
          popperClassName="z-50"
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-4 py-2 bg-mHover text-black rounded-t-md gap-2">
              {/* Month Dropdown */}
              <select
                aria-label="month"
                value={date.getMonth()}
                onChange={(event) => {
                  event.preventDefault(); // ✅ Prevent unintended navigation
                  changeMonth(Number(event.target.value));
                }}
                className="px-2 py-1 border border-mHover rounded-md bg-white text-black"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select
                aria-label="year"
                value={date.getFullYear()}
                onChange={(event) => {
                  event.preventDefault(); // ✅ Prevent unintended navigation
                  changeYear(Number(event.target.value));
                }}
                className="px-2 py-1 border border-mHover rounded-md bg-white text-black"
              >
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - 50 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>

              {/* Previous & Next Month Buttons */}
              <button
                onClick={(event) => {
                  event.preventDefault(); // ✅ Prevent unintended navigation
                  decreaseMonth();
                }}
                disabled={prevMonthButtonDisabled}
                className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                ‹
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault(); // ✅ Prevent unintended navigation
                  increaseMonth();
                }}
                disabled={nextMonthButtonDisabled}
                className="px-2 p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                ›
              </button>
            </div>
          )}
        />

        {/* Calendar Icon Inside Input */}
        <Image
          src="/profile_icons/calendar_gray.png"
          alt="Calendar Icon"
          width={20}
          height={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => dateInputRef.current?.setOpen(true)} // ✅ Open Datepicker on click
        />
      </div>

      {/* Hidden input to store the correct format for form submission */}
      <input
        type="hidden"
        name={name}
        value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
      />

      {/* Inline Style to Override React Datepicker Day Hover */}
      <style>
        {`
        .react-datepicker {
            border-radius: 8px !important; /* More rounded corners */
            overflow: hidden !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2) !important; /* Slight shadow for depth */
            border: 1px solid #d5e5fa !important;
          }
        
          .react-datepicker__header {
            background-color: #d5e5fa !important;
            color: black !important;
            border-bottom: 1px solid #d5e5fa !important;
          }
          
          .react-datepicker__day:hover {
            background-color: #3b82f6 !important; /* Tailwind mBlue */
            color: white !important;
            border-radius: 50% !important;; /* Ensure it's circular */
          }
          
          .react-datepicker__day--selected {
            background-color: #3b82f6 !important; /* Tailwind mBlue */
            color: white !important;
            font-weight: bold;
            border-radius: 50% !important;;
          }

          .react-datepicker__day--today {
            font-weight: bold;
            color: #3b82f6 !important; /* Tailwind mBlue */
          }
        `}
      </style>
    </main>
  );
};

export default DateInputField;
