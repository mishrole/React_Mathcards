import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, generatePath, useHistory } from 'react-router-dom';
import MainContext from '../../context/mainContext';

export const Operation = ({ src, onChange = () => {} }) => {
    
    const history = useHistory();
  
    const { questionId } = useParams();
    const { questions, updateUserAnswer } = useContext(MainContext);

    const [{ url }, setState] = useState({
        url: src,
        // type: "recording"
    });

    const currentQuestion = questions.find(({ id }) =>  id === questionId);

    const getCurrentIndex = (object, currentId) => {
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if(object[prop].id === currentId.id) {
                return prop
                }
            }
        }
    }

    const objectQuestions = {...questions};
    const currentIndex = getCurrentIndex(objectQuestions, currentQuestion);

    const handleClickPrevious = () => {
        const previousIndex = parseInt(currentIndex)-1;
        let previousObject;
    
        if(previousIndex < 0) {
          previousObject = Object.values(objectQuestions)[parseInt(questions.length)-1];
        } else {
          previousObject = Object.values(objectQuestions)[previousIndex];
        }
    
        let questionId = previousObject.id;
        history.push(generatePath("/question/:questionId", { questionId }));
    }

    const handleClickNext = () => {
        const nextIndex = parseInt(currentIndex)+1;
        const nextObject = Object.values(objectQuestions)[nextIndex];
        let questionId;
    
        if(nextIndex < questions.length) {
          questionId = nextObject.id;
          history.push(generatePath("/question/:questionId", { questionId }));
        } else {
          questionId = Object.values(objectQuestions)[0].id;
          history.push(generatePath("/question/:questionId", { questionId }));
        }
    }

    useEffect(() => {
        setState({ url: src });
      }, [src]);

    return (        
        <Container>
            <Row>
                {
                    questions === undefined
                    ? 
                    (
                        history.push(generatePath("/home"))
                    )
                    :
                    (
                        <Col xs = { 12 } md = { 6 } className="mt-4 mb-4 mx-auto">
                            <Card>
                                <Card.Header className="text-center">{ currentQuestion.questionIndex }</Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-center" as="h5">{ currentQuestion.questionName }</Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <Row className = "mt-5 mb-3 text-center">
                                        {
                                            currentQuestion.answerOptions.map((options, index) => (
                                                <Col xs = { 4 } key = {`options-${index}`}>
                                                    <Button variant="primary">{options}</Button>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                
            </Row>
        </Container>
    )
}