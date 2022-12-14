import connectMongoDb from "../../models/services/mongodb/config";

export const getMoviesFromMongoDb = async () => {
  try {
    const db = await connectMongoDb();
    const collection = db.collection("movies");
    const findResult = await collection.find({ enable: true }).toArray();
    return findResult;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};


export const getMovieByIdFromMongoDb = async (id: string) => {
  try {
    const db = await connectMongoDb();
    const collection = db.collection("movies");
    const findResult = await collection.findOne({ id, enable: true });
    return findResult;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
