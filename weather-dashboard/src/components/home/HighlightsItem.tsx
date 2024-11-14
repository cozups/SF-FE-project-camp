import { Card, CardContent, CardDescription, CardHeader } from '@/components';

interface CardInfo {
  label: string;
  description: string;
  value: number;
  unit: string;
  imgUrl: string;
}

interface Props {
  data: CardInfo;
}

function HighlightsItem({ data }: Props) {
  return (
    <Card className="w-full h-fit bg-neutral-50">
      <CardHeader>
        <CardDescription className="font-semibold text-neutral-700">
          {data.label}
          <span className="text-neutral-400 font-normal ml-1">
            {data.description}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <img src={data.imgUrl} alt="humidity" className="w-10 h-10" />
        <p className="poppins-medium scroll-m-20 text-3xl font-semibold tracking-tight">
          {data.value}
          <span className="text-lg ml-1">{data.unit}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export { HighlightsItem };
