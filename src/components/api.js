const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-25",
  headers: {
    authorization: "9e9348d7-ef27-49e2-a08b-82606f36e750",
    "Content-Type": "application/json",
  },
};

export function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. Couldn't load profile info`);
  });
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}. Couldn't load initial cards`);
  });
}

export function editProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. Couldn't edit profile info`);
  });
}

export function uploadNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. Couldn't add new card`);
  });
}

export function deleteCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. Couldn't delete card`);
  });
}

export function toggleCardLikeStatus(cardId, method) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: method,
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. Couldn't change like status`);
  });
}

export function uploadNewAvatar(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    }).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status} during avatar updating`);
    });
}
