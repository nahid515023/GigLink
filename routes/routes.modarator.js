const express = require('express');
const modaratorRoute = express.Router();
const {modarator,accpet,reject} = require("../controllers/controller.modarator");


modaratorRoute.get('/moderator',modarator);
modaratorRoute.get('/moderator/accept/:id',accpet);
modaratorRoute.get('/moderator/reject/:id',reject);

module.exports = modaratorRoute;