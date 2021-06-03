"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFXIVLodestoneAPIUtils = void 0;
const discord_js_1 = require("discord.js");
const inversify_config_1 = require("../../../inversify.config");
const types_1 = require("../../../types");
class FFXIVLodestoneAPIUtils {
    static getPortrait(characterName) {
        return __awaiter(this, void 0, void 0, function* () {
            const lodestoneAPI = inversify_config_1.default.get(types_1.TYPES.LodestoneAPI);
            const charactId = yield lodestoneAPI.getCharacterId(characterName);
            if (charactId == null)
                return "Erreur avec l'API Lodestone, rééssayer plus tard.";
            else if (charactId == -1)
                return "Erreur, je n'ai pas trouvé de personne avec ce nom.";
            else if (charactId == -2)
                return "Plus d'un personnage trouvé avec ce nom.";
            const characInfo = yield lodestoneAPI.getCharacterInfo(charactId);
            if (characInfo == null)
                return "Erreur lors de la récupération des informations du personnage";
            return characInfo.Character.Portrait;
        });
    }
    // TODO : Passer le message en français (nom de job + nom de role)
    static getCharacterSheet(characterName) {
        return __awaiter(this, void 0, void 0, function* () {
            const lodestoneAPI = inversify_config_1.default.get(types_1.TYPES.LodestoneAPI);
            const charactId = yield lodestoneAPI.getCharacterId(characterName);
            if (charactId == null)
                return "Erreur avec l'API Lodestone, rééssayer plus tard.";
            else if (charactId == -1)
                return "Erreur, je n'ai pas trouvé de personne avec ce nom.";
            else if (charactId == -2)
                return "Plus d'un personnage trouvé avec ce nom.";
            const characInfo = yield lodestoneAPI.getCharacterInfo(charactId);
            if (characInfo == null)
                return "Erreur lors de la récupération des informations du personnage";
            let description = "";
            description +=
                characInfo.Character.ActiveClassJob.UnlockedState.Name +
                    " level " +
                    characInfo.Character.ActiveClassJob.Level +
                    "\n";
            description += characInfo.Character.FreeCompanyName + "\n";
            // Construct base embed
            let messageEmbed = new discord_js_1.MessageEmbed()
                .setTitle(characInfo.Character.Name)
                .setURL("https://eu.finalfantasyxiv.com/lodestone/character/" + charactId + "/")
                .setThumbnail(characInfo.Character.Avatar)
                .setDescription(description);
            // Add field for each jobs category
            let jobTypeIDArray = new Array();
            jobTypeIDArray.push(["Tank", [1, 3, 32, 37]]);
            jobTypeIDArray.push(["Healer", [6, 26, 33]]);
            jobTypeIDArray.push(["Mele", [2, 4, 29, 34]]);
            jobTypeIDArray.push(["Range", [5, 31, 38]]);
            jobTypeIDArray.push(["Crafter", [8, 9, 10, 11, 12, 13, 14, 15]]);
            jobTypeIDArray.push(["Gatherer", [16, 17, 18]]);
            for (const jobType of jobTypeIDArray) {
                // Filter to only select the job of this category
                const filteredList = characInfo.Character.ClassJobs.filter((x) => jobType[1].includes(x.ClassID));
                // Construct the values of the job category field (job name : level)
                const jobs = [];
                for (let job of filteredList) {
                    jobs.push(job.UnlockedState.Name + " : " + job.Level);
                }
                const fieldValue = jobs.join("\n") || "\u200b";
                messageEmbed.addField(jobType[0], fieldValue, true);
            }
            return messageEmbed;
        });
    }
}
exports.FFXIVLodestoneAPIUtils = FFXIVLodestoneAPIUtils;
//# sourceMappingURL=ffxiv-lodestone-api-utils.js.map