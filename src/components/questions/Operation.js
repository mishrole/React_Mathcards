import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useParams, generatePath, useHistory } from "react-router-dom";
import MainContext from "../../context/mainContext";

export const Operation = ({ src, onChange = () => {} }) => {
  const history = useHistory();

  const { questionId } = useParams();
  const { questions, updateUserAnswer } = useContext(MainContext);

  const [btnState, setBtnState] = useState("active");

  const [{ url }, setState] = useState({
    url: src,
    // type: "recording"
  });

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
    // if(e.target.innerText === currentQuestion.answerExpected) {
    //     e.target.classList = 'btn-secondary'
    // }
    // //     setBtnState("disabled");
    updateUserAnswer(questions, questionId, Number(e.target.innerText));
    console.log(questions);
  }

  useEffect(() => {
    setState({ url: src });
  }, [src]);

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
                <Card.Title className="text-center" as="h5">
                  {currentQuestion.questionName}
                </Card.Title>
                <Card.Text></Card.Text>
                <Row className="mt-5 mb-3 text-center d-flex">
                    {/* <Col xs = { 4 }>
                        <Button variant="primary" value = { currentQuestion.answerOptions[0] } onClick = { handleClickOptions } >{currentQuestion.answerOptions[0]}</Button>
                    </Col>
                    <Col xs = { 4 }>
                        <Button variant="primary" value = { currentQuestion.answerOptions[1] } onClick = { handleClickOptions } >{currentQuestion.answerOptions[1]}</Button>
                    </Col>
                    <Col xs = { 4 }>
                        <Button variant="primary" value = { currentQuestion.answerOptions[2] } onClick = { handleClickOptions } >{currentQuestion.answerOptions[2]}</Button>
                    </Col> */}
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
                                    <div className="mt-5 mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                        </svg>
                                    </div>
                                    <Alert variant = "success" className = "mx-auto text-center">
                                    La respuesta correcta es { currentQuestion.answerExpected}
                                    </Alert>
                                </div>
                            )
                            :
                            (
                                <Alert variant = "secondary">
                                La respuesta correcta es { currentQuestion.answerExpected}
                                </Alert>
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
