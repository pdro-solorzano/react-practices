import { List, Typography, Avatar } from "antd";
import { getBerriesList } from "../services/berries";
import { useEffect, useState } from "react";
import { capitalizeText } from "../common/common";
import { PreviewItem } from "./PreviewItem";

function BerriesList() {
  const [berriesData, setBerriesData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleOnChangePage = (newUrl) => {
    setLoading(true);
    getBerriesList(newUrl).then((data) => {
      setBerriesData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Get berries list
    getBerriesList().then((data) => {
      setBerriesData(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <List
        bordered
        loading={loading}
        itemLayout="horizontal"
        dataSource={berriesData.results}
        pagination={{
          align: "center",
          defaultPageSize: 20,
          total: berriesData.total,
          showSizeChanger: false,
          onChange: (page, pageSize) => {
            // https://pokeapi.co/api/v2/berry/?offset=20&limit=20
            let offset = pageSize * (page - 1);
            let limit = pageSize;
            handleOnChangePage(
              `https://pokeapi.co/api/v2/berry/?offset=${offset}&limit=${limit}`
            );
          },
        }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<PreviewItem avatarSource={item.sprite} />}
              title={
                <Typography.Text strong style={{ fontSize: "28px" }}>
                  {capitalizeText(item.name)}
                </Typography.Text>
              }
              description={
                <Typography.Text
                  type="secondary"
                  style={{ fontSize: "16px" }}
                  strong
                >
                  {item.description}
                </Typography.Text>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
}

export { BerriesList };
