'use client';

import { CalendarSearch } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { useEffect, useState } from 'react';
import { formatDate } from 'date-fns';

interface Props {
  label: 'From' | 'To';
  data: Date | null;
  onSelect: (label: 'from' | 'to', date: Date) => void;
  // setState: Dispatch<SetStateAction<DateType>>;
}

function DatePicker({ label, data, onSelect }: Props) {
  const [date, setDate] = useState<Date | null>();

  useEffect(() => {
    setDate(data);
  }, [data]);

  const onSelectDate = (date: Date) => {
    setDate(date);
    onSelect(label.toLowerCase() as 'from' | 'to', date);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-40 bg-white text-black flex items-center justify-between gap-3 border px-3 py-2 rounded-sm focus:border-2 focus:border-neutral-500">
            {date ? formatDate(date, 'yyyy-MM-dd') : ''}
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
