
## Introduzione
GuestMap è un applicazione web che permette di visualizzare la mappa con messaggi e permette di aggiungere nuovi messaggi solo se autenticati.

## Funzionalità
La guestMap permette di : 
- Visualizzare la mappa
- Visualizzare tutti i messaggi
- Visualizzare solo i miei messaggi
- Aggiungere un messaggio
- Registrarsi
- Fare il login

## Struttura
#### Backend
L'applicazione presente due backend, uno per gestire l'autenticazione e uno per gestire il database dei messaggi. Entrambi sono stati sviluppati basandosi su [Node.js](https://nodejs.org/it/ "Node.js") ed utilizza diversi framework tra cui: [Express.js](https://expressjs.com/ "Express.js"), [LowDB](https://github.com/typicode/lowdb "LowDB"), [Bcryptjs](https://www.npmjs.com/package/bcryptjs "Bcryptjs"), [Json web token](https://www.npmjs.com/package/jsonwebtoken "Json web token")

#### Frontend
Il frontend è stato realizzato basandosi sul framework React, che utilizza a sua volta diversi framework tra cui: [React-Boostrap](https://react-bootstrap.github.io/ "React-Boostrap"), [React-Leaflet](https://react-leaflet.js.org/ "React-Leaflet"),[React-geolocated](https://www.npmjs.com/package/react-geolocated "react-geolocated") , [React-router-dom](https://reacttraining.com/react-router/web/guides/quick-start "React-router-dom")
