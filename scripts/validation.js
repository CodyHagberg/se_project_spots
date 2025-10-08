const showInputError = (formEl, inputEl, errorMessage) => {
 const errorMessageID = inputEl.id + "-error";
 const errorMessageEl = document.querySelector ("#" + errorMessageID);
 errorMessageEl.textContent = errorMessage;
}

const hideInputError = (formEl, inputEl) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageEl = document.querySelector ("#" + errorMessageID);
  errorMessageEl.textContent = "";
}

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  }
  else {
    hideInputError(formEl, inputEl);
  }
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const submitButton = formEl.querySelector(".modal__submit-btn");

 // toggleButtonState(inputList, submitButton);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
     // toggleButtonState(inputList, submitButton);
    });
  });
};


const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
});
};
enableValidation();