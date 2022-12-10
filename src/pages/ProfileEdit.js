import React, { useEffect, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

function ProfileEdit() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const gettingUser = async () => {
    const user = await getUser();

    setName(user.name);
    setEmail(user.email);
    setImage(user.image);
    setDescription(user.description);
    };
    
    gettingUser();
  })

  const handleChanging = ({ target }) => {
    if (target.id === 'userName') setName(target.value);
    if (target.id === 'userEmail') setEmail(target.value);
    if (target.id === 'userDescription') setDescription(target.value);
    if (target.id === 'userImage') setImage(target.value);
  };

  const saveUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateUser({
      name,
      email,
      image,
      description,
    });
    setLoading(false);
    setUpdated(true);
  };

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
                    onChange={ handleChanging }
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
                    onChange={ handleChanging }
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
                    onChange={ handleChanging }
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
                    onChange={ handleChanging }
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  onClick={ saveUser }
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

export default ProfileEdit;
