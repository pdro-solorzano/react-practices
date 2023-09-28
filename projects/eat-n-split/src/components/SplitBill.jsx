import { useState } from "react";

function SplitBill({ friendName, onSplitBill, closeSplittingView }) {
  const [formData, setFormData] = useState({
    billValue: 0,
    yourExpense: 0,
    billPayer: "You",
  });

  let friendExpense = formData.billValue - formData.yourExpense;

  function onChangeHandler(propertyName, value) {
    if (propertyName !== "billPayer" && value < 1) {
      return;
    }

    if (propertyName === "billValue") {
      setFormData((current) => {
        return { ...current, billValue: value };
      });
    } else if (propertyName === "yourExpense") {
      setFormData((current) => {
        return { ...current, yourExpense: value };
      });
    } else {
      setFormData((current) => {
        return { ...current, billPayer: value };
      });
    }
  }
  function onSubmitHandler(friend) {
    let bill = 0;
    if (formData.billPayer === "You") {
      bill = friendExpense;
    } else {
      bill = formData.yourExpense * -1;
    }
    onSplitBill(friend, bill);

    // Clearing fields
    setFormData({ billValue: 0, yourExpense: 0, billPayer: "You" });
    // Close splitting view
    closeSplittingView();
  }

  return (
    <div className="splitbill-container">
      <h2 className="splitbill-title">{`Split a bill with ${friendName}`}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(friendName);
        }}
      >
        <label>
          💰 Bill value:
          <input
            type="number"
            value={formData.billValue}
            onChange={(e) => {
              onChangeHandler("billValue", Number(e.target.value));
            }}
          />
        </label>
        <label>
          👨 Your expense:
          <input
            type="number"
            value={formData.yourExpense}
            onChange={(e) => {
              setFormData((current) => {
                return { ...current, yourExpense: e.target.value };
              });
            }}
          />
        </label>
        <label>
          {`👦 ${friendName}'s expense:`}
          <input type="number" disabled value={friendExpense} />
        </label>
        <label>
          🤑 Who is paying the bill:
          <select
            value={formData.billPayer}
            onChange={(e) => {
              setFormData((current) => {
                return { ...current, billPayer: e.target.value };
              });
            }}
          >
            <option value="You">You</option>
            <option value={friendName}>{friendName}</option>
          </select>
        </label>
        <button>Split bill</button>
      </form>
    </div>
  );
}

export { SplitBill };
