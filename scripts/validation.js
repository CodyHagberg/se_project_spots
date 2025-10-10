const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
 const errorMessageID = inputEl.id + "-error";
 const errorMessageEl = document.querySelector("#" + errorMessageID);
 errorMessageEl.textContent = errorMessage;
 inputEl.classList.add(config.inputErrorClass);
}

const hideInputError = (formEl, inputEl, config) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageEl = document.querySelector ("#" + errorMessageID);
  errorMessageEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  }
  else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButtonState(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const disableButtonState = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
}



const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const submitButton = formEl.querySelector(config.submitButtonSelector);

 toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
     toggleButtonState(inputList, submitButton, config);
    });
  });
};


const enableValidation = (config) => {
  const formList =Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
});
};
enableValidation(settings);

