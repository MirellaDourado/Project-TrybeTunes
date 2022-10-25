import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      btnDisabled: true,
      loading: false,
      userCreated: false,
    };
  }

  handleInput = (event) => {
    const nome = event.target.value;
    const min = 3;

    if (nome.length >= min) {
      this.setState({
        name: nome,
        btnDisabled: false,
      });
    }

    if (nome.length < min) {
      this.setState({
        name: nome,
        btnDisabled: true,
      });
    }
  };

  CreatingUser = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({
      userCreated: true,
    });
  };

  render() {
    const { name, btnDisabled, loading, userCreated } = this.state;
    return (
      <>
        { userCreated && <Redirect to="/search" /> }
        <div data-testid="page-login" id="login">
          {loading ? <Loading />
            : (
              <>
                <main>
                  <div className="headphone">
                    <h1>
                      <span>Trybe</span>
                      <br />
                      {' '}
                      <span>Tunes</span>
                    </h1>
                    <span className="left" />
                    <span className="right" />
                  </div>
                  <label htmlFor="name">
                    <input
                      type="text"
                      id="name"
                      data-testid="login-name-input"
                      onChange={ this.handleInput }
                      value={ name }
                      placeholder="Insira seu nome"
                      autoComplete="off"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={ btnDisabled }
                    data-testid="login-submit-button"
                    onClick={ this.CreatingUser }
                  >
                    Entrar

                  </button>
                  <footer>
                    <p>Renderizado por Mirella Dourado</p>
                  </footer>
                </main>
                <div id="bannerLogin" />
              </>
            )}
        </div>
      </>
    );
  }
}

export default Login;
