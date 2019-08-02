import { connect } from 'react-redux';
import { HomeScreen } from '../components/HomeScreen';
import { fetchAudioRecords } from '../actions';
import { Dispatch } from 'redux';
import { RootState } from '../../../redux/types';
// import console = require('console');
// import console = require('console');

const mapStateToProps = ({ studio }: RootState) => ({
  audioRecords: studio.audioRecords,
});

export const HomeScreenContainer = connect(
  mapStateToProps,
  (dispatch: Dispatch) => ({
    fetch: () => fetchAudioRecords(dispatch),
  })
)(HomeScreen); 