import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";

const debug = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    if (process.env.PASSWORD === clientRequest.query["password"]) {
        serverResponse.json(process.env);
    }
    else {
        serverResponse.json("o0x8");
    }
};

export default debug;
