import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import User from "./User/index";
import Book from "./Book/index";
import "./index.css";
import myStore from "../../store";

const { confirm } = Modal;

function Person() {
    const [manageKind, setManageKind] = useState(true);
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const email = localStorage.getItem("email")

    const handleReturn = () => {
        navigate("/home");
    }

    const handleSwitch = () => {
        if (!myStore.canSwitch) {
            confirm({
                title: "图书管理系统",
                content: "是否确认中止当前操作",
                okText: "确认",
                cancelText: "取消",
                onOk() {
                    setManageKind(!manageKind);
                    myStore.modifySwitchStatus(true);
                }
            })
        } else {
            setManageKind(!manageKind);
        }
    }

    return (
        <div className="person">
            <div className="left">
                <div className="username">{userName}</div>
                <div className="email">{email}</div>
                <div
                    className="return-home"
                    onClick={handleReturn}
                >首页</div>
            </div>
            <div className="right">
                <div
                    onClick={handleSwitch}
                    className="switch"
                >
                    {manageKind ? "书籍管理" : "用户管理"}
                </div>
                <div className="title">
                    {manageKind ? "用户管理" : "书籍管理"}
                </div>
                <div className="bar"></div>
                {manageKind ? <User /> : <Book />}
            </div>
        </div>
    )
}

export default observer(Person);
