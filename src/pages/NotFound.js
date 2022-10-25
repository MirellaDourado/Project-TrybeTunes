import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" id="notFound">
        <div>
          <h2>
            <span>404</span>
            <span>Ops! Página não encontrada</span>
          </h2>
          <Link to="./search">
            <button type="button">Voltar para a Busca</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
