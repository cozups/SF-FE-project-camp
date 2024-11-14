import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  WeeklyWeatherItem,
} from '@/components';

function WeeklyWidget() {
  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>7 Days</CardTitle>
        <CardDescription>이번 주 날씨를 조회하고 있습니다.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1063d.svg',
            highestTemp: 22,
            lowestTemp: 14,
            date: '03 Nov',
            day: '일요일',
          }}
        />
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1063d.svg',
            highestTemp: 17,
            lowestTemp: 9,
            date: '04 Nov',
            day: '월요일',
          }}
        />
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1000d.svg',
            highestTemp: 13,
            lowestTemp: 8,
            date: '05 Nov',
            day: '화요일',
          }}
        />
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1000d.svg',
            highestTemp: 10,
            lowestTemp: 6,
            date: '06 Nov',
            day: '수요일',
          }}
        />
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1000d.svg',
            highestTemp: 11,
            lowestTemp: 4,
            date: '07 Nov',
            day: '목요일',
          }}
        />
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1000d.svg',
            highestTemp: 13,
            lowestTemp: 6,
            date: '08 Nov',
            day: '금요일',
          }}
        />
        <WeeklyWeatherItem
          data={{
            imgUrl: 'src/assets/icons/1000d.svg',
            highestTemp: 15,
            lowestTemp: 9,
            date: '09 Nov',
            day: '토요일',
          }}
        />
      </CardContent>
    </Card>
  );
}

export { WeeklyWidget };
