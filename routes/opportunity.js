const express = require("express");
const router = express.Router();
const opportunityControlller = require("../controllers/opportunity");
const checkAuth = require("../middleware/checkAuth");




router.post("/", checkAuth, opportunityControlller.newOpportunity);
router.get("/company/:companyId", checkAuth ,  opportunityControlller.getOpportunitiesByCompany);
router.delete("/:opportunityId", checkAuth ,  opportunityControlller.deleteOpportunity);
router.put("/:opportunityId", checkAuth ,  opportunityControlller.updateOpportunity);



module.exports = router ; 
    