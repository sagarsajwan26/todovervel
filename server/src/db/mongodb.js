import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    const instance = await mongoose.connect(`${process.env.MONGODB_URL}`);

  
    
      console.log('MONGO DB CONNECTED SUCCESSFULLY AT',instance.connections[0].host);
      
  } catch (error) {
    console.error('error while connecting to mongodb', error.message);
    process.exit(1); 
  }
};
