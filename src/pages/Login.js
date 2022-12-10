import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

function Login() {
  const [name, setName] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const handleInput = (event) => {
    const nome = event.target.value;
    const min = 3;

    if (nome.length >= min) {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
    setName(nome)
  };

  const CreatingUser = async () => {
    setLoading(true);
    await createUser({ name });
    setUserCreated(true);
  };

    return (
      userCreated === true ? <Redirect to="/search" /> :
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
                      onChange={ handleInput }
                      value={ name }
                      placeholder="Insira seu nome"
                      autoComplete="off"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={ btnDisabled }
                    data-testid="login-submit-button"
                    onClick={ CreatingUser }
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
    );
}

export default Login;
