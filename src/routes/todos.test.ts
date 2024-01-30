import {expect, test} from "bun:test";
import {edenTreaty} from "@elysiajs/eden";
import {App} from "..";

const apiClient = edenTreaty<App>("http://localhost:3000");

test("GET /todos", async () => {
  const {data} = await apiClient.api.todos[""].get();

  expect(data).toEqual({
    todos: expect.any(Array),
  });
});

test("POST /todos", async () => {
  const {data, error} = await apiClient.api.todos[""].post({
    title: "Buy milk",
  });

  expect(data).toEqual({
    id: expect.any(String),
    title: "Buy milk",
    completed: false,
  });
});

test("POST /todos/:id", async () => {
  // create todo
  const todo = await apiClient.api.todos[""].post({
    title: "Buy milk",
  });
  expect(todo.data).toBeDefined();

  // update todo
  const {data} = await apiClient.api.todos[todo.data!.id].post({
    title: "Buy steak",
    completed: true,
  });

  expect(data).toEqual({
    id: expect.any(String),
    title: "Buy steak",
    completed: true,
  });
});

test("DELETE /todos/:id", async () => {
  // create todo
  const todo = await apiClient.api.todos[""].post({
    title: "Buy milk",
  });
  expect(todo.data).toBeDefined();

  // delete todo
  const {data} = await apiClient.api.todos[todo.data!.id].delete();

  expect(data).toEqual(`delete post ${todo.data!.id}`);
});
