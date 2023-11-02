import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({

  droidSafeArea: {
    flex: 1,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'flax-start',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight+5 : 0
  },

  header: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  pageTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    width: '80%',
    fontFamily: 'font'
  },

  backIcon: {
    height: 28,
    width: 28
  },

  input: {
    width: '90%',
    borderBottomWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 23,
    fontFamily: 'font'
  },

  inputTitle: {
    width: '90%',
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: 25,
    fontFamily: 'font'
  },

  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 25
  },

  rowTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'font'
  },

  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
    marginTop: 25,
    padding: 15,
    backgroundColor: '#f09f48',
    borderRadius: 20,
    fontFamily: 'font'
  },




});
