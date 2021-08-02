import {rest} from "msw"

const todos = [
  {
    id: 1,
    done: true,
    text: "take a bath"
  },
  {
    id: 2,
    done: false,
    text: "preparing for vacation"
  },
]

export const handlers = [
  rest.get('/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(todos)
    )
  }),
  rest.post<string>('/todos', (req, res, ctx) => {
    const {text} = JSON.parse(req.body);
    
    todos.push({
      id: todos.length + 1,
      done: false,
      text
    })
    
    return res(
      ctx.status(200),
      ctx.json(todos)
    )
  }),
  rest.post( '/todos/check/:id',(req, res, ctx) => {
    const { id } = req.params;
    
    const todo = todos.find( todo => todo.id === Number(id) )
    
    todo ? todo.done = !todo.done : ""
    
    return res(
      ctx.status(200),
      ctx.json(todos)
    )
  }),
  rest.delete( '/todos/:id',(req, res, ctx) => {
    const { id } = req.params;
    
    const idx = todos.findIndex( todo => todo.id === Number(id) )
    
    todos.splice(idx,1);
    
    return res(
      ctx.status(200),
      ctx.json(todos)
    )
  })
]
