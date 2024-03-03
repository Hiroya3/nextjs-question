// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
    id: number;
    name: string;
};

// 質問のための型

export type Question = {
    id: number;
    questionText: string;
    type: QuestionType;
    choice?: Choice[]
}

export type Choice = {
    id: number
    choiceText: string
}

export enum QuestionType {
    text,
    number,
    singleChoice,
    multiChoice
}