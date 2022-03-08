import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
    Form, Button,
    Input, Empty
} from "antd";
import myStore from "../../../store";
import tools from "../../../utils/tools";
import "./index.css";

const { category, category_id } = tools;

function Book() {
    const [display, setDisplay] = useState("find");
    const [id, setId] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [book, setBook] = useState({});

    const handlePressEnter = (event) => {
        const { target: { value } } = event;
        setDisplay("resive");
        myStore.booksSearchRequest({
            q: value,
            page: 1
        });
        setInputValue(value);
        myStore.modifySwitchStatus(false);
    }

    const handleConfirm = async(value) => {
        const {
            category, brief,
            author, number,
            bookname,
        } = value;

        await myStore.modifyBookRequest({
            category_id: category_id(category),
            title: bookname,
            author,
            intro: brief,
            number
        }, id);
        myStore.modifySwitchStatus(true);

        setDisplay("resive");
        myStore.booksSearchRequest({
            q: inputValue,
            page: 1
        });
    }

    const handleDelete = async(id) => {
        await myStore.deleteBookRequest(id);
        myStore.modifySwitchStatus(true);
        
        setDisplay("resive");
        myStore.booksSearchRequest({
            q: inputValue,
            page: 1
        });
    }

    const handleStart = async(item, id) => {
        setId(id);
        await setBook(item);

        setDisplay("resiveCom");
    }

    return (
        <div className="content">
            {(() => {
                switch (display) {
                    case "find": return <>
                        <div className="find">书籍名查找</div>
                        <Input
                            onPressEnter={handlePressEnter}
                            placeholder="请输入书籍名"
                            className="input-bookname"
                        />
                    </>;
                    case "resive": return <div className="page-preson">
                        {
                            myStore.booksSuperData.length === 0
                                ? <Empty
                                    className="empty"
                                    description="没有数据"
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                                : myStore.booksSuperData.map((item) => {
                                    return <div className="page-item" key={item.id}>
                                        <div className="item-left">
                                            <img className="item-image" src={item.cover} />
                                        </div>
                                        <div className="item-right">
                                            <div className="item-title">
                                                <div className="title-word">{item.title}</div>
                                                <div className="title-btn">
                                                    <Button
                                                        size="small"
                                                        className="btn-left"
                                                        onClick={() => handleDelete(item.id)}
                                                    >删除</Button>
                                                    <Button
                                                        size="small"
                                                        onClick={() => handleStart(item, item.id)}
                                                    >修改</Button>
                                                </div>
                                            </div>
                                            <div className="item-author">{item.author}</div>
                                            <div className="item-number">数目: {item.number}</div>
                                            <div className="item-brief">{item.intro}</div>
                                            <div className="item-category">
                                                {
                                                    category(item.category)
                                                }
                                            </div>
                                        </div>
                                    </div>
                            })
                        }
                    </div>;
                    case "resiveCom": return <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 17 }}
                        onFinish={handleConfirm}
                        autoComplete="off"
                        initialValues={{
                            bookname: book.title,
                            author: book.author,
                            number: book.number,
                            brief: book.intro,
                            category: category(book.category)
                        }}
                    >
                        <Form.Item
                            label="书籍名"
                            name="bookname"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input bookname!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="作者"
                            name="author"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input author!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="剩余数量"
                            name="number"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input number!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="分类"
                            name="category"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input category!'
                                    }
                                ]
                            }
                        >
                            <Input className="input-resive" />
                        </Form.Item>
                        <Form.Item
                            label="简介"
                            name="brief"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: 'Please input brief!'
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
                    </Form>;
                }
            })()}
        </div>
    )
}

export default observer(Book);
