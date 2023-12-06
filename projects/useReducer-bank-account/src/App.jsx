import { useReducer } from "react";
import "./App.css";
import { Balance } from "./components/Balance";
import { Loan } from "./components/Loan";

/*
  TODO: IMPROVEMENTS SUGGESTIONS
  - SAVE DATA IN LOCALSTORAGE
  - USER DECIDE THE AMOUNT OF DEPOSIT, WITHDRAW AND LOAN
  - ADD FUNCTIONALITY TO PARTIAL PAYS TO A LOAN
*/

const DEPOSIT_AMOUNT = 150;
const WITHDRAW_AMOUNT = 50;
const INITIAL_AMOUNT = 500;
const LOAN_AMOUNT = 5000;

const initialState = {
  // init -> no account, ready -> account, loan -> account with loan active,
  status: "init",
  balance: 0,
  loan: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return { ...state, status: "ready", balance: INITIAL_AMOUNT };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw": {
      const canWithdraw = state.balance >= action.payload;

      return {
        ...state,
        balance: canWithdraw ? state.balance - action.payload : state.balance,
      };
    }
    case "requestLoan":
      return {
        ...state,
        loan: state.loan + action.payload,
        balance: state.balance + action.payload,
        status: "loan",
      };
    case "payLoan": {
      const canPay = state.loan <= state.balance;

      return {
        ...state,
        status: "ready",
        loan: canPay ? 0 : state.loan,
        balance: canPay ? state.balance - state.loan : state.balance,
      };
    }
    case "closeAccount":
      return { ...state, status: "init" };
  }
};

function App() {
  const [{ status, balance, loan }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <>
      <h1>useReducer Bank Account</h1>
      {status === "init" ? (
        <p>No opened account yet</p>
      ) : (
        <>
          <Balance amount={balance} />
          <Loan amount={loan} />
        </>
      )}

      <section className="buttons-section">
        <button
          disabled={status !== "init"}
          onClick={() => {
            dispatch({ type: "openAccount" });
          }}
        >
          Open account
        </button>
        <button
          disabled={status === "init"}
          onClick={() => {
            dispatch({ type: "deposit", payload: DEPOSIT_AMOUNT });
          }}
        >
          Deposit $150
        </button>
        <button
          disabled={status === "init" || (balance === 0 && loan === 0)}
          onClick={() => {
            dispatch({ type: "withdraw", payload: WITHDRAW_AMOUNT });
          }}
        >
          Withdraw $50
        </button>
        <button
          disabled={status === "init" || status === "loan"}
          onClick={() => {
            dispatch({ type: "requestLoan", payload: LOAN_AMOUNT });
          }}
        >
          Request a loan of $5,000
        </button>
        <button
          disabled={status !== "loan" || balance < loan}
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
        >
          Pay loan
        </button>
        <button
          disabled={status === "init" || balance > 0 || loan > 0}
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
        >
          Close account
        </button>
      </section>
    </>
  );
}

export default App;
