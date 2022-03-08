import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Empty } from "antd";
import myStore from "../../store";
import "./index.css";

function ReturnBook() {
    const navigate = useNavigate();
    const superuser = JSON.parse(localStorage.getItem("superuser"));

    const handleReturn = () => {
        navigate("/home");
    }

    useEffect(() => {
        myStore.returnBooksListRequest();
    }, [])

    const handleReturnBook = async (id) => {
        await myStore.returnBookRequest({
            history: id
        });
        myStore.returnBooksListRequest();
    }

    return (
        <div className="all">
            <div
                className="router-home"
                onClick={handleReturn}
            >首页</div>
            <div className="all-innner">
                <div className="header">归还书籍</div>
                <div className="return-bar"></div>
                <div className="return-content">
                    {
                        myStore.returnBooksListData.length === 0
                            ? <Empty
                                className="empty"
                                description="没有数据"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                            : myStore.returnBooksListData.map((item) => {
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
                                        <Button
                                            size="small"
                                            className="page-btn"
                                            onClick={() => handleReturnBook(id)}
                                        >{superuser ? "帮他归还" : "归还"}</Button>
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(ReturnBook);