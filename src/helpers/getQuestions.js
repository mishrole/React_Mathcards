import { default as UUID } from "uuid";
import { generateOperation } from "../utils/generateOperation";
import { generateOperator } from "../utils/generateOperator";
import { generateOptions } from "../utils/generateOptions";

export const getQuestions = async () => {

    const data = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5', 'Pregunta 6'];

    const questions = data.map(question => {

        const currentNumbers = generateOperation();
        const currentOperator = generateOperator();
        
        let answer, operator, operatorName;

        if(currentOperator === 0) {
            operator = "+";
            operatorName = "Suma";
            answer = currentNumbers[0] + currentNumbers[1];
        } else {
            operator = "-";
            operatorName = "Resta";
            answer = currentNumbers[0] - currentNumbers[1];
        }

        const currentOptions = generateOptions(answer, 2);

        return {
            id: UUID.v4(),
            questionIndex: question,
            questionName: `¿Cuánto es ${ currentNumbers[0] } ${ operator } ${ currentNumbers[1] }?`,
            questionNumbers: currentNumbers,
            questionOperator: operator,
            questionOperatorName: operatorName,
            answerOptions: currentOptions,
            answerExpected: answer,
            userAnswer: ""
        }
    });

    return questions;
}