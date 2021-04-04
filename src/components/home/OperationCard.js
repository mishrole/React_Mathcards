import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { generatePath, useHistory } from 'react-router-dom';

export const OperationCard = ( { question }) => {

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
                <Button variant="primary" onClick = { handleClick(question.id) }>Resolver</Button>
            </Card.Footer>
        </Card>
    )
}