import { useRef, forwardRef, useImperativeHandle } from "react";
import SearchBox from "./Search/SearchBox";

const Header = forwardRef(({ filteringStays, resetIsFiltered }, ref) => {
  const searchRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      hideModal: searchRef.current.hideModal,
    };
  });

  return (
    <header>
      <nav>
        <div>
          <button className="button-style-none" onClick={resetIsFiltered}>
            <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="" />
          </button>
        </div>
        <SearchBox ref={searchRef} filteringStays={filteringStays} />
      </nav>
    </header>
  );
});

export default Header;
