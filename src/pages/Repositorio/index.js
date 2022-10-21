import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';
import { FaArrowLeft } from 'react-icons/fa';

import { Container, Owner, Loading, BackButton} from './styles';


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

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        );
    }

    return(
        <Container>

            <BackButton to={"/"}>
                <FaArrowLeft color="#000" size={30} />
            </BackButton>

            <Owner>
                <img src={ repo.owner.avatar_url } alt={ repo.owner.login } />
                <h1>{ repo.name }</h1>
                <p>{ repo.description }</p>
            </Owner>
        </Container>
    );
}
