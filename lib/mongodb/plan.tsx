import connectMongoDb from "../../models/services/mongodb/config";

export const getHeroFromMongoDb = async (): Promise<any> => {
  try {
    const db = await connectMongoDb();
    const collection = db.collection("hero");
    const findResult = await collection.findOne();
    return findResult;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
