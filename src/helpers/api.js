import axios from "axios";

const api = axios.create({
	baseURL: "https://travelcash-api-stg.azurewebsites.net/"
});

export default api;