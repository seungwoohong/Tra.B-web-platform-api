const express = require("express");
const router = express.Router();
const ctrl = require("./diary.controller");

// Route Setting
router.get("/", ctrl.diarys);
router.get("/:diarycode", ctrl.select);
router.post("/", ctrl.create);
router.put("/:diarycode", ctrl.update);
router.delete("/:diarycode", ctrl.destory);

module.exports = router;
