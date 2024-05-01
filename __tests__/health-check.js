const mysql = require("mysql2/promise");
const redis = require("ioredis");

const dotenv = require("dotenv");
dotenv.config();

describe("Health check", () => {
  /* ---------------------- Gateway Server Health Check. ---------------------- */
  it("should return OK if gateways server is healthy", async () => {
    try {
      const response = await fetch(process.env.GATEWAY_SERVER_URL + "/");
      const data = await response.json();
      expect(data.message).toEqual("ok");
    } catch (error) {
      console.error("Gateway server health check failed:", error);
      throw error;
    }
  }, 30000); // 30s timeout for cold start

  /* ------------------------- Ai Server Health Check. ------------------------ */
  it("should return OK from gateway and ai server both, if ai server is healthy", async () => {
    try {
      // from gateway
      const gatewayResponse = await fetch(
        process.env.GATEWAY_SERVER_URL + "/ai"
      );
      const gatewayData = await gatewayResponse.json();
      expect(gatewayData.message).toEqual("ok");
      // from AI
      const aiResponse = await fetch(process.env.AI_SERVER_URL + "/");
      expect(aiResponse.ok).toEqual(true);
    } catch (error) {
      console.error("AI server health check failed:", error);
      throw error;
    }
  }, 30000);

  /* --------------------- MySQL Dev-Server Health Check. --------------------- */
  it("should return OK if MySQL dev-server is healthy", async () => {
    try {
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });

      const [rows] = await connection.query("SELECT 1");
      expect(rows).toEqual([{ 1: 1 }]);
      await connection.end();
    } catch (error) {
      console.error("MySQL health check failed:", error);
      throw error;
    }
  });

  /* --------------------- Redis Dev-Server Health Check. --------------------- */
  it("should return OK if Redis dev-server is healthy", async () => {
    const client = redis.createClient({
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      port: process.env.REDIS_PORT,
    });

    try {
      await new Promise((resolve, reject) => {
        client.on("connect", resolve);
        client.on("error", reject);
      });
      expect(client.status).toEqual("connect");
    } catch (error) {
      console.error("Redis health check failed:", error);
      throw error;
    } finally {
      await client.quit();
    }
  });
});
