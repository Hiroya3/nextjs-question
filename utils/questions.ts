import {Question, QuestionType} from "../interfaces/types/question";

// TODO csvとかを読み込むようにすると運用が楽かも
export const questions: Question[] = [
    {
        id: 1,
        questionText: "年齢は？",
        type: QuestionType.number,
    },
    {
        id: 2,
        questionText: "住んでいる市町村は？",
        type: QuestionType.text,
    },
    {
        id: 3,
        questionText: "性別は？",
        type: QuestionType.singleChoice,
        choice: [
            {
                id: 1,
                choiceText: "男性"
            },
            {
                id: 2,
                choiceText: "女性"
            }
        ]
    },
    // {
    //     id: 4,
    //     questionText: "以下で最近かかった病気は？（複数選択）",
    //     type: QuestionType.multiChoice,
    //     choice: [
    //         {
    //             id: 1,
    //             choiceText: "虫歯"
    //         },
    //         {
    //             id: 2,
    //             choiceText: "おたふく風邪"
    //         },
    //         {
    //             id: 3,
    //             choiceText: "デング熱"
    //         }
    //     ]
    // },
]