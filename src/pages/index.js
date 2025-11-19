// src/pages/index.js
import "./index.css";
import { enableValidation, settings, resetValidation } from "../scripts/validation.js";

import Api from "../utils/Api.js";
import Logo from '../images/Logo.svg';
import favicon from '../images/favicon.ico';
import Avatar from '../images/avatar.jpg';
import PencilIcon from '../images/Group2.svg';
import PlusIcon from '../images/Group26.svg';
import CloseIcon from '../images/close_icon.png';
import CloseWhite from '../images/close_btn_white.svg';
import { data } from "autoprefixer";


document.querySelector('.header__logo').src = Logo;
document.querySelector('.profile__avatar').src = Avatar;
document.querySelector('.profile__edit-icon').src = PencilIcon;
document.querySelector('.profile__add-icon').src = PlusIcon;


document.querySelectorAll('.modal__close-icon').forEach(icon => {
  icon.src = CloseIcon;
});

document.querySelectorAll('.modal__close-icon-white').forEach(icon => {
  icon.src = CloseWhite;
});
document.querySelector("link[rel='icon']").href = favicon;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "948defcd-0cfd-4e2c-b238-9e6b07d53c5a",
    "Content-Type": "application/json"
  }
});



api.getAppInfo()
.then(([userData, cardsData]) => {
profileNameEl.textContent = userData.name;
profileDescriptionEl.textContent = userData.about;
document.querySelector('.profile__avatar').src = userData.avatar;
   cardsData.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
})
.catch(console.error);

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");


const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostSubmitBtn = newPostForm.querySelector(".modal__submit-btn");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostCardImageInput = newPostModal.querySelector("#card-image-input");
const newPostCardDescriptionInput = newPostModal.querySelector(
  "#card-description-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");


const previewPostModal = document.querySelector("#preview-post-modal");
const previewPostCloseBtn = previewPostModal.querySelector(".modal__close-btn_type_preview");
const previewPostImageEl = previewPostModal.querySelector(".modal__image");
const previewPostCaptionEl = previewPostModal.querySelector(".modal__caption");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const deleteModal = document.querySelector("#delete-modal");

function handleDeleteCard(cardElement) {
  deleteModal.cardElement = cardElement
  openModal(deleteModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

   const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active")
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement);
  });


  cardImageEl.addEventListener("click", () => {
    previewPostImageEl.src = data.link;
    previewPostImageEl.alt = data.name;
    previewPostCaptionEl.textContent = data.name;
    openModal(previewPostModal);
  });



  return cardElement;
}

previewPostCloseBtn.addEventListener("click", () => {
  closeModal(previewPostModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  function escapeClose(evt) {
    if (evt.key === "Escape") {
      closeModal(modal);

    }
}
  function overlayClose(evt) {
    if (evt.target.classList.contains("modal_is-opened")) {
      closeModal(modal);

    }
  }

  modal._escapeClose = escapeClose;
  modal._overlayClose = overlayClose;

  document.addEventListener("keydown", escapeClose);
  modal.addEventListener("mousedown", overlayClose);
}


function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", modal._escapeClose);
  modal.removeEventListener("mousedown", modal._overlayClose);
  delete modal._escapeClose;
  delete modal._overlayClose;
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], settings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
}
);
avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
}
);



function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api.editUserAvatar({
    avatar: avatarInput.value
  })
  .then((userData) => {
    document.querySelector('.profile__avatar').src = userData.avatar;
    closeModal(avatarModal);
  })
  .catch(console.error);
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  api.editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value
  })
  .then((userData) => {
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    closeModal(editProfileModal);
  })
  .catch(console.error);
}


editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostCardDescriptionInput.value,
    link: newPostCardImageInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  disableButtonState(newPostSubmitBtn, settings);
  newPostForm.reset();
  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

// Enable form validation
enableValidation(settings);

//updating Branch testing
//checking endpoint changes