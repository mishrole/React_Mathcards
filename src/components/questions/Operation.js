import React, { useContext } from "react";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useParams, generatePath, useHistory } from "react-router-dom";
import MainContext from "../../context/mainContext";

export const Operation = ({ src, onChange = () => {} }) => {
  const history = useHistory();

  const { questionId } = useParams();
  const { questions, updateUserAnswer } = useContext(MainContext);

  const currentQuestion = questions.find(({ id }) => id === questionId);

  const getCurrentIndex = (object, currentId) => {
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop].id === currentId.id) {
          return prop;
        }
      }
    }
  };

  const objectQuestions = { ...questions };
  const currentIndex = getCurrentIndex(objectQuestions, currentQuestion);

  const handleClickPrevious = () => {
    const previousIndex = parseInt(currentIndex) - 1;
    let previousObject;

    if (previousIndex < 0) {
      previousObject = Object.values(objectQuestions)[
        parseInt(questions.length) - 1
      ];
    } else {
      previousObject = Object.values(objectQuestions)[previousIndex];
    }

    let questionId = previousObject.id;
    history.push(generatePath("/question/:questionId", { questionId }));
  };

  const handleClickNext = () => {
    const nextIndex = parseInt(currentIndex) + 1;
    const nextObject = Object.values(objectQuestions)[nextIndex];
    let questionId;

    if (nextIndex < questions.length) {
      questionId = nextObject.id;
      history.push(generatePath("/question/:questionId", { questionId }));
    } else {
      questionId = Object.values(objectQuestions)[0].id;
      history.push(generatePath("/question/:questionId", { questionId }));
    }
  };

  const handleClickOptions = (e) => {
    updateUserAnswer(questions, questionId, Number(e.target.innerText));
    console.log(questions);
  }
  
  return (
    <Container>
      <Row>
        {currentQuestion === undefined ? (
          history.push(generatePath("/home"))
        ) : (
          <Col xs={12} md={6} className="mt-4 mb-4 mx-auto">
            <Card>
              <Card.Header className="text-center">
                {currentQuestion.questionIndex}
              </Card.Header>
              <Card.Body>
                <Card.Title className="text-center mt-3 mb-5" as="h5">
                  {currentQuestion.questionName}
                </Card.Title>
                <Card.Text></Card.Text>
                <Row className="mt-4 mb-3 text-center d-flex">
                    {
                        currentQuestion.userAnswer === ""
                        ?
                        (
                            currentQuestion.answerOptions.map((options, index) => (
                                <Col xs={4} key={`options-${index}`}>
                                    <Button variant="primary" value = { options } onClick = { handleClickOptions } >{options}</Button>
                                </Col>
                              ))
                        )
                        :
                        (
                            currentQuestion.userAnswer === currentQuestion.answerExpected
                            ?
                            (
                                <div className="d-flex flex-column col-sm-12">
                                    <Alert variant = "success" className = "text-center">
                                    <div className="mt-4 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#198754" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                        </svg>
                                       
                                    </div>
                                    <h1 className="pb-4">¡Correcto!</h1>
                                    La respuesta es { currentQuestion.answerExpected}
                                    </Alert>
                                </div>
                            )
                            :
                            (
                                <div className="d-flex flex-column col-sm-12">
                                    <Alert variant = "danger" className = "text-center">
                                    <div className="mt-4 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#dc3545" className="bi bi-emoji-frown" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                    </svg>
                                    </div>
                                    <h1 className="pb-4">¡Oh no!</h1>
                                    La respuesta correcta es { currentQuestion.answerExpected}
                                    </Alert>
                                </div>
                            )
                        )
                    }
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      <div className="d-flex justify-content-around">
        <Button variant="secondary" onClick = { handleClickPrevious }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>{" "}
          Anterior
        </Button>
        <Button variant="secondary" onClick = { handleClickNext }>
          Siguiente{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </Button>
      </div>
    </Container>
  );
};
