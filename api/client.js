import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://10.0.2.2:5002/api",
});
apiClient.setHeaders({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export default apiClient;
