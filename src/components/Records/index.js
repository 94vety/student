import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import myStore from "../../store";
import "./index.css";

function Records() {
    const navigate = useNavigate();

    useEffect(() => {
        myStore.recordsRequest();
    }, [])

    const handleReturn = () => {
        navigate("/home");
    }

    return (
        <div className="records">
            <div
                className="router-home"
                onClick={handleReturn}
            >首页</div>
            <div className="re-inner">
                <div className="re-inner-header">借阅记录</div>
                <div className="re-inner-bar"></div>
                <div className="return-content">
                    {
                        myStore.recordList.length === 0
                            ? <Empty
                                className="empty"
                                description="没有数据"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                            : myStore.recordList.map((item) => {
                                const { book, id, user } = item;
                                return <div className="return-item" key={id}>
                                    <div className="page-left">
                                        <img className="page-image" src={book.cover} />
                                    </div>
                                    <div className="page-right">
                                        <div className="page-title">{book.title}</div>
                                        <div className="page-author">{book.author}</div>
                                        <div className="page-number">借书人: {user}</div>
                                        <div className="page-brief">{book.intro}</div>
                                        <div className="page-category">分类：{book.category}</div>
                                    </div>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(Records);
