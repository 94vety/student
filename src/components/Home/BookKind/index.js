import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import myStore from "../../../store";
import "./index.css";

function BookKind() {
    useEffect(() => {
        myStore.booksKindRequest();
    }, [])

    const styleClass = (index) => {
        switch (index % 4) {
            case 0: return "kind-book one";
            case 1: return "kind-book two";
            case 2: return "kind-book three";
            case 3: return "kind-book five"
        }
    }

    const handleKind = (id) => {
        myStore.booksKindSearchRequest({
            category: id,
            page: 1
        });
    }

    return (
        <div className="kind">
            {
                myStore.booksKindData.map((item, index) => {
                    return <div
                        key={item.id}
                        className={styleClass(index)}
                        onClick={() => handleKind(item.id)}
                    >{item.name}</div>
                })
            }
        </div>
    )
}

export default observer(BookKind);