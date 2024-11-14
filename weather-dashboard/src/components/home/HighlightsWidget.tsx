import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HighlightsItem,
  SunriseAndSunset,
} from '@/components';
import { ForecastTideDay, Tide, Weather } from '@/types';

interface Props {
  tideData: ForecastTideDay;
  currentData: Weather;
}

function HighlightsWidget({ tideData, currentData }: Props) {
  if (
    !currentData ||
    !currentData.forecast ||
    !currentData.forecast.forecastday[0]
  ) {
    return;
  }
  const tideTimesWithUnits = tideData.day.tides[0].tide.map((item: Tide) => {
    const hourString = item.tide_time.split(' ')[1];
    const hour = Number(hourString.split(':')[0]);
    const formattedUnit = hour < 12 ? 'am' : 'pm';

    return {
      displayTime: hourString,
      unit: formattedUnit,
      type: item.tide_type,
    };
  });
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-xl">Today's Highlights</CardTitle>
        <CardDescription>
          오늘 날씨 중 주의깊게 살펴보아야 할 이벤트를 조회하고 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <Card className="w-full bg-neutral-100">
            <CardHeader>
              <CardDescription className="font-semibold text-neutral-700">
                해양 및 조수 데이터
                <span className="text-neutral-400 font-normal ml-1">
                  Marine and Sailing
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex items-center justify-between">
              <img
                src="src/assets/icons/Waves.png"
                alt="waves"
                className="h-14"
              />
              <div className="w-fit grid grid-cols-4 gap-3">
                {tideTimesWithUnits.map((tide, index) => (
                  <div
                    className="flex flex-col items-center"
                    key={tide.displayTime}
                  >
                    {/* 몇회 만조/간조 표시 영역 */}
                    <p className="text-sm text-muted-foreground">
                      {index + 1}회 - {tide.type === 'HIGH' ? '만조' : '간조'}
                    </p>
                    {/* 시간 표시 영역 */}
                    <p className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight">
                      {tide.displayTime}
                      <span className="ml-[1px]">{tide.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="w-full bg-neutral-100">
            <CardHeader>
              <CardDescription className="font-semibold text-neutral-700">
                일출/일몰
                <span className="text-neutral-400 font-normal ml-1">
                  Sunrise and Sunset
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2">
              <SunriseAndSunset
                data={{
                  imgUrl: 'src/assets/icons/1000d.svg',
                  label: 'Sunrise',
                  time: currentData.forecast.forecastday[0].astro.sunrise,
                }}
              />
              <SunriseAndSunset
                data={{
                  imgUrl: 'src/assets/icons/1000n.svg',
                  label: 'Sunset',
                  time: currentData.forecast.forecastday[0].astro.sunset,
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <HighlightsItem
            data={{
              label: '습도',
              description: 'Humidity',
              imgUrl: 'src/assets/icons/Humidity.svg',
              value: currentData.current.humidity,
              unit: '%',
            }}
          />
          <HighlightsItem
            data={{
              label: '기압',
              description: 'Pressure',
              imgUrl: 'src/assets/icons/Wind.svg',
              value: currentData.current.pressure_mb,
              unit: 'hPa',
            }}
          />
          <HighlightsItem
            data={{
              label: '가시거리',
              description: 'Visibility',
              imgUrl: 'src/assets/icons/Fog.svg',
              value: currentData.current.vis_km,
              unit: 'km',
            }}
          />
          <HighlightsItem
            data={{
              label: '체감온도',
              description: 'Feels Like',
              imgUrl: 'src/assets/icons/Hot.svg',
              value: currentData.current.feelslike_c,
              unit: '\u2103', // 유니코드로 전달
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { HighlightsWidget };
