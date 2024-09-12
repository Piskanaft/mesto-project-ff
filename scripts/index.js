// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardsList = document.querySelector(".places__list");
function createCard(card, removeCard) {
  const cardTemplate = document.querySelector("#card-template").content.cloneNode(true);
  const cardElement = cardTemplate.querySelector(".card");
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);
  return cardElement;
}

function removeCard(event) {
  const card = event.target.parentElement;
  card.remove();
}

function addCard(card) {
  const cardElement = createCard(card, removeCard);
  cardsList.append(cardElement);
}

initialCards.forEach(card => addCard(card));
