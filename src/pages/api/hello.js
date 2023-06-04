import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://superadmin:*****@mycluster.bgop5ml.mongodb.net/fitness_app'
    // process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
};

let client;
let db;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
    db = client.db();
  }

  return { db };
}


export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const { db } = await connectToDatabase();
    const products = await db.collection('products_v2').find({ translated_name: { $regex: query, $options: 'i' } }).toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'An error occurred while searching products' });
  }
}
