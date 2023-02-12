import {Colors} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flex1: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  containerBase: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  innerContainerCentered: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  innerRowContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
  },
  scrollView: {
    flex: 0,
    flexGrow: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  textFieldContainer: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors?.primary + '50',
  },
  textField: {},
});
