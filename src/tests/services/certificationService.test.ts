import certificationsService from "@services/certifications.service";
import { db } from "@db/index"; // Real db function to be mocked

// Mock the db function
jest.mock("@db/index"); // Mock the entire db module

describe("certificationsService", () => {
  let mockDbInstance: any; // To hold the mock instance of db
  let mockSelect: jest.Mock;
  let mockInsert: jest.Mock;

  beforeAll(() => {
    // Create a mock instance of the db
    mockDbInstance = {
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Mock the db() function to return the mockDbInstance
    (db as jest.Mock).mockReturnValue(mockDbInstance);

    // Access the methods of the mock instance
    mockSelect = mockDbInstance.select;
    mockInsert = mockDbInstance.insert;
  });

  it("should get all certifications", async () => {
    // Mock the `select` method to return sample data
    mockSelect.mockResolvedValue([
      { id: 1, name: "Certification 1" },
      { id: 2, name: "Certification 2" },
    ]);

    const certifications = await certificationsService.get();
    expect(certifications).toEqual([
      { id: 1, name: "Certification 1" },
      { id: 2, name: "Certification 2" },
    ]);
  });

  it("should get one certification by id", async () => {
    // Mock the `select` method to return a single result for a specific ID
    mockSelect.mockResolvedValue([{ id: 1, name: "Certification 1" }]);

    const certification = await certificationsService.getOneById(1);
    expect(certification).toEqual({ id: 1, name: "Certification 1" });
  });

  it("should create a certification", async () => {
    const certificationData = { name: "New Certification" };

    // Mock the `insert` method to return the newly created certification
    mockInsert.mockResolvedValue([{ id: 3, ...certificationData }]);

    const certification = await certificationsService.createOne(certificationData);
    expect(certification).toEqual({ id: 3, name: "New Certification" });
  });

  // More tests for update and delete could be added
});
