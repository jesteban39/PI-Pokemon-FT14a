const { Grade } = require("../db.js");
const axios = require("axios");
const URL_TYPES = "https://pokeapi.co/api/v2/type/";

module.exports = function fillGrades() {
  
  return Grade.count().then((count) => {
    if (count > 0) return "preloaded";
    return axios.get(URL_TYPES).then((res) => {
      let types = res.data.results;
      return types.map((type) => {
        let id = parseInt(type.url.replace(/v2|\D/g, ""));
        return Grade.create({ id, name: type.name });
      });
    }).then(
      () => {return "successfull"},
      () => {return "¡uuuuuups!"}
    );
  });
}