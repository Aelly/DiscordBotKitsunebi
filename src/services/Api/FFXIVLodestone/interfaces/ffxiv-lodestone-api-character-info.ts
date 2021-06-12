export module FFXIVCharacterInfo {
    export interface UnlockedState {
        ID: number;
        Name: string;
    }

    export interface ActiveClassJob {
        ClassID: number;
        ExpLevel: number;
        ExpLevelMax: number;
        ExpLevelTogo: number;
        IsSpecialised: boolean;
        JobID: number;
        Level: number;
        Name: string;
        UnlockedState: UnlockedState;
    }

    export interface UnlockedState2 {
        ID?: number;
        Name: string;
    }

    export interface ClassJob {
        ClassID: number;
        ExpLevel: number;
        ExpLevelMax: number;
        ExpLevelTogo: number;
        IsSpecialised: boolean;
        JobID: number;
        Level: number;
        Name: string;
        UnlockedState: UnlockedState2;
    }

    export interface ClassJobsBozjan {
        Level?: any;
        Mettle?: any;
        Name: string;
    }

    export interface ClassJobsElemental {
        ExpLevel: number;
        ExpLevelMax: number;
        ExpLevelTogo: number;
        Level: number;
        Name: string;
    }

    export interface Attributes {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        19: number;
        20: number;
        21: number;
        22: number;
        24: number;
        27: number;
        33: number;
        34: number;
        44: number;
        45: number;
        46: number;
    }

    export interface Body {
        Creator?: any;
        Dye: number;
        ID: number;
        Materia: number[];
        Mirage: number;
    }

    export interface Bracelets {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage?: any;
    }

    export interface Earrings {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage?: any;
    }

    export interface Feet {
        Creator?: any;
        Dye: number;
        ID: number;
        Materia: number[];
        Mirage: number;
    }

    export interface Hands {
        Creator?: any;
        Dye: number;
        ID: number;
        Materia: number[];
        Mirage: number;
    }

    export interface Head {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage: number;
    }

    export interface Legs {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage: number;
    }

    export interface MainHand {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage: number;
    }

    export interface Necklace {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage?: any;
    }

    export interface Ring1 {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage?: any;
    }

    export interface Ring2 {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage?: any;
    }

    export interface SoulCrystal {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: any[];
        Mirage?: any;
    }

    export interface Waist {
        Creator?: any;
        Dye?: any;
        ID: number;
        Materia: number[];
        Mirage?: any;
    }

    export interface Gear {
        Body: Body;
        Bracelets: Bracelets;
        Earrings: Earrings;
        Feet: Feet;
        Hands: Hands;
        Head: Head;
        Legs: Legs;
        MainHand: MainHand;
        Necklace: Necklace;
        Ring1: Ring1;
        Ring2: Ring2;
        SoulCrystal: SoulCrystal;
        Waist: Waist;
    }

    export interface GearSet {
        Attributes: Attributes;
        ClassID: number;
        Gear: Gear;
        GearKey: string;
        JobID: number;
        Level: number;
    }

    export interface GrandCompany {
        NameID: number;
        RankID: number;
    }

    export interface Character {
        ActiveClassJob: ActiveClassJob;
        Avatar: string;
        Bio: string;
        ClassJobs: ClassJob[];
        ClassJobsBozjan: ClassJobsBozjan;
        ClassJobsElemental: ClassJobsElemental;
        DC: string;
        FreeCompanyId: string;
        FreeCompanyName: string;
        GearSet: GearSet;
        Gender: number;
        GrandCompany: GrandCompany;
        GuardianDeity: number;
        ID: number;
        Lang?: any;
        Name: string;
        Nameday: string;
        ParseDate: number;
        Portrait: string;
        PvPTeamId?: any;
        Race: number;
        Server: string;
        Title: number;
        TitleTop: boolean;
        Town: number;
        Tribe: number;
    }

    export interface RootObject {
        Achievements?: any;
        AchievementsPublic?: any;
        Character: Character;
        FreeCompany?: any;
        FreeCompanyMembers?: any;
        Friends?: any;
        FriendsPublic?: any;
        Minions?: any;
        Mounts?: any;
        PvPTeam?: any;
    }
}

