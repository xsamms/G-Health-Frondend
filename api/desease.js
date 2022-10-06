import axios from "axios";

const options = {
  method: "GET",
  url: "https://disease-drug-matching.p.rapidapi.com/get_disease/bethanechol",
  headers: {
    "X-RapidAPI-Host": "disease-drug-matching.p.rapidapi.com",
    "X-RapidAPI-Key": "5d9200c22cmsh5a700f210575912p1d4843jsnbf92070fcfa3",
  },
};

// const desease = axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

export default desease;
