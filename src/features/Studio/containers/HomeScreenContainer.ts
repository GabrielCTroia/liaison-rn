import { connect } from 'react-redux';
import { HomeScreen } from '../components/HomeScreen';
import { StudioState } from '../types';

const mapStateToProps = (state: StudioState) => ({
  audioRecords: state.audioRecords,
});

export const HomeScreenContainer = connect(mapStateToProps)(HomeScreen); 