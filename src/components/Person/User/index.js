import React, { useState, useEffect } from "react";
import {
    Input, Form,
    Button, message,
    Empty
} from "antd";
import { observer } from "mobx-react-lite";
import myStore from "../../../store";
import "./index.css";

const { Password: InputPassword } = Input;

function User() {
    const formRef = React.createRef()
    const [display, setDisplay] = useState("find");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        myStore.getUsersRequest();
    }, [])

    const handleOperation = async(name, email, id) => {
        await setName(name);
        await setEmail(email);
        await setId(id);
        setDisplay("resive");
        myStore.modifySwitchStatus(false);
    }

    const handleAddUser = () => {
        setDisplay("add");
    }

    const handleConfirm = async (value) => {
        if (display === "add") {
            const {
                username, password,
                email, rePassword
            } = value;

            if (password === rePassword) {
                await myStore.addUserRequest({
                    username,
                    password,
                    email
                });
                myStore.modifySwitchStatus(true);
                myStore.getUsersRequest();
    
                setDisplay("find");
            } else {
                message.warn("确认密码与密码不一致");
            }
        } else if (display === "resive") {
            await myStore.modifyUserRequest({
                ...value
            }, id);
            myStore.modifySwitchStatus(true);
            myStore.getUsersRequest();

            setDisplay("find");
        }
    }

    const handleDeleteUser = () => {
        myStore.deleteUserRequest(id);
        myStore.modifySwitchStatus(true);
        setDisplay("find");
    }

    return (
        <div className="content">
            {(() => {
                switch (display) {
                    case "find": return <>
                        <div className="users">
                            {
                                myStore.usersListData.length === 0
                                    ? <Empty
                                        className="user-empty"
                                        description="没有数据"
                                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    />
                                    : myStore.usersListData.map(item => {
                                        const { username, email, id } = item;
                                        return <div className="users-item" key={id}>
                                            <div className="user-item">
                                                <div className="user-label">用户名：</div>
                                                <div className="user-name">{username}</div>
                                            </div>
                                            <div className="user-item">
                                                <div className="user-label">邮箱：</div>
                                                <div className="user-email">{email}</div>
                                            </div>
                                            <div className="user-bar"></div>
                                            <Button
                                                size="small"
                                                className="user-btn"
                                                onClick={() => handleOperation(username, email, id)}
                                            >操作</Button>
                                        </div>
                                })
                            }
                        </div>
                        <div
                            className="add-user"
                            onClick={handleAddUser}
                        >添加用户</div>
                    </>;
                    case "add": return <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        onFinish={handleConfirm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input username!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="确认密码"
                            name="rePassword"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input password!'
                                    }
                                ]
                            }
                        >
                            <InputPassword className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input email!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 17 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                确认添加
                            </Button>
                        </Form.Item>
                    </Form>;
                    case "resive": return <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        ref={formRef}
                        onFinish={handleConfirm}
                        autoComplete="off"
                        initialValues={{
                            "username": name,
                            "password": "",
                            "rePassword": "",
                            "email": email
                        }}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={
                                [
                                    {
                                        required: false,
                                        message: 'Please input your username!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
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
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={
                                [
                                    {
                                        required: false,
                                        message: 'Please input your email!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 17 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                确认修改
                            </Button>
                        </Form.Item>
                        <Button
                            className="delete"
                            type="primary"
                            onClick={handleDeleteUser}
                            danger
                        >
                            删除该用户
                        </Button>
                    </Form>;
                }
            })()
            }
        </div>
    )
}

export default observer(User);
