import mongoose from 'mongoose'

class mongoDbService {
    public Init(): void {

        mongoose
            .connect(`${process.env.MONGO_URI}`, {
            })
            .then(result => {
                console.log(`MongoDB connected!`);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export { mongoDbService }