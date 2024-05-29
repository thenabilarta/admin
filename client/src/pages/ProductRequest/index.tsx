/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../constants";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { useAppSelector } from "../../app/hooks";
import { getUserCategory } from "../../features/category/categorySlice";
import { commafy } from "../../utils/utils";

function Index() {
  // const [consultantData] = useState<ColumnType[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryState = useAppSelector(getUserCategory).data;

  useEffect(() => {
    if (categoryState?.length > 0) {
      axiosInstance
        .get(`${MAIN_URL}/api/product/update-product-price-request`)
        .then((res) => {
          const result = [];

          if (res?.data?.length > 0) {
            for (const r of res.data) {
              let category;
              let subcategory;

              for (const s of categoryState) {
                for (const ss of s.subcategory) {
                  if (r.product.subcategoryId === ss.id) {
                    category = s;
                    subcategory = ss;
                  }
                }
              }

              result.push({ ...r, subcategory, category });
            }
          }

          console.log(result);

          setLoading(false);

          setData(result);
        });
    }
  }, [categoryState]);

  const navigate = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (_, d) => {
        return <p>{d?.user?.name}</p>;
      },
    },
    {
      title: "Category",
      key: "id",
      render: (_, d) => {
        return <p>{d?.category?.name}</p>;
      },
    },
    {
      title: "Category",
      key: "id",
      render: (_, d) => {
        return <p>{d?.subcategory?.name}</p>;
      },
    },
    {
      title: "Current Price",
      key: "id",
      render: (_, d) => {
        return <p>Rp {commafy(d?.product?.price)}</p>;
      },
    },
    {
      title: "New Price",
      key: "id",
      render: (_, d) => {
        return <p>Rp {commafy(d?.price)}</p>;
      },
    },
    {
      title: "Date",
      key: "id",
      render: (_, d) => {
        return <p>{moment(d?.createdAt).format("h:mma DD MMMM YYYY")}</p>;
      },
    },
    {
      title: "Action",
      key: "id",
      render: (_, d) => {
        return (
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate(`/product/request/${d.id}`);
            }}
          >
            Action
          </p>
        );
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
