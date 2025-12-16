const fs = require("fs");
const csv = require("csv-parser");
const db = require("../db");
const jobs = require("./jobStore");

function processCSV(jobId, filePath) {
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", () => {
      let processed = 0;

      jobs[jobId].total = rows.length;

      rows.forEach((row, index) => {
        setTimeout(() => {
          db.run(
            `
            INSERT OR IGNORE INTO reports 
            (ngo_id, month, people_helped, events_conducted, funds_utilized)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
              row.ngo_id,
              row.month,
              row.people_helped,
              row.events_conducted,
              row.funds_utilized,
            ]
          );

          processed++;
          jobs[jobId].processed = processed;

          if (processed === rows.length) {
            jobs[jobId].status = "completed";
          }
        }, index * 200);
      });
    });
}

module.exports = processCSV;
