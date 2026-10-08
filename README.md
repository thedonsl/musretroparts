# 🚗 MUSA Retro Parts (武佐 レトロパーツ) — Spare Parts Warrior

> **Online Web Store for Classic Japanese Cars from the 1960s–1990s**
> *Featuring Datsun/Nissan, Honda, Mazda, Suzuki, and Toyota vehicle hierarchy, PayPal Smart Checkout Sandbox, and an Admin Management Portal.*

---

## 🏎️ Overview & Brand Story

**Musa (武佐)** translates to **"The Spare Parts Warrior"**:
* **武 (Mu)**: Martial warrior power & classic JDM engine performance.
* **佐 (Sa)**: Assistance, support, and essential parts supply.

Just as samurai armorers kept battle gear sharp, **Musa Retro Parts** supplies genuine NOS, OEM, and restored components to keep 1960s-1990s Japanese icons (*Fairlady Z, Skyline GT-R, AE86, RX-7, NSX, Cappuccino*) alive.

---

## ⚡ Quick Start & Hosting Options

### Option 1: Run Locally with Node.js (Zero-Dependency)
No `npm install` needed! Simply run:
```bash
node server.js
```
Open your browser at `http://localhost:3000`.

---

### Option 2: Deploy to Vercel (1-Click Hosting)
1. Install Vercel CLI or connect your GitHub repository to [Vercel](https://vercel.com).
2. Run:
```bash
npx vercel
```
Vercel automatically detects `index.html` and `vercel.json` for instant deployment.

---

### Option 3: Deploy to Netlify
1. Drag and drop the repository folder directly into [Netlify Drop](https://app.netlify.com/drop) or connect to GitHub.
2. Netlify uses `netlify.toml` automatically.

---

### Option 4: Deploy to GitHub Pages
1. Push the project repository to GitHub.
2. Go to **Repository Settings > Pages**.
3. Select the `main` branch and `/ (root)` folder. Save and publish!

---

## ✨ Features Included

* **Left-Hand Vehicle Selector Hierarchy**:
  * **Makes**: Datsun/Nissan, Honda, Mazda, Suzuki, Toyota.
  * **Models**: Grouped under parent makes (e.g. 240Z/280Z, Skyline R32, AE86, RX-7, NSX, Cappuccino).
  * **Years**: Production year chips (1970–1999) under models.
* **PayPal Smart Payment Checkout**:
  * Integrated sandbox drawer cart with itemized currency calculation, buyer protection guarantee, and order confirmation receipt (`MUSA-PAYPAL-XXXXXX`).
* **Admin Management Portal**:
  * Create/Delete Car Makes.
  * Create/Delete Models & Production Years.
  * Attach new Part inventory listings with OEM #, Price, Stock count, Category, Multi-photo gallery, and Description.
* **Pages**: Home, Parts Shop, About Us, Contact & Sourcing Hub, Admin Portal.

---

## 🛠️ Tech Stack
* **Core**: Vanilla HTML5, CSS3, ES6+ JavaScript.
* **Icons & Fonts**: FontAwesome 6.4.0, Google Fonts (`Noto Serif JP`, `Cinzel`, `Outfit`, `JetBrains Mono`).
* **Server**: Native Node.js `http` module (`server.js`).
