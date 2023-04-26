import { writable } from "svelte/store";

export const createTodos = () => {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    local: (todos) => {
      set(todos);
    },
    add: (todo) => {
      update((todos) => [...todos, todo]);
    },
    delete: (id) => {
      update((todos) => todos.filter((item) => item.id !== id));
    },
    put: (id) => {
      update((todos) =>
        todos.map((item) =>
          item.id === id ? { ...item, estado: !item.estado } : item
        )
      );
    },
  };
};

export const todos = createTodos();

const createOpc = () => {
  const { subscribe, set, update } = writable({
    texto: "",
    color: "",
    estado: false,
  });

  return {
    subscribe,
    mostrar: (texto, color) => {
        update(n => ({ texto, color, estado: true }))
    }
  }
};

export const opc = createOpc()
