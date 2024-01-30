import {Elysia} from "elysia";
import {swagger} from "@elysiajs/swagger";
import {todos} from "./routes/todos";

export const app = new Elysia({
  prefix: "/api",
})
  .use(
    swagger({
      exclude: "/api/",
    })
  )
  .use(todos)
  .get("/", () => "Hello from API")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
