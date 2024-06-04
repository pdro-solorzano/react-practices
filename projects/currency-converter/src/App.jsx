import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const API_URL = "api.frankfurter.app";

function App() {
  const [amount, setAmount] = useState(0);
  const [hostCurrency, setHostCurrency] = useState("USD");
  const [destinationCurrency, setDestinationCurrency] = useState("MXN");
  const [resultAmount, setResultAmount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const convertAmount = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://${API_URL}/latest?amount=${amount}&from=${hostCurrency}&to=${destinationCurrency}`,
          { signal: controller.signal }
        );
        if (hostCurrency === destinationCurrency) {
          throw new Error("From currency and to currency are the same");
        }
        const data = await res.json();
        setResultAmount(
          `${data.rates[destinationCurrency]} ${destinationCurrency}`
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (amount <= 0) {
      setResultAmount("");
      setIsLoading(false);
      return;
    }
    convertAmount();

    return () => {
      controller.abort();
    };
  }, [amount, destinationCurrency, hostCurrency]);

  const handleOnChangeAmount = (newAmount) => {
    setAmount(newAmount);
  };

  const handleOnChangeHostCurrency = (newHostCurrency) => {
    setHostCurrency(newHostCurrency);
  };

  const handleOnChangeDestinationCurrency = (newDestinationCurrency) => {
    setDestinationCurrency(newDestinationCurrency);
  };

  return (
    <>
      <h1>Currency converter</h1>
      <section>
        <ConvertionForm
          amount={amount}
          destinationCurrency={destinationCurrency}
          hostCurrency={hostCurrency}
          onAmountChange={handleOnChangeAmount}
          onDestinationCurrencyChange={handleOnChangeDestinationCurrency}
          onHostCurrencyChange={handleOnChangeHostCurrency}
        />
      </section>
      <section>
        <ResultContainer
          result={
            (isLoading && "Loading...") ||
            (!isLoading && !error && resultAmount) ||
            (error && error)
          }
        />
      </section>
    </>
  );
}

function ConvertionForm({
  amount,
  hostCurrency,
  destinationCurrency,
  onAmountChange,
  onHostCurrencyChange,
  onDestinationCurrencyChange,
}) {
  return (
    <div>
      <form action="">
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            onAmountChange(e.target.value);
          }}
        />
        <select
          name="hostCurrency"
          id="hostCurrency"
          value={hostCurrency}
          onChange={(e) => {
            onHostCurrencyChange(e.target.value);
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="MXN">MXN</option>
        </select>
        <select
          name="destinationCurrency"
          id="destinationCurrency"
          value={destinationCurrency}
          onChange={(e) => {
            onDestinationCurrencyChange(e.target.value);
          }}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="MXN">MXN</option>
        </select>
      </form>
    </div>
  );
}

function ResultContainer({ result }) {
  return <p>{result}</p>;
}

export default App;
