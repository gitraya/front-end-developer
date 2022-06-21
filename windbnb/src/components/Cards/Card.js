import "./Cards.css";
import { useRef, useEffect } from "react";

const Card = ({ stay }) => {
  const titleRef = useRef(null);

  // Function to check maximum text as the title
  const titleMaxText = () => {
    const max = parseInt(titleRef.current.offsetWidth / 11);
    const text = stay.title;
    return (titleRef.current.textContent =
      text?.length > max
        ? text.slice(0, max).split(" ").slice(0, -1).join(" ") + "..."
        : text);
  };

  useEffect(() => {
    titleMaxText();
  });

  return (
    <div>
      <div className="images-card">
        <img
          key={stay.id}
          src={stay.photo}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
      </div>
      <div className="desc-card">
        {stay.superHost ? <button>super host</button> : ""}
        <small className="desc-type">
          {`${stay.type}${stay.beds ? ` . ${stay.beds} beds` : ""}`}
        </small>
        <small className="desc-rating">
          {<i className="fas star-icon"></i>} {stay.rating}
        </small>
      </div>
      <div className="title-card">
        <h3 ref={titleRef}>{}</h3>
      </div>
    </div>
  );
};

export default Card;
