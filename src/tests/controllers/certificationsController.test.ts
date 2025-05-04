import request from "supertest";
import { app } from "@app"; // Import your Express app
import { closeDb, db } from "@db/index"; // Import db functions

describe("Certifications Controller", () => {
  beforeAll(async () => {
    await db(); // Initialize the DB connection
  });

  afterAll(async () => {
    await closeDb(); // Close DB connection gracefully after tests
  });

  it("should get all certifications", async () => {
    const response = await request(app).get("/certifications");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it("should create a certification", async () => {
    const newCertification = { name: "New Certification" };
    const response = await request(app).post("/certifications").send(newCertification);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.name).toBe("New Certification");
  });

  // You can also write tests for GET by ID, PATCH, DELETE, etc.
});
