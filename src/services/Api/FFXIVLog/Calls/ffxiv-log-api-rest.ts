import { inject, injectable } from "inversify";
import { TYPES } from "../../../../types";
import RestBehavior from "../../restBehavior";

@injectable()
export default class FFXIVLogApiRest extends RestBehavior {
    private ffLogsClientID: string;
    private ffLogsClientSecret: string;

    constructor(
        @inject(TYPES.FFLogsClientID) ffLogsClientID: string,
        @inject(TYPES.FFLogsClientSecret) ffLogsClientSecret: string
    ) {
        super("https://www.fflogs.com");
    
        this.ffLogsClientID = ffLogsClientID;
        this.ffLogsClientSecret = ffLogsClientSecret;
    }

    public async getAccessToken() {
        return await this.postHttp("/oauth/token", {
            grant_type: "client_credentials",
            client_id: this.ffLogsClientID,
            client_secret: this.ffLogsClientSecret,
        });
    }
}
