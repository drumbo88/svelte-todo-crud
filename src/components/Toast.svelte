<script>
import { opc } from '../stores'
import { Toast } from 'bootstrap'
let toastEl
let toast
$: if (toastEl) {
  toast = Toast.getOrCreateInstance(toastEl)
}
$: if ($opc.estado) {
    toast.show()
}

</script>

<div class="toast-container top-0 end-0 position-absolute p-3">
    <div bind:this={toastEl} class="toast align-items-center text-bg-primary border-0"
      class:bg-success={$opc.color === "bg-success"}
      class:bg-danger={$opc.color === "bg-danger"}
      class:bg-warning={$opc.color === "bg-warning"}
      role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {$opc.texto}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
</div>