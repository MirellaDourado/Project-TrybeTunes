import React, { useEffect, useState } from 'react';
import { MdSearchOff } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import { getUser } from '../services/userAPI';

function Search () {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [artist, setArtist] = useState('');
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const gettingUser = async () => {
      const person = await getUser();
      setUser(person);
    }

    gettingUser();
  }, [])

  const handleInput = (event) => {
    const a = event.target.value
    const minLength = 2;
    setBtnDisabled(a.length < minLength)
    setSearch(a)
  };

  const letsSearch = async () => {
    setResult(await searchAlbumsAPIs(search));
    setArtist(search);
    setSearch('');
    setClicked(true);
  };

  return (
    <>
      <Header />
      <div data-testid="page-search" id="search">
        {user ? (
          <>
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                onChange={ handleInput }
                value={ search }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ btnDisabled }
                onClick={ letsSearch }
              >
                {' '}
                Pesquisar
                {' '}
              </button>
            </form>
            {clicked ? (
              <>
                <p id="resultOf">
                  Resultado de álbuns de:
                  {' '}
                  { artist }
                </p>
                <div>
                  {result.length !== 0 ? result.map((single, index) => ((
                    <Link
                      to={ `/album/${single.collectionId}` }
                      data-testid={ `link-to-album-${single.collectionId}` }
                      key={ index }
                    >
                      <li>
                        <img
                          src={ single.artworkUrl100 }
                          alt={ `Imagem do álbum ${single.collectionName}` }
                        />
                        <p>
                          {single.collectionName}
                        </p>
                        <p>
                          {single.artistName}
                        </p>
                      </li>
                    </Link>)))
                    : (
                      <div id="notFound">
                        <p>
                          Nenhum álbum foi encontrado
                          {' '}
                          <MdSearchOff size="90px" />
                        </p>
                        {' '}
                      </div>)}
                </div>
                {' '}

              </>) : <p id="defaultP">Digite o nome do artista</p>}
            {' '}

          </>)
          : <Loading />}
      </div>
    </>
  );
}

export default Search;
