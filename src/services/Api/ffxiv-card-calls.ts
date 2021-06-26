import { injectable } from "inversify";
import RestBehavior from "./restBehavior";

@injectable()
export class FFXIVCardCalls extends RestBehavior {

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
        const arg : string = "/prepare/name/" + characterServer + '/' + characterName;
        const argEncoded = arg.replace(' ', '%20');
        var res = await this.getHttp(argEncoded);

        if(res == null)
            return "Aucun personnage trouvé avec ce nom";

        if (res.status == "ok") return this.baseURL + res.url;
        else return "Erreur lors de la préparation de l'image";
    }

    public async getCharacterCardFromCharacterName(characterName: string, characterServer: string): Promise<string> {
        return `https://ffxiv-character-cards.herokuapp.com/characters/name/${characterServer}/${characterName}.png`;
    }
}
