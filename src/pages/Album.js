import PropTypes from 'prop-types';
import React, { Component, useEffect, useState } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

function Album({ match }) {
  const [tracks, setTracks] = useState([]);
  const [albumInfo, setAlbumInfo] = useState({});

  useEffect(() => {
    const gettingAlbuns = async () => {
      const value = match.params.id;
      const albumAll = await getMusics(value);
      setTracks(albumAll.filter((_track, index) => index !== 0))
      setAlbumInfo(albumAll[0])
    }
    gettingAlbuns();
  }, []);

  return (
    <>
      <Header />
      <div data-testid="page-album" id="albumTracks">
        <div className="banner" />
        <div id="albumInfo">
          <img
            src={ albumInfo.artworkUrl100 }
            alt={ `Álbum ${albumInfo.collectionName}` }
          />
          <div>
            <h2 data-testid="album-name">
              {' '}
              {albumInfo.collectionName}
            </h2>
            <h3 data-testid="artist-name">
              {' '}
              { albumInfo.artistName }
              {' '}
            </h3>
          </div>
        </div>
        <ul>
          {tracks.map((track) => (
            <li key={ track.trackId }>
              {' '}
              <MusicCard track={ track } />
              {' '}
            </li>))}
        </ul>
      </div>
    </>
  );
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
