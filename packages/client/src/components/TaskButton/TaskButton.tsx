

const TaskButton = ({id, deleteTask, refetch }) => {
    const handleClick = () => {
        deleteTask(id);
    };


    return <button onClick={handleClick}>Delete</button>;
};

export default TaskButton;