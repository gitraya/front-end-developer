import "./Search.css";
import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import SearchForm from "./SearchForm";
import SearchOption from "./SearchOption";

const SearchBox = forwardRef(({ filteringStays }, ref) => {
  // React state for show up the modal and filter value
  const [modalShow, setModalShow] = useState("none");
  const [filterValue, setFilterValue] = useState({
    location: "",
    maxGuests: 0,
  });

  // Reference
  const modalRef = useRef(null);
  const searchOptRef = useRef(null);

  // Function to hide modal
  const hideModal = () => {
    setModalShow("none");
    document.body.style.overflowY = "scroll";
    setFilterValue({
      location: "",
      maxGuests: 0,
    });
    searchOptRef.current.resetGuests();
    searchOptRef.current.resetOption();
  };

  // Hide modal by click window element
  window.onclick = (e) => {
    if (e.target === modalRef.current) {
      return hideModal();
    }
  };

  // Function to show up modal
  const showModal = (e) => {
    e.preventDefault();
    setModalShow("flex");
    document.body.style.overflowY = "hidden";
  };

  // Function to updating filter value
  const updateFilterValue = (
    loc = filterValue.location,
    max = filterValue.maxGuests
  ) => {
    setFilterValue({ location: loc, maxGuests: max });
  };

  // Function to change filter value
  const changeFilterValue = (e) => {
    return setFilterValue({
      location: e.target.value,
      maxGuests: filterValue.maxGuests,
    });
  };

  // Handle search option
  const handleSearchOption = (e) => {
    searchOptRef.current.optionShow(e);
  };

  // Template for heading on mobile device search box
  const headingTemplate = () => {
    return (
      <div className="heading-search">
        <h2>Edit your search</h2>
        <i onClick={hideModal} className="fas">
          
        </i>
      </div>
    );
  };

  const checkShowHeadingOption = () => {
    window.onresize = () => {
      if (window.innerWidth > 540) return null;
      return headingTemplate();
    };
    if (window.outerWidth <= 540) return headingTemplate();
  };

  // React features
  useEffect(() => {
    hideModal();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      hideModal: hideModal,
    };
  });

  return (
    <div>
      <div className="search-form-container">
        <form action="">
          <input
            onClick={showModal}
            type="text"
            defaultValue="Helsinki, Finland"
            className="search-input"
          />
          <input
            onClick={showModal}
            type="text"
            placeholder="Add guests"
            className="search-input"
          />
          <button
            onClick={showModal}
            type="submit"
            name="search"
            className="search-input"
          >
            <i class="fas"></i>
          </button>
        </form>
      </div>

      <div
        className="search-modal-container"
        style={{ display: modalShow }}
        ref={modalRef}
      >
        <div className="modal-wrap">
          {checkShowHeadingOption()}
          <SearchForm
            filteringStays={filteringStays}
            filterValue={filterValue}
            changeFilterValue={changeFilterValue}
            optionShow={handleSearchOption}
          />
          <SearchOption
            ref={searchOptRef}
            updateFilterValue={updateFilterValue}
          />
        </div>
      </div>
    </div>
  );
});

export default SearchBox;
