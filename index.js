const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

const jwtSecret = "21922076dadfa5951e02ba6cf986ef89";

app.use(express.json());


// API
app.post("/user/login", async (req, res) => {
  try {
    const { DeviceId } = req.body;
   const Version = "0.56";

    if (!DeviceId) {
      return res.status(400).json({ error: "deviceId é obrigatório" });
    }

    const sessionToken = jwt.sign(
      {
        userId: DeviceId,
        DeviceId,
      },
      jwtSecret,
      { expiresIn: "30d" }
    );

    user = {
      User: {
        id: 1,
        deviceId: DeviceId,
        stumbleId: "",
        username: "StumbleCore001",
        country: "BR",
        token: sessionToken,
        version: Version || "0.56",
        created: new Date().toISOString(),
        skillRating: 0,
        experience: 0,
        crowns: 0,
         balances: {
         gems: 0,
         coins: 0
         },  
        },
      PhotonJwt: "",
      Timestamps: {
        LastLogin: new Date(),
        LastFinishRound: [],
        LastFinishRoundV4: [],
      },
      TournamentX: {
        id: "",
        minVersion: "0.56",
        rounds: 0,
        awards: [],
        entryCurrencyType: "",
        entryCurrencyCost: 0,
        entryCurrencyType2: "",
        entryCurrencyCost2: 0,
      },
      EquippedCosmetics: {
        skin: "SKIN1",
      },
      ActionEmotes: [],
      PlayerRank: {
        RankId: 0,
        RankName: "",
        RankIcon: "",
      },
      FinishRound: null,
      Event: {
        Id: "",
        StartDateTime: "",
        EndDateTime: "",
        EventRounds: [],
      },
      Ranked: {
        Id: "",
        StartDateTime: "",
        EndDateTime: "",
        MapPools: [],
      },
      BattlePass: {},
      RoundLevels_v2: [],
      Skins_v4: [],
      MissionObjectives: [],
      PurchasableItems: [],
      SharedType: "",
      GameVersion: Version || "0.56",
      TourXJwtSecret: "",
      RankedJwtSecret: "",
    };

    //await userCollection.insertOne(user);

    res.json(user);
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "erro interno no servidor" });
  }
});


// Shared
app.get("/shared/1766/LIVE", (req, res) => {
    const filePath = path.resolve(__dirname, "shared.json");
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo config.json:", err);
            res.status(500).json({ error: "erro ao enviar o arquivo" });
        } else {
            console.log("Config.json chamado com sucesso!");
        }
    });
});

// userconfig
app.get("/user/config", (req, res) => {
  const filePath = path.resolve(__dirname, "shared.json");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("erro ao enviar o arquivo shared.json:", err);
      res.status(500).json({ error: "erro ao enviar o arquivo" });
    }
  });
});


// Teste!
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

// Iniciar o Server
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
