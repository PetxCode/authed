import { connect } from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/authDB01";
export const dbConfig = async () => {
  try {
    await connect(url)
      .then(() => {
        console.clear();
        console.log("connected successfully ❤️❤️🚀🚀");
      })
      .catch((err) => console.error(err));
  } catch (error) {
    console.log(error);
  }
};
