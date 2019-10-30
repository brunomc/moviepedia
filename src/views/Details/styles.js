import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowButtonWatch: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonWatch: {backgroundColor: '#404040'},
  buttonWatchText: {fontWeight: 'bold'},
  rowOverview: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowOverviewText: {padding: 10, lineHeight: 25, color: '#c6c6c6'},
  actorsText: {
    color: '#c6c6c6',
    flexShrink: 1,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  colActor: {padding: 5, margin: 5, width: 80},
  error: {
    color: colors.white,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
