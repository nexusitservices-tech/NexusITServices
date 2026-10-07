# OpenWA WhatsApp Gateway Setup for Nexus IT Services

This directory contains the turnkey configuration to host **OpenWA** (from https://github.com/rmyndharis/OpenWA.git) as your self-hosted WhatsApp API Gateway.

---

## 🚀 1-Click Hosting Options

### Option 1: Any VPS (Ubuntu, Debian, DigitalOcean, AWS, Hetzner)
Run these 3 commands on your server:

```bash
mkdir -p /opt/nexus-openwa && cd /opt/nexus-openwa
curl -fsSL https://raw.githubusercontent.com/rmyndharis/OpenWA/main/docker-compose.yml -o docker-compose.yml
docker compose up -d
```

Your OpenWA gateway will be active on:
- **API URL**: `http://YOUR_SERVER_IP:2785/api`
- **Dashboard**: `http://YOUR_SERVER_IP:2785`
- **Swagger Docs**: `http://YOUR_SERVER_IP:2785/api/docs`

---

### Option 2: Run via Node.js directly
```bash
git clone https://github.com/rmyndharis/OpenWA.git
cd OpenWA
npm ci
npm run prod
```

---

## 📲 How to Connect Your WhatsApp Number (+971 52 6367221)

1. Open the OpenWA Dashboard (`http://localhost:2785` or your server IP).
2. Go to **Sessions** -> **Create New Session** with name: `nexus-primary`.
3. Select Engine: **Baileys** (lightweight, zero-browser).
4. Scan the generated QR code on your phone:
   - Open WhatsApp on your phone (`+971 52 6367221`)
   - Go to **Settings** -> **Linked Devices** -> **Link a Device**
   - Scan the QR code
5. Once connected, copy your **API Key** into the Nexus IT Services Portal WhatsApp Gateway settings!

---

## ⚡ How the Website Sends Messages to Your WhatsApp

Whenever a visitor submits an inquiry on `nexus-it.ae`:
1. The website backend issues an HTTP POST to:
   `POST http://YOUR_OPENWA_HOST:2785/api/sessions/nexus-primary/messages/send-text`
   Headers: `x-api-key: YOUR_API_KEY`
   Body:
   ```json
   {
     "chatId": "971526367221@c.us",
     "text": "🔔 New Lead from Nexus Website: ..."
   }
   ```
2. The message arrives directly in your WhatsApp app within 1 second!
