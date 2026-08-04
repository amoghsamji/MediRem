import dotenv from "dotenv";
import dns from "node:dns";

// Fix for querySrv ECONNREFUSED issue on some DNS providers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
};

startServer();