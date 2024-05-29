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
      .get(`${MAIN_URL}/api/v1/categories?limit=1000`)
      .then((res: any) => {
        setLoading(false);

        const result: any = [];

        console.log(res.data);

        res.data.forEach((r: any) => {
          result.push({ ...r, type: 1, main: "" });

          r.subcategory.forEach((rr: any) => {
            result.push({ ...rr, type: 2, main: r.name });
          });
        });

        setData(result);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "id",
      render: (t) => {
        if (t === 1) {
          return "Main Category";
        } else {
          return "Subcategory";
        }
      },
    },
    {
      title: "Main Category",
      dataIndex: "main",
      key: "id",
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
