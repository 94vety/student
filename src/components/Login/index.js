import React, { useState } from "react";
import {
    Form, Input,
    Button,
} from "antd";
import { useNavigate } from "react-router-dom";
import myStore from "../../store";
import "./index.css";

const FormItem = Form.Item;
const { Password: InputPassword } = Input;

function Login() {
    const formRef = React.createRef();
    const [status, setStatus] = useState(true);
    const navigate = useNavigate();

    const handleRegister = () => {
        setStatus(!status);
        formRef.current.resetFields();
    }

    const handleClickLogin = async(value) => {
        const result = await myStore.login(value);
        formRef.current.resetFields();

        if (result) {
            navigate("/home");
        }
    }

    const handleClickRegister = async(value) => {
        const result = await myStore.register({
            ...value,
            allow: true
        })
        formRef.current.resetFields();

        if (result) {
            navigate("/home");
        }
    }

    return (
        <div className="login">
            <div className="content">
                <div className="header">
                    <div>图书管理系统</div>
                </div>
                {status
                    ? (<Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        ref={formRef}
                        onFinish={handleClickLogin}
                        autoComplete="off"
                        initialValues={{
                            "username": "",
                            "password": "",
                            "rePassword": "",
                            "email": ""
                        }}
                    >
                        <FormItem
                            label="用户名"
                            name="username"
                            className="form-login"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            }
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="密码"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword />
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 10, span: 14 }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                登陆
                            </Button>
                        </FormItem>
                    </Form>)
                    : (<Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        ref={formRef}
                        onFinish={handleClickRegister}
                        autoComplete="off"
                    >
                        <FormItem
                            label="用户名"
                            name="username"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your username!'
                                    }
                                ]
                            }
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label="密码"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword />
                        </FormItem>
                        <FormItem
                            label="确认密码"
                            name="password2"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword />
                        </FormItem>
                        <FormItem
                            label="邮箱"
                            name="email"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]
                            }
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            wrapperCol={{ offset: 6, span: 17 }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                注册
                            </Button>
                        </FormItem>
                    </Form>)}
                <div className="footer">
                    <a
                        className="register"
                        onClick={handleRegister}
                    >{status ? '注册' : '登陆'}</a>
                </div>
            </div>
        </div>
    )
}

export default Login;
