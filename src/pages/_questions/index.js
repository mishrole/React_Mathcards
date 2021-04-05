// import React, { useState, useContext, useMemo } from 'react';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Operation } from "../../components/questions/Operation";
// import MainContext from '../../context/mainContext';

export const OperationQuest = () => {

    // const { questionId } = useParams();
    // const { questions } = useContext(MainContext);

    // const question = useMemo(() => {
    //     return questions.find(({ id }) => id === questionId );
    // }, [questionId, questions]);

    const [url, setUrl] = useState("");

    const handleChange = ({ url }) => {
        setUrl(url);
    };

    return (

        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Mathcards</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link className="nav-link" to={`/home`}>Home</Link>
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                {/* <Button variant="outline-info">Search</Button> */}
            </Navbar>

            <Container>
                <Operation src = { url } onChange = { handleChange } />
            </Container>
        </>
    )
}