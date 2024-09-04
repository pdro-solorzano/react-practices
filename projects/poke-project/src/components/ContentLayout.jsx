import { Typography, Flex } from "antd";
import { capitalizeText } from "../common/common";
import { useState } from "react";
const { Title } = Typography;

function ContentLayout({ title, children }) {
  return (
    <Flex gap="middle" vertical justify="center">
      <Title style={{ textAlign: "center" }}>{capitalizeText(title)}</Title>
      {children}
    </Flex>
  );
}

export { ContentLayout };
