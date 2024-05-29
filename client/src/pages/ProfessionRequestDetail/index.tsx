/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tag,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import { useAppDispatch } from "../../app/hooks";
import { fetchChatData, setActiveChat } from "../../features/chat/chatSlice";
import { Descriptions, DescriptionsItem } from "../../components/description";
import moment from "moment";
import Spacer from "../../components/Spacer";

function Index() {
  const [dataNew, setDataNew] = useState<any>({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const location = useLocation();
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const getById = () => {
    axiosInstance
      .get(`/api/category/applied-consultant/${id}`)
      .then((res: any) => {
        console.log(res.data);
        const result = res.data;
        setDataNew(result);
      });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    getById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: any) => {
    axiosInstance
      .post("/api/category/applied-consultant", {
        status: values.approved ? "IS_ACCEPTED" : "IS_DECLINED",
        id: dataNew.id,
      })
      .then(() => {
        // console.log('-->> res.data', res.data);
        message.open({
          type: "success",
          content: "Successful approval",
        });
        navigate("/consultant/request");
        onReset();
      })
      .catch((e) => {
        message.open({
          type: "warning",
          content: e.response.data.error.message,
        });
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const renderURL = () => {
    if (typeof dataNew?.proofMediaUrl === "string") {
      const parsed = JSON.parse(dataNew?.proofMediaUrl);

      if (parsed.length > 0) {
        return parsed.map((p: any, i: number) => (
          <a href={p} target="_blank" key={i} className="block">
            {p}
          </a>
        ));
      }
    }
  };

  return (
    <div className="p-2">
      <Button
        className="my-4 mb-10"
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/consultant/request")}
      >
        Back
      </Button>

      <Row className="mb-16">
        <Card className="w-4/5 mx-auto">
          <Row className="justify-center">
            <Avatar
              size={120}
              src={dataNew?.consultant?.profilePic}
              className="mb-5"
            />
          </Row>
          <Row className="justify-center pb-2">
            <Tag color="processing">Applying Profession</Tag>
          </Row>
          <Descriptions
            className="mt-4"
            layout="horizontal"
            bordered
            column={1}
            contentStyle={{ width: "50%" }}
          >
            <DescriptionsItem label="Name">
              {dataNew?.consultant?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Email">
              {dataNew?.consultant?.email}
            </DescriptionsItem>
            <DescriptionsItem label="Phone">
              {dataNew?.consultant?.phone}
            </DescriptionsItem>
            <DescriptionsItem label="Created">
              {dataNew?.consultant?.createdAt
                ? moment(dataNew?.consultant?.createdAt).format(
                    "h:mmA - DD MMMM YYYY"
                  )
                : ""}
            </DescriptionsItem>
            <DescriptionsItem label="Category">
              {dataNew?.category?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Subategory">
              {dataNew?.subcategory?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Document">{renderURL()}</DescriptionsItem>
          </Descriptions>
        </Card>
      </Row>

      <Form
        className="mt-5"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row className="mb-8">
          <Col className="w-3/5 mx-auto">
            <Form.Item
              label="Approval"
              name="approved"
              rules={[
                {
                  required: true,
                  message: "please input your approval",
                },
              ]}
            >
              <Select
                className="w-full"
                placeholder="Select approval"
                options={[
                  { value: true, label: "Approve" },
                  { value: false, label: "Unapprove" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Reason"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "please input your reason",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please input your reason" />
            </Form.Item>
          </Col>
        </Row>

        <Row className="justify-end mb-4 w-3/5 mx-auto">
          <Button type="default" htmlType="submit" className="mr-2">
            Submit
          </Button>
          <Button
            onClick={() => {
              axiosInstance
                .post("/api/chat/initiation", {
                  userId: dataNew?.consultant?.id,
                })
                .then((res) => {
                  dispatch(setActiveChat(res.data.id));
                  dispatch(fetchChatData());
                  navigate("/chat");
                });
            }}
          >
            Chat Consultant
          </Button>
        </Row>
      </Form>

      <Spacer height={8} />
    </div>
  );
}

export default Index;
