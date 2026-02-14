import API from "../api/axios";

export const getTodayProducts = () => API.get("/inventory/today");
