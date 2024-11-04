import { toggleCardLikeStatus, deleteCardOnServer } from "./api";
import { closeModal } from "./modal";
export function createCard(card, likeCard, enlargeCard, ownerId, handleComfirmationPopup) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);
  const cardElement = cardTemplate.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardLikeCounter.textContent = card.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (ownerId !== card.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      handleComfirmationPopup(cardElement, card._id, deleteCard);
    });
  }

  cardElement.querySelector(".card__like-button").addEventListener("click", (evt) => likeCard(evt, card._id));

  if (
    card.likes.some((like) => {
      return like._id === ownerId;
    })
  ) {
    cardElement.querySelector(".card__like-button").classList.add("card__like-button_is-active");
  }
  cardImage.addEventListener("click", enlargeCard);

  return cardElement;
}

export function handleCardLike(evt, id) {
  let method;
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    method = "PUT";
  } else {
    method = "DELETE";
  }
  toggleCardLikeStatus(id, method)
    .then((card) => {
      evt.target.classList.toggle("card__like-button_is-active");
      evt.target.closest(".card").querySelector(".card__like-counter").textContent = card.likes.length;
    })
    .catch((err) => console.log(err));
}

export function deleteCard(evt) {
  evt.preventDefault();
  const card = document.querySelector(".card[to-delete]");
  const id = card.getAttribute("to-delete");
  deleteCardOnServer(id)
    .then(() => {
      card.remove();
      closeModal(evt.target.parentElement.parentElement);
    })
    .catch((err) => console.log(err));
}
