import { FFXIVCardCalls } from './../ffxiv-card-calls';
import { MessageEmbed, StringResolvable } from "discord.js";
import container from "../../../inversify.config";
import { TYPES } from "../../../types";
import { FFXIVLodestoneAPICalls } from "./Calls/ffxiv-lodestone-api-calls";

import { FFXIVCharacterInfo } from "./interfaces/ffxiv-lodestone-api-character-info";

export class FFXIVLodestoneAPIUtils {
    public static async getPortrait(characterName: string): Promise<StringResolvable> {
        const lodestoneAPI: FFXIVLodestoneAPICalls = container.get<FFXIVLodestoneAPICalls>(TYPES.LodestoneAPI);

        const charactId: number = await lodestoneAPI.getCharacterId(characterName);

        if (charactId == null) return "Erreur avec l'API Lodestone, rééssayer plus tard.";
        else if (charactId == -1) return "Erreur, je n'ai pas trouvé de personne avec ce nom.";
        else if (charactId == -2) return "Plus d'un personnage trouvé avec ce nom.";

        const characInfo: FFXIVCharacterInfo.RootObject = await lodestoneAPI.getCharacterInfo(charactId);

        if (characInfo == null) return "Erreur lors de la récupération des informations du personnage";

        return characInfo.Character.Portrait;
    }

    public static async getCharacterSheet(characterName: string): Promise<StringResolvable> {
        const lodestoneAPI: FFXIVLodestoneAPICalls = container.get<FFXIVLodestoneAPICalls>(TYPES.LodestoneAPI);

        const charactId: number = await lodestoneAPI.getCharacterId(characterName);

        if (charactId == null) return "Erreur avec l'API Lodestone, rééssayer plus tard.";
        else if (charactId == -1) return "Erreur, je n'ai pas trouvé de personne avec ce nom.";
        else if (charactId == -2) return "Plus d'un personnage trouvé avec ce nom.";

        const characInfo: FFXIVCharacterInfo.RootObject = await lodestoneAPI.getCharacterInfo(charactId);

        if (characInfo == null) return "Erreur lors de la récupération des informations du personnage";

        let description: string = "";
        description +=
            characInfo.Character.ActiveClassJob.UnlockedState.Name +
            " level " +
            characInfo.Character.ActiveClassJob.Level +
            "\n";
        description += characInfo.Character.FreeCompanyName + "\n";

        // Construct base embed
        let messageEmbed: MessageEmbed = new MessageEmbed()
            .setTitle(characInfo.Character.Name)
            .setURL("https://eu.finalfantasyxiv.com/lodestone/character/" + charactId + "/")
            .setThumbnail(characInfo.Character.Avatar)
            .setDescription(description);

        // Add field for each jobs category
        let jobTypeIDArray: Array<[string, number[]]> = new Array();
        jobTypeIDArray.push(["Tank", [19, 21, 32, 37]]);
        jobTypeIDArray.push(["Healer", [24, 28, 33]]);
        jobTypeIDArray.push(["Mele", [20, 22, 30, 34]]);
        jobTypeIDArray.push(["Range", [23, 31, 38, 25, 27, 35, 36]]);
        jobTypeIDArray.push(["Crafter", [8, 9, 10,  11, 12, 13, 14, 15]]);
        jobTypeIDArray.push(["Gatherer", [16, 17, 18]]);

        for (const jobType of jobTypeIDArray) {
            // Filter to only select the job of this category
            const filteredList: FFXIVCharacterInfo.ClassJob[] = characInfo.Character.ClassJobs.filter((x) =>
                jobType[1].includes(x.JobID)
            );

            // Construct the values of the job category field (job name : level)
            const jobs: string[] = [];
            for (let job of filteredList) {
                jobs.push(job.UnlockedState.Name + " : " + job.Level);
            }
            const fieldValue = jobs.join("\n") || "\u200b";

            messageEmbed.addField(jobType[0], fieldValue, true);
        }

        return messageEmbed;
    }

    public static async getCharacterCard(characterName : string) : Promise<StringResolvable>{
        const lodestoneAPI: FFXIVLodestoneAPICalls = container.get<FFXIVLodestoneAPICalls>(TYPES.LodestoneAPI);
        const cardAPI : FFXIVCardCalls = container.get<FFXIVCardCalls>(TYPES.FFCardsAPI);

        // const charactId: number = await lodestoneAPI.getCharacterId(characterName);

        return await cardAPI.prepareCharacterCardFromCharacterName(characterName, "Omega");

        // if (charactId == null) return "Erreur avec l'API Lodestone, rééssayer plus tard.";
        // else if (charactId == -1) return "Erreur, je n'ai pas trouvé de personne avec ce nom.";
        // else if (charactId == -2) return "Plus d'un personnage trouvé avec ce nom.";
    }
}
