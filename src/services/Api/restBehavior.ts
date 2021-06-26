import { injectable, unmanaged } from "inversify";
import { Client, Pool } from "undici";
import HttpError from "./httperrors";

export enum HttpMethod {
    Get = "GET",
    Post = "POST",
}

@injectable()
export default class RestBehavior {
    private readonly pool: Pool;

    constructor(@unmanaged() url: string, @unmanaged() options: object = {}) {
        this.pool = new Pool(url, {
            keepAliveTimeout: 1000,
            headersTimeout: 0,
            bodyTimeout: 0,
            pipelining: 0,
            connections: 100,
            ...options,
        } as any);
    }

    protected async request<Out = any, In = any>(
        method: HttpMethod,
        path: string,
        req?: In,
        requestHeaders?: object
    ): Promise<Out> {
        var options: Client.RequestOptions = {
            path,
            method,
            headers: {
                "Content-Type": "application/json",
                ...(requestHeaders || {}),
            },
        };
        if (method === HttpMethod.Post && req) {
            options.body = JSON.stringify(req);
        }
        var ret : { statusCode, body, headers } = await this.pool.request(options);

        // Handle automatic redirection
        while(ret.statusCode == 302 && ret.headers.location != null)
        {
            path = ret.headers.location;

            options = {
                path,
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(requestHeaders || {}),
                },
            };
            if (method === HttpMethod.Post && req) {
                options.body = JSON.stringify(req);
            }

            ret = await this.pool.request(options);
        }

        let buffer = "";
        try {
            ret.body.setEncoding("utf8");
            for await (const data of ret.body) {
                buffer = buffer.concat(data);
            }
        } catch (err) {
            ret.body.destroy();
            throw err;
        }


        let response;
        try {
            response = JSON.parse(buffer);
        } catch (e) {
            response = buffer.toString();
            if (response.length === 0) response = undefined;
        }

        if (ret.statusCode >= 300) {
            throw new HttpError(ret.statusCode.toString(), response);
        }
        return response;
    }

    protected async getHttp<Out = any>(path: string, headers?: object): Promise<Out> {
        try {
            return await this.request<Out>(HttpMethod.Get, path, {}, headers);
        } catch (e) {
            return null;
        }
    }

    protected async postHttp<Out = any, In = any>(path: string, req?: In, headers?: object): Promise<Out> {
        try {
            return await this.request<Out, In>(HttpMethod.Post, path, req, headers);
        } catch (e) {
            return null;
        }
    }
}
