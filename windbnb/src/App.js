import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const App = () => {
  // State for app
  const [stays, setStays] = useState(null);
  const [staysFiltered, setStaysFiltered] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);

  // Reference to a element
  const headerRef = useRef(null);

  // Fetch Winbnb Data
  const fetchStays = async () => {
    const res = await fetch(`${process.env.PUBLIC_URL}/stays.json`);
    const data = await res.json();
    return data;
  };

  // Filtering stays by search form
  const filteringStays = (e, filter) => {
    e.preventDefault();
    const city = filter[0].split(", ")[0];
    const country = filter[0].split(", ")[1];
    const maxGuests = filter[1];

    headerRef.current.hideModal();

    const data = stays.filter(
      (stay) =>
        stay.city === city &&
        stay.country === country &&
        stay.maxGuests >= maxGuests
    );

    setStaysFiltered(data);
    setIsFiltered(true);
  };

  // Reseted filter
  const resetIsFiltered = () => {
    setStaysFiltered(stays);
    setIsFiltered(false);
  };

  // Get current stays data
  const getCurrentStays = () => (isFiltered ? staysFiltered : stays);

  const getStays = async () => {
    const response = await fetchStays();
    response.map((stay) => (stay.id = Math.floor(Math.random() * 10000) + 1));
    setStaysFiltered(response);
    setStays(response);
  };

  useEffect(() => {
    getStays();
  }, []);

  return (
    <div className="App">
      <Header
        filteringStays={filteringStays}
        ref={headerRef}
        resetIsFiltered={resetIsFiltered}
      />
      {stays ? <Main stays={getCurrentStays()} /> : <main />}
      <Footer />
    </div>
  );
};

export default App;
