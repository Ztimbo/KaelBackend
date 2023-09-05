import mongoose from 'mongoose'

const dbConection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'donas',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const url = `${connection.connection.host}:${connection.connection.port}`;
    } catch(ex) {
        process.exit(1);
    }
}
export default dbConection;