import Modal from "./Modal";
import { useState } from "react";
import "./editTask.css";
import { useDispatch } from "react-redux";
import { updateTask } from "./taskSlice";

function EditTask({ open, onClose, toEditTitle, toEditDescription, id }) {
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);
  const dispatch = useDispatch();
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateTask({ id, data: { title, description } }))
      .unwrap()
      .then(onClose)
      .catch((err) => console.error(err));
  };

  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
