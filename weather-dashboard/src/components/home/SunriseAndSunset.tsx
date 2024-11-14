interface CardInfo {
  imgUrl: string;
  label: string;
  time: string;
}

interface Props {
  data: CardInfo;
}

function SunriseAndSunset({ data }: Props) {
  return (
    <div className="w-full flex items-center gap-2">
      <img src={data.imgUrl} alt="sunset" className="h-14" />
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">{data.label}</p>
        <p className="poppins-medium scroll-m-20 text-3xl font-semibold tracking-tight">
          {data.time}
        </p>
      </div>
    </div>
  );
}

export { SunriseAndSunset };
