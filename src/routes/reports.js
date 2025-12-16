const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const db = require("../db");
const processCSV = require("../jobs/csvProcessor");
const jobs = require("../jobs/jobStore");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", (req, res) => {
  const {
    ngoId,
    month,
    peopleHelped,
    eventsConducted,
    fundsUtilized,
  } = req.body;

  db.run(
    `
    INSERT OR IGNORE INTO reports 
    (ngo_id, month, people_helped, events_conducted, funds_utilized)
    VALUES (?, ?, ?, ?, ?)
    `,
    [ngoId, month, peopleHelped, eventsConducted, fundsUtilized],
    function () {
      res.json({ success: true });
    }
  );
});

router.post("/upload", upload.single("file"), (req, res) => {
  const jobId = uuidv4();

  jobs[jobId] = {
    status: "processing",
    processed: 0,
    total: 0,
  };

  processCSV(jobId, req.file.path);

  res.json({ jobId });
});

router.get("/job-status/:jobId", (req, res) => {
  const job = jobs[req.params.jobId];

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  res.json(job);
});

module.exports = router;
