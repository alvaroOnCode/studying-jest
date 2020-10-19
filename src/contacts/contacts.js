import { xmlhttprequest as xhr } from "../utils/xmlhttprequest";

let contacts = [];

export default {
  get() {
    return [...contacts];
  },

  add(contact) {
    const hasName = Object.prototype.hasOwnProperty.call(contact, "name");
    const hasEmail = Object.prototype.hasOwnProperty.call(contact, "email");
    const hasId = Object.prototype.hasOwnProperty.call(contact, "id");

    if (hasName && hasEmail && hasId) {
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

  getFromJSONPlaceholder(url) {
    return new Promise((resolve, reject) => {
      // Request
      xhr({
        method: "GET",
        url,
        async: true,
        headers: {
          Accept: "application/json",
        },
      })
        .then((data) => {
          resolve(data.length);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
