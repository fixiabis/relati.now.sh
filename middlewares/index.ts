import Express from "express";

export type Middleware = (clientRequest: Express.Request, serverResponse: Express.Response, next: (error?: any) => void) => void;

export function runMiddleware(clientRequest: Express.Request, serverResponse: Express.Response, middleware: Middleware) {
    return new Promise((resolve, reject) => middleware(clientRequest, serverResponse, (result: unknown) => {
        if (result instanceof Error) {
            return reject(result);
        }

        return resolve(result);
    }));
}

export function runMiddlewares(clientRequest: Express.Request, serverResponse: Express.Response, middlewares: Middleware[]) {
    return Promise.all(middlewares.map(middleware => runMiddleware(clientRequest, serverResponse, middleware)));
}
