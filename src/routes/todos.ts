import {Elysia, t} from "elysia";
import {Database} from "../db";

export const todos = new Elysia({
  prefix: "/todos",
})
  .decorate("db", new Database())
  .get("/", ({db}) => db.all())
  .get("/:id", ({params, db}) => db.read(params.id), {
    params: t.Object({
      id: t.String(),
    }),
  })
  .post("/", ({body, db}) => db.create(body.title), {
    body: t.Object({
      title: t.String(),
    }),
  })
  .post(
    "/:id",
    ({params, body, db}) => {
      const original = db.read(params.id);
      const todo = db.update(params.id, {
        title: body.title || original.title,
        completed: body.completed || original?.completed,
      });
      return todo;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        title: t.Optional(t.String()),
        completed: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete(
    "/:id",
    ({params, db}) => {
      db.delete(params.id);
      return `delete post ${params.id}`;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );

export type TodosApp = typeof todos;
