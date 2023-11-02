import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({

  droidSafeArea: {
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'flax-start',
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight+5 : 0
  },

  header: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  pageTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    width: '80%',
    fontFamily: 'font'
  },

  addIcon: {
    height: 35,
    width: 35
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },

  group: {
    color: '#fff',
    backgroundColor: '#f09f48',
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 17,
    textAlign: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    fontFamily: 'font'
  },

  deleteIcon: {
    height: 27,
    width: 27
  },

  block: {
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#242424',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'font'
  },

  description: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'font'
  },

  buttons: {
    width: '12%', 
    alignItems: 'flex-end', 
    justifyContent: 'center'
  }
});
