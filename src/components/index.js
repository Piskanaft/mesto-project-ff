import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, cardLikeHandle } from "./card.js";
import { openModal, closeModal, overlayClick } from "./modal.js";

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

page.addEventListener("click", overlayClick);
closePopupButtons.forEach((button) => button.addEventListener("click", () => closeModal(button.parentElement.parentElement)));
profileEditButton.addEventListener("click", () => {
  openModal(editPopup);
});
profileEditButton.addEventListener("click", insertProfileInfo);
addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

function addCard(card) {
  const cardElement = createCard(card, removeCard, cardLikeHandle, enlargeCardImage);
  cardsList.prepend(cardElement);
}

function insertProfileInfo() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
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
