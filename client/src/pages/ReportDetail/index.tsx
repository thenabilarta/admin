/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import _ from "lodash";
import Modal from "@mui/material/Modal";
import { Input } from "antd";
import { ReportStatus } from "../../constants/report";

function Index() {
  const navigate = useNavigate();

  const { TextArea } = Input;
  // const dispatch = useAppDispatch();

  const [data, setData] = useState<any>({});
  const [chatData, setChatData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [accepted, setAccepted] = useState(true);

  const location = useLocation();
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  console.log(id);

  const getById = () => {
    axiosInstance.get(`/api/report/${id}`).then((res: any) => {
      console.log(res.data);

      const chat = _.sortBy(res.data.chat?.chatItem, (c) => c.createdAt);

      setChatData(chat);

      setData(res.data);
    });
  };

  useEffect(() => {
    getById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-4 py-2">
      <Button
        className="my-4 mb-10"
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/reports")}
      >
        Back
      </Button>

      <div className="shadow p-4 mb-4">
        <p className="text-sm">Customer</p>
        <p className="mb-4 text-lg">{data?.customer?.name}</p>
        <p className="font-semibold">{data?.title}</p>
        <p>{data?.description}</p>
      </div>

      <div className="shadow p-4 mb-10">
        <p className="text-sm">Consultant</p>
        <p className="mb-4 text-lg">{data?.consultant?.name}</p>
        <p className="font-semibold">{data?.consultantResponseTitle}</p>
        <p>{data?.consultantResponseDescription}</p>
      </div>

      <div className="shadow p-4 mb-10">
        <p className="text-xl text-center mb-6">Chat History</p>
        {chatData.map((d: any) => (
          <div key={d.id}>
            <div className="flex mb-2">
              <p className="w-40">
                {d.direction ? "Consultant:" : "Customer:"}
              </p>
              <p className="flex-1">{d.content}</p>
              <p>{moment(d.createdAt).format("HH:mm a")}</p>
            </div>
          </div>
        ))}
      </div>

      {data.status === ReportStatus.REPORT_STATUS_ON_PROGRESS_BY_ADMIN && (
        <div className="flex justify-end">
          <button
            className="mr-4"
            onClick={() => {
              setOpenModal(true);
              setAccepted(false);
            }}
          >
            Tolak refund dana
          </button>
          <button
            className="px-4 py-2 bg-[#4A5298] text-white rounded font-semibold"
            onClick={() => {
              setOpenModal(true);
              setAccepted(true);
            }}
          >
            Refund dana ke customer
          </button>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setTitle("");
          setDesc("");
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
          <>
            <p className="mb-2">Judul</p>
            <Input
              className="mb-4"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <p className="mb-2">Deskripsi</p>
            <TextArea
              rows={4}
              className="mb-8"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <div className="flex justify-end">
              <button
                className="mr-4"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Batalkan
              </button>
              <button
                className="px-4 py-2 bg-[#4A5298] text-white rounded font-semibold"
                onClick={() => {
                  axiosInstance
                    .post("/api/report/update", {
                      description: desc,
                      title: title,
                      orderItemId: data.orderItem.id,
                      accepted: accepted ? 1 : -1,
                      reportId: data.id,
                    })
                    .then((res: any) => {
                      console.log(res.data);

                      setOpenModal(false);
                    })
                    .catch((err: any) => {
                      console.log(err);

                      setOpenModal(false);
                    });
                }}
              >
                {accepted ? "Refund Dana" : "Tolak Refund Dana"}
              </button>
            </div>
          </>
        </div>
      </Modal>
    </div>
  );
}

export default Index;
