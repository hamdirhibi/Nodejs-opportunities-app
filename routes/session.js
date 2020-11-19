const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/session");
const checkAuth = require("../middleware/checkAuth");




router.post("/", checkAuth , sessionController.addSession);
router.get("/", checkAuth ,sessionController.getSessions);
router.delete("/:sessionId", checkAuth ,  sessionController.deleteSesion);
router.put("/:sessionId", checkAuth ,sessionController.updateSessionCover);
router.put("/:sessionId", checkAuth ,sessionController.updateSessionDate);
router.put("/:sessionId", checkAuth ,sessionController.updateSessionduration);



module.exports = router ; 
