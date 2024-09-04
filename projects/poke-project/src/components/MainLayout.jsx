import { Layout, theme, Menu, ConfigProvider } from "antd";
const { Header, Content, Footer } = Layout;

const menuItems = [
  { key: "pokedex", label: "Pokedex" },
  { key: "berries", label: "Berries" },
];
function MainLayout({ children, actualTab, onChangeTab }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#A01818",
          gap: "32px",
        }}
      >
        <div className="demo-logo" style={{ height: "100%" }}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/127/571/original/pokemon-logo-pokemon-icon-transparent-free-png.png"
            alt="pokemon logo"
            style={{ height: "100%" }}
          />
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemSelectedBg: "#e44e4e",
              },
            },
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[actualTab]}
            items={menuItems}
            style={{ flex: 1, minWidth: 0, backgroundColor: "#A01818" }}
            onSelect={({ key }) => {
              onChangeTab(key);
            }}
          />
        </ConfigProvider>
      </Header>
      <Content
        style={{
          padding: "32px 48px",
          backgroundColor: "#1A438E",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Poke-Project ©{new Date().getFullYear()} Created by Pdro Solorzano
      </Footer>
    </Layout>
  );
}
export { MainLayout };
