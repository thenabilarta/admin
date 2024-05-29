import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { userSignIn } from "../../features/user/userSlice";

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const [errorLogin, setErrorLogin] = useState(false);

  const onFinish = (values: FieldType) => {
    dispatch(userSignIn({ email: values.email, password: values.password }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res?.error) {
          onFinishFailed(res?.error.message);
          setErrorLogin(true);
        } else if (res.payload.access_token) {
          window.location.reload();
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{
          email: "danielingram@qrios.com",
          password: "12345678",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" onChange={() => setErrorLogin(false)} />
        </Form.Item>

        <Form.Item<FieldType>
          style={{ marginBottom: errorLogin ? "0.5rem" : "2rem" }}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={() => setErrorLogin(false)}
            placeholder="Password"
          />
        </Form.Item>

        {errorLogin && (
          <p className="mb-2 text-red-500">Incorrent credentials</p>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#415298] w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
