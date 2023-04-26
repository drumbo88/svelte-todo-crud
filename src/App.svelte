<script>
  const todoVacio = { id: '', texto: '', estado: false }
  let todos = []
  let todo = {...todoVacio}

  const addTodo = () => {
    if (!todo.texto.trim()) {
        return
    }

    todo.id = Date.now()
    todos = [...todos, todo]
    todo = { ...todoVacio }
    console.log(todos,todo)
  }

  const delTodo = id => {
    todos = todos.filter(item => item.id !== id)
  }

  const editTodo = id => {
    todos = todos.map(item => item.id === id
        ? { ...item, estado: !item.estado }
        : item
    )
  }

  const classIcono = valor => (
    valor ? 'bi bi-arrow-clockwise' : 'bi bi-check2'
  )
  const classEstado = valor => (
    valor ? 'btn-success' : 'btn-warning'
  )
</script>

<div class="container">
  <h1 class="display-5 my-5">CRUD</h1>
  <form on:submit|preventDefault={addTodo}>
    <input
      type="text"
      placeholder="ENTER para agregar To-Do"
      class="form-control shadow b-0"
      bind:value={todo.texto} />
  </form>
  {#each todos as item}
  <div class="shadow my-3 p-3 lead">
    <p class={item.estado ? 'text-decoration-line-through': ''}>
        {item.texto}
    </p>
    <button class="btn btn-sm {classEstado(item.estado)}" on:click={editTodo(item.id)}>
        <i class="{classIcono(item.estado)}"></i>
    </button>
    <button class="btn btn-sm btn-danger" on:click={delTodo(item.id)}>
        <i class="bi bi-trash"></i>
    </button>
  </div>
  {/each}
</div>
