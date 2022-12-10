import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import loadingGif from '../images/loadingGif.gif';

function MusicCard({ track, att }) {
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);

  const getFavorite = async () => {
    const favorites = await getFavoriteSongs();
    const wasFavorite = favorites.find((music) => (
      music.trackId === track.trackId));
    if (wasFavorite) setSave(wasFavorite)
  };

  useEffect(() => {
    getFavorite()
  }, [])

  useEffect(() => {
    getFavorite();
  }, [save])

  const handleSave = async ({ target }) => {
    setLoading(true);
    if (target.checked) {
      await addSong(track);
      setSave(true)
    } else {
      await removeSong(track);
      setSave(false)
    }
    setLoading(false);
    att();
  };

  return (
    !loading
      ? (
        <>
          <div className="musica">
            <p>{track.trackName}</p>
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
            </audio>
            <label htmlFor={ track.trackId }> Favorita </label>
            <input
              type="checkbox"
              id={ track.trackId }
              data-testid={ `checkbox-music-${track.trackId}` }
              onChange={ handleSave }
              checked={ save }
            />
          </div>
          <hr />
          {' '}

        </>) : <img src={ loadingGif } alt='Loading...'/>
  );
}

MusicCard.defaultProps = {
  att: () => {},
};

MusicCard.propTypes = {
  track: PropTypes.PropTypes.shape().isRequired,
  att: PropTypes.func,
};

export default MusicCard;
