import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  WeeklyWeatherItem,
} from '@/components';

interface WeekWeatherSummary {
  maxTemp: number;
  minTemp: number;
  date: number;
  iconCode: string;
  isDay: boolean;
}

interface Props {
  data: WeekWeatherSummary[];
}

function WeeklyWidget({ data }: Props) {
  if (!data) {
    return;
  }

  const getDateAndDay = (time: number) => {
    const date = new Date(time * 1000);
    const day = date.toLocaleString('en-EN', { day: '2-digit' });
    const month = date.toLocaleString('en-EN', { month: 'short' });
    const weekDay = date.toLocaleString('ko-KR', { weekday: 'long' });

    return {
      date: `${day} ${month}`,
      day: weekDay,
    };
  };

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>7 Days</CardTitle>
        <CardDescription>이번 주 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {data.map((item) => {
          const dateAndDay = getDateAndDay(item.date);
          return (
            <WeeklyWeatherItem
              data={{
                imgUrl: `src/assets/icons/${item.iconCode}d.svg`,
                highestTemp: Math.round(item.maxTemp),
                lowestTemp: Math.round(item.minTemp),
                date: dateAndDay.date,
                day: dateAndDay.day,
              }}
              key={item.date}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}

export { WeeklyWidget };
