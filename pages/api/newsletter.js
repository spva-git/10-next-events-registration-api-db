import { connectDB, insertDocument } from "@/helpers/db-utill";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    const client = await connectDB();
    await insertDocument(client, 'newsletter', {email: userEmail});

    res.status(200).json({ email: userEmail });
  }
}
