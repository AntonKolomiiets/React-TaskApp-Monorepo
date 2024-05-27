import "./TaskApp.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "react-query";
import TableDiv from "../../components/TableDiv/TableDiv";
import Modal from "../../components/Modal/Modal";
import SortMenu from "../../components/SortMenu/SortMenu";

const API = `http://localhost:3000/tasks/`;

// Function to render tasks
function renderTasks(tasks, openModal, deleteTask) {
  return tasks.map((item, index) => (
    <tr
      id="ta_table_row"
      key={index}
      className={index === tasks.length - 1 ? "last-item" : ""}
    >
      <TableDiv
        key={item.id}
        task={item}
        editFucntion={() => openModal("edit", item)}
        delFunction={() => deleteTask(item.id)}
      />
    </tr>
  ));
}

// TaskApp
export default function TaskApp() {
  const [Tasks, setTasks] = useState([]);
  const [mode, setMode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { isAuthenticated } = useAuth();

  // function to fetch data
  const getData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in");
    }

    const response = await fetch(API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json.tasks;
  };

  // fetching
  const { data, error, isLoading, isError, refetch } = useQuery(
    ["getData"],
    getData,
    {
      onError: (err) => {
        console.error("Fetching data failed:", err);
      },
    }
  );

  // set Taskts
  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  // Togle Modal
  const openModal = (mode, task = null) => {
    setMode(mode);
    setCurrentTask(task);
    setIsModalOpen(true);
  };
  // addTask
  const addTask = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in");
    }

    try {
      const response = await fetch(`${API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log(json);
      refetch(); // Refetch the data after adding a task
    } catch (err) {
      console.error("Adding task failed:", err);
      throw err; // Error
    }
  };

  // editTask
  const editTask = async (data, task) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in");
    }
    try {
      const response = await fetch(`${API}${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      console.log(task.id);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      console.log(json);
      refetch();
    } catch (err) {
      console.error("Edit task has failed", err);
      throw err;
    }
  };
  // delTask
  const deleteTask = async (task_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, please log in");
    }
    try {
      const response = await fetch(`${API}${task_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Deleting task with id: ${task_id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      console.log(json);
      refetch(); // Refetch the data after deleting a task
    } catch (err) {
      console.error("Deleting task failed:", err);
      throw err; // Optional: rethrow if you want to handle it elsewhere
    }
  };

  // sortTask
  function sortTasks(criteria, ascending) {
    setTasks((prevTasks) =>
      [...prevTasks].sort((a, b) => {
        let compareA, compareB;

        switch (criteria) {
          case "dateCreated":
            compareA = new Date(a.created_at).getTime();
            compareB = new Date(b.created_at).getTime();
            break;
          case "dateComplete":
            compareA = a.due_date ? new Date(a.due_date).getTime() : -Infinity;
            compareB = b.due_date ? new Date(b.due_date).getTime() : -Infinity;
            break;
          case "priority":
            compareA = a.priority != 0 ? a.priority : -Infinity;
            compareB = b.priority != 0 ? b.priority : -Infinity;
            break;
          default:
            return 0;
        }

        if (compareA === compareB) {
          return 0;
        } else if (compareA === -Infinity || compareB === -Infinity) {
          return compareA === -Infinity ? 1 : -1;
        } else {
          return ascending ? compareA - compareB : compareB - compareA;
        }
      })
    );
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {isAuthenticated && (
        <div>
          {isModalOpen && (
            <Modal
              mode={mode}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              task={currentTask}
              addTask={addTask}
              editTask={editTask}
            />
          )}
          <div className="TaskApp">
            <div className="ta_background">
              <div className="ta_buttons">
                <button className="ta_button" onClick={() => openModal("create")}>+</button>

                <SortMenu sortTasks={sortTasks} />
              </div>
              <div className="main">
                <div>
                  <table className="ta_table">
                    <tbody>{renderTasks(Tasks, openModal, deleteTask)}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
