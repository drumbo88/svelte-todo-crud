<script>
  import { opc, todos } from '../stores'

  const todoVacio = { id: '', texto: '', estado: false }
  let todo = {...todoVacio}

  const addTodo = () => {
    if (!todo.texto.trim()) {
      return
    }

    todo.id = Date.now()
    todos.add(todo)
    todo = { ...todoVacio }
    opc.mostrar('To-Do agregado', 'bg-success')
  }
</script>

<form on:submit|preventDefault={addTodo}>
  <input
    type="text"
    placeholder="ENTER para agregar To-Do"
    class="form-control shadow b-0"
    bind:value={todo.texto} />
</form>
