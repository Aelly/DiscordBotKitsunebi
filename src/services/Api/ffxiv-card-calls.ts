import { injectable } from "inversify";
import RestBehavior from "./restBehavior";

@injectable()
export class FFXIVCardCalls extends RestBehavior {
    // https://ffxiv-character-cards.herokuapp.com/characters/id/<LODESTONE ID>.png
    // https://ffxiv-character-cards.herokuapp.com/characters/name/<WORLD>/<CHARACTER NAME>.png

    // https://ffxiv-character-cards.herokuapp.com/prepare/id/<LODESTONE ID>
    // https://ffxiv-character-cards.herokuapp.com/prepare/name/<WORLD>/<CHARACTER NAME>

    readonly baseURL: string;

    constructor() {
        const baseURL: string = "https://ffxiv-character-cards.herokuapp.com";

        super(baseURL);
        this.baseURL = baseURL;
    }

    public async prepareCharacterCardFromCharacterId(characterId: number): Promise<string> {
        var res = await this.getHttp("/prepare/id/" + characterId);

        if (res.status == "ok") return this.baseURL + res.url;
        else return "Erreur lors de la préparation de l'image";
    }

    public async getCharacterCardFromCharacterId(characterId: number): Promise<string> {
        return `https://ffxiv-character-cards.herokuapp.com/characters/id/${characterId}.png`;
    }

    public async prepareCharacterCardFromCharacterName(characterName: string, characterServer: string): Promise<string> {
        const arg = "/prepare/name/" + characterServer + '/' + "Rhuya";
        var res = await this.getHttp(arg);

        if (res.status == "ok") return this.baseURL + res.url;
        else return "Erreur lors de la préparation de l'image";
    }

    public async getCharacterCardFromCharacterName(characterName: string, characterServer: string): Promise<string> {
        return `https://ffxiv-character-cards.herokuapp.com/characters/name/${characterServer}/${characterName}.png`;
    }
}
