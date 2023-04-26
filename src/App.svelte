<script>
  import { Toast } from 'bootstrap'
  let toastEl
  let toast
  let toastOpc = { texto: '', color: '' }
  $: console.log(toastEl)
  $: if (toastEl) {
    toast = Toast.getOrCreateInstance(toastEl)
  }

  const mostrarToast = (texto, color) => {
    toastOpc = { texto, color }
    toast.show()
  }
  const todoVacio = { id: '', texto: '', estado: false }
  let todos = []
  let todo = {...todoVacio}

  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  $: localStorage.setItem("todos", JSON.stringify(todos))

  const addTodo = () => {
    if (!todo.texto.trim()) {
        return
    }

    todo.id = Date.now()
    todos = [...todos, todo]
    todo = { ...todoVacio }
    mostrarToast('To-Do agregado', 'bg-success')
  }

  const delTodo = id => {
    todos = todos.filter(item => item.id !== id)
    mostrarToast('To-Do eliminado', 'bg-danger')
  }

  const editTodo = id => {
    todos = todos.map(item => item.id === id
        ? { ...item, estado: !item.estado }
        : item
    )
    mostrarToast('To-Do modificado', 'bg-warning')
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

  <div class="toast-container top-0 end-0 position-absolute p-3">
  <div bind:this={toastEl} class="toast align-items-center text-bg-primary border-0"
    class:bg-success={toastOpc.color === "bg-success"}
    class:bg-danger={toastOpc.color === "bg-danger"}
    class:bg-warning={toastOpc.color === "bg-warning"}
    role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {toastOpc.texto}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
  </div>
</div>
