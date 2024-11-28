import { http, HttpResponse, delay } from "msw";
import data from "../data.json";

export const handlers = [
  http.get("/api/documents", () => {
    const savedDocuments = JSON.parse(
      localStorage.getItem("documents") ?? "[]"
    );
    if (savedDocuments.length > 0) {
      delay();
      return HttpResponse.json(savedDocuments);
    }
    localStorage.setItem("documents", JSON.stringify(data));
    delay();
    return HttpResponse.json(data);
  }),
  http.post("/api/documents", async ({ request }) => {
    const newDocuments = await request.json();
    localStorage.setItem("documents", JSON.stringify(newDocuments));
    await delay(2500);
    return HttpResponse.json(newDocuments);
  }),
];
