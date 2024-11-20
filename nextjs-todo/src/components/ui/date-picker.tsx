'use client';

import { CalendarSearch } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { useEffect, useState } from 'react';

interface Props {
  label: 'From' | 'To';
  value: Date | null;
  onSelect: (label: 'from' | 'to', date: Date) => void;
}

function DatePicker({ label, value, onSelect }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (value) {
      const valueToDate = new Date(value);
      setDate(valueToDate);
    }
  }, [value]);

  const onSelectDate = (date: Date) => {
    setDate(date);
    onSelect(label.toLowerCase() as 'from' | 'to', date);
  };

  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-40 bg-white text-black flex items-center justify-between gap-3 border px-3 py-2 rounded-sm focus:border-2 focus:border-neutral-500">
            {date && formatDate(date)}
            <CalendarSearch className="w-4 h-4 text-neutral-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(date) => onSelectDate(date!)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DatePicker };
