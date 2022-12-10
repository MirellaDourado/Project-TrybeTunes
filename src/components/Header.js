import React, { useEffect, useState } from 'react';
import { BiHeart, BiSearchAlt } from 'react-icons/bi';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, [])

  return (
    <header data-testid="header-component">
      {user ? (
        <>
          <h1>TrybeTunes</h1>
          <nav>
            <ul>
              <Link to="/search">
                <BiSearchAlt size="26px" />
                <li data-testid="link-to-search">
                  Busca
                </li>
              </Link>
              <Link to="/favorites">
                <BiHeart size="26px" />
                <li data-testid="link-to-favorites">Favoritos</li>
              </Link>
              <Link to="/profile">
                <HiUserCircle size="26px" />
                <li data-testid="link-to-profile">Perfil</li>
              </Link>
            </ul>
          </nav>
          <hr />
          <div id="profileInf">
            {user.image === undefined ? <HiUserCircle className="userIcon" />
              : (
                <img
                  alt={ `Imagem de ${user.name}` }
                  src={ user.image }
                  onError={ ({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = 'https://developers.google.com/static/maps/documentation/maps-static/images/error-image-generic.png';
                    currentTarget.alt = 'Imagem indefinida';
                  } }
                />
              )}
            <p data-testid="header-user-name">
              { user.name }
            </p>
          </div>
        </>) : <Loading />}
    </header>
  );
}

export default Header;
