import { Layout, Menu, Drawer } from "antd";
import { useState } from "react";
import "./App.less";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { logOut } from "../../features/user/userSlice";
import logo from "../../assets/images/logo.png";

const { Header, Content, Sider } = Layout;

const opt = [
  { key: "", label: "Dashboard" },
  {
    key: "product",
    label: "Product",
    children: [
      // { key: "product/list", label: "List" },
      { key: "products", label: "List" },
      { key: "product/request", label: "Request" },
    ],
  },

  {
    key: "profession",
    label: "Profession",
    children: [
      { key: "profession/list", label: "List" },
      { key: "profession/add", label: "Add" },
      { key: "profession/request", label: "Request" },
    ],
  },
  {
    key: "categories",
    label: "Category",
    children: [{ key: "categories", label: "List" }],
  },
  {
    key: "consultant",
    label: "Consultant",
    children: [
      // { key: "consultant/profession", label: "Profession" },
      { key: "consultant/list", label: "List" },
      { key: "consultant/request", label: "Request" },
    ],
  },
  { key: "chat", label: "Chat" },
  {
    key: "report",
    label: "Report",
    children: [{ key: "reports", label: "List" }],
  },
];

function Index({ Children }: { Children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <Layout className="min-h-screen">
      <Header className="z-10 bg-white shadow flex items-center justify-between px-8">
        {/* <div
          className="xl:hidden cursor-pointer flex justify-center items-center"
          onClick={() => setOpen(true)}
        >
          <MenuOutlined className="text-2xl" />
        </div> */}
        <div className="h-1/2">
          <img src={logo} className="h-full" alt="" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(logOut());
            window.location.reload();
          }}
        >
          Logout
        </div>
      </Header>
      <Layout>
        <Drawer
          placement="left"
          open={open}
          width={"40%"}
          closeIcon={false}
          onClose={() => setOpen(false)}
        >
          <Menu
            mode="inline"
            onClick={(e) => {
              navigate(`/${e.key}`), setOpen(false);
            }}
            style={{ height: "100%", borderRight: 0 }}
            items={opt}
          />
        </Drawer>

        <Sider width={200} className="xl:block hidden">
          <Menu
            onClick={(e) => navigate(`/${e.key}`)}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={opt}
          />
        </Sider>

        <Layout className="p-4">
          <Content className="overflow-y-scroll max-h-[calc(100vh-64px-2rem)]">
            <div className="w-full bg-white p-2 min-h-full">{Children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Index;
