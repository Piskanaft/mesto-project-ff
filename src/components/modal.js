export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.querySelector(".page").addEventListener("keyup", handleKeyPress);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.querySelector(".page").removeEventListener("keyup", handleKeyPress);
}

export function handleClickOnOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

function handleKeyPress(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
