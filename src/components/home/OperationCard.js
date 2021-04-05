import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { generatePath, useHistory } from 'react-router-dom';
import MainContext from '../../context/mainContext';

export const OperationCard = ( { question }) => {

    const { questions } = useContext(MainContext);
    const history = useHistory();

    const handleClick = (questionId) => () => {
        history.push(generatePath("/question/:questionId", { questionId }));   
    }

    return (
        <Card className="text-center">
            <Card.Header>{ question.questionIndex }</Card.Header>
            <Card.Body>
                <Card.Title>Operación de { question.questionOperatorName }</Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {
                    question.userAnswer === ""
                    ?
                    (
                        <Button variant="primary" onClick = { handleClick(question.id) }>Resolver</Button>
                    )
                    :
                    (
                        <Button variant="secondary" disabled>Resuelto</Button>
                    )
                }
            </Card.Footer>
        </Card>
    )
}