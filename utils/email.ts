import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "56883592068-u7a5efehhqtgciohe4ifkcrc16rl11n3.apps.googleusercontent.com";

const GOOGLE_SECRET = "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";

const GOOGLE_REFRESH_TOKEN =
  "1//04KpkekSL7xc9CgYIARAAGAQSNwF-L9Ir1LANI3gmV8MLSw_Kq8jQnsZ_v2oaKy-9iTs8f5GlxlDUkRd-KaqCMGUM5mVdCke_RJ4";

const GOOGLE_REDIRECT_URL = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const createEmailAccount = async (user: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "gotext24@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const data = path.join(__dirname, "../views/index.ejs");

    const url: string = `http://localhost:3300/verify-user/${user?._id}`;

    const option = { name: user?.companyName, url };

    const file = await ejs.renderFile(data, option);

    const mailerOptions: any = {
      from: "gotext24@gmail.com",
      to: user?.email,
      subject: "gotext24@gmail.com",

      html: file,
    };

    await transporter
      .sendMail(mailerOptions!)
      .then(() => {
        console.log("Mail sent successfully");
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
