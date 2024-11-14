import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components';

function HourlyWidget() {
  return (
    <Card className="flex-1 max-w-[calc(50%-48px)] h-full">
      <CardHeader>
        <CardTitle className="text-xl">Hourly</CardTitle>
        <CardDescription>
          오늘의 시간대별 날씨를 조회하고 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex items-center gap-4 overflow-x-scroll">
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center pt-[10px] pb-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
        <Card className="w-24 min-w-24 h-fit flex flex-col items-center justify-center py-[6px] gap-1 bg-neutral-50">
          <span className="text-sm">오후 1시</span>
          <img
            src="src/assets/icons/1030n.svg"
            alt="weather-item-icon"
            className="w-14 h-14"
          />
          <div className="w-full flex items-start justify-center">
            <span className="poppins-medium scroll-m-20 text-xl font-medium tracking-tight">
              17
            </span>
            <span className="text-[13px] ml-[1px] mt-[1px] font-medium">
              &#8451;
            </span>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}

export { HourlyWidget };
