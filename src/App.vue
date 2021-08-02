<template>
  <h1>
    Todos
  </h1>
  <div>
    <div>
      <input v-model="text" type="text"/>
    </div>
    <div>
      <button @click="submit">submit</button>
    </div>
  </div>
  <ul v-if="todos">
    <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.text }}</span>
      <span @click="checkTodo(todo.id)">[<span v-if="todo.done">x</span>]</span>
      <span @click="deleteTodo(todo.id)"> delete! </span>
    </li>
  </ul>
  <div v-else>
    Loading...
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import useSWRV from "swrv";

interface Todo {
  id: number,
  done: boolean,
  text: string
}

export default defineComponent({
  setup() {
    const {data: todos, error, mutate: mutateTodos} = useSWRV<Todo[]>('/todos')

    const text = ref<string>("")

    const submit = async () => {
      if (text.value.length === 0) return;

      const payload = {
        text: text.value
      }

      await fetch('/todos', {
        method: 'post',
        body: JSON.stringify(payload)
      })

      text.value = ""

      await mutateTodos();
    }

    const checkTodo = async (id: number) => {
      await fetch(`/todos/check/${id}`, {
        method: 'post',
      })
      await mutateTodos();
    }

    const deleteTodo = async (id: number) => {
      await fetch(`/todos/${id}`, {
        method: 'delete',
      })
      await mutateTodos();
    }

    return {
      text,
      submit,
      checkTodo,
      deleteTodo,
      todos,
      error
    }
  }
})
</script>
