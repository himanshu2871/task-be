A full-stack web application that enables NGOs to submit monthly impact reports (individually or in bulk) and allows administrators to view aggregated insights via a dashboard.

Frontend: https://task-fe-pink.vercel.app/

Backend API: https://task-be-mgfr.onrender.com

Backend Tech Stack:

Node.js
Express.js
SQLite
Multer (file uploads)
csv-parser
Deployed on Render

Features:

1️⃣ Monthly Report Submission

NGOs can submit a single monthly report
Basic validation handled on frontend
Idempotency ensured on backend

2️⃣ Bulk Report Upload

Upload CSV containing multiple monthly reports
Backend processes CSV asynchronously
Frontend polls job status (Processed X of Y rows)
Partial failures handled gracefully

3️⃣ Admin Dashboard

View aggregated data for a selected month:
Total NGOs reporting
Total people helped
Total events conducted
Total funds utilized

Sample CSV Format:

ngo_id,month,people_helped,events_conducted,funds_utilized
NGO001,2024-01,120,3,50000
NGO002,2024-01,250,6,120000

How to start:

cd ngo-reporting-backend
npm install
npm start
