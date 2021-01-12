# Express auth example

### O co chodzi?

Prosty mechanizm autoryzacyjny. Sprawdza, czy użytkownik jest zalogowany i czy jego token się zgadza oraz sprawdza rolę użytkownika, czy może się dostać do danej ścieżki.

### Co potrzebujesz?

- NodeJS i NPM

### Jak odpalić?

- standardowo

```bash
    npm install
```

- następnie

```
    npm start
```

### Dostępne adresy

- /user-page
- /admin-page

### Jak przetestować?

Odpal coś do puszczenia requesta HTTP, jak np. Postman. Następnie wpisz adres http://localhost:3001/admin-route i do body wrzuć

```json
{
  "login": "admin",
  "token": "1234"
}
```

Potem spróbuj na ten sam adres uderzyć z danymi użytkownika

```json
{
  "login": "user",
  "token": "4321"
}
```

A potem spróbuj jeszcze na adres użytkownika http://localhost:3001/user-route dobić się danymi admina i powinno Cię puścić :)

```json
{
  "login": "admin",
  "token": "1234"
}
```

A na sam koniec uderz na któryś z adresów jakimiś losowymi danymi, lub też ze złym tokenem/loginem.
