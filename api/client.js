import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://g-health.herokuapp.com/api",
});
apiClient.setHeaders({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export default apiClient;
