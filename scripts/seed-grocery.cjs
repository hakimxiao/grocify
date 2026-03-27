const { neon } = require("@neondatabase/serverless");
const crypto = require("node:crypto");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL wajib diisi. Contoh: DATABASE_URL=... npm run seed:grocery",
  );
}

const sql = neon(databaseUrl);

const seedItems = [
  {
    name: "Pisang",
    category: "Produk Segar",
    quantity: 6,
    priority: "sedang",
    purchased: false,
  },
  {
    name: "Alpukat",
    category: "Produk Segar",
    quantity: 3,
    priority: "tinggi",
    purchased: false,
  },
  {
    name: "Yogurt Yunani",
    category: "Produk Susu",
    quantity: 2,
    priority: "sedang",
    purchased: true,
  },
  {
    name: "Keju Cheddar",
    category: "Produk Susu",
    quantity: 1,
    priority: "rendah",
    purchased: false,
  },
  {
    name: "Roti Sourdough",
    category: "Toko Roti",
    quantity: 1,
    priority: "tinggi",
    purchased: false,
  },
  {
    name: "Pasta",
    category: "Bahan Dapur",
    quantity: 2,
    priority: "rendah",
    purchased: false,
  },
  {
    name: "Saus Tomat",
    category: "Bahan Dapur",
    quantity: 2,
    priority: "sedang",
    purchased: true,
  },
  {
    name: "Granola Bar",
    category: "Camilan",
    quantity: 5,
    priority: "sedang",
    purchased: false,
  },
  {
    name: "Cokelat Hitam",
    category: "Camilan",
    quantity: 2,
    priority: "rendah",
    purchased: false,
  },
  {
    name: "Telur",
    category: "Produk Susu",
    quantity: 12,
    priority: "tinggi",
    purchased: false,
  },
];

async function seed() {
  await sql`
    CREATE TABLE IF NOT EXISTS grocery_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      purchased BOOLEAN NOT NULL DEFAULT FALSE,
      priority TEXT NOT NULL DEFAULT 'sedang',
      updated_at BIGINT NOT NULL
    )
  `;

  for (const item of seedItems) {
    await sql`
      INSERT INTO grocery_items (id, name, category, quantity, purchased, priority, updated_at)
      VALUES (
        ${crypto.randomUUID()},
        ${item.name},
        ${item.category},
        ${item.quantity},
        ${item.purchased},
        ${item.priority},
        ${Date.now()}
      )
    `;
  }

  console.log(
    `Seed selesai: berhasil menambahkan ${seedItems.length} item belanja.`,
  );
}

seed().catch((error) => {
  console.error("Seed gagal:", error);
  process.exit(1);
});
