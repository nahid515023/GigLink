const express = require('express');
const jobFeedRoute = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const jobFeed = require("../controllers/controller.jobFeed");
const postView = require("../controllers/controller.postView");
const postViewFreelancer = require("../controllers/controller.postViewFreelancer");

jobFeedRoute.get('/jobFeed', authenticateToken, jobFeed);
// jobFeedRoute.get('/jobFeed/:id', authenticateToken, postView);
jobFeedRoute.get('/jobFeed/:id', authenticateToken, postViewFreelancer);
jobFeedRoute.post('/jobFeed/submit_bid', authenticateToken,postView);

module.exports = jobFeedRoute;