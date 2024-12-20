import React from 'react'
import DataMahasiswa from './data/mahasiswa.json'
import { FlatList, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { faMars } from '@fortawesome/free-solid-svg-icons/faMars';
import { faVenus } from '@fortawesome/free-solid-svg-icons/faVenus';

const mahasiswa = () => {
  return (
    <FlatList
      data={DataMahasiswa}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
          <View style={ styles.card }>
            <View style={ styles.avatar }>
              <FontAwesomeIcon icon={faUserGraduate} size={30} 
              color={ item.gender == 'male' ? 'lightblue' : 'pink' } />
            </View>
            <View>
              <Text style={styles.cardtitle}>{item.first_name} {item.last_name}</Text>

              <FontAwesomeIcon 
                icon={item.gender == 'male' ? faMars : faVenus}
                color={item.gender == 'male' ? 'lightblue' : 'pink'}
                size={14}
              />

              {/* <Text>{item.gender}</Text> */}

              <Text>Kelas : {item.class}</Text>
              <Text>{item.latitude}, {item.longitude}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />

  )
}

export default mahasiswa

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 40,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7
  },
})
