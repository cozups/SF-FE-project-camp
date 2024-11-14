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
  date: string;
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

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>7 Days</CardTitle>
        <CardDescription>이번 주 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {data.map((item) => (
          <WeeklyWeatherItem
            data={{
              imgUrl: `src/assets/icons/${item.iconCode}d.svg`,
              highestTemp: Math.round(item.maxTemp),
              lowestTemp: Math.round(item.minTemp),
              date: '03 Nov',
              day: '일요일',
            }}
            key={item.date}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export { WeeklyWidget };
