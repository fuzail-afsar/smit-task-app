import Modal from "./Modal";
import { useState } from "react";
import "./addTask.css";
import { useDispatch } from "react-redux";
import { addTask } from "./taskSlice";

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addTask({ title, description }))
      .unwrap()
      .then(onClose)
      .catch((err) => console.error(err));
  };

  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
