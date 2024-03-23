import main from "./script/main.js";
import "./styles/style.css";
import "./script/form-validation.js";
import "./script/components/app-bar.js";
import "./script/components/list-notes.js";
import "./script/components/section-show-notes.js";
import "./script/components/form-notes.js";
import "./script/components/loading-app.js";

try {
  let objNotesData = await main().getNote();
  const showNotes = document.querySelector("section-show-notes");
  const form = document.querySelector("form-notes");

  form.addEventListener("submit", addListNote);
  formatDate(objNotesData);
  render(objNotesData);

  function addListNote(event) {
    const { titleNote } = event.detail;
    const { bodyNote } = event.detail;

    const resultObjNotes = objectNotes(titleNote, bodyNote);
    showNotes.dispatchEvent(
      new CustomEvent("submit-notes", {
        detail: { resultObjNotes },
        bubbles: true,
      }),
    );
  }

  showNotes.addEventListener("render-submit-notes", async (event) => {
    try {
      const { resultObjNotes } = event.detail;
      objNotesData = await main().addNote(resultObjNotes);
      formatDate(objNotesData);
      render(objNotesData);
    } catch (error) {
      console.log(error);
    }
  });

  function objectNotes(title, body) {
    return {
      title,
      body,
    };
  }

  function render(objNotesData) {
    showLoading("");
    showNotes.innerHTML = "";
    setTimeout(() => {
      for (const note of objNotesData) {
        const resultListNote = makeListNote(note);
        showNotes.append(resultListNote);
      }
      showLoading("none");
    }, 1000);
  }

  function formatDate(objNotesData) {
    for (const note of objNotesData) {
      note.createdAt = new Date(note.createdAt).toLocaleDateString();
    }
  }

  function makeListNote(note) {
    const listNotes = document.createElement("list-notes");
    listNotes.note = note;
    listNotes.addEventListener("delete", (event) => {
      const { id } = event.detail;
      removeNote(id);
    });

    listNotes.addEventListener("archive", (event) => {
      const { id } = event.detail;
      archiveNote(id);
    });

    listNotes.addEventListener("unarchive", (event) => {
      const { id } = event.detail;
      unarchive(id);
    });

    return listNotes;
  }

  async function removeNote(id) {
    try {
      await main().deleteNote(id);
      showNotes.dispatchEvent(new CustomEvent("remove-notes"));
    } catch (error) {
      console.log(error);
    }
  }

  async function archiveNote(id) {
    try {
      objNotesData = await main().addArchiveNote(id);
      formatDate(objNotesData);
      render(objNotesData);
    } catch (error) {
      console.log(error);
    }
  }

  async function unarchive(id) {
    try {
      objNotesData = await main().unarchiveNote(id);
      formatDate(objNotesData);
      render(objNotesData);
    } catch (error) {
      console.log(error);
    }
  }

  function showLoading(display) {
    const loadingApp = document.querySelector("loading-app");
    loadingApp.style.display = display;
  }

  showNotes.addEventListener("archived", async () => {
    try {
      objNotesData = await main().getArchiveNote();
      formatDate(objNotesData);
      render(objNotesData);
    } catch (error) {
      console.log(error);
    }
  });

  showNotes.addEventListener("notes", async () => {
    try {
      objNotesData = await main().getNote();
      formatDate(objNotesData);
      render(objNotesData);
    } catch (error) {
      console.log(error);
    }
  });
} catch (error) {
  console.log(error);
}
