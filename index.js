const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

// ✅ PORTA CORRETA PARA RENDER
const PORT = process.env.PORT || 3000;

// ⚠️ EM PRODUÇÃO, O IDEAL É USAR ENV, MAS DEIXEI SEU SECRET
const jwtSecret =
  process.env.JWT_SECRET || "21922076dadfa5951e02ba6cf986ef89";

app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// =====================
// LOGIN
// =====================
app.post("/user/login", async (req, res) => {
  try {
    const { DeviceId } = req.body;
    const Version = "0.56";

    if (!DeviceId) {
      return res.status(400).json({ error: "DeviceId é obrigatório" });
    }

    const sessionToken = jwt.sign(
      { userId: DeviceId, DeviceId },
      jwtSecret,
      { expiresIn: "30d" }
    );

    const user = {
      User: {
        id: 1,
        deviceId: DeviceId,
        stumbleId: "",
        username: "StumbleTeste",
        country: "BR",
        token: sessionToken,
        version: Version,
        created: new Date().toISOString(),
        skillRating: 0,
        experience: 0,
        crowns: 0,
        balances: { gems: 0, coins: 0 },
      },
      PhotonJwt: "",
      Timestamps: {
        LastLogin: new Date(),
        LastFinishRound: [],
        LastFinishRoundV4: [],
      },
      TournamentX: {
        id: "",
        minVersion: Version,
        rounds: 0,
        awards: [],
        entryCurrencyType: "",
        entryCurrencyCost: 0,
        entryCurrencyType2: "",
        entryCurrencyCost2: 0,
      },
      EquippedCosmetics: { skin: "SKIN1" },
      ActionEmotes: [],
      PlayerRank: { RankId: 0, RankName: "", RankIcon: "" },
      FinishRound: null,
      Event: { Id: "", StartDateTime: "", EndDateTime: "", EventRounds: [] },
      Ranked: { Id: "", StartDateTime: "", EndDateTime: "", MapPools: [] },
      BattlePass: {},
      RoundLevels_v2: [],
      Skins_v4: [],
      MissionObjectives: [],
      PurchasableItems: [],
      SharedType: "",
      GameVersion: Version,
      TourXJwtSecret: "",
      RankedJwtSecret: "",
    };

    res.json(user);
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "erro interno no servidor" });
  }
});

// =====================
// SHARED
// =====================
const sharedFile = path.resolve(__dirname, "shared.json");

app.get("/shared/1766/LIVE", (req, res) => {
  res.sendFile(sharedFile, (err) => {
    if (err) {
      console.error("Erro ao enviar shared.json:", err);
      res.status(500).json({ error: "erro ao enviar o arquivo" });
    } else {
      console.log("Shared.json chamado: /shared/1766/LIVE");
    }
  });
});

app.get("/shared/v1/all", (req, res) => {
  res.sendFile(sharedFile, (err) => {
    if (err) {
      console.error("Erro ao enviar shared.json:", err);
      res.status(500).json({ error: "erro ao enviar o arquivo" });
    } else {
      console.log("Shared.json chamado: /shared/v1/all");
    }
  });
});

app.get("/user/config", (req, res) => {
  res.sendFile(sharedFile, (err) => {
    if (err) {
      console.error("Erro ao enviar shared.json:", err);
      res.status(500).json({ error: "erro ao enviar o arquivo" });
    }
  });
});

// Evitar favicon
app.get("/favicon.ico", (req, res) => res.status(204));

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
  console.log(`Servidor online 🚀 Porta: ${PORT}`);
});
