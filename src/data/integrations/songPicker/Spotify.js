import {SearchSpotify, SpotifyToken} from '_data/urls';
import fetchHelperSpotify from '../fetchHelperSpotify';

export const initializeSpotify = () => {
  return fetchHelperSpotify(
    SpotifyToken,
    {
      method: 'POST',
      body: 'grant_type=client_credentials',
    },
    true,
  );
};

export const searchSongSpotify = (searchValue, token) => {
  const search = searchValue.replace(' ', '+');
  return fetchHelperSpotify(SearchSpotify(search), {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });
};
