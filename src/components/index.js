import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, handleCardLike } from "./card.js";
import { openModal, closeModal, handleClickOnOverlay } from "./modal.js";

const page = document.querySelector(".page");
const cardsList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closePopupButtons = document.querySelectorAll(".popup__close");

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editInfoForm = document.querySelector(".popup_type_edit form");
const addCardForm = document.querySelector(".popup_type_new-card form");
const nameInput = editInfoForm.querySelector(".popup__input_type_name");
const descriptionInput = editInfoForm.querySelector(".popup__input_type_description");

const newCardName = addCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = addCardForm.querySelector(".popup__input_type_url");

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

page.addEventListener("click", handleClickOnOverlay);
closePopupButtons.forEach((button) => button.addEventListener("click", () => closeModal(button.parentElement.parentElement)));
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

function addCard(card) {
  const cardElement = createCard(card, removeCard, handleCardLike, enlargeCardImage);
  cardsList.prepend(cardElement);
}

function handleEditInfoSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value,
  };
  addCard(newCard);
  closeModal(newCardPopup);
  addCardForm.reset();
}

function enlargeCardImage(event) {
  const clickedImage = event.target;
  openModal(imagePopup);
  popupImage.src = clickedImage.src;
  popupImage.alt = clickedImage.alt;
  popupCaption.textContent = clickedImage.alt;
}

editInfoForm.addEventListener("submit", handleEditInfoSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((card) => addCard(card));
