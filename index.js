const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// zamockowane sesje zalogowanych użytkowników

const USER_SESSIONS = [
  { login: "admin", token: "1234", role: "admin" },
  { login: "user", token: "4321", role: "user" },
];

const app = express();

app.use(bodyParser.json());
app.use(cors());

// możesz zrobić 3 funkcje - getUserAuth, getChefAuth i getAdminAuth
// albo po prostu jedną i przekazywać parametr, kogo chcesz sprawdzić do next()

const getAuth = (userRole) => (req, res, next) => {
  try {
    //   to idzie w requeście
    const { login, token } = req.body;

    // tu wyciągamy użytkownika z sesji
    const session = USER_SESSIONS.find((session) => session.login === login);

    // to powinno być wyciągane z bazy danych, żeby nikt w requeście nie podesłał że jest adminem
    const { role } = USER_SESSIONS.find((user) => user.login === login);

    // sprawdzamy, czy token z sesji jest taki sam jak nadesłany przez użytkownika + sprawdzamy, czy użytkownik nie jest adminem.
    // admin wchodzi wszędzie :)

    if (
      (token === session.token && role === userRole) ||
      (token === session.token && role === "admin")
    ) {
      // jak jest git, to puszczamy dalej
      next();
    } else {
      // jak nie, to rzucamy forbiddena i baj baj
      res.status(403).send("Nie masz dostępu do tej strony!");
    }
  } catch (err) {
    //   jak coś innego się wykrzaczy, to łapiemy 500'tką
    res.status(500).send("Wystąpił jakiś błąd.");
  }
};

app.get("/user-page", getAuth("user"), async (req, res) => {
  res.send("Witaj na zabezpieczonym roucie dla użytkowników!");
});

app.get("/admin-page", getAuth("admin"), async (req, res) => {
  res.send(
    "Witaj na najbardziej zabezpieczonym roucie świata, administratorze!"
  );
});

app.listen(3001, () => console.log("app listening at: http://localhost:3001"));
