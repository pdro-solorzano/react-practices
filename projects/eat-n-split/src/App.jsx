import { useState } from "react";
import "./App.css";
import { FriendCard } from "./components/FriendCard";
import { FriendsContainer } from "./components/FriendsContainer";
import { SplitBill } from "./components/SplitBill";
import { friends } from "./data";
import { AddFriend } from "./components/AddFriend";

function App() {
  const [friendsData, setFriendsData] = useState(friends);
  const [friendSplitting, setFriendSplitting] = useState(null);
  const [addingFriend, setAddingFriend] = useState(false);

  function onChangeFriend(friend) {
    setFriendSplitting((current) => {
      return current === friend ? null : friend;
    });
  }

  function closeSplittingView() {
    setFriendSplitting(null);
  }

  function onAddingFriend() {
    setAddingFriend((current) => !current);
  }
  function onSplitBill(friend, bill) {
    if (friendsData.some((el) => el.name === friend)) {
      setFriendsData((current) =>
        current.map((el) =>
          el.name === friend ? { ...el, credit: (el.credit += bill) } : el
        )
      );
    }
  }

  function handleAddNewFriend(friend) {
    if (friendsData.length >= 5) {
      throw new Error("Limit number of friends reached");
    }
    setFriendsData((current) => [...current, friend]);
  }

  return (
    <div className="app-container">
      <section className="friends-section">
        <FriendsContainer>
          {friendsData.map((friend, index) => (
            <FriendCard
              key={index}
              data={friend}
              actualFriend={friendSplitting}
              onChangeFriend={onChangeFriend}
            />
          ))}
        </FriendsContainer>
        {addingFriend && (
          <AddFriend
            handleAddNewFriend={handleAddNewFriend}
            handleClose={onAddingFriend}
          />
        )}
        <button onClick={onAddingFriend}>
          {!addingFriend ? "Add Friend" : "Close"}
        </button>
      </section>
      <section className="splitbill-section">
        {friendSplitting && (
          <SplitBill
            key={friendSplitting}
            onSplitBill={onSplitBill}
            friendName={friendSplitting}
            closeSplittingView={closeSplittingView}
          />
        )}
      </section>
    </div>
  );
}

export default App;
