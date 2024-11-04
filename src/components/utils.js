export function renderLoading(evt, isLoading) {
    let button = evt.target.querySelector(".popup__button");
    if (isLoading) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  }