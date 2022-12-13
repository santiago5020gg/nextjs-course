import connectMongoDb from "../../models/services/mongodb/config";


export const getMoviesFromMongoDb = async () => {
  try {
    const db = await connectMongoDb();
    const collection = db.collection("movies");
    const findResult = await collection.find({}).toArray();
    return findResult;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
