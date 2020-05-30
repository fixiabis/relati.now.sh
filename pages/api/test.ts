import Cors from "cors";
import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddlewares } from "../../utilities/server-side";

const cors = Cors({
    methods: ["GET"],
});

const Test = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    await runMiddlewares(clientRequest, serverResponse, [cors]);
    serverResponse.json(process.env.FIREBASE_ADMIN_SDK_JSON && JSON.parse(process.env.FIREBASE_ADMIN_SDK_JSON));
};

export default Test;
