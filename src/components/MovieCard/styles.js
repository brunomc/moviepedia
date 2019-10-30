import {StyleSheet, Dimensions} from 'react-native';
import {metrics, fonts, colors} from '../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 50,
    alignItems: 'center',
  },
  titleRow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
  },
  titleHeader: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bodyContainer: {
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    padding: 50,
  },
  itemInputSearch: {
    backgroundColor: '#a0cee5',
    borderWidth: 1,
    borderColor: colors.primary,
    height: 35,
    width: '65%',
  },
  rowSubtitle: {
    justifyContent: 'space-between',
  },
  subtitle: {
    color: colors.white,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#a6a6a6',
    fontWeight: 'bold',
  },
});
