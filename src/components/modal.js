export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.querySelector(".page").addEventListener("keyup", keyPressed);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export function overlayClick(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

function keyPressed(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
  document.querySelector(".page").removeEventListener("keyup", keyPressed);
}
