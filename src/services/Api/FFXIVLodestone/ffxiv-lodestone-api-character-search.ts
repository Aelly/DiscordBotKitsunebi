export module FFXIVCharacterSearch {
    export interface Pagination {
        Page: number;
        PageNext?: any;
        PagePrev?: any;
        PageTotal: number;
        Results: number;
        ResultsPerPage: number;
        ResultsTotal: number;
    }

    export interface Result {
        Avatar: string;
        FeastMatches: number;
        ID: number;
        Lang: string;
        Name: string;
        Rank?: any;
        RankIcon?: any;
        Server: string;
    }

    export interface RootObject {
        Pagination: Pagination;
        Results: Result[];
    }

}

