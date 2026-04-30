# FinanceFlow - Expense Tracker

A simple, elegant, and fully responsive expense tracking application built with Node.js/Express backend and vanilla JavaScript frontend.

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Mobile Responsiveness](#-mobile-responsiveness)
- [Technologies Used](#-technologies-used)
- [File Structure](#-file-structure)
- [Contributing](#-contributing)

---

## ✨ Features

- **Dashboard Overview**: View your total balance, income, and expenses at a glance
- **Add Transactions**: Easily add income or expense entries with descriptions and amounts
- **Transaction History**: Chronologically sorted list of all transactions (newest first)
- **Delete Transactions**: Remove individual transactions with a single click
- **Reset All**: Clear entire transaction history (with confirmation)
- **Real-time Calculations**: Balance updates instantly as you add/remove transactions
- **Persistent Storage**: All data saved to JSON file on the server
- **Mobile Friendly**: Fully responsive design works on phones, tablets, and desktops
- **CORS Enabled**: Frontend can run on different domain/port from backend
- **Input Validation**: Server-side validation for all transaction data

---

## 📁 Project Structure

```
Cloud Computing/
├── app.js                 # Express.js backend server
├── package.json           # Node.js dependencies and metadata
├── transactions.json      # Data storage (auto-created on first run)
├── README.md              # This file
└── public/
    └── index.html         # Frontend HTML/CSS/JavaScript
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Clone or extract the project**

   ```bash
   cd "Cloud Computing"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm start
   ```

   Or directly with Node:

   ```bash
   node app.js
   ```

4. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`
   - The app will load the frontend and be ready to use

5. **Check console output**
   ```
   🚀 Server running on http://localhost:3000
   📁 Data stored in /path/to/transactions.json
   ```

---

## 💡 Usage

### Adding a Transaction

1. **Enter Description**: Type what the transaction is for (e.g., "Grocery shopping", "Salary")
2. **Enter Amount**: Input the numeric amount (don't include $ symbol)
3. **Select Type**: Choose "Income" (adds to balance) or "Expense" (subtracts from balance)
4. **Click Add**: Transaction is immediately added and persisted to server

### Viewing Transactions

- **Balance Section**: Shows current balance (income - expenses)
- **Stats Cards**: Display total income (green) and total expenses (red)
- **Transaction List**: Shows all transactions in reverse chronological order (newest first)

### Deleting Transactions

- Click the **❌** button next to any transaction to remove it
- Balance and totals update immediately

### Resetting All Data

- Click **Reset All** button
- Confirm the deletion when prompted
- All transactions are permanently cleared

---

## 🔌 API Documentation

### Base URL

```
http://localhost:3000/api/transactions
```

### 1. GET /api/transactions

**Purpose**: Retrieve all transactions

**Request**:

```
GET /api/transactions
```

**Response** (200 OK):

```json
[
  { "id": 1710001001, "text": "Salary", "amount": 4850.0 },
  { "id": 1710001002, "text": "Groceries", "amount": -245.5 }
]
```

---

### 2. POST /api/transactions

**Purpose**: Create a new transaction

**Request**:

```
POST /api/transactions
Content-Type: application/json

{
  "text": "Grocery shopping",
  "amount": 50.25
}
```

**Request Parameters**:

- `text` (String, required): Transaction description
  - Must not be empty
  - Will be trimmed of whitespace
- `amount` (Number, required): Transaction amount
  - Positive number = Income
  - Negative number = Expense
  - Cannot be zero

**Response** (201 Created):

```json
{
  "id": 1710123456789,
  "text": "Grocery shopping",
  "amount": 50.25
}
```

**Error Responses**:

- **400 Bad Request** - Missing description
  ```json
  { "error": "Description required" }
  ```
- **400 Bad Request** - Invalid amount
  ```json
  { "error": "Valid amount required" }
  ```

**ID Generation Logic**:

- Format: `Date.now() + Math.floor(Math.random() * 10000)`
- Ensures chronologically sortable, unique IDs
- No database required

---

### 3. DELETE /api/transactions/:id

**Purpose**: Delete a specific transaction

**Request**:

```
DELETE /api/transactions/1710001001
```

**Response** (200 OK):

```json
{ "success": true }
```

**Error Response** (404 Not Found):

```json
{ "error": "Transaction not found" }
```

---

### 4. DELETE /api/transactions

**Purpose**: Delete all transactions (reset data)

**Request**:

```
DELETE /api/transactions
```

**Response** (200 OK):

```json
{ "success": true, "message": "All transactions cleared" }
```

⚠️ **Warning**: This operation is irreversible!

---

## 📱 Mobile Responsiveness

The application is fully responsive with optimizations for all screen sizes:

### Responsive Features

- **Flexible Layout**: Uses CSS Flexbox for adaptive layouts
- **Mobile-First Design**: Optimized for small screens with scaling for larger devices
- **Touch-Friendly**: Large buttons and input fields for mobile use
- **Viewport Meta Tag**: Proper scaling on mobile devices
- **Responsive Padding**: Adjusts spacing for different screen sizes
- **Scrollable Lists**: Transaction list scrolls on mobile without breaking layout
- **Readable Typography**: Font sizes scale appropriately
- **Color Contrast**: High contrast for readability on all devices

### Tested Breakpoints

- **Mobile**: 320px - 480px (phones in portrait)
- **Tablet**: 481px - 768px (small tablets)
- **Small Desktop**: 769px - 1024px (tablets in landscape, small laptops)
- **Desktop**: 1025px+ (standard monitors)

### CSS Media Queries

The current CSS uses:

- `max-width: 700px` for app container
- `padding: 20px` for breathing room on mobile
- Flexible `flex` layouts for responsive grids
- `overflow: auto` for scrollable lists on small screens

---

## 🛠️ Technologies Used

### Backend

- **Express.js**: Lightweight Node.js web framework
- **Node.js fs Module**: File system for persistent data storage
- **CORS**: Cross-Origin Resource Sharing middleware for frontend compatibility
- **JSON**: Data serialization format

### Frontend

- **HTML5**: Semantic markup
- **CSS3**: Responsive styling with Flexbox
- **Vanilla JavaScript**: No dependencies, pure ES6+
- **Fetch API**: Modern HTTP client for API communication

### Tools & Environments

- **npm**: Package manager for Node.js dependencies
- **Node.js**: JavaScript runtime environment

---

## 📄 File Descriptions

### app.js

**Backend Express server with complete documentation**

Key Components:

- **Dependencies**: Express, fs, path, cors
- **Middleware Setup**: CORS, JSON parsing, static file serving
- **Helper Functions**: File I/O operations (readTransactions, writeTransactions)
- **API Routes**: GET, POST, DELETE endpoints for transactions
- **Error Handling**: 404 and 500 error handlers
- **Server Startup**: Listens on port 3000

### public/index.html

**Frontend application with HTML/CSS/JavaScript**

Sections:

1. **HTML Structure**: Semantic markup with IDs for JavaScript targeting
2. **Inline CSS**: Responsive styling with color scheme
   - Dark slate (#1e293b) for primary elements
   - Bright yellow (#facc15) for highlights
   - Emerald green (#10b981) for income
   - Bright red (#ef4444) for expenses
3. **JavaScript Logic**: Client-side functionality
   - API communication (fetch)
   - Form validation
   - DOM manipulation
   - Real-time UI updates

### package.json

**Node.js project configuration**

Contains:

- Project metadata (name, version, description)
- Dependencies (express, cors)
- Start script to run the application

### transactions.json

**Data storage file (auto-created)**

Contains array of transaction objects:

```json
[
  { "id": 1710001001, "text": "Salary", "amount": 4850.0 },
  { "id": 1710001002, "text": "Groceries", "amount": -245.5 }
]
```

---

## 🔐 Data Persistence

- **Format**: JSON file storage
- **Location**: `transactions.json` in project root
- **Auto-creation**: File is created automatically on first run with sample data
- **Synchronous I/O**: Data is persisted immediately after changes
- **Error Handling**: Returns empty array if file operations fail

---

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":

```bash
# Use a different port
PORT=3001 npm start
```

Or kill the process using port 3000:

```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Cannot Find Module 'express'

Install dependencies:

```bash
npm install
```

### Transactions Not Saving

Check file permissions:

- Ensure write access to the project directory
- Check if `transactions.json` exists and is readable
- Review console for error messages

### API Not Responding

1. Verify server is running (`npm start`)
2. Check browser console for error messages
3. Ensure you're accessing `http://localhost:3000` (not https)
4. Check network tab in browser DevTools

---

## 📚 Code Documentation

All code includes:

- **File-level comments**: Overview of purpose and features
- **Function comments**: Purpose, parameters, return values, and flow
- **Inline comments**: Explanation of complex logic
- **CSS comments**: Grouped by functionality with clear sections
- **API documentation**: Request/response formats with examples

---

## 🤝 Contributing

To improve this project:

1. Maintain the current code structure
2. Add JSDoc comments for all new functions
3. Test on mobile devices before submitting changes
4. Update this README for any new features
5. Follow the existing coding style and conventions

---

## 📝 License

This project is open source and available for educational purposes.

---

## 📞 Support

For issues or questions:

1. Check the API Documentation section
2. Review Troubleshooting section
3. Check browser console for error messages
4. Review server console output

---

**Built with ❤️ for expense tracking**
