import axios from "axios";

const api = axios.create({
	baseURL: "https://travelcash-api-prd.azurewebsites.net/"
});

export default api;