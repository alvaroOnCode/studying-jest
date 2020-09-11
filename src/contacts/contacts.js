let contacts = [];

export default {
  get() {
    return [...contacts];
  },
  add(contact) {
    if (contact.hasOwnProperty("name") && contact.hasOwnProperty("email") && contact.hasOwnProperty("id")) {
      contacts.push(contact);
    } else {
      throw "⛔ Invalid format.";
    }
  },
  delete(contactId) {
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index > -1) {
      contacts.splice(index, 1);
    }
  },
  reset() {
    contacts = [];
  },
  getFromJSONPlaceholder() {
    const url = "https://jsonplaceholder.typicode.com/users";

    return new Promise((resolve, reject) => {
      // Check Wedding Id in local storage
      if (!localStorage.weddingId) {
        reject("Wedding ID in localStorage not found!");
      }

      // Request
      xhr({
        method: "GET",
        url,
        async: true,
        credentials: true,
        headers: {
          Accept: "application/json",
        },
      })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
