/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { MAIN_URL } from "../../constants";
import { Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import axiosInstance from "../../utils/axiosInstance";
import { commafy } from "../../utils/utils";
import Modal from "@mui/material/Modal";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";

function Index() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState<number>(70);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    axiosInstance
      .get(`${MAIN_URL}/api/v1/products?limit=1000`)
      .then((res: any) => {
        setLoading(false);

        const result: any[] = [];

        console.log(res.data);

        res?.data?.forEach((r: any) => {
          result.push({
            id: r.id,
            category: r.category.name,
            subcategory: r.subcategory.name,
            consultant: r.user.name,
            price: r.price,
            likes: r.likes,
            total_sold: r.total_sold,
            rating: r.rating,
          });
        });

        console.log(result);

        setData(result);
      });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Consultant",
      dataIndex: "consultant",
      key: "id",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "id",
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "id",
      render: (_, d) => {
        return <p>Rp {commafy(d?.price)}</p>;
      },
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "id",
    },
    {
      title: "Total Sold",
      dataIndex: "total_sold",
      key: "id",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "id",
    },
    {
      title: "Action",
      key: "id",
      render: (_, d) => {
        return (
          <p
            className="cursor-pointer"
            onClick={() => {
              // navigate(`/product/${d.id}`);
              setRating(d.rating);
              setOpenModal(true);
              setSelectedProduct(d);
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

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#FFF",
            outline: "none",
          }}
          className="rounded px-24 py-10 min-w-[40%]"
        >
          <Slider
            value={rating}
            onChange={(e: any) => {
              setRating(e.target.value);
            }}
            min={70}
            max={98}
            aria-label="Default"
            valueLabelDisplay="auto"
          />

          <p className="mb-2">Product Overall Score: {rating}</p>

          <Rating
            name="half-rating"
            className="mb-2"
            size="large"
            defaultValue={2.5}
            precision={0.1}
            value={rating / 20}
          />

          <p className="mb-4">Product Rating: {rating / 20}</p>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 shadow rounded"
              onClick={() => {
                console.log(selectedProduct);

                axiosInstance
                  .post(`/api/product/rating`, {
                    id: selectedProduct?.id,
                    value: rating,
                  })
                  .then(() => {
                    fetchProduct();
                    setOpenModal(false);
                    // console.log(res.data);
                  })
                  .catch((err: any) => {
                    console.log(err);
                  });
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Index;
