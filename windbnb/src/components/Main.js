import Cards from "./Cards/Cards";

const Main = ({ stays }) => {
  // Function to check number of stays
  const textNumberOfStays = () => {
    return stays.length > 6
      ? `${stays.length - 2}+ stays`
      : stays.length > 1
      ? `${stays.length} stays`
      : `${stays.length} stay`;
  };

  // Function to update heading
  const headingText = () => {
    return stays.length > 0 ? `Stays in ${stays[0].country}` : "No Result";
  };

  return (
    <main>
      <div className="main-header">
        <h1>{headingText()}</h1>
        <small>{textNumberOfStays()}</small>
      </div>
      <Cards stays={stays} />
    </main>
  );
};

export default Main;
