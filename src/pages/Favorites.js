import React, { useEffect, useState } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Favorites() {
  const [loading, setLoading] = useState(false)
  const [elements, setElements] = useState([])

  useEffect(() => {
    const gettingFavoriteSongs = async () => {
      setElements(await getFavoriteSongs())
      setLoading(false);
    }
    gettingFavoriteSongs()
  })

  const rendering = () => {
    this.setState({ loading: true }, this.consolando);
  };

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
                    <MusicCard track={ element } att={ rendering } />
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

export default Favorites;
