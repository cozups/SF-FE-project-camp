import {
  Header,
  HighlightsWidget,
  HourlyWidget,
  MapWidget,
  TodayWidget,
  WeeklyWidget,
} from '@/components';

function HomePage() {
  return (
    <div className="page bg-gray-200">
      <div className="page__container">
        <Header />
        <div className="w-full flex flex-col items-center justify-start pb-6 px-6 gap-6">
          {/* 상단 3개의 위젯 */}
          <div className="w-full flex items-center gap-6">
            <TodayWidget />
            <HourlyWidget />
            <MapWidget />
          </div>
          {/* 하단 2개의 위젯 */}
          <div className="w-full flex items-center gap-6">
            <HighlightsWidget />
            <WeeklyWidget />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
