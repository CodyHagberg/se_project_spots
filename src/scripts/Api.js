// utils/Api.js

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
   return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "948defcd-0cfd-4e2c-b238-9e6b07d53c5a"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

export default Api;