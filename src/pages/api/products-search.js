import {MongoClient, ObjectId} from 'mongodb';

const uri = 'mongodb+srv://superadmin:superadmin@mycluster.bgop5ml.mongodb.net/fitness_app'
// process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true,
};

let client;
let _db;

export async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, options);
        await client.connect();
        _db = client.db();
    }

    return _db;
}

// const db = connectToDatabase();
const getCollection = async () => {
    const db = await connectToDatabase()
    return db.collection('products_v3')
}

const search = async (req, res) => {
    const {
        query,
        skip = 0,
        limit = 100
    } = req.query
    const col = await getCollection()
    let filter = query ? {
        translated_name: {
            $regex: query,
            $options: 'i'
        }
    } : {}

    const products = await col.find(filter).skip(skip)
        .limit(limit)
        .toArray();
    res.status(200).json(products);
}

const update = async (req, res) => {
    const {translated_name, origin_name} = req.query
    const col = await getCollection()
    await col.updateOne(
        {origin_name},
        {$set: {translated_name}})
    res.status(200).json({deleted: true});
}

const deleteItem = async (req, res) => {
    const {translated_name} = req.query
    const col = await getCollection()
    const delted = await col.deleteOne({translated_name})
    res.status(200).json({deleted: true});
}


export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            await search(req, res)
        } else if (req.method === 'DELETE') {
            await deleteItem(req, res)
        } else if (req.method === "PATCH") {
            await update(req, res)
        }
    } catch (error) {
        console.error('Error products:', error);
        res.status(500).json({error: 'An error occurred'});
    }
}

