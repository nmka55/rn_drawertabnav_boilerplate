import {StyleSheet} from 'react-native';
import theme from './Theme';

export default StyleSheet.create({
  containerBase: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
  },
  textFieldContainer: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: theme?.primaryColor + '60',
  },
  textField: {},
});
