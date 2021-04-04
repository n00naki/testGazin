import React from 'react';
import { Jumbotron } from 'react-bootstrap';


const HomePage: React.FC = () => {
  return (
    <div className="container">
      <br />
      <Jumbotron>
        <h1>Bem Vindo!</h1>
        <p>
        Para iniciar o cadastro de desenvolvedor, utilize o menu acima, clicando em Developers
  </p>
      </Jumbotron>
    </div>
  )
}

export default HomePage;