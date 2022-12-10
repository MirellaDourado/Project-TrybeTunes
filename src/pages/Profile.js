import React, { Component, useEffect, useState } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

function Profile() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({});

  useEffect(() => {
    const renderProfile = async () => {
      setLoading(true)
      const a = await getUser();
      setLoading(false);
      setUser(a);
    };
    renderProfile()
  }, []); 

  return (
    <>
      <Header />
      <div data-testid="page-profile" id="profilePage">
        { loading ? <Loading /> : (
          <>
            <div className="banner" />
            <div id="profileArea">
              <div id="photoUser">
                {user.image === '' ? <HiUserCircle className="userIcon" /> : <img
                  src={ user.image }
                  data-testid="profile-image"
                  alt={ `Foto de ${user.name}` }
                  onError={ ({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://developers.google.com/static/maps/documentation/maps-static/images/error-image-generic.png';
                    currentTarget.alt = 'Imagem indefinida';
                  } }
                />}
                <h3>
                  User:
                </h3>
                <p>
                  { user.name }
                </p>
              </div>
              <div id="mailDescription">
                <h3>
                  Email:
                </h3>
                <p>
                  { user.email === '' ? 'Sem email' : user.email }
                </p>
                <h3>
                  Descrição:
                </h3>
                <p>
                  { user.description === '' ? 'Sem descrição' : user.description }
                </p>
              </div>
              <div id="btnArea">
                <Link to="/profile/edit">
                  <button type="button"> Editar perfil </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
