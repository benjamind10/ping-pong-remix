import { MongoClient } from 'mongodb'

// MongoDB URI from .env file
const MONGODB_URI = process.env.MONGODB_URI as string

const myVar = process.env.MONGODB_URI
if (myVar === undefined) {
    throw new Error('MONGODB_URI is not defined')
}

// Create a new MongoClient
const client = new MongoClient(MONGODB_URI)

// Helper function to connect to the database
export const connectToDatabase = async () => {
    try {
        // Connect the client to the server
        await client.connect()

        // Get the database connection
        const db = client.db('PingPong') // replace with your database name

        console.log('Successfully connected to MongoDB.')
        return db
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
        throw new Error('Failed to connect to MongoDB')
    }
}

// Don't forget to close the client connection when your app is terminating.
// client.close();
