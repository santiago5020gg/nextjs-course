import connectMongoDb from "../../models/services/mongodb/config";

export const addContactInMongoDb = async (contact: {
  name: string;
  message: string;
}): Promise<any> => {
  try {
    console.log('oyemeasta');
    const db = await connectMongoDb();
    const collection = db.collection("contact");
    const findResult = await collection.insertOne(contact);
    console.log('new contact added ');
    return findResult;
  } catch (error: any) {
    console.log('error in addContactInMongoDb ',error);
    return error;
  }
};
