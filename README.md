
# 🪙 Crypto Market Tracker (React + Vite)

A simple and responsive React app that fetches the top 10 cryptocurrencies using the CoinGecko API and displays them in a sortable and searchable table. Built with Vite for fast performance.

---

## 🚀 Features

- 🔁 **Real-time Data** from [CoinGecko API](https://www.coingecko.com/en/api)
- 🔍 **Search** by coin name or symbol
- 🔽 **Sort** by price and market cap (ascending & descending)
- 🎛️ **Filter** by:
  - Price range
  - Market Cap range
- 📱 Responsive and clean UI


## 📦 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [CoinGecko API](https://api.coingecko.com)
- JavaScript, HTML, CSS

---

## 🔗 API Endpoint Used

```plaintext
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
````

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/crypto-table-react.git
cd crypto-table-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

App will run at: `http://localhost:5173/`

---

## 📂 Folder Structure

```
/src
  ├── App.jsx             # Main component with logic
  ├── components/
  │   └── CryptoRow.jsx   # Table row for each crypto
  └── main.jsx            # React DOM rendering
```

---

## 🧩 Future Improvements

* Pagination for more coins
* Responsive design improvements
* Dark/light mode toggle
* Unit tests

---

## 📄 License

MIT License. Free to use and modify.

---

Let me know if you want this personalized with your GitHub repo or a screenshot preview!
```
