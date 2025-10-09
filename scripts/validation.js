const showInputError = (formEl, inputEl, errorMessage) => {
 const errorMessageID = inputEl.id + "-error";
 const errorMessageEl = document.querySelector ("#" + errorMessageID);
 errorMessageEl.textContent = errorMessage;
 inputEl.classList.add("modal__input_type_error");
}

const hideInputError = (formEl, inputEl) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageEl = document.querySelector ("#" + errorMessageID);
  errorMessageEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
}

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  }
  else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl) => {
  if (hasInvalidInput(inputList)) {
    disableButtonState(buttonEl);
    buttonEl.classList.add("modal__submit-btn_disabled");
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove("modal__submit-btn_disabled");
  }
};

const disableButtonState = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add("modal__submit-btn_disabled");
}


const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const submitButton = formEl.querySelector(".modal__submit-btn");

 toggleButtonState(inputList, submitButton);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
     toggleButtonState(inputList, submitButton);
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