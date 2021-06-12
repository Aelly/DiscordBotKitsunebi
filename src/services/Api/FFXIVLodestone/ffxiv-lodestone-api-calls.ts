import { TYPES } from "../../../types";
import { inject, injectable } from "inversify";
import { URL, URLSearchParams } from "url";

import fetch = require("node-fetch");

import { FFXIVCharacterInfo } from "./ffxiv-lodestone-api-character-info";
import { FFXIVCharacterSearch } from "./ffxiv-lodestone-api-character-search";

@injectable()
export class FFXIVLodestoneAPICalls{
    private apiKey: string = "";

    constructor(@inject(TYPES.LodestoneApiKey) lodestoneApiKey: string) {
        this.apiKey = lodestoneApiKey;
    }

    public async getCharacterId(characterName: string, characterServer: string = "Omega"): Promise<number> {
        var url = new URL("https://xivapi.com/character/search?");

        var params: [string, string][] = [
            ["private_key", this.apiKey],
            ["name", characterName],
            ["server", characterServer],
        ];

        url.search = new URLSearchParams(params).toString();

        const response: Response = await fetch(url);

        if (!response.ok) return null;

        const searchData: FFXIVCharacterSearch.RootObject = await response.json();

        if (searchData.Results.length == 0) return -1;
        else if (searchData.Results.length > 1) return -2;
        else return searchData.Results[0].ID;
    }

    public async getCharacterInfo(characId: number): Promise<FFXIVCharacterInfo.RootObject> {
        var url = new URL("https://xivapi.com/character/" + characId);

        var params: [string, string][] = [
            ["private_key", this.apiKey],
            ["language", "fr"],
        ];

        url.search = new URLSearchParams(params).toString();

        const response: Response = await fetch(url);

        if (!response.ok) return null;

        return await response.json();
    }
}
