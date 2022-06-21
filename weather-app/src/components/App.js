import { useEffect, useState } from "react";
import { useLoading, ThreeDots } from "@agney/react-loading";
import Aside from "components/Aside/Aside";
import Main from "components/Main/Main.js";

const App = () => {
  // react state for loading indicator
  const [isLoading, setIsLoading] = useState(false);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });

  // react state for all weather data
  const [allData, setAllData] = useState(null);
  const [todayWeather, setTodayWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [woeid, setWoeid] = useState(1047378);
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // fetching weather data based on woeid
  const fetchingData = async (woeid) => {
    let fetchData;
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://www.metaweather.com/api/location/${woeid}`
      );
      fetchData = await res.json();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    return fetchData;
  };

  // get and set weather data
  const setWeatherData = (data) => {
    setAllData(data);
    setTodayWeather(data.consolidated_weather[0]);
    setWeeklyWeather(data.consolidated_weather);
    setLocationName(data.title);
    setWoeid(data.woeid);
  };

  // update weather data while user search by location
  const updateWeatherData = async (woeid) => {
    setWoeid(woeid);
    const data = await fetchingData(woeid);
    setWeatherData(data);
  };

  // get user position and update weather data by user position
  const getPosition = async ({ coords }) => {
    let data;
    try {
      const res = await fetch(
        `https://www.metaweather.com/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
      );
      data = await res.json();
    } catch (error) {
      console.log(error);
    }

    updateWeatherData(data[0].woeid);
  };

  // ask and get user location
  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
        resolve(woeid);
      } else {
        reject("Cannot find your location!");
      }
    });

  // convert temperature from celcius to fahrenheit
  const convertTemp = (celcius) => {
    const fahren = parseInt(celcius) * 1.8 + 32;
    return fahren;
  };

  // change the temperature from celsius to fahrenheit and vice versa
  const changeTemp = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  // react use effect get data from metaweather api
  useEffect(() => {
    const getAllData = async () => {
      try {
        if (!allData) {
          await getUserLocation();
          if (!allData) {
            const data = await fetchingData(woeid);
            setWeatherData(data);
          }
        }
      } catch (error) {
        alert(error?.message);
      }
    };
    getAllData();
    isLoading
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "unset");
  }, []);

  return (
    <div className="App">
      {isLoading && (
        <div className="loadAll" {...containerProps}>
          {indicatorEl}
        </div>
      )}
      {todayWeather && locationName ? (
        <Aside
          data={todayWeather}
          location={locationName}
          searchHandle={updateWeatherData}
          temp={{ isFahrenheit, convertTemp }}
          getUserLocation={getUserLocation}
        />
      ) : null}
      {todayWeather && weeklyWeather ? (
        <Main
          data={weeklyWeather}
          todayData={todayWeather}
          temp={{ isFahrenheit, changeTemp, convertTemp }}
        />
      ) : null}
    </div>
  );
};

export default App;
