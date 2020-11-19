const express = require("express");
const router = express.Router();
const applicationControlller = require("../controllers/application");
const checkAuth = require("../middleware/checkAuth");

let upload = require('../config/multer.config.js');



router.post("/", checkAuth, upload.any() , applicationControlller.newApplication);
router.get("/user/:userId", checkAuth ,  applicationControlller.getApplicationByUser);
router.get("/opportunity/:opportunityId", checkAuth ,  applicationControlller.getApplicationByOpportunity);
router.delete("/:applicationId", checkAuth ,  applicationControlller.deleteApplication);
router.put("/opportunity/:opportunityId", checkAuth ,  applicationControlller.updateApplication);


module.exports = router ; 
    