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
import { Descriptions, DescriptionsItem } from "../../components/description";
import axiosInstance from "../../utils/axiosInstance";
import { useAppDispatch } from "../../app/hooks";
import { fetchChatData, setActiveChat } from "../../features/chat/chatSlice";

const span = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
};

function Index() {
  const [dataOld, setDataOld] = useState<any>({});
  const [dataNew, setDataNew] = useState<any>({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");

  const getById = () => {
    axiosInstance
      .get(`/api/consultant/update-profile-request/${id}`)
      .then((res: any) => {
        const result = res.data;
        setDataNew(result);
      });
  };

  const getByUserId = () => {
    axiosInstance.get(`/api/v1/consultant/${userId}`).then((res: any) => {
      const result = res.data;
      setDataOld(result);
    });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    getById();
    getByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: any) => {
    axiosInstance
      .post("/api/consultant/update-profile-response", {
        ...values,
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

  return (
    <div className="p-2">
      <Button
        className="my-4"
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/consultant/request")}
      >
        Back
      </Button>

      <Row gutter={[15, 20]}>
        <Col {...span}>
          <Card>
            <Row className="justify-center">
              <Avatar size={120} src={dataOld?.profilePic} className="mb-5" />
            </Row>
            <Row className="justify-center pb-2">
              <Tag color="success">Old Profile Consultant</Tag>
            </Row>
            <Descriptions
              className="mt-4"
              layout="horizontal"
              bordered
              column={1}
              contentStyle={{ width: "450px" }}
            >
              <DescriptionsItem label="Name">{dataOld?.name}</DescriptionsItem>
              <DescriptionsItem label="Description">
                {dataOld?.profileDesc}
              </DescriptionsItem>
            </Descriptions>
          </Card>
        </Col>
        <Col {...span}>
          <Card>
            <Row className="justify-center">
              <Avatar size={120} src={dataNew?.profilePic} className="mb-5" />
            </Row>
            <Row className="justify-center pb-2">
              <Tag color="processing">New Profile Consultant</Tag>
            </Row>
            <Descriptions
              className="mt-4"
              layout="horizontal"
              bordered
              column={1}
              contentStyle={{ width: "450px" }}
            >
              <DescriptionsItem label="Name">{dataNew?.name}</DescriptionsItem>
              <DescriptionsItem label="Description">
                {dataNew?.profileDesc}
              </DescriptionsItem>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Form
        className="mt-5"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[10, 10]}>
          <Col {...span}>
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
          </Col>
          <Col {...span}>
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
        <Row className="justify-end mb-4">
          <Button type="default" htmlType="submit" className="mr-2">
            Submit
          </Button>
          <Button
            onClick={() => {
              axiosInstance
                .post("/api/chat/initiation", {
                  userId: userId,
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
    </div>
  );
}

export default Index;
