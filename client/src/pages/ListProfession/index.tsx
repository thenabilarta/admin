/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { MAIN_URL } from "../../constants";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";

function Index() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axiosInstance
      .get(`${MAIN_URL}/api/v1/professions?limit=1000`)
      .then((res: any) => {
        console.log(res.data);

        setLoading(false);

        setData(res.data);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      key: "id",
      render: (_, data) => {
        return data.user.name;
      },
    },
    {
      title: "Email",
      key: "id",
      render: (_, data) => {
        return data.user.email;
      },
    },
    {
      title: "Category",
      key: "id",
      render: (_, data) => {
        return data.category.name;
      },
    },
    {
      title: "Subcategory",
      key: "id",
      render: (_, data) => {
        return data.subcategory.name;
      },
    },
    {
      title: "Status",
      key: "id",
      render: (_, data) => {
        return data.status;
      },
    },
    {
      title: "Date",
      key: "id",
      render: (_, data) => {
        return moment(data.updated_at).format("LLL");
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
