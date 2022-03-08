import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Modal, Empty } from "antd";
import myStore from "../../../store";
import tools from "../../../utils/tools";
import "./index.css";

const { category } = tools;
const { confirm } = Modal;

function Books() {
    const [dom, setDom] = useState(HTMLDivElement | null);

    useEffect(() => {
        myStore.booksSearch({
            q: "三体",
            page: 1,
        })
    }, [])

    const confirmFun = (id) => {
        confirm({
            title: "图书管理系统",
            content: "是否确认借书",
            okText: "确认",
            cancelText: "取消",
            onOk() {
                myStore.borrowBookRequest({
                    book: id
                });
                myStore.modifyBookNumber(id)
            },
        })
    }

    const handleOnScroll = async () => {
        if (dom) {
            const contentScrollTop = dom.scrollTop; //滚动条距离顶部
            const clientHeight = dom.clientHeight; //可视区域
            const scrollHeight = dom.scrollHeight; //滚动条内容的总高度
            if (contentScrollTop + clientHeight >= scrollHeight) {
                await myStore.booksSearchAdd();
            }
        }
    };

    return (
        <div className="page"
            ref={(dom) => {
                setDom(dom);
            }}
            onScrollCapture={() => handleOnScroll()}
        >  
            {
                myStore.booksData.length === 0 
                    ? <Empty
                        className="empty"
                        description="没有数据"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                    : myStore.booksData.map((item) => {
                        return <div className="page-item" key={item.id}>
                            <div className="item-left">
                                <img className="item-image" src={item.cover} />
                            </div>
                            <div className="item-right">
                                <Button
                                    type="primary"
                                    className="item-btn"
                                    onClick={() => confirmFun(item.id)}
                                >借阅</Button>
                                <div className="item-title">{item.title}</div>
                                <div className="item-author">{item.author}</div>
                                <div className="item-number">剩余数目: {item.number}</div>
                                <div className="item-brief">{item.intro}</div>
                                <div className="item-cate">
                                    {
                                        category(item.category_id || item.category)
                                    }
                                </div>
                            </div>
                        </div>
                })
            }   
        </div>
    )
}

export default observer(Books);