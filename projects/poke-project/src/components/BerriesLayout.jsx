import { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { BerriesList } from "./BerriesList";

const searchResult = (query, options) => {
  return options
    .filter((opt) =>
      opt.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    .map((opt) => ({ label: opt.name, value: opt.name, id: opt.id }));
};

function BerriesLayout({ berriesOptions }) {
  const [berrySelected, setBerrySelected] = useState(0);
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value, berriesOptions) : []);
  };

  return (
    <div>
      <center>
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{
            width: 300,
            marginBottom: "28px",
          }}
          options={options}
          size="large"
          onSearch={handleSearch}
          onSelect={(value, option) => {
            setBerrySelected(option.id);
          }}
        >
          <Input.Search
            placeholder="Cheri..."
            enterButton
            style={{
              width: "300px",
            }}
          />
        </AutoComplete>
      </center>
      {berrySelected === 0 ? <BerriesList /> : <h1>In construction...</h1>}
    </div>
  );
}

export { BerriesLayout };
