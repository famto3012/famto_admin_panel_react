import { DatePicker } from 'antd';
import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const DateChange = () => {
  const [dateFilter, setDateFilter] = useState(null);

  const onDateChange = (date) => {
    setDateFilter(date);
  };

  const CustomInput = ({ value, onClick }) => (
    <button onClick={onClick} className="p-2">
      <FaCalendarAlt size={24} />
    </button>
  );

  return (
    <div className="flex items-center">
      
        selected={dateFilter}
        onChange={onDateChange}
        customInput={<CustomInput />}
    
    </div>
  );
};

export default DateChange;
