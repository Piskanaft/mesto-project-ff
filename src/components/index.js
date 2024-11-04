import "../pages/index.css";
import { createCard, handleCardLike, deleteCard } from "./card.js";
import { openModal, closeModal, handleClickOnOverlay } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import { getProfileInfo, getInitialCards, editProfileInfo, uploadNewCard, uploadNewAvatar } from "./api.js";
import { renderLoading } from "./utils.js";

const page = document.querySelector(".page");
const cardsList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closePopupButtons = document.querySelectorAll(".popup__close");

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const newAvatarPopup = document.querySelector(".popup_type_new-avatar");
const confirmRemovalPopup = document.querySelector(".popup_type_confirm");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const editInfoForm = document.querySelector(".popup_type_edit form");
const addCardForm = document.querySelector(".popup_type_new-card form");
const newAvatarForm = document.querySelector(".popup_type_new-avatar form");
const confirmRemovalForm = document.querySelector(".popup_type_confirm form");
const nameInput = editInfoForm.querySelector(".popup__input_type_name");
const descriptionInput = editInfoForm.querySelector(".popup__input_type_description");

const newCardName = addCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = addCardForm.querySelector(".popup__input_type_url");
const newAvatarLink = newAvatarForm.querySelector(".popup__input_type_avatar-url");

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

let currentUserId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

page.addEventListener("click", handleClickOnOverlay);
closePopupButtons.forEach((button) => button.addEventListener("click", () => closeModal(button.parentElement.parentElement)));
confirmRemovalPopup.querySelector(".popup__close").addEventListener("click", () => {
  document.querySelector(".card[to-delete]").removeAttribute("to-delete");
  confirmRemovalForm.removeEventListener("submit", deleteCard);
});
profileImage.addEventListener("click", () => {
  clearValidation(newAvatarPopup, validationConfig);
  openModal(newAvatarPopup);
});
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editPopup, validationConfig);
  openModal(editPopup);
});

addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

function addCard(card) {
  const cardElement = createCard(card, handleCardLike, enlargeCardImage, currentUserId, handleComfirmationPopup);
  cardsList.prepend(cardElement);
}

function handleEditInfoSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, true);
  editProfileInfo(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      profileImage.style = `background-image: url(${res.avatar})`;
      renderLoading(evt, false);
      closeModal(editPopup);
    })
    .catch((err) => console.log(err));
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value,
  };
  renderLoading(evt, true);
  uploadNewCard(newCard)
    .then((res) => {
      addCard(res);
      renderLoading(evt, false);
      closeModal(newCardPopup);
      addCardForm.reset();
      clearValidation(newCardPopup, validationConfig);
    })
    .catch((err) => console.log(err));
}

function enlargeCardImage(event) {
  const clickedImage = event.target;
  openModal(imagePopup);
  popupImage.src = clickedImage.src;
  popupImage.alt = clickedImage.alt;
  popupCaption.textContent = clickedImage.alt;
}

function updateAvatar(evt) {
  renderLoading(evt, true);
  uploadNewAvatar(newAvatarLink.value)
    .then(() => {
      renderLoading(evt, false);
      profileImage.style = `background-image: url(${newAvatarLink.value})`;
      closeModal(newAvatarPopup);
      newAvatarForm.reset();
    })
    .catch((err) => console.log(err));
}

function handleComfirmationPopup(card, id, deleteCard) {
  openModal(confirmRemovalPopup);
  card.setAttribute("to-delete", id);
  confirmRemovalForm.addEventListener("submit", deleteCard);
}

editInfoForm.addEventListener("submit", handleEditInfoSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
newAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateAvatar(evt);
});

enableValidation(validationConfig);
const profileInfo = getProfileInfo();
const initialCards = getInitialCards();

Promise.all([profileInfo, initialCards])
  .then(([profileInfo, cardList]) => {
    profileTitle.textContent = profileInfo.name;
    profileDescription.textContent = profileInfo.about;
    profileImage.style = `background-image: url(${profileInfo.avatar})`;
    currentUserId = profileInfo._id;
    for (let i = cardList.length - 1; i >= 0; i--) {
      addCard(cardList[i]);
    }
  })
  .catch((err) => console.log(err));
