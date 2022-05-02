import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import myStore from "../../../store";
import "./index.css";


function Header() {
    const [ inputValue, setValue ] = useState("");
    const navigate = useNavigate();
    const superuser = JSON.parse(localStorage.getItem("superuser"));

    const returnBook = () => {
        navigate("/return");
    }

    const presonCenter = () => {
        navigate("/person");
    }

    const loginOut = () => {
        navigate("/");
        localStorage.clear();
    }

    const handleReturn = (event) => {
        const { value } = event.target;

        if (event.keyCode === 13) {
            myStore.booksSearch({
                q: value,
                page: 1
            });
        } else {
            setValue(value);
        }
    }

    const readRecords = () => {
        navigate("/records");
    }

    return (
        <div className="back">
            <div className="top-left">图书管理系统</div>
            <div className="search">
                <SearchOutlined
                    className="search-icon"
                />
                <input
                    className="search-input"
                    value={inputValue}
                    onKeyDown={e => handleReturn(e)}
                    onChange={e => handleReturn(e)}
                />
            </div>
            <div className="top-person">
                <Dropdown
                    placement="topLeft"
                    overlay={
                        <Menu style={{ color: "red"}}>
                            <Menu.Item
                                className="menu-item"
                                key="1"
                                onClick={readRecords}
                            >
                                借阅记录
                            </Menu.Item>
                            <Menu.Item 
                                className="menu-item"
                                key="2"
                                onClick={returnBook}
                            >
                                归还书籍
                            </Menu.Item>
                            <Menu.Item
                                className="menu-item"
                                key="4"
                                onClick={loginOut}
                            >
                                退出登录
                            </Menu.Item>
                            {superuser &&
                                <Menu.Item 
                                    className="menu-item"
                                    key="3"
                                    onClick={presonCenter}
                                >
                                    管理中心
                                </Menu.Item>
                            }
                        </Menu>
                    }
                    trigger="hover"
                >
                    <p>用户名</p>
                </Dropdown>
            </div>
        </div>
    )
}

export default observer(Header);
