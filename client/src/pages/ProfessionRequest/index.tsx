/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../constants";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useNavigate } from "react-router";

interface ColumnType {
  key: string;
  name: string;
  location: string;
  professions: string[];
  // specialties: string[];
  tags: string[];
}

function Index() {
  // const [consultantData] = useState<ColumnType[]>([]);
  const [consultantData, setConsultantData] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${MAIN_URL}/api/v1/consultants`).then((res) => {
      const data: ColumnType[] = [];

      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.data.forEach((e: any) => {
        const professions = [];

        if (e.profession?.length > 0) {
          for (const pr of e.profession) {
            if (pr.status === "IS_WAITING") {
              professions.push(pr);
            }
          }
        }

        if (professions.length > 0) {
          data.push({
            key: e.id,
            name: e.name,
            location: e.location,
            professions: professions,
            tags: [],
          });
        }
      });

      // setConsultantData(res.data);
      setConsultantData(data);
    });
  }, []);

  const navigate = useNavigate();

  const columns: ColumnsType<ColumnType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Category",
      key: "id",
      render: (_, data: any) => (
        <>
          {data?.professions?.map((d: any, i: number) => {
            return (
              <p key={i} className="mb-2">
                {d.category.name}
              </p>
            );
          })}
        </>
      ),
    },
    {
      title: "Subcategory",
      key: "id",
      render: (_, data: any) => (
        <>
          {data?.professions?.map((d: any, i: number) => {
            return (
              <p key={i} className="mb-2">
                {d.subcategory.name}
              </p>
            );
          })}
        </>
      ),
    },
    {
      title: "Status",
      key: "id",
      render: (_, data: any) => (
        <>
          {data?.professions?.map((_: any, i: number) => {
            return (
              <p key={i} className="mb-2">
                Waiting
              </p>
            );
          })}
        </>
      ),
    },
    {
      title: "Date",
      key: "id",
      render: (_, data: any) => (
        <>
          {data?.professions?.map((d: any, i: number) => {
            return (
              <p key={i} className="mb-2">
                {moment(d?.createdAt).format("HH:mm DD-MM-YYYY")}
              </p>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "id",
      render: (_, data: any) => (
        <>
          {data?.professions?.map((d: any, i: number) => {
            return (
              <p
                key={i}
                className="mb-2 cursor-pointer"
                onClick={() => {
                  navigate(`/profession/request/${d.id}`);
                }}
              >
                Action
              </p>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div className="p-2">
      <Table
        columns={columns}
        dataSource={consultantData}
        pagination={false}
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
