import "./TableDiv.css";

// struct
interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  due_date?: string;
  created_at: string;
}

// Props interface
interface TableDivProps {
  task: Task;
  editFunction: () => void;
  delFunction: () => void;
}

// main
const TableDiv: React.FC<TableDivProps> = ({
  task,
  editFunction,
  delFunction,
}) => {
  const renderPriority = (priority: number) => {
    return [...Array(priority)].map((_, index) => <span key={index}>!</span>);
  };

  const returnDays = (): string | undefined => {
    if (!task.due_date) {
      return;
    } else {
      let dueDate = new Date(task.due_date);
      let createdAt = new Date(task.created_at);
      let days = (dueDate.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);
      if (days < 0.5) {
        return "Today";
      } else {
        days = Math.trunc(days);
        return days + " days left";
      }
    }
  };

  let days = returnDays(); // days variable

  return (
    <div className="td_container">
      <td className="td_td">
        <input type="checkbox" id={task.id} className="accordion__input" />
        <label htmlFor={task.id} className="accordion__label">
          <div className="td_task">
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
        <label htmlFor={task.id} className="accordion__content">
          <div className="td_discript_div">{task.description}</div>
          <button className="td_edit_button" onClick={editFunction}>
            &#9998;
          </button>
        </label>
      </td>
    </div>
  );
};

export default TableDiv;
