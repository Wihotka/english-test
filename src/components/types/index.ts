type LabelT = {
    label:string;
    name:string;
    img?:string;
};

type TaskT = {
    id:string;
    option:{
        sixToTen:{
            img?:string[];
            text?:string[];
            labels?:LabelT[];
            correctAnswer?:string | string[];
            questions?:any[];
            words?:any[];
        },
        elevenToFourteen:{
            img?:string[];
            text?:string[];
            labels?:LabelT[];
            correctAnswer?:string;
            questions?:any[];
            words?:any[];
        }
    }
};

export type StageT = {
    id:string,
    question:string,
    theme:string,
    tasks:TaskT[]
};