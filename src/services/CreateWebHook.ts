
import fetch from "node-fetch";
const config = require("../../config.json");

fetch(`https://api.trello.com/1/webhooks/?token=${config.TRELLO_TOKEN}&key=${config.TRELLO_KEY}&callbackURL=${config.APP_URL}&idModel=601092520f8b9c2e52130299`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));