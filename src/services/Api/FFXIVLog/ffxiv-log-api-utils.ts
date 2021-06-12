import { MessageEmbed } from "discord.js";
import { TYPES } from "./../../../types";
import { StringResolvable } from "discord.js";
import container from "../../../inversify.config";
import FFXIVLogsAPIGraphql from "./Calls/ffxiv-log-api-graphql";
import { FFXIVCharacterData } from "./Interfaces/ffxiv-log-api-character-data";

var AsciiTable = require("ascii-table");

export class FFXIVLogsAPIUtils {
    public static async getLogs(characterName: string): Promise<StringResolvable> {
        const ffLogsAPI: FFXIVLogsAPIGraphql = container.get<FFXIVLogsAPIGraphql>(TYPES.FFLogApi);

        const res: FFXIVCharacterData.RootObject = await ffLogsAPI.getLogs(characterName);

        if (res == null) return "Erreur de communication avec FFLogs";
        else if (res.characterData.character == null) return "Je n'ai pas trouvé de personnage à ce nom";

        let messageEmbed: MessageEmbed = new MessageEmbed().setTitle(characterName);

        FFXIVLogsAPIUtils.addFieldForZonRanking(
            res.characterData.character.Trials1,
            messageEmbed,
            "Trials I (Extreme)"
        );
        FFXIVLogsAPIUtils.addFieldForZonRanking(
            res.characterData.character.Trials2,
            messageEmbed,
            "Trials II (Extreme)"
        );
        FFXIVLogsAPIUtils.addFieldForZonRanking(
            res.characterData.character.Trials3,
            messageEmbed,
            "Trials III (Extreme)"
        );
        FFXIVLogsAPIUtils.addFieldForZonRanking(res.characterData.character.EdensGate, messageEmbed, "Eden's gate");
        FFXIVLogsAPIUtils.addFieldForZonRanking(res.characterData.character.EdensVerse, messageEmbed, "Eden's verse");
        FFXIVLogsAPIUtils.addFieldForZonRanking(
            res.characterData.character.EdensPromise,
            messageEmbed,
            "Eden's promise"
        );
        FFXIVLogsAPIUtils.addFieldForZonRanking(
            res.characterData.character.UltimateSB,
            messageEmbed,
            "Ultimate Stormblood"
        );
        FFXIVLogsAPIUtils.addFieldForZonRanking(
            res.characterData.character.UltimateShb,
            messageEmbed,
            "Ultimage Shadowbringer"
        );

        return messageEmbed;
    }

    private static addFieldForZonRanking(
        zoneRanking: FFXIVCharacterData.ZoneRanking,
        embedToAddTo: MessageEmbed,
        zoneTitle: string
    ): void {
        const table = new AsciiTable();

        let lineAdded: boolean = false;

        for (const ranking of zoneRanking.rankings) {
            const name = ranking.encounter.name;
            const percent = Math.floor(ranking.rankPercent);
            const bestSpec = ranking.bestSpec;
            const bestAmount = Math.floor(ranking.bestAmount);

            if (bestAmount != 0) {
                table.addRow(name, percent, bestSpec, bestAmount);
                lineAdded = true;
            }
        }

        if (lineAdded) embedToAddTo.addField(zoneTitle, "```" + `${table.toString()}` + "```", false);
    }
}
