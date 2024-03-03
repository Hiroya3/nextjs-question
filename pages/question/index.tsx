import {NextPage} from "next";
import Layout from "../../components/Layout";
import {ChangeEvent, JSX, useState} from "react";
import {questions} from "../../utils/questions";
import {QuestionType} from "../../interfaces/types/question";
import {Answer} from "../../interfaces/types/answer";
import styles from './style.module.css';

const QuestionPage: NextPage = () => {

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0)
    const [currentAnswer, setCurrentAnswer] = useState<Answer>('')
    const [answers, setAnswers] = useState<Array<Answer>>([]) // [No1の回答,No2の回答,[No3の回答1/No3の回答2],No4の回答 ]

    // 回答入力時の制御
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentAnswer(e.target.value);
    };

    // 回答取得
    const getAnswer = (idx: number, questionType: QuestionType): Answer => {
        // 回答済みであれば取得して返す
        if (idx < answers.length) { // 順番に回答していく
            return answers[idx]
        }

        // なければtypeに応じて返す
        switch (questionType) {
            case QuestionType.text:
                return ''
            case QuestionType.number:
            case QuestionType.singleChoice:
            case QuestionType.multiChoice:
                return 0
        }
    }

    // 次へボタンを押した時の処理
    const handleNextQuestion = () => {
        // 現在位置を考慮したユーザーの回答保存
        const newAnswers =
            currentQuestionIdx == answers.length ?
                [...answers, currentAnswer] : // 最新の回答なので追加していく
                answers.map((a, i) => i == currentQuestionIdx ?
                    currentAnswer : // 回答の上書き
                    a
                );

        setAnswers(newAnswers)
        setCurrentAnswer(answers[currentQuestionIdx + 1] || '')

        // 次の質問へ移動
        setCurrentQuestionIdx(currentQuestionIdx + 1)
    }

    // 戻るボタンを押した時の処理
    const handlePreviousQuestion = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1)
            setCurrentAnswer(answers[currentQuestionIdx - 1] || '')
        }
    }

    // 提出を押した時の処理a
    const handleSubmit = (): JSX.Element => {
        return (
            <div>aaaa</div>

        );
    }

    // 質問を構築（TODO : componentへ移動）
    const buildQuestionElement = (questionType: QuestionType): JSX.Element => {
        switch (questionType) {
            case QuestionType.text:
                return (
                    <div>
                        <div className={styles.questionText}>
                            <h2>{questions[currentQuestionIdx].questionText}</h2>
                        </div>
                        <div className={styles.inputField}>
                            <input type="text"
                                   value={currentAnswer as string}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>
                )
            case QuestionType.number:
                return (
                    <div>
                        <div className={styles.questionText}>
                            <h2>{questions[currentQuestionIdx].questionText}</h2>
                        </div>
                        <div className={styles.inputField}>
                            <input type="number"
                                   value={currentAnswer as number}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>
                )
            case QuestionType.singleChoice:
                return (
                    <div className={styles.choiceContainer}>
                        <div className={styles.questionText}>
                            <h2>{questions[currentQuestionIdx].questionText}</h2>
                        </div>
                        {questions[currentQuestionIdx].choice.map((choice) => (
                            <div key={choice.id} className={styles.radioInput}>
                                <input
                                    type="radio"
                                    name="singleChoice"
                                    checked={currentAnswer as number === choice.id}
                                    onChange={() => {
                                        setCurrentAnswer(choice.id)
                                    }}
                                />
                                {choice.choiceText}
                            </div>
                        ))}
                    </div>
                )
        }
    }

    // console.log('index:' + currentQuestionIdx)
    // console.log('currentAnswer:' + currentAnswer)
    // console.log('answers:' + answers)

    return (
        <Layout title="Question | 質問">
            <div className={styles.container}>
                {currentQuestionIdx < questions.length ? (
                    <>
                        {/* 質問 */}
                        {buildQuestionElement(questions[currentQuestionIdx].type)}
                        <div className={styles.buttonContainer}>
                            {/* 戻るボタン */}
                            {currentQuestionIdx > 0 && (
                                <button onClick={handlePreviousQuestion} className={styles.button}>
                                    戻る
                                </button>
                            )}
                            {/* 次へボタン */}
                            <button onClick={handleNextQuestion} className={styles.button}>
                                {currentQuestionIdx === questions.length - 1 ? '提出' : '次へ'}
                            </button>
                        </div>
                    </>
                ) : (
                    // 結果ページ
                    <div className={styles.resultsContainer}>
                        {answers.map((answer, index) => (
                            <div key={index}>{answer}</div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
};

export default QuestionPage