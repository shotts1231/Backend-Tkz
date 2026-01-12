const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

// ✅ Porta correta (Render + local)
const PORT = process.env.PORT || 3000;

// ⚠️ Em produção use ENV, mas deixei o seu fixo
const jwtSecret =
  process.env.JWT_SECRET || "21922076dadfa5951e02ba6cf986ef89";

app.use(express.json());

// 🔥 Header obrigatório pro cliente do jogo
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// =====================
// LOGIN (CRÍTICO)
// =====================
app.post("/user/login", (req, res) => {
  try {
    const { DeviceId } = req.body;
    const Version = "0.56";

    if (!DeviceId) {
      return res.status(400).json({ error: "DeviceId obrigatório" });
    }

    const token = jwt.sign(
      { deviceId: DeviceId },
      jwtSecret,
      { expiresIn: "30d" }
    );

    res.json({
      User: {
        Id: DeviceId,
        DeviceId: DeviceId,
        Username: "StumbleCore",
        Country: "BR",
        Created: new Date().toISOString(),
        Token: token,
        Version: Version,
        SkillRating: 0,
        Experience: 0,
        Crowns: 0
      },

      Balances: {
        Gems: 0,
        Coins: 0,
        Tokens: 0
      },

      Inventory: {
        Skins: [],
        Emotes: [],
        Footsteps: [],
        Animations: []
      },

      Progression: {
        Level: 1,
        XP: 0
      },

      Photon: {
        AppId: "a6a7a35b-c608-4036-b209-08123ae71f16",
        Region: "eu",
        Token: token
      },

      Events: [],
      BattlePass: {},
      Ads: { Enabled: false },
      ABTests: {},
      ServerTime: new Date().toISOString()
    });
  } catch (err) {
    console.error("Erro no /user/login:", err);
    res.status(500).json({ error: "erro interno" });
  }
});

// =====================
// ENDPOINTS PÓS-LOGIN (OBRIGATÓRIOS)
// =====================
app.get("/user/profile", (req, res) => res.json({}));
app.get("/user/balances", (req, res) => res.json({ Gems: 0, Coins: 0 }));
app.get("/user/inventory", (req, res) => res.json({}));
app.get("/user/events", (req, res) => res.json([]));
app.get("/user/battlepass", (req, res) => res.json({}));
app.get("/user/config", (req, res) => res.json({}));

// =====================
// SHARED
// =====================
const sharedFile = path.resolve(__dirname, "shared.json");

app.get("/shared/1766/LIVE", (req, res) => {
  res.sendFile(sharedFile, err => {
    if (err) {
      console.error("Erro shared:", err);
      res.status(500).json({ error: "erro shared" });
    }
  });
});

app.get("/shared/v1/all", (req, res) => {
  res.sendFile(sharedFile, err => {
    if (err) {
      console.error("Erro shared:", err);
      res.status(500).json({ error: "erro shared" });
    }
  });
});

// Evitar favicon
app.get("/favicon.ico", (req, res) => res.status(204));

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
  console.log(`Servidor online 🚀 Porta ${PORT}`);
});
