import { useEffect, useState } from 'react';
import {
  Header,
  HighlightsWidget,
  HourlyWidget,
  MapWidget,
  TodayWidget,
  WeeklyWidget,
} from '@/components';
import { fetchApi, fetchTideApi, getOneWeekWeather } from '@/api';
import { defaultTideData, defaultWeatherData } from '@/state';

function HomePage() {
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [tideData, setTideData] = useState(defaultTideData);
  const [oneWeekWeatherSummary, setOneWeekWeatherSummary] = useState([]);

  useEffect(() => {
    fetchApi(setWeatherData);
    fetchTideApi(setTideData);
    getOneWeekWeather(setOneWeekWeatherSummary);
  }, []);

  return (
    <div className="page bg-gray-200">
      <div className="page__container">
        <Header />
        <div className="w-full flex flex-col items-center justify-start pb-6 px-6 gap-6">
          {/* 상단 3개의 위젯 */}
          <div className="w-full flex items-center gap-6">
            <TodayWidget data={weatherData} />
            <HourlyWidget data={weatherData.forecast.forecastday[0]} />
            <MapWidget />
          </div>
          {/* 하단 2개의 위젯 */}
          <div className="w-full flex items-center gap-6">
            <HighlightsWidget tideData={tideData} currentData={weatherData} />
            <WeeklyWidget data={oneWeekWeatherSummary} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
