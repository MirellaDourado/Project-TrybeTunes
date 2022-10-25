import React, { Component } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      updated: false,
    };
  }

  componentDidMount() {
    this.gettingUser();
  }

  gettingUser = async () => {
    const user = await getUser();

    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  };

  handleChanging = ({ target }) => {
    if (target.id === 'userName') this.setState({ name: target.value });
    if (target.id === 'userEmail') this.setState({ email: target.value });
    if (target.id === 'userDescription') this.setState({ description: target.value });
    if (target.id === 'userImage') this.setState({ image: target.value });
  };

  saveUser = async (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name,
      email,
      image,
      description,
    });
    this.setState({ loading: false, updated: true });
  };

  render() {
    const { name, email, image, description, updated, loading } = this.state;
    return (
      <>
        <Header />
        { updated && <Redirect to="/profile" /> }
        <div data-testid="page-profile-edit" id="profileEdit">
          { loading ? <Loading /> : (
            <>
              <div className="banner" />
              <form>
                <div className="imgEdit">
                  {image === '' ? <HiUserCircle className="userIcon" /> : <img
                    src={ image }
                    data-testid="profile-image"
                    alt={ `Foto de ${name}` }
                    onError={ ({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = 'https://developers.google.com/static/maps/documentation/maps-static/images/error-image-generic.png';
                      currentTarget.alt = 'Imagem indefinida';
                    } }
                  />}
                  <label htmlFor="userImage">
                    Imagem
                    <input
                      type="text"
                      data-testid="edit-input-image"
                      value={ image }
                      required
                      id="userImage"
                      onChange={ this.handleChanging }
                    />
                  </label>
                </div>
                <div className="informationEdit">
                  <label htmlFor="userName">
                    Nome
                    <input
                      type="text"
                      required
                      data-testid="edit-input-name"
                      value={ name }
                      id="userName"
                      onChange={ this.handleChanging }
                    />
                  </label>
                  <label htmlFor="userEmail">
                    Email
                    <input
                      required
                      pattern=".+@globex\.com"
                      type="email"
                      data-testid="edit-input-email"
                      value={ email }
                      id="userEmail"
                      onChange={ this.handleChanging }
                    />
                  </label>
                  <label htmlFor="userDescription">
                    Descrição
                    <textarea
                      required
                      type="text"
                      data-testid="edit-input-description"
                      value={ description }
                      id="userDescription"
                      onChange={ this.handleChanging }
                    />
                  </label>
                  <button
                    data-testid="edit-button-save"
                    type="submit"
                    onClick={ this.saveUser }
                    disabled={ [name, email, image, description].some((value) => (
                      value.length === 0
                    )) }
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
