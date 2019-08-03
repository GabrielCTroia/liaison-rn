import { connect } from 'react-redux';
import { HomeScreen } from '../components/HomeScreen';
import { fetchAudioRecords, deleteAudioRecord } from '../effects';
import { RootState } from '../../../redux/types';
import { Dispatch, bindActionCreators } from 'redux';
import { saveAudioRecord } from '../effects';


const mapStateToProps = ({ studio }: RootState) => ({
  audioRecords: studio.audioRecords,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      fetch: fetchAudioRecords,
      save: saveAudioRecord,
      delete: deleteAudioRecord,
    },
    dispatch
  );
}

export const HomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);