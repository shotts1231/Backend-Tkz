const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "dev-secret-050";

app.use(express.json());

/* =====================
   LOGIN / AUTH (0.50)
===================== */
app.post("/user/login", (req, res) => {
  const { DeviceId } = req.body || {};

  if (!DeviceId) {
    return res.status(400).json({ error: "DeviceId obrigatório" });
  }

  const token = jwt.sign({ DeviceId }, JWT_SECRET, { expiresIn: "30d" });

  res.json({
    User: {
      id: 1,
      deviceId: DeviceId,
      stumbleId: "",
      username: "Player",
      country: "BR",
      token,
      crowns: 0,
      experience: 0,
      skillRating: 0,
      balances: {
        coins: 0,
        gems: 0
      },
      created: new Date().toISOString()
    },
    PhotonJwt: "",
    GameVersion: "0.50"
  });
});

/* =====================
   USER CONFIG
===================== */
app.get("/user/config", (req, res) => {
  res.json({
    crossPlatform: true,
    notifications: true
  });
});

/* =====================
   INVENTORY
===================== */
app.post("/user/inventory/selection", (req, res) => {
  res.json({ success: true });
});

/* =====================
   EVENTS
===================== */
app.get("/collection-events/me", (req, res) => {
  res.json([]);
});

app.get("/game-events/me/", (req, res) => {
  res.json([]);
});

/* =====================
   MATCHMAKING
===================== */
app.get("/matchmaking/filter/", (req, res) => {
  res.json({
    allowed: true,
    optInCrossPlatform: true
  });
});

/* =====================
   SOCIAL
===================== */
app.get("/social/interactions", (req, res) => {
  res.json([]);
});

/* =====================
   USER SETTINGS
===================== */
app.get("/usersettings", (req, res) => {
  res.json({
    language: "pt-BR",
    region: "BR"
  });
});

/* =====================
   ECONOMY
===================== */
app.get("/economy/offers/purchased/", (req, res) => {
  res.json([]);
});

/* =====================
   CREATOR CODES
===================== */
app.get("/user/creator-codes", (req, res) => {
  res.json([]);
});

/* =====================
   TOURNAMENT X
===================== */
app.get("/tournamentx/active", (req, res) => {
  res.json({
    active: false
  });
});

/* =====================
   FALLBACK (ANTI-CRASH)
===================== */
app.use((req, res) => {
  res.status(200).json({});
});

/* =====================
   START SERVER
===================== */
app.listen(PORT, () => {
  console.log(`Backend Stumble 0.50 rodando na porta ${PORT}`);
});
