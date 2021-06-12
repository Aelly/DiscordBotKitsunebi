export module FFXIVCharacterData {

    export interface AllStar {
        partition: number;
        spec: string;
        points: number;
        possiblePoints: number;
        rank: number;
        rankPercent: number;
        total: number;
    }

    export interface Encounter {
        id: number;
        name: string;
    }

    export interface AllStars {
        points: number;
        possiblePoints: number;
        partition: number;
        rank: number;
        rankPercent: number;
        total: number;
    }

    export interface Ranking {
        encounter: Encounter;
        rankPercent: number;
        medianPercent: number;
        lockedIn: boolean;
        totalKills: number;
        fastestKill: number;
        allStars: AllStars;
        spec: string;
        bestSpec: string;
        bestAmount: number;
    }

    export interface ZoneRanking{
        bestPerformanceAverage: number;
        medianPerformanceAverage: number;
        difficulty: number;
        metric: string;
        partition: number;
        zone: number;
        allStars: AllStar[];
        rankings: Ranking[];
    }

    export interface Character {
        Trials1: ZoneRanking;
        Trials2: ZoneRanking;
        Trials3: ZoneRanking;
        EdensGate: ZoneRanking;
        EdensVerse: ZoneRanking;
        EdensPromise: ZoneRanking;
        UltimateSB: ZoneRanking;
        UltimateShb: ZoneRanking;
    }

    export interface CharacterData {
        character: Character;
    }

    export interface RootObject {
        characterData: CharacterData;
    }

}

