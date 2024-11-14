interface ItemInfo {
  imgUrl: string;
  highestTemp: number;
  lowestTemp: number;
  date: string;
  day: string;
}

interface Props {
  data: ItemInfo;
}

function WeeklyWeatherItem({ data }: Props) {
  return (
    <div className="w-full flex items-center justify-between gap-7 bg-neutral-50 py-0 px-3 rounded-sm">
      <div className="w-fit h-10 flex items-center gap-2">
        <img src={data.imgUrl} alt="" className="w-7 h-7" />
        <div className="flex items-center gap-1 w-20">
          <div className="w-full h-full flex items-start gap-[2px]">
            <span className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight text-red-500">
              {data.highestTemp}
            </span>
            <span className="text-xs font-normal mt-1">&#8451;</span>
          </div>
          <div className="w-full h-full flex items-start gap-[2px]">
            <span className="poppins-medium scroll-m-20 text-lg font-semibold tracking-tight text-blue-500">
              {data.lowestTemp}
            </span>
            <span className="text-xs font-normal mt-1">&#8451;</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end gap-5 mb-1">
        <small className="text-sm leading-none">{data.date}</small>
        <small className="text-sm leading-none">{data.day}</small>
      </div>
    </div>
  );
}

export { WeeklyWeatherItem };
