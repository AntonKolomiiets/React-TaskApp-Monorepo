import { useState } from "react";
import "./SortMenu.css";


// Drop down menu
const SortMenu = ({ sortTasks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [flagDateCreated, setFlagDateCreated] = useState(false);
  const [flagDateComplete, setFlagDateComplete] = useState(false);
  const [flagPriority, setFlagPriority] = useState(false);

  // togle menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Sort functions
  const sortDateCreated = (value) => sortTasks("dateCreated", value);
  const sortDateComplete = (value) => sortTasks("dateComplete", value);
  const sortPriority = (value) => sortTasks("priority", value);

  // togle
  const toggleDateCreated = () => {
    setFlagDateCreated((prev) => !prev);
    sortDateCreated(!flagDateCreated);
  };

  const toggleDateComplete = () => {
    setFlagDateComplete((prev) => !prev);
    sortDateComplete(!flagDateComplete);
  };

  const togglePriority = () => {
    setFlagPriority((prev) => !prev);
    sortPriority(!flagPriority);
  };

  return (
    <div className="sm_container">
      <button onClick={toggleMenu} className="ta_button" id="sm_button">
        {isMenuOpen ? "X" : "|||"}
      </button>
      {isMenuOpen && (
        <div className="sm_dropdown">
          <ul>
            <li onClick={toggleDateCreated}>Sort: date created</li>
            <span className="sm_border"></span>
            <li onClick={toggleDateComplete}>Sort: due date</li>
            <span className="sm_border"></span>
            <li onClick={togglePriority}>Sort: priority</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortMenu;
