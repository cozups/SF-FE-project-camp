'use client';

import { CalendarSearch } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { useState } from 'react';

interface Props {
  label: string;
  value: string;
  onSelect: () => void;
}

function DatePicker({ label, value, onSelect }: Props) {
  const [date, setDate] = useState<Date>(null);
  console.log(date);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-40 bg-white text-black flex items-center justify-between gap-3 border px-3 py-2 rounded-sm focus:border-2 focus:border-neutral-500">
            {date ? new Date(date).toISOString().split('T')[0] : ''}
            <CalendarSearch className="w-4 h-4 text-neutral-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { DatePicker };
