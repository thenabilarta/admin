/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { MAIN_URL } from "../../constants";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { commafy } from "../../utils/utils";
import {
  renderReportResolution,
  renderReportStatus,
} from "../../constants/report";

function Index() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`${MAIN_URL}/api/report`).then((res: any) => {
      console.log(res.data);

      setLoading(false);

      const result: any[] = [];

      res.data.forEach((e: any) => {
        result.push({
          consultantName: e.consultant.name,
          customerName: e.customer.name,
          id: e.id,
          price: "Rp " + commafy(e.orderItem.totalPrice),
          duration: e.orderItem.amount * 15 + " minutes",
          title: e.title,
          description: e.description,
          status: renderReportStatus(e.status),
          resolution: renderReportResolution(e.resolution),
          createdAt: e.createdAt,
        });
      });

      console.log(result);

      setData(result);
    });
  }, []);

  const navigate = useNavigate();

  const columns: ColumnsType<any> = [
    {
      title: "Consultant",
      dataIndex: "consultantName",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
    },
    {
      title: "Resolution",
      dataIndex: "resolution",
      key: "id",
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
              navigate(`/report/${d.id}`);
            }}
          >
            See details
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
