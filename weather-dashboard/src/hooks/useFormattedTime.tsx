import { useMemo } from 'react';

function useFormattedTime(time: string) {
  return useMemo(() => {
    const hourString = time.split(' ')[1];
    const hour = Number(hourString.split(':')[0]);

    let formattedTime;

    if (hour === 0) {
      formattedTime = '오전 0시';
    } else if (hour === 12) {
      formattedTime = '오후 12시';
    } else {
      const isAM = hour < 12;
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      const period = isAM ? '오전' : '오후';

      formattedTime = `${period} ${formattedHour}시`;
    }

    return formattedTime;
  }, [time]);
}
export default useFormattedTime;
