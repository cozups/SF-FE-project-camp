import { Card } from '@/components';
import { Map } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';

function MapWidget() {
  useKakaoLoader();

  return (
    <Card className="w-1/4 min-w-[25%] h-full">
      {/* 지도를 표시할 컨테이너 */}
      <Map
        id="map"
        center={{
          // 지도의 중심 좌표
          lat: 37.5683,
          lng: 126.9778,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%',
          borderRadius: '8px',
        }}
        // 지도의 확대 레벨
        level={13}
      />
    </Card>
  );
}

export { MapWidget };
