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

export type UrlParamsT = {
    subject:string;
    test:string;
    source:string;
};

 export type TaskProgressT = {
    status:boolean;
    done:boolean;
};

export type UserDataT = {
    username:string;
    tel:string;
    email:string;
};

export type PostDataT = {
    subject:string;
    test:string;
    source:'platform'|'website';
    testSubcategory:string;
    wrongAnswers:number[];
    score:number;
    maxScore:number;
    user:UserDataT;
};