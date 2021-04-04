// import React, { useState, useContext, useMemo } from 'react';
import React, { useState } from 'react';
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
            <Operation src = { url } onChange = { handleChange } />
        </>
    )
}