import React, { useContext } from 'react';
import { OperationCard } from '../../components/home/OperationCard';
import { Container, Row, Col } from 'react-bootstrap'
import MainContext from '../../context/mainContext';

export const OperationGrid = () => {

    const { questions } = useContext(MainContext);
    console.log(questions)

    return (
        <Container>
            <Row>
                {
                    questions.map((question, index) => {
                        return (
                            <Col className="mt-4 mb-4" xs = { 12 } sm = { 6 } lg = { 4 } key = { `questionContainer-${ index }` }>
                                <OperationCard question = { question }/>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}