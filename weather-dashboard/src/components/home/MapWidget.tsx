import { useAtom } from 'jotai';
import { Card } from '@/components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { cityNameAtom } from '@/store';

const positions = [
  {
    cityName: 'seoul',
    latlng: { lat: 37.5683, lng: 126.9778 },
  },
  {
    cityName: 'incheon',
    latlng: { lat: 37.4562557, lng: 126.7052062 },
  },
  {
    cityName: 'gwangju',
    latlng: { lat: 35.1599785, lng: 126.8513072 },
  },
  {
    cityName: 'daejeon',
    latlng: { lat: 36.3504567, lng: 127.3848187 },
  },
  {
    cityName: 'cheongju',
    latlng: { lat: 36.6358093, lng: 127.4913338 },
  },
  {
    cityName: 'daegu',
    latlng: { lat: 35.8715411, lng: 128.601505 },
  },
  {
    cityName: 'ulsan',
    latlng: { lat: 35.5396224, lng: 129.3115276 },
  },
  {
    cityName: 'busan',
    latlng: { lat: 35.179665, lng: 129.0747635 },
  },
];

function MapWidget() {
  useKakaoLoader();

  const [, setCityName] = useAtom(cityNameAtom);

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
      >
        {positions.map((position) => (
          <MapMarker
            key={`${position.cityName}-${position.latlng}`}
            position={{
              lat: position.latlng.lat,
              lng: position.latlng.lng,
            }}
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기
            }}
            title={position.cityName}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
            onClick={(marker) => setCityName(marker.getTitle())}
          />
        ))}
      </Map>
    </Card>
  );
}

export { MapWidget };
