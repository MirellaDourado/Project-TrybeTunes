import React, { Component } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      elements: [],
    };
  }

  async componentDidMount() {
    await this.consolando();
  }

  consolando = async () => {
    this.setState({ elements: await getFavoriteSongs(), loading: false });
  };

  rendering = () => {
    this.setState({ loading: true }, this.consolando);
  };

  render() {
    const { elements, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" id="favorites">
          <div className="banner" />
          { loading ? <Loading /> : (
            <>
              {' '}
              {
                elements.length === 0 ? (
                  <p id="favEmpty">
                    Você ainda não favoritou nada
                    {' '}
                    <FaHeartBroken color="red" />
                  </p>)
                  : elements.map((element) => (
                    <li key={ element.trackId }>
                      {' '}
                      <MusicCard track={ element } att={ this.rendering } />
                      {' '}
                    </li>))
              }
              {' '}

            </>
          )}
        </div>
      </>
    );
  }
}

export default Favorites;
