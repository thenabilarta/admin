/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../../constants";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface ColumnType {
  key: string;
  name: string;
  location: string;
  professions: string[];
  specialties: string[];
  tags: string[];
}

const columns: ColumnsType<ColumnType> = [
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
  },
  {
    title: "Specialty",
    dataIndex: "specialty",
    key: "specialty",
  },
  {
    title: "Action",
    key: "action",
    render: () => <p>Action</p>,
  },
];

function Index() {
  const [consultantData, setConsultantData] = useState<ColumnType[]>([]);

  useEffect(() => {
    axios.get(`${MAIN_URL}/api/v1/categories`).then((res) => {
      const serviceData: any[] = [];

      console.log(res.data);

      res.data.forEach((r: any) => {
        r.subcategory.forEach((rr: any) => {
          serviceData.push({
            service: r.name,
            specialty: rr.name,
            id: rr.id,
          });
        });
      });

      setConsultantData(serviceData);
    });
  }, []);

  return (
    <div className="p-2">
      <Table
        className="pb-14"
        columns={columns}
        dataSource={consultantData}
        pagination={false}
        rowKey={(data: any) => data.id}
      />
    </div>
  );
}

export default Index;
