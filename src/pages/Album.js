import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
      albumInfo: {},
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const value = match.params.id;
    const albumAll = await getMusics(value);
    this.setState({
      tracks: albumAll.filter((_track, index) => index !== 0),
      albumInfo: albumAll[0],
    });
  }

  render() {
    const { tracks, albumInfo } = this.state;
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
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
