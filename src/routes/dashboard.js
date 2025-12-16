const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  const { month } = req.query;

  db.get(
    `
    SELECT 
      COUNT(DISTINCT ngo_id) as ngos,
      SUM(people_helped) as people,
      SUM(events_conducted) as events,
      SUM(funds_utilized) as funds
    FROM reports
    WHERE month = ?
    `,
    [month],
    (err, row) => {
      res.json(row);
    }
  );
});

module.exports = router;
