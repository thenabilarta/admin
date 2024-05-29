/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { MAIN_URL } from "../../constants";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosInstance from "../../utils/axiosInstance";

function Index() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axiosInstance
      .get(`${MAIN_URL}/api/v1/consultants?limit=1000`)
      .then((res: any) => {
        setLoading(false);

        setData(res.data);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "id",
    },
    {
      title: "balance",
      dataIndex: "balance",
      key: "id",
    },
    {
      title: "birthday",
      dataIndex: "birthday",
      key: "id",
    },
    {
      title: "curriculum_vitae",
      dataIndex: "curriculum_vitae",
      key: "id",
      render: (d) => {
        const data = d?.split(",");

        return (
          <div>
            {data.map((d: any, ind: any) => (
              <div key={ind}>
                <a href={d}>{d}</a>
                <br />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "id",
    },
    {
      title: "profile_pic",
      dataIndex: "profile_pic",
      key: "id",
      render: (d) => {
        return <img src={d} alt="" />;
      },
    },
  ];

  return (
    <div className="p-5">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(id) => id.id}
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
