# SimpleCargo App FE

Logging and authorization should be added.
Add css

# SimpleCargo App FE

The SimpleCargo App project is a frontend layer of a web application for managing drivers and cargoes.

### Technologies used to create the application:

`TypeScript` `React.js` `react-auth-kit` `react-router-v6` `jwt` `mysql2`

Link to the backend API: [DanielSzczucki/DriverAvisationBe (github.com)](https://github.com/DanielSzczucki/DriverAvisationBe)

### Proposed usage map:

1. Register your application user: key > user registration.

2. Add your load and remember the reference number: Header > Load

3. Add your driver. You can do this as an application user or log out and add it through the driver registration form. Provide a valid phone number in the format 0048000000000.

4. The application will assign the driver to the load.

5. Log in to the application, find your driver on the driver list, assign them to the dock, and confirm. Inform the driver to come to the chosen ramp.

6. Delete your driver.

## Features

The application consists of several modules that communicate with the API:

### Administrator registration module

**components > AddAmin**
Simple registration of the administrator in the database, name, email, password. The password is processed by the bcrypt module, and only the password hash is stored in the database.

### Authentication module

**components > AminLogin**
Authentication on the frontend is done using the `react-auth-kit` library. The library restricts access to selected modules.

### Login module

**components > AminLogin**
Logging in is done by sending login data to the backend and comparing the hash using bcrypt.

### Driver registration module

**components > AddDriver**
Driver registration form. The driver can only register if they have a valid reference number, which matches the reference number of the load in the database. No validation with existing drivers.

### Driver Registration Module

**components > AddDriver**
Driver registration form. The driver can only register if they have a valid reference number that matches the reference number of the load in the database. No validation with existing drivers.

### Load Registration Module

**components > AddLoad**
Load registration form. No validation with existing loads.

### Driver List Display Module

**components > Driver**
After logging in, the user is automatically redirected to a table. The table displays selected driver data and allows the user to delete a driver from the database after confirming the window.confirm message. Clicking on the driver's name redirects to the data editing form.

### Load List Display Module

**components > Load**
The table displays a list of loads. Clicking on the reference number redirects to the load data editing form. It allows the user to delete a load.

### Driver Notification Module

**components > SmsDockNotification**
The application allows the user to notify a driver of the need to pick up or drop off a load at a specific ramp, done through SMS communication (fe > be api > smsAPI). The user must assign a ramp to the driver, then confirm with the green button.

### Data Editing and Display Modules

**components > views > SingleDriverView**

**components > views > SingleLoadView **

The application stores and allows the user to edit driver and load data such as: sender, recipient, driver, carrier, quantity, weight, type, reference number, tractor and trailer registration numbers.

### Confirmation and Error Information

Modules After adding a user, driver, or load, the application displays confirmation information using an external popup component or an internal fragment of the component. The information uses data returned from the backend. In case of serious errors, the application uses the ErrorView component.

# PL

# SimpleCargo App FE

Projekt SimpleCargo App to frontendowa warstwa aplikacji internetowej służącej do zarządzania kierowcami i ładunkami.

### Wykorzystane technologie:

`TypeScript` `React.js` `react-auth-kit` `react-router-v6` `jwt` `mysql2`

Link do backendowego API: [DanielSzczucki/DriverAvisationBe (github.com)](https://github.com/DanielSzczucki/DriverAvisationBe)

### Proponowana mapa użytkowania:

1. Zarejestruj swojego użytkownika aplikacji: kluczyk > rejestracja użytkownika.

2. Dodaj swój ładunek i zapamiętaj numer referencyjny: nagłówek > ładunek

3. Dodaj swojego kierowcę. Możesz to zrobić jako użytkownik aplikacji lub wylogować się i dodać kierowcę za pomocą formularza rejestracji. Podaj poprawny numer telefonu w formacie 0048000000000.

4. Aplikacja przypisze kierowcę do ładunku.

5. Zaloguj się do aplikacji, na liście kierowców znajdź swojego kierowcę, przypisz mu doczek i zatwierdź. Powiadom kierowcę, aby podjechał pod wybraną rampę.

6. Usuń swojego kierowcę.

## Funkcjonalności

Aplikacja składa się z kilku modułów komunikujących się z API:

### Moduł rejestracji administratora

**components > AddAdmin** Prosta rejestracja administratora w bazie danych: nazwa, email, hasło. Hasło jest przetwarzane przez moduł bcrypt, a w bazie danych zapisywany jest hash hasła.

### Moduł autentykacji

**components > AdminLogin** Autentykacja na frontendzie odbywa się za pomocą biblioteki `react-auth-kit`. Biblioteka ogranicza dostęp do wybranych modułów.

### Moduł logowania

**components > AdminLogin** Logowanie odbywa się poprzez przesłanie danych logowania do backendu, gdzie porównywany jest hash hasła za pomocą bcrypt.

### Moduł rejestracji kierowcy

**components > AddDriver** Formularz rejestracji kierowcy. Kierowca zostanie zarejestrowany tylko wtedy, gdy będzie posiadał poprawny numer referencyjny, który pokrywa się z numerem referencyjnym ładunku w bazie danych. Brak walidacji pod kątem istniejących kierowców.

### Moduł rejestracji ładunku

**components > AddLoad** Formularz rejestracji ładunku. Brak walidacji pod kątem istniejących ładunków.

### Moduł wyświetlania listy kierowców

**components > Driver**
Po zalogowaniu następuje automatyczne przekierowanie do tabeli. Tabela wyświetla wybrane dane kierowców i umożliwia usunięcie kierowcy z bazy danych po potwierdzeniu okna `window.confirm`. Po kliknięciu w nazwę kierowcy następuje przekierowanie do formularza edycji danych.

### Moduł wyświetlania listy ładunków

**components > Load**
Tabela wyświetla listę ładunków. Po kliknięciu w numer referencyjny następuje przekierowanie do formularza edycji danych ładunku. Umożliwia usunięcie ładunku.

### Moduł informowania kierowcy

**components > SmsDockNotification**
Aplikacja umożliwia poinformowanie kierowcy o konieczności podstawienia się do załadunku/rozładunku pod konkretną rampę, realizowane za pomocą komunikacji SMS (`fe > be api > smsAPI`). Należy przypisać rampę do kierowcy, następnie zatwierdzić zielonym przyciskiem.

### Moduły edycji i wyświetlania danych

**components > views > SingleDriverView** **components > views > SingleLoadView** Aplikacja przechowuje i umożliwia edycję danych ładunku i kierowcy, takie jak: nadawca, odbiorca, kierowca, przewoźnik, ilość, waga, rodzaj, numer referencyjny, numer rejestracyjny ciągnika i naczepy.

### Moduły potwierdzeń i informacji o błędach

Aplikacja po dodaniu użytkownika, kierowcy lub ładunku wyświetla informacje z potwierdzeniem dodania za pomocą zewnętrznego komponentu `popup` lub wewnętrznego fragmentu komponentu. Informacje wykorzystują dane zwracane z backendu. W przypadku wystąpienia poważnych błędów aplikacja wykorzystuje komponent `ErrorView`.
