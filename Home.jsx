import React from 'react';
import Main from '../template/Main'

const Home = () => (
    <Main icon="home" title="Início" subtitle="Primeiro Projeto do capítulo de React.">
        <div className='display-4'> Bem Vindo!</div>
        <hr />
        <p className="mb-0"> Sistema para exemplificar a construção de um cadastro desenvolvido em React!</p>
    </Main>
);
// arrumei os parênteses das funções home e tirei as chaves
export default Home;