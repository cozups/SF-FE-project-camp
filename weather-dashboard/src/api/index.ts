import axios from 'axios';
import { ForecastDay, ForecastTideDay, Weather } from '@/types';

export const fetchApi = async (
  cityName: string,
  setState: React.Dispatch<React.SetStateAction<Weather>>
) => {
  const API_KEY = '963c5be9ec9e453e86004727241411';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  try {
    /**  Promise 인스턴스 방법을 사용했을 땐 resolve에 해당 */
    const res = await axios.get(
      `${BASE_URL}/forecast.json?q=${cityName}&days=7&key=${API_KEY}`
    );

    if (res.status === 200) {
      setState(res.data);
    }
  } catch (error) {
    /** reject에 해당 */
    console.error(error);
  } finally {
    /** 비동기 로직이 실행되든 되지 않든 무조건 실행되는 로직 */
    console.log('fetchApi 호출 되었습니다.');
  }
};

export const fetchTideApi = async (
  cityName: string,
  setState: React.Dispatch<React.SetStateAction<ForecastTideDay>>
) => {
  const API_KEY = '963c5be9ec9e453e86004727241411';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  try {
    /**  Promise 인스턴스 방법을 사용했을 땐 resolve에 해당 */
    const res = await axios.get(
      `${BASE_URL}/marine.json?q=${cityName}&days=1&key=${API_KEY}`
    );

    if (res.status === 200) {
      setState(res.data.forecast.forecastday[0]);
    }
  } catch (error) {
    /** reject에 해당 */
    console.error(error);
  } finally {
    /** 비동기 로직이 실행되든 되지 않든 무조건 실행되는 로직 */
    console.log('fetchTideApi 호출 되었습니다.');
  }
};

export const getOneWeekWeather = async (
  cityName: string,
  setState: React.Dispatch<React.SetStateAction<never[]>>
) => {
  const API_KEY = '963c5be9ec9e453e86004727241411';
  const BASE_URL = 'https://api.weatherapi.com/v1';

  try {
    /**  Promise 인스턴스 방법을 사용했을 땐 resolve에 해당 */
    const res = await axios.get(
      `${BASE_URL}/forecast.json?q=${cityName}&days=7&key=${API_KEY}`
    );

    if (res.status === 200) {
      console.log(res.data);
      const newData = res.data.forecast.forecastday.map((item: ForecastDay) => {
        return {
          maxTemp: Math.round(item.day.maxtemp_c),
          minTemp: Math.round(item.day.mintemp_c),
          date: item.date_epoch,
          iconCode: item.day.condition.code,
          isDay: item.day.condition.icon.includes('day'),
        };
      });
      setState(newData);
    }
  } catch (error) {
    /** reject에 해당 */
    console.error(error);
  } finally {
    /** 비동기 로직이 실행되든 되지 않든 무조건 실행되는 로직 */
    console.log('fetchTideApi 호출 되었습니다.');
  }
};
