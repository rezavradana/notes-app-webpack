function main() {
  const BASE_URL = "https://notes-api.dicoding.dev/v2";

  const getNote = async () => {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        return responseJson.data;
      }
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const addNote = async (note) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };
      const response = await fetch(`${BASE_URL}/notes`, options);
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      return await getNote();
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const options = {
        method: "DELETE",
      };

      const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const getArchiveNote = async () => {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        return responseJson.data;
      }
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const addArchiveNote = async (noteId) => {
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        `${BASE_URL}/notes/${noteId}/archive`,
        options,
      );
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      return await getNote();
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const unarchiveNote = async (noteId) => {
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        `${BASE_URL}/notes/${noteId}/unarchive`,
        options,
      );
      const responseJson = await response.json();
      showResponseMessage(responseJson.message);
      return await getArchiveNote();
    } catch (error) {
      showResponseMessage(error);
    }
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  return {
    getNote,
    addNote,
    deleteNote,
    getArchiveNote,
    addArchiveNote,
    unarchiveNote,
  };
}

export default main;
