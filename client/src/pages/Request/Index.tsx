/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

interface ColumnType {
  key: string;
  id: string;
  userId: string;
  name: string;
  profileDesc: string;
  profilePic: string;
}

function Index() {
  const [consultantData, setConsultantData] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/api/consultant/update-profile-request`).then((res) => {
      setLoading(false);
      const data: any[] = [];
      if (res.data?.length > 0) {
        for (const d of res.data) {
          data.push({
            id: d.id,
            userId: d.userId,
            name: d.name,
            profileDesc: d.profileDesc,
            profilePic: d.profilePic,
          });
        }
        setConsultantData(data);
      }
    });
  }, []);

  const columns: ColumnsType<ColumnType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "profileDesc",
      key: "profileDesc",
      width: 500,
    },
    {
      title: "Picture",
      dataIndex: "profilePic",
      key: "profilePic",
      render: (text) => (
        <div className="flex justify-center">
          <img
            src={text}
            alt="Profile Pic"
            style={{ maxWidth: "50px", maxHeight: "50px" }}
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, data: any) => (
        <p
          className="cursor-pointer"
          onClick={() => {
            navigate(
              `/consultant/request/d?id=${data.id}&userId=${data.userId}`
            );
          }}
        >
          Show Details
        </p>
      ),
    },
  ];

  return (
    <div className="p-2">
      <Table
        columns={columns}
        dataSource={consultantData}
        pagination={false}
        rowKey={(data: any) => data.id}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: loading,
        }}
      />
    </div>
  );
}

export default Index;
