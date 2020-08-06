# Movie API

### REST API for movies collected from Wikipedia found [here](https://github.com/jdorfman/Awesome-JSON-Datasets#movies).

---

All users must be logged in to access their list of favorites or make changes to their profile. Any unauthenticated request will not be completed.

Authentication is handled using jsonwebtoken. 

--- 

The raw json dataset is included in moviedata/data.js as a javascript array. You can use `npm run load --db <database>`  to create your own mongodb database with the json data. 
