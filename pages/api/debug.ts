import Express from "express";
import { NextApiRequest, NextApiResponse } from "next";

const debug = async (clientRequest: NextApiRequest & Express.Request, serverResponse: NextApiResponse & Express.Response) => {
    serverResponse.json(process.env);
};

export default debug;
