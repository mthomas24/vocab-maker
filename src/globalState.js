export let state = {
  modalCount: 0
}

export function addModal() {
  state.modalCount++;
  document.body.classList.add("overflow-hidden");
}

export function removeModal() {
  if (state.modalCount > 0)
    state.modalCount--;
  
  if (state.modalCount === 0)
    document.body.classList.remove("overflow-hidden");
}
