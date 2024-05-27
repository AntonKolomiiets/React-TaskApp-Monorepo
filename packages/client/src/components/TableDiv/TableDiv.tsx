import "./TableDiv.css";

const TableDiv = ({ task, editFucntion, delFunction }) => {
  const renderPriority = (priority: any) => {
    return [...Array(priority)].map(() => "!");
  };

  function returnDays() {
    if (!task.due_date) {
      return;
    } else {
      let aA = new Date(task.due_date);
      let bB = new Date(task.created_at);
      let days = (aA.getTime() - bB.getTime()) / (1000 * 3600 * 24);
      if (days < 0.5) {
        return "Today";
      } else {
        days = Math.trunc(days);
        return days + " days left";
      }
    }
  }

  let days = returnDays(); // days variable

  return (
    <>
      <div className="td_container">
        <td className="td_td">
          <input type="checkbox" id={task.id} className="accordion__input" />
          <label for={task.id} className="accordion__label">
            <div className="td_task">
              {/* {task.title} */}
              <div className="td_title_div">{task.title}</div>
              <p className="td_days">{days}</p>
              <div className="td_priority_render">
                {renderPriority(task.priority)}
              </div>
              <div className="ta_button_div">
                <button className="td_del_button" onClick={delFunction}>
                  &#9746;
                </button>
              </div>
            </div>
          </label>
          <label for={task.id} className="accordion__content">
            <div className="td_discript_div">{task.description}</div>
            <button className="td_edit_button" onClick={editFucntion}>
              &#9998;
            </button>
          </label>
        </td>
      </div>
    </>
  );
};

export default TableDiv;
