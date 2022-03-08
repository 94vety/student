import request from "../utils/request";

export const login = data => request.post("/login/", data);

export const register = data => request.post("/register/", data);

export const booksSearch = data => request.get("/api/search/", data);

export const booksKind = () => request.get("/api/categories/");

export const booksKindSearch = data => request.get("/api/getbooks/", data);

export const borrowBook = data => request.post("/api/borrow/", data);

export const returnBooksList = () => request.get("/api/getHistories/");

export const returnBooksListSuper = () => request.get("/api/histories/")

export const returnBook = data => request.post("/api/return/", data);

export const getUsers = () => request.get("/api/users/");

export const modifyUser = (data, id) => request.patch(`/api/users/${id}/`, data);

export const addUser = data => request.post("/api/users/", data); 

export const deleteUser = id => request.delete(`/api/users/${id}/`);

export const getBooks = () => request.get("/api/books/");

export const modifyBook = (data, id) => request.patch(`/api/books/${id}/`, data);

export const deleteBook = id => request.delete(`/api/books/${id}/`);