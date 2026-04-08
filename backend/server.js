import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(express.json());

// Read data from JSON file
const readData = () => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

// Write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const data = readData();
    const account = data.accounts.find((acc) => acc.username === username);

    if (!account) {
      return res
        .status(401)
        .json({ error: "Username or password does not match" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      account.hashedpassword,
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Username or password does not match" });
    }

    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update seen endpoint
app.post("/api/update-seen", (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username required" });
    }

    const data = readData();
    const account = data.accounts.find((acc) => acc.username === username);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (!account.seen) {
      account.seen = true;
      writeData(data);
      data.stats.totalAdminPageVisits += 1;
      writeData(data);
    }

    res.json({ success: true, account });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password required" });
    }

    const data = readData();

    // Generate admin username: admin + random numbers
    let adminUsername;
    let isUnique = false;
    while (!isUnique) {
      const randomNum = Math.floor(Math.random() * 1000000);
      adminUsername = `admin${randomNum}`;
      isUnique = !data.accounts.find((acc) => acc.username === adminUsername);
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new account
    const newAccount = {
      id: `acc-${Date.now()}`,
      username: adminUsername,
      hashedpassword: hashedPassword,
      timestamp: new Date().toISOString(),
      seen: false,
    };

    data.accounts.push(newAccount);
    data.stats.totalAccountsCreated += 1;

    writeData(data);

    res.json({
      success: true,
      adminUsername,
      message: `Account created with username: ${adminUsername}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);

  // Start cleanup service - runs every 30 seconds
  setInterval(() => {
    try {
      const data = readData();
      const now = new Date();
      const seenThresholdMs = 30 * 1000; // 30 seconds
      const unseenThresholdMs = 2 * 60 * 1000; // 2 minutes

      data.accounts = data.accounts.filter((account) => {
        const createdAt = new Date(account.timestamp);
        const ageMs = now - createdAt;

        // If seen and older than 30 seconds → delete
        if (account.seen && ageMs >= seenThresholdMs) {
          console.log(
            `Deleted seen account: ${account.username} (age: ${ageMs}ms)`,
          );
          return false;
        }

        // If not seen and older than 2 minutes → delete
        if (!account.seen && ageMs >= unseenThresholdMs) {
          console.log(
            `Deleted unseen account: ${account.username} (age: ${ageMs}ms)`,
          );
          return false;
        }

        return true;
      });

      writeData(data);
    } catch (error) {
      console.error("Cleanup service error:", error.message);
    }
  }, 30 * 1000); // Run every 30 seconds
});
