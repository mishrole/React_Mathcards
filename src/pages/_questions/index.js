// import React, { useState, useContext, useMemo } from 'react';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Operation } from "../../components/questions/Operation";
export const OperationQuest = () => {

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
                </Nav>
            </Navbar>

            <Container>
                <Operation src = { url } onChange = { handleChange } />
            </Container>
        </>
    )
}