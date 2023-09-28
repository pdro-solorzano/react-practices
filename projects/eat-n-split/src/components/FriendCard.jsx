import { CreditMessage } from "./CreditMessage";

function FriendCard({ data, actualFriend, onChangeFriend }) {
  return (
    <li className="friendCard-container">
      <img
        className="friendCard-photo"
        src={data.imageUrl}
        alt={`${data.name}'s photo`}
      />
      <div className="friendCard-info-container">
        <h4>{data.name}</h4>
        <CreditMessage credit={data.credit} friendName={data.name} />
      </div>
      <button
        onClick={() => {
          onChangeFriend(data.name);
        }}
      >
        {actualFriend === data.name ? "Close" : "Select"}
      </button>
    </li>
  );
}

export { FriendCard };
