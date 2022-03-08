import Header from "./Header/index";
import BookKind from "./BookKind/index";
import Books from "./Books/index"
import "./index.css";

function Home() {
    return (
        <>
            <Header />
            <div className="con">
                <div className="con-left">
                    <BookKind />
                </div>
                <div className="con-right">
                    <Books />
                </div>
            </div>
        </>
    )
}

export default Home;


