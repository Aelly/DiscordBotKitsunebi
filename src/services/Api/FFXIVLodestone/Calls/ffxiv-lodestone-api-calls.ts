import { TYPES } from "../../../../types";
import { inject, injectable } from "inversify";

import { FFXIVCharacterInfo } from "../interfaces/ffxiv-lodestone-api-character-info";
import { FFXIVCharacterSearch } from "../interfaces/ffxiv-lodestone-api-character-search";
import RestBehavior from "../../restBehavior";

@injectable()
export class FFXIVLodestoneAPICalls extends RestBehavior{
    private apiKey: string = "";

    constructor(@inject(TYPES.LodestoneApiKey) lodestoneApiKey: string) {
        super("https://xivapi.com");

        this.apiKey = lodestoneApiKey;
    }

    public async getCharacterId(characterName: string, characterServer: string = "Omega"): Promise<number> {

        const searchData: FFXIVCharacterSearch.RootObject = await this.postHttp("/character/search?",
        {
            private_key : this.apiKey,
            name : characterName,
            server : characterServer
        });

        if(searchData == null) return null;
        else if (searchData.Results.length == 0) return -1;
        else if (searchData.Results.length > 1) return -2;
        else return searchData.Results[0].ID;
    }

    public async getCharacterInfo(characId: number): Promise<FFXIVCharacterInfo.RootObject> {
        return await this.postHttp("/character/" + characId, {
            private_key : this.apiKey,
            language : "fr"
        });
    }
}
