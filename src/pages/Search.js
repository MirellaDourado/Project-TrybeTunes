import React, { Component } from 'react';
import { MdSearchOff } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import { getUser } from '../services/userAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      search: '',
      result: [],
      artist: '',
      clicked: false,
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  handleInput = (event) => {
    const search = event.target.value;
    const minLength = 2;
    this.setState({
      btnDisabled: (search.length < minLength),
      search,
    });
  };

  letsSearch = async () => {
    const { search } = this.state;
    this.setState({
      result: await searchAlbumsAPIs(search),
      artist: search,
      search: '',
      clicked: true,
    });
  };

  render() {
    const { btnDisabled, result, search, artist, clicked, user } = this.state;
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
                  onChange={ this.handleInput }
                  value={ search }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ btnDisabled }
                  onClick={ this.letsSearch }
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
}

export default Search;
