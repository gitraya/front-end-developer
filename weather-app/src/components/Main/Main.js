import "components/Main/Main.css";
import { useEffect, useState } from "react";
import Footer from "components/Footer/Footer";
import CardWeather from "components/Main/CardWeather/CardWeather";
import CardsHighlight from "components/Main/CardsHighlight/CardsHighlight";

const Main = ({ data, todayData, temp }) => {
  // react state for the next 5 days of weather
  const [nextWeather, setNextWeather] = useState([]);
  const [tempStyle, setTempStyle] = useState({ fahren: false, celci: true });

  // handle temperature changes
  const handleChangeTemp = (e) => {
    if (e.target.id === "fahrenheit" && !temp.isFahrenheit) {
      setTempStyle({ fahren: !tempStyle.fahren, celci: !tempStyle.celci });
      temp.changeTemp();
    } else if (e.target.id === "celcius" && temp.isFahrenheit) {
      setTempStyle({ fahren: !tempStyle.fahren, celci: !tempStyle.celci });
      temp.changeTemp();
    }
  };

  useEffect(() => {
    if (data) {
      setNextWeather(data.slice(1));
    }
  }, [data, setNextWeather]);

  // mapping weather data into card components
  const CardsWeather = () =>
    nextWeather.map((day, i) => {
      return <CardWeather key={day.id} data={day} index={i} temp={temp} />;
    });

  return (
    <div className="container main">
      <header className="header">
        <nav className="nav main">
          <button
            type="submit"
            onClick={(e) => handleChangeTemp(e)}
            id="celcius"
            className="button-temp"
            style={
              tempStyle.celci
                ? { color: "#110E3C", background: "#E7E7EB" }
                : { color: "#E7E7EB", background: "#585676" }
            }
          >
            ℃
          </button>
          <button
            type="submit"
            onClick={(e) => handleChangeTemp(e)}
            id="fahrenheit"
            className="button-temp"
            style={
              tempStyle.fahren
                ? { color: "#110E3C", background: "#E7E7EB" }
                : { color: "#E7E7EB", background: "#585676" }
            }
          >
            ℉
          </button>
        </nav>
      </header>
      <main className="main">
        <div className="cards-weekly">
          <CardsWeather />
        </div>
        <CardsHighlight data={todayData} />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
