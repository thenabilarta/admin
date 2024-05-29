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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchChatData, setActiveChat } from "../../features/chat/chatSlice";
import { Descriptions, DescriptionsItem } from "../../components/description";
import moment from "moment";
import Spacer from "../../components/Spacer";
import { getUserCategory } from "../../features/category/categorySlice";
import { commafy } from "../../utils/utils";

function Index() {
  const [dataNew, setDataNew] = useState<any>({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const location = useLocation();
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const categoryState = useAppSelector(getUserCategory).data;

  const getById = () => {
    axiosInstance
      .get(`/api/product/update-product-price-request/${id}`)
      .then((res: any) => {
        console.log(res.data);

        const r = res.data;

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

        const result = { ...r, subcategory, category };

        // const result = res.data;
        setDataNew(result);
      });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryState.length > 0) {
      getById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryState]);

  const onFinish = (values: any) => {
    axiosInstance
      .post("/api/product/update-product-price-request", {
        approved: values.approved ? true : false,
        id: dataNew.id,
        reason: values.reason,
      })
      .then(() => {
        // console.log('-->> res.data', res.data);
        message.open({
          type: "success",
          content: "Successful approval",
        });
        navigate("/product/request");
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
        className="my-4 mb-10"
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/product/request")}
      >
        Back
      </Button>

      <Row className="mb-16">
        <Card className="w-4/5 mx-auto">
          <Row className="justify-center">
            <Avatar
              size={120}
              src={dataNew?.user?.profilePic}
              className="mb-5"
            />
          </Row>
          <Row className="justify-center pb-2">
            <Tag color="processing">Change Product Price</Tag>
          </Row>
          <Descriptions
            className="mt-4"
            layout="horizontal"
            bordered
            column={1}
            contentStyle={{ width: "50%" }}
          >
            <DescriptionsItem label="Name">
              {dataNew?.user?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Created">
              {dataNew?.createdAt
                ? moment(dataNew?.createdAt).format("h:mmA - DD MMMM YYYY")
                : ""}
            </DescriptionsItem>
            <DescriptionsItem label="Category">
              {dataNew?.category?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Subategory">
              {dataNew?.subcategory?.name}
            </DescriptionsItem>
            <DescriptionsItem label="Product Description">
              {dataNew?.product?.description}
            </DescriptionsItem>
            <DescriptionsItem label="Old Price">
              Rp{" "}
              {typeof dataNew?.product?.price === "number" &&
                commafy(dataNew?.product?.price)}
            </DescriptionsItem>
            <DescriptionsItem label="New Price">
              Rp {typeof dataNew?.price === "number" && commafy(dataNew?.price)}
            </DescriptionsItem>
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
                  userId: dataNew?.user?.id,
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
