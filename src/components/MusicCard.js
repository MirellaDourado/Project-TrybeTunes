import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      save: false,
    };
  }

  async componentDidMount() {
    await this.getFavorite();
  }

  async componentDidUpdate() {
    await this.getFavorite();
  }

  getFavorite = async () => {
    const { track } = this.props;
    const favorites = await getFavoriteSongs();
    const wasFavorite = favorites.find((music) => (
      music.trackId === track.trackId));
    if (wasFavorite) {
      this.setState(
        {
          save: wasFavorite,
        },
      );
    }
  };

  handleSave = async ({ target }) => {
    const { track, att } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong(track);
      this.setState({
        save: true,
      });
    } else {
      await removeSong(track);
      this.setState({
        save: false,
      });
    }
    this.setState({
      loading: false,
    });
    att();
  };

  render() {
    const { track } = this.props;
    const { loading, save } = this.state;
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
                onChange={ this.handleSave }
                checked={ save }
              />
            </div>
            <hr />
            {' '}

          </>) : <Loading />
    );
  }
}

MusicCard.defaultProps = {
  att: () => {},
};

MusicCard.propTypes = {
  track: PropTypes.PropTypes.shape().isRequired,
  att: PropTypes.func,
};

export default MusicCard;
