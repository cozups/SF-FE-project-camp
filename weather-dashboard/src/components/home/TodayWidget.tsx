import { CalendarDays, MapPinned } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components';
import { Weather } from '@/types';

interface Props {
  data: Weather;
}

function TodayWidget({ data }: Props) {
  const { current, location } = data;

  return (
    <Card className="w-1/4 min-w-[25%]">
      <CardHeader>
        <CardTitle className="text-xl">Today</CardTitle>
        <CardDescription>오늘 현재 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center gap-4">
            {/* 날씨 아이콘 */}
            {/* 오리지널 아이콘 코드 */}
            {/* "//cdn.weatherapi.com/weather/64x64/day/116.png" */}
            {current.condition.icon.includes('day') ? (
              <img
                src={`src/assets/icons/${current.condition.code}d.svg`}
                alt="weather-icon"
                className="w-16 h-16"
              />
            ) : (
              <img
                src={`src/assets/icons/${current.condition.code}n.svg`}
                alt="weather-icon"
                className="w-16 h-16"
              />
            )}
            <div className="w-full flex items-start gap-1">
              <span className="poppins-bold scroll-m-20 text-6xl font-extrabold tracking-tight">
                {Math.round(current.temp_c)}
              </span>
              <span className="text-4xl font-extrabold">&#8451;</span>
            </div>
          </div>
          <Separator className="mt-2 mb-3" />
          <div className="w-full flex flex-col">
            {/* 캘린더 날짜 표시 영역 */}
            <div className="flex items-center justify-start gap-2">
              <CalendarDays className="w-4 h-4" />
              <p className="leading-6">{location.localtime.split(' ')[0]}</p>
            </div>
            {/* 위치 표시 영역 */}
            <div className="flex items-center justify-start gap-2">
              <MapPinned className="w-4 h-4" />
              <p className="leading-6">
                {location.name} &middot; {location.country}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { TodayWidget };
