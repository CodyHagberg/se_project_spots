// src/pages/index.js
import "./index.css";
import { enableValidation, settings, resetValidation } from "../scripts/validation.js";


import Logo from '../images/Logo.svg';
import Avatar from '../images/avatar.jpg';
import PencilIcon from '../images/Group2.svg';
import PlusIcon from '../images/Group26.svg';
import CloseIcon from '../images/close_icon.png';
import CloseWhite from '../images/close_btn_white.svg';


document.querySelector('.header__logo').src = Logo;
document.querySelector('.profile__avatar').src = Avatar;
document.querySelector('.profile__edit-icon').src = PencilIcon;
document.querySelector('.profile__add-icon').src = PlusIcon;


document.querySelectorAll('.modal__close-icon')[0].src = CloseIcon;
document.querySelectorAll('.modal__close-icon-white')[0].src = CloseWhite;

const initialCards = [

  {
    name: "Golden Gate Bridge",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },

  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant tace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

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
   cardElement.remove();
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

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
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

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
// Enable form validation
enableValidation(settings);