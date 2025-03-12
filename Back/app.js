const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const stationRouter=require("./routes/stations")
const trajetRouter=require("./routes/trajets")

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware pour logger les requêtes
app.use(logger('dev'));

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware pour les cookies (si nécessaire)
app.use(cookieParser());

// Charger les routes sous le préfixe `/api`
app.use('/api', stationRouter);
app.use('/api', trajetRouter);



// Gérer les erreurs 404 (route non trouvée)
app.use((req, res, next) => {
  next(createError(404, `Page non trouvée: ${req.originalUrl}`)); // Ajouter l'URL de la requête pour faciliter le débogage
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  // Définir les détails de l'erreur
  const status = err.status || 500;
  const response = {
    status,
    message: err.message || 'Erreur interne du serveur',
    ...(req.app.get('env') === 'development' && { stack: err.stack }), // Afficher la stack trace en développement uniquement
  };

  // Envoyer une réponse JSON
  res.status(status).json(response);
});

module.exports = app;
