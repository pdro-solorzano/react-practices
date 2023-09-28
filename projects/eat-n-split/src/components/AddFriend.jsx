import { useState } from "react";

function AddFriend({ handleAddNewFriend, handleClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/150");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setName("");
      setImageUrl("https://i.pravatar.cc/150");
      handleClose();
      return;
    }
    let friend = { name: name, credit: 0, imageUrl: imageUrl };
    try {
      handleAddNewFriend(friend);
    } catch (error) {
      alert(error.message);
    }
    setName("");
    setImageUrl("https://i.pravatar.cc/150");
    handleClose();
  }

  return (
    <div className="addFriend-container">
      <form onSubmit={handleSubmit}>
        <label>
          👫 Friend name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          🌄 Image url:
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
}

export { AddFriend };
