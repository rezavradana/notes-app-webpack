const validationNote = (event) => {
  const { form } = event.detail;
  const titleNoteInput = form.querySelector("#title");
  const bodyNoteInput = form.querySelector("#notes");

  titleNoteInput.addEventListener("blur", (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId =
      titleNoteInput.getAttribute("aria-describedby");

    const connectedValidationEl = connectedValidationId
      ? form.querySelector(`#${connectedValidationId}`)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });

  bodyNoteInput.addEventListener("blur", (event) => {
    const isValid = event.target.validity.valid;
    const errorMessage = event.target.validationMessage;

    const connectedValidationId =
      bodyNoteInput.getAttribute("aria-describedby");

    const connectedValidationEl = connectedValidationId
      ? form.querySelector(`#${connectedValidationId}`)
      : null;

    if (connectedValidationEl && errorMessage && !isValid) {
      connectedValidationEl.innerText = errorMessage;
    } else {
      connectedValidationEl.innerText = "";
    }
  });
};

const form = document.querySelector("form-notes");
form.addEventListener("validation", validationNote);
