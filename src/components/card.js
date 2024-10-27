export function createCard(card, removeCard, likeCard, enlargeCard) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);
  const cardElement = cardTemplate.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);

  cardElement.querySelector(".card__like-button").addEventListener("click", likeCard);
  cardImage.addEventListener("click", enlargeCard);
  return cardElement;
}
export function removeCard(event) {
  const card = event.target.parentElement;
  card.remove();
}

export function handleCardLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}
