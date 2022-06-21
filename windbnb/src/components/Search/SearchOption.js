import { useState, forwardRef, useImperativeHandle } from "react";
import "./Search.css";

const SearchOption = forwardRef(({ updateFilterValue }, ref) => {
  // Guests state
  const [guests, setGuests] = useState({
    adult: 0,
    child: 0,
  });
  const [option, setOption] = useState({
    location: false,
    guests: false,
    default: false,
  });

  // Function to reset guests value
  const resetGuests = () => {
    setGuests({
      adult: 0,
      child: 0,
    });
  };

  // Function to reset option
  const resetOption = () => {
    setOption({ location: false, guests: false, default: false });
  };

  // Function to show option
  const optionShow = (inFocus) => {
    switch (inFocus) {
      case "location":
        setOption({ ...option, location: true, guests: false });
        break;
      case "guests":
        setOption({ ...option, location: false, guests: true });
        break;
      default:
        break;
    }
  };

  // Handle location value for input location
  const handleLocationValue = (e) => {
    updateFilterValue(e.target.querySelector("small").innerText, undefined);
  };

  // Handle number of guests for input guests
  const handleAmountOfGuests = (operation, guestType) => {
    switch (operation) {
      case "add":
        switch (guestType) {
          case "adult":
            setGuests({ ...guests, adult: (guests.adult += 1) });
            break;
          case "child":
            setGuests({ ...guests, child: (guests.child += 1) });
            break;
          default:
            setGuests({ ...guests });
        }
        break;
      case "min":
        switch (guestType) {
          case "adult":
            if (guests.adult > 0)
              setGuests({ ...guests, adult: (guests.adult -= 1) });
            break;
          case "child":
            if (guests.child > 0)
              setGuests({ ...guests, child: (guests.child -= 1) });
            break;
          default:
            setGuests({ ...guests });
        }
        break;
      default:
        setGuests({ ...guests });
    }

    updateFilterValue(undefined, guests.adult + guests.child);
  };

  // Template for location option element
  const locationOptionTemplate = () => {
    return (
      <div>
        <button onClick={handleLocationValue} className="opt-link">
          <i className="fas"></i>
          <small>Helsinki, Finland</small>
        </button>
        <button onClick={handleLocationValue} className="opt-link">
          <i className="fas"></i>
          <small>Turku, Finland</small>
        </button>
        <button onClick={handleLocationValue} className="opt-link">
          <i className="fas"></i>
          <small>Oulu, Finland</small>
        </button>
        <button onClick={handleLocationValue} className="opt-link">
          <i className="fas"></i>
          <small>Vaasa, Finland</small>
        </button>
      </div>
    );
  };

  // Template for guests option element
  const guestsOptionTemplate = () => {
    return (
      <div>
        <div className="opt-guest">
          <h3>Adults</h3>
          <p>Ages 13 or above</p>
          <div className="item-amount">
            <div
              onClick={() => {
                handleAmountOfGuests("min", "adult");
              }}
              className="icon-amount"
            >
              <i className="fas"></i>
            </div>
            <span className="amount">{guests.adult}</span>
            <div
              onClick={() => {
                handleAmountOfGuests("add", "adult");
              }}
              className="icon-amount"
            >
              <i className="fas"></i>
            </div>
          </div>
        </div>
        <div className="opt-guest">
          <h3>Children</h3>
          <p>Ages 2-12</p>
          <div className="item-amount">
            <div
              onClick={() => {
                handleAmountOfGuests("min", "child");
              }}
              className="icon-amount"
            >
              <i className="fas"></i>
            </div>
            <span className="amount">{guests.child}</span>
            <div
              onClick={() => {
                handleAmountOfGuests("add", "child");
              }}
              className="icon-amount"
            >
              <i className="fas"></i>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useImperativeHandle(ref, () => {
    return {
      resetGuests: resetGuests,
      optionShow: optionShow,
      resetOption: resetOption,
    };
  });

  return (
    <div className="option-container">
      <div className="option-item">
        {option.location && locationOptionTemplate()}
      </div>
      <div className="option-item">
        {option.guests && guestsOptionTemplate()}
      </div>
      <div className="option-item" />
    </div>
  );
});

export default SearchOption;
