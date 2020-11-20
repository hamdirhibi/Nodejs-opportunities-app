const express = require("express");
const router = express.Router();
const opportunityControlller = require("../controllers/opportunity");
const checkAuth = require("../middleware/checkAuth");




router.post("/", checkAuth, opportunityControlller.newOpportunity);
router.get("/company/:companyId", checkAuth ,  opportunityControlller.getOpportunitiesByCompany);
router.delete("/:opportunityId", checkAuth ,  opportunityControlller.deleteOpportunity);
router.put("/updateOne/:opportunityId", checkAuth ,  opportunityControlller.updateOpportunity);
router.put("/updateOpportunityCover/:opportunityId", checkAuth ,opportunityControlller.updateOpportunityCover);
router.put("/updateOpportunityDate/:opportunityId", checkAuth ,opportunityControlller.updateOpportunityDate);
router.put("/updateOpportunityDuration/:opportunityId", checkAuth ,opportunityControlller.updateOpportunityDuration);



module.exports = router ; 
    