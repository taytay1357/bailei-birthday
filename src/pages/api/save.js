import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Path to JSON file
    const filePath = path.join(process.cwd(), "/data/data.json");

    // Read existing data
    let existing = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // Add new entry
    existing.push(data);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.status(200).json({ message: "Saved successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}