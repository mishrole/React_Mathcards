import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
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

  const handleClickOptions = async (e) => {
    setBtnState("disabled");
    updateUserAnswer(questions, questionId, e.target.innerText);
    // alert(`${e.target.innerText}`)
    if(e.target.innerText === currentQuestion.answerExpected) {
        e.target.style.background = "red"
    }
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
                <Row className="mt-5 mb-3 text-center">
                  {currentQuestion.answerOptions.map((options, index) => (
                    <Col xs={4} key={`options-${index}`}>
                      {
                          btnState === "active" ?
                          (
                            <Button variant="primary" value = { options } onClick = { handleClickOptions } >{options}</Button>
                          )
                          :
                          (
                            <Button variant="primary" disabled>{options}</Button>
                          )
                      }
                    </Col>
                  ))}
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
