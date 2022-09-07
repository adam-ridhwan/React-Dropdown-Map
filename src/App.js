import { useEffect, useRef, useState } from "react";
import "./styles.css";
const defaultTitles = ["one", "two", "three", "four", "five"];

export default function App() {
  const [isSortButtonClicked, setIsSortButtonClicked] = useState(false);
  const [buttonTitles] = useState(defaultTitles);
  const [chosenTitles, setChosenTitles] = useState([]);
  const [isDropdownOpen, setIsDropdownopen] = useState(false);
  let buttonRef = useRef([]);

  // set chosen titles ----------------------------------
  const handleSort = () => {
    setChosenTitles((chosenTitles) => [
      ...chosenTitles,
      buttonTitles[0],
      buttonTitles[1],
      buttonTitles[2]
    ]);
    setIsSortButtonClicked(true);
  };

  /* trying fix implementation for change title */
  // handle change title --------------------------------
  const handleChangeTitle = (index, indexOfDiv) => {
    console.log("index of buttonTitles", index);
    console.log("index of chosenTitle", indexOfDiv);
    console.log(buttonTitles[index]);

    // this is what i have so far, but it does not work
    // setChosenTitles(
    //   (chosenTitles[index] = buttonTitles[indexOfDiv])
    // );
  };

  // close dropdown -------------------------------------
  useEffect(() => {
    if (!isDropdownOpen) {
      chosenTitles.forEach((_, index) => {
        buttonRef.current[index].classList.remove("active");
      });
    }
  }, [chosenTitles, isDropdownOpen]);

  // open dropdown
  const handleOpenDropdown = (indexOfDiv) => {
    setIsDropdownopen((prev) => !prev);
    buttonRef.current[indexOfDiv].classList.add("active");
  };

  // handle hover background change ----------------------
  const [indexOfTitle, setIndexOfTitle] = useState();
  const handleHoverTitle = (indexOfDiv) => {
    setIndexOfTitle(indexOfDiv);
  };

  return (
    <>
      {isSortButtonClicked ? (
        ""
      ) : (
        <button onClick={handleSort} className="sortBtn">
          Sort
        </button>
      )}

      {chosenTitles.map((title, indexOfDiv) => {
        return (
          <div
            key={indexOfDiv}
            className="dropdown"
            ref={(ref) => (buttonRef.current[indexOfDiv] = ref)}
          >
            <div
              className="button"
              onClick={() => handleOpenDropdown(indexOfDiv)}
            >
              {title}
              {CHEVRON_DOWN}
            </div>

            <div className="content">
              {buttonTitles.map((buttonTitle, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleChangeTitle(index, indexOfDiv)}
                    onMouseEnter={() => handleHoverTitle(index)}
                    style={{
                      background:
                        index === indexOfTitle && "rgba(55, 53, 47, 0.08)"
                    }}
                  >
                    <p>{buttonTitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

const CHEVRON_DOWN = (
  <svg
    viewBox="0 0 30 30"
    style={{
      width: "12px",
      height: "100%",
      marginLeft: "4px",
      pointerEvents: "none"
    }}
  >
    <polygon
      style={{ fill: "rgba(55, 53, 47, 0.45)" }}
      points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "
    ></polygon>
  </svg>
);
