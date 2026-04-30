# Deploy a Web App on Cloud - AWS(Cloud Deployed)

A simple, elegant, and fully responsive expense tracking web application built with Node.js (Express) backend and vanilla JavaScript frontend, deployed on cloud using AWS EC2.

---

## 🌐 Live Application

🔗 **Production URL**: https://cloudmasters.duckdns.org/

---

## 📌 Project Objective

To design, develop, and deploy a full-stack web application on a cloud platform, ensuring real-time API communication, mobile responsiveness, and public accessibility.

---

## ☁️ Cloud Deployment

- **Cloud Platform**: Amazon Web Services (AWS EC2 - Ubuntu Server)
- **Domain Provider**: DuckDNS (Dynamic DNS)
- **Domain Name**: https://cloudmasters.duckdns.org/
- **Backend Runtime**: Node.js (Express.js)
- **Process Manager**: PM2 (for uptime & monitoring)

---

## 🌍 Deployment Architecture

```
User (Browser)
      ↓
DuckDNS Domain (cloudmasters.duckdns.org)
      ↓
AWS EC2 Server (Public IP)
      ↓
Node.js Express Application
      ↓
transactions.json (Data Storage)
```

---

## ✨ Features

- Dashboard displaying total balance, income, and expenses
- Add income and expense transactions
- Delete individual transactions
- Reset all transactions with confirmation
- Real-time UI updates
- Persistent storage using JSON file
- REST API integration (Frontend ↔ Backend)
- Fully mobile responsive design
- Cloud hosted and publicly accessible

---

## 📁 Project Structure

```
cloud/
├── app.js
├── package.json
├── transactions.json
├── README.md
└── public/
    └── index.html
```

---

## 🔌 API Documentation (Production)

### Base URL

```
https://cloudmasters.duckdns.org/api/transactions
```

---

### 1. GET All Transactions

```
GET /api/transactions
```

**Response:**

```json
[
  { "id": 1710001001, "text": "Salary", "amount": 4850 },
  { "id": 1710001002, "text": "Groceries", "amount": -245 }
]
```

---

### 2. POST Add Transaction

```
POST /api/transactions
```

**Request Body:**

```json
{
  "text": "Grocery shopping",
  "amount": 50
}
```

---

### 3. DELETE Single Transaction

```
DELETE /api/transactions/:id
```

---

### 4. DELETE All Transactions

```
DELETE /api/transactions
```

⚠️ This will permanently delete all data.

---

## 🔗 Frontend API Integration

The frontend communicates with backend using Fetch API:

```js
fetch("https://cloudmasters.duckdns.org/api/transactions")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

✔ Demonstrates real-world client-server communication

---

## 📱 Mobile Responsiveness

- Built using CSS Flexbox and media queries
- Fully responsive across:
  - Mobile devices 📱
  - Tablets 📲
  - Desktop 💻

- Adaptive layout and touch-friendly UI

---

## ⚙️ Deployment Steps (AWS EC2)

### 1. Launch EC2 Instance

- Ubuntu Server
- Open ports: 22, 80, 443, 3000

### 2. Connect via SSH

```bash
ssh -i key.pem ubuntu@your-ip
```

### 3. Install Dependencies

```bash
sudo apt update
sudo apt install nodejs npm git -y
```

### 4. Clone Repository

```bash
git clone https://github.com/surendranr-3/cloud.git
cd cloud
npm install
```

### 5. Run Application

```bash
node app.js
```

### 6. Use PM2 (Recommended)

```bash
npm install -g pm2
pm2 start app.js
pm2 save
```

---

## 🌐 Domain Configuration (DuckDNS)

- Created free subdomain using DuckDNS
- Mapped domain to AWS EC2 public IP
- Enabled public access via browser

---

## 📊 Monitoring & Performance

- Managed using PM2
- Logs monitored via:

```bash
pm2 logs
```

---

## 🧠 Code Documentation

- Backend code includes inline comments
- API routes are clearly structured and documented
- Frontend scripts are readable and modular
- Clean and maintainable codebase

---

## 🛠️ Technologies Used

- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript
- Cloud: AWS EC2
- Domain: DuckDNS
- Version Control: Git & GitHub

---

## 🐛 Troubleshooting

| Issue               | Solution                      |
| ------------------- | ----------------------------- |
| Website not loading | Check EC2 security group      |
| API not responding  | Ensure Node server is running |
| Domain not working  | Verify DuckDNS IP mapping     |
| Server crash        | Restart using PM2             |

---

## 👨‍💻 Author

Surendran

---

## 🚀 Final Submission

🔗 GitHub Repository:
https://github.com/surendranr-3/cloud

🔗 Live Application:
https://cloudmasters.duckdns.org/

---

## 🏁 Conclusion

This project demonstrates a complete cloud deployment workflow including application development, API integration, domain configuration, and real-time accessibility using AWS EC2.

---
