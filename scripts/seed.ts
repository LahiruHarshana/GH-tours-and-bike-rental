import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { AdminUser } from "../src/models/AdminUser";
import { TourPackage } from "../src/models/TourPackage";
import { Bike } from "../src/models/Bike";
import { AirportVehicle } from "../src/models/AirportVehicle";
import { demoTours, demoBikes, demoAirportVehicles } from "../src/lib/demo-data";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing. Create .env.local from .env.example.");

  const email = (process.env.ADMIN_SEED_EMAIL ?? "ghtoursandbikerental@gmail.com").toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD ?? "ChangeMe123!";
  const name = process.env.ADMIN_SEED_NAME ?? "GH Administrator";

  if (password.length < 10) throw new Error("ADMIN_SEED_PASSWORD must contain at least 10 characters.");

  await mongoose.connect(uri, { maxPoolSize: 5 });
  console.log("Connected to MongoDB Atlas");

  const passwordHash = await bcrypt.hash(password, 12);
  await AdminUser.findOneAndUpdate(
    { email },
    { name, email, passwordHash, role: "ADMIN", status: "ACTIVE" },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  for (const tour of demoTours) {
    const { id: _id, ...payload } = tour;
    void _id;
    await TourPackage.findOneAndUpdate(
      { slug: payload.slug },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  for (const bike of demoBikes) {
    const { id: _id, ...payload } = bike;
    void _id;
    await Bike.findOneAndUpdate(
      { slug: payload.slug },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  for (const vehicle of demoAirportVehicles) {
    const { id: _id, ...payload } = vehicle;
    void _id;
    await AirportVehicle.findOneAndUpdate(
      { slug: payload.slug },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  console.log(`Seed complete: ${demoTours.length} tours, ${demoBikes.length} bikes, ${demoAirportVehicles.length} airport vehicles, admin ${email}`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
