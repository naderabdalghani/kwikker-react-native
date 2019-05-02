import { StyleSheet } from 'react-native';

let styles;
export default styles = StyleSheet.create({
  Cover: {
    backgroundColor: '#1DA1F2',
    height: 120,
    zIndex: -5,
  },
  ProfileImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    marginTop: -30,
    marginLeft: 10,
    zIndex: 5,
  },
  ProfileImage: {
    flex: 1, width: null, height: null
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    height: 30,
    width: 30,
    marginLeft: 12,
  },
  dummyElement: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '70%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  datePickerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  datePickerText: {
    color: 'black',
    fontSize: 20,
  },
  datePickerPlaceholder: {
    color: '#9e9e9e',
    fontSize: 18,
  },
  dateText: {
    fontSize: 20,
    color: '#9e9e9e',
    alignSelf: 'center',
  },
  dateContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 40,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#AAB8C2',
  },
  camera: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  cameraMini: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  save: {
    color: '#1DA1F2', fontSize: 15, fontWeight: 'bold', marginTop: 15, marginRight: 10,
  },
  bgOverlay: {
    height: 120, backgroundColor: 'rgba(100, 100, 100, 0.5)', zIndex: 2, justifyContent: 'center',
  },
  camraCon: {
    width: 50, height: 50, backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: 25, justifyContent: 'center', alignSelf: 'center',
  },
  profileOverlay: {
    height: 80, backgroundColor: 'rgba(100, 100, 100, 0.5)', zIndex: 2, justifyContent: 'center',
  },
  camraMiniCon: {
    width: 40, height: 40, backgroundColor: 'rgba(200, 200, 200, 0.5)', borderRadius: 20, justifyContent: 'center', alignSelf: 'center',
  }
});
