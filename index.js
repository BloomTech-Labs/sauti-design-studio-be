require("dotenv").config();
const server = require("./api/server");
const passport = require("./config/passport-setup");

const port = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.send("WE ARE LIVE");
});

server.listen(port, () => {
  console.log(`Server is live at ${port}`);
});
