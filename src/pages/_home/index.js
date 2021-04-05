import React, { useContext } from 'react';
import { OperationCard } from '../../components/home/OperationCard';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import MainContext from '../../context/mainContext';

export const OperationGrid = () => {

    const { questions } = useContext(MainContext);

    return (

        <>
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Mathcards</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Link className="nav-link" to={`/home`}>Home</Link>
                    </Nav>
                </Navbar>
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
        </>

        
    )
}