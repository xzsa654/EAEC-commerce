import { createClient } from 'redis';
import dotenv from "dotenv"
dotenv.config()

const client = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 15665,
    }
    
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export default client


