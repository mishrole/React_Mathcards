// import produce from 'immer';
import { useState, useEffect } from 'react';
import { getQuestions } from '../helpers/getQuestions';

export const useQuestions = () => {
    
    const [state, setState] = useState({
        data: []
    });

    // Get questions + UUID

    useEffect(() => {
        getQuestions()
        .then(question => {
            setState({
                data: question
            })
        })
    }, []);

    // Update Answer (context, id, newAnswer)

    const updateUserAnswer = (questions, questionId, userAnswer) => {

        const question = questions.find(({ id }) =>  id === questionId);

        if(question) {
            setState(() => {
                question.userAnswer = userAnswer;
                return { data: Object.assign(questions, question) }
            })
        }
    };

    return { state, updateUserAnswer };
}
