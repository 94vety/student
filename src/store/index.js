import {
    makeAutoObservable
} from "mobx";
import { message } from "antd";
import {
    booksSearch,
    booksKind,
    booksKindSearch,
    login, register,
    borrowBook,
    returnBooksList,
    returnBooksListSuper,
    returnBook,
    getUsers,
    modifyUser,
    addUser,
    deleteUser,
    modifyBook,
    deleteBook
} from "../services/index.js";

class Mobx {
    bookName = ""
    booksPageNum = 2
    booksPageCount = 0
    booksData = []
    booksSuperData = []
    booksKindData = []
    isSearch = true
    returnBooksListData = []
    usersListData = []
    canSwitch = true

    constructor() {
        makeAutoObservable(this);
    }

    modifySwitchStatus = (bool) => {
        this.canSwitch = bool;
    }

    modifyBookNumber = (modifyId) => {
        this.booksData = this.booksData.map(item => {
            const { id, number } = item;
            if (modifyId === id) {
                return {
                    ...item,
                    number: number - 1
                }
            } else {
                return item;
            }
        })
    }

    login = async(data) => {
        const event = await login(data);
        const {
            data: { 
                code, token,
                message: reMessage,
                superuser, email
            }
        } = event;

        if (!code) {
            localStorage.setItem("token", token);
            localStorage.setItem("superuser", superuser);
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", email);
            message.success("登录成功");
            return true;
        } else {
            message.error(reMessage);
            return false;
        }
    }

    register = async(data) => {
        const event = await register(data);
        const {
            data: { 
                code, token,
                message: reMessage,
                email, superuser
            }
        } = event;

        if (!code) {
            localStorage.setItem("token", token);
            localStorage.setItem("superuser", superuser);
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", email);
            message.success("注册成功自动登录");
            return true;
        } else {
            message.error(reMessage);
            return false;
        }
    }

    booksSearch = async(data) => {
        const event = await booksSearch(data);
        const {
            data: {
                books, num_pages
            }
        } = event;

        this.isSearch = true;
        this.booksData = books;
        this.booksPageNum = 2;
        this.booksPageCount = num_pages + 1;
        this.bookName = data.q;
    }

    booksSearchRequest = async(data) => {
        const event = await booksSearch(data);
        const {
            data: {
                books
            }
        } = event;

        this.booksSuperData = books;
    }

    booksSearchAdd = async() => {
        if (this.booksPageNum < this.booksPageCount) {
            if (this.isSearch) {
                const event = await booksSearch({
                    q: this.bookName,
                    page: this.booksPageNum
                });
    
                const {
                    data: {
                        books
                    }
                } = event;

                this.booksPageNum = this.booksPageNum + 1;
                this.booksData = [...this.booksData, ...books];
            } else {
                const event = await booksKindSearch({
                    category: this.category,
                    page: this.booksPageNum
                });
    
                const {
                    data: {
                        lists
                    }
                } = event;

                this.booksPageNum = this.booksPageNum + 1;
                this.booksData = [...this.booksData, ...lists];
            }
        } else {
            message.warning("无更多书籍");
        }
    }

    booksKindRequest = async() => {
        const event = await booksKind()

        this.booksKindData = event.data;
    }

    booksKindSearchRequest = async(data) => {
        const event = await booksKindSearch(data);
        const {
            data: {
                lists, pages
            }
        } = event;

        this.isSearch = false;
        this.kindId = data.category;
        this.booksData = lists;
        this.booksPageCount = pages + 1;
    }

    borrowBookRequest = async(data) => {
        const {
            data: {
                code,
                message: reMessage
            }
        } =  await borrowBook(data);

        if (!code) {
            message.success(reMessage);
        } else {
            message.error(reMessage);
        }
    }

    returnBooksListRequest = async() => {
        const superuser = JSON.parse(localStorage.getItem("superuser"));

        if (superuser) {
            const { data } = await returnBooksListSuper();

            this.returnBooksListData = data.filter(item => !item.status);
        } else {
            const { data } = await returnBooksList();

            this.returnBooksListData = data.filter(item => !item.status);
        }
    }

    returnBookRequest = async(data) => {
        const {
            data: {
                code,
                message: reMessage
            }
        } = await returnBook(data);

        if (!code) {
            message.success(reMessage);
        } else {
            message.error(reMessage);
        }
    }

    getUsersRequest = async() => {
        const {
            data
        } = await getUsers();
        
        this.usersListData = data;
    }

    modifyUserRequest = async(data, id) => {
        const {
            data: {
                code, msg
            }
        } = await modifyUser(data, id);

        if (code) {
            message.success(msg);
        } else {
            message.error(msg);
        }
    }

    addUserRequest = async(data) => {
        const {
            data: {
                code, msg
            }
        } = await addUser(data);
        
        if (code) {
            message.success(msg);
        } else {
            message.error(msg);
        }
    }

    deleteUserRequest = async(id) => {
        const { status } = await deleteUser(id);
        
        if (status === 304 || status === 400 || status >= 200 && status < 300) {
            message.success("删除成功");
        } else {
            message.error("删除失败");
        }
    }

    modifyBookRequest = async(data, id) => {
        const {
            data: {
                code, msg
            }
        } = await modifyBook(data, id);
        
        if (code) {
            message.success(msg);
        } else {
            message.error(msg);
        }
    }

    deleteBookRequest = async(id) => {
        const { status } = await deleteBook(id);
        
        if (status === 304 || status === 400 || status >= 200 && status < 300) {
            message.success("删除成功");
        } else {
            message.error("删除失败");
        }
    }
}

const myStore = new Mobx();
export default myStore;

