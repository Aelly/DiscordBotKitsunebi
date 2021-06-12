import { TYPES } from "../../../../types";
import { gql } from "graphql-request";
import { inject, injectable } from "inversify";
import GraphqlBehavior from "../../graphqlBehavior";
import { FFXIVCharacterData } from "../Interfaces/ffxiv-log-api-character-data";
import FFXIVLogApiRest from "./ffxiv-log-api-rest";

@injectable()
export default class FFXIVLogsAPIGraphql extends GraphqlBehavior {
    private ffxigLogsApiRest: FFXIVLogApiRest;

    constructor(@inject(TYPES.FFLogsHttpAuth) ffLogsHttpAuth: FFXIVLogApiRest) {
        super();

        this.init("https://www.fflogs.com/api/v2/client");
        this.ffxigLogsApiRest = ffLogsHttpAuth;
    }

    private async _getLogs(characterName: string, serverName: string = "Omega") {
        const characterQuery = gql`
        {
            characterData
            {
              character(name: "${characterName}", serverSlug: "${serverName}", serverRegion: "eu")
              {
                Trials1 : zoneRankings(zoneID: 28)
                Trials2 : zoneRankings(zoneID: 34)
                Trials3 : zoneRankings(zoneID: 37)
                
                EdensGate : zoneRankings(zoneID: 29, difficulty: 101)
                EdensVerse : zoneRankings(zoneID: 33, difficulty: 101)
                EdensPromise : zoneRankings(zoneID: 38, difficulty: 101)
                
                UltimateSB : zoneRankings(zoneID: 30)
                UltimateShb : zoneRankings(zoneID: 32)
              }
            }
          }          
        `;

        return await this.request(characterQuery);
    }

    async getLogs(characterName: string): Promise<FFXIVCharacterData.RootObject> {
        let res: any = {};
        try {
            const { access_token } = await this.ffxigLogsApiRest.getAccessToken();
            if (access_token == null) return null;
            this.setBearer(access_token);
            res = await this._getLogs(characterName);
        } catch (err) {
            console.log(err);
            return null;
        }

        return await res;
    }
}
