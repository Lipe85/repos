import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';

import { Container } from './styles';


export default function Repositorio(){

    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    let { repositorio } = useParams();

    useEffect(()=>{

        async function load(){
            const nomeRepo = repositorio;

            const [repositorioData, issuesData] =  await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    state: 'open',
                    per_page: 5
                })
            ])

            setRepo(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();

    }, [repositorio]);

    return(
        <Container>
            { repositorio }
        </Container>
    );
}
