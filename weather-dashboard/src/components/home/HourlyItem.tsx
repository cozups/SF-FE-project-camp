import { Card } from '@/components';
import { HourlyData } from '@/types';
import useFormattedTime from '@/hooks/useFormattedTime';

interface Props {
  data: HourlyData;
}

function HourlyItem({ data }: Props) {
  const time = useFormattedTime(data.time);
  return (
    <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center pt-[10px] pb-[6px] gap-1 bg-neutral-50">
      <span className="text-sm">{time}</span>
      {data.condition.icon.includes('day') ? (
        <img
          src={`src/assets/icons/${data.condition.code}d.svg`}
          alt="weather-item-icon"
          className="w-14 h-14"
        />
      ) : (
        <img
          src={`src/assets/icons/${data.condition.code}n.svg`}
          alt="weather-item-icon"
          className="w-14 h-14"
        />
      )}

      <div className="w-full flex items-start justify-center">
        <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
          {Math.round(data.temp_c)}
        </span>
        <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
          &#8451;
        </span>
      </div>
    </Card>
  );
}

export { HourlyItem };
