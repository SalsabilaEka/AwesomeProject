import React, { useState } from 'react';
import { Pressable, Text, SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet, Alert, PermissionsAndroid, TouchableOpacity, Linking, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/umkm';
    const [umkm, setUmkm] = useState('');
    const [produk, setProduk] = useState('');
    const [sektor, setSektor] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kontak, setKontak] = useState('');
    const [pemilik, setPemilik] = useState('');
    const [omzet, setOmzet] = useState('');
    const [status, setStatus] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [manualLatitude, setManualLatitude] = useState('');
    const [manualLongitude, setManualLongitude] = useState('');
    const [profileImage, setProfilImage] = useState(null);

    const selectImage = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return;
            }

            // Log and set the image
            console.log('Image Response:', response);
            setProfilImage(response.assets[0].uri); // Use uri to display the image
        });
    };

    const Permission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'App needs access to your location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
                getCurrentLocation();
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                setManualLatitude(latitude.toString()); // Update manual latitude input
                setManualLongitude(longitude.toString()); // Update manual longitude input
                console.log(latitude, longitude);
            },
            error => alert('Error', error.message),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const openMaps = () => {
        const { latitude, longitude } = currentLocation;
        if (latitude && longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            Linking.openURL(url);
        } else {
            alert('Location not available');
        }
    };

    const submit = () => {
        const data = {
            umkm: umkm,
            produk: produk,
            sektor: sektor,
            alamat: alamat,
            kontak: kontak,
            pemilik: pemilik,
            omzet: omzet,
            status: status,
            keterangan: keterangan,
            latitude: currentLocation ? currentLocation.latitude : parseFloat(manualLatitude),
            longitude: currentLocation ? currentLocation.longitude : parseFloat(manualLongitude),
            image: profileImage
        };

        fetch(jsonUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                Alert.alert('Notifikasi', 'Data tersimpan');
                // Reset form and location
                setUmkm('');
                setProduk('');
                setSektor('');
                setAlamat('');
                setKontak('');
                setPemilik('');
                setOmzet('');
                setStatus('');
                setKeterangan('');
                setCurrentLocation(null); // Reset location
                setManualLatitude(''); // Reset manual latitude input
                setManualLongitude(''); 
                setProfilImage('') // Reset image
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error', 'Gagal menyimpan data');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Tambah Data UMKM</Text>
                <ScrollView style={styles.form} contentContainerStyle={styles.scrollViewContent}>
                    <TextInput style={styles.input} placeholder="Nama Usaha" placeholderTextColor="#bbb" value={umkm} onChangeText={setUmkm} />
                    <TextInput style={styles.input} placeholder="Produk/Jasa" placeholderTextColor="#bbb" value={produk} onChangeText={setProduk} />
                    <TextInput style={styles.input} placeholder="Sektor Usaha" placeholderTextColor="#bbb" value={sektor} onChangeText={setSektor} />
                    <TextInput style={styles.input} placeholder="Alamat Usaha" placeholderTextColor="#bbb" value={alamat} onChangeText={setAlamat} />
                    <TextInput style={styles.input} placeholder="Kontak" placeholderTextColor="#bbb" value={kontak} onChangeText={setKontak} />
                    <TextInput style={styles.input} placeholder="Pemilik Usaha" placeholderTextColor="#bbb" value={pemilik} onChangeText={setPemilik} />
                    <TextInput style={styles.input} placeholder="Omzet Usaha" placeholderTextColor="#bbb" value={omzet} onChangeText={setOmzet} />
                    <TextInput style={styles.input} placeholder="Status Usaha" placeholderTextColor="#bbb" value={status} onChangeText={setStatus} />
                    <TextInput style={styles.input} placeholder="Keterangan" placeholderTextColor="#bbb" value={keterangan} onChangeText={setKeterangan} />

                    {/* Input for manual coordinates */}
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Latitude (Manual)"
                            placeholderTextColor="#bbb"
                            value={manualLatitude}
                            onChangeText={setManualLatitude}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Longitude (Manual)"
                            placeholderTextColor="#bbb"
                            value={manualLongitude}
                            onChangeText={setManualLongitude}
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Coordinates display */}
                    <Text>Koordinat Lokasi</Text>
                    <View>
                        <Text>Latitude: {currentLocation ? currentLocation.latitude : manualLatitude}</Text>
                        <Text>Longitude: {currentLocation ? currentLocation.longitude : manualLongitude}</Text>
                    </View>

                    {/* Location permission button */}
                    <View>
                        {currentLocation ? (
                            <TouchableOpacity onPress={openMaps}>
                                <View style={styles.mapButton}>
                                    <Text style={{ color: 'black' }}>Lihat pada Peta!</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={Permission}>
                                <View style={styles.locationButton}>
                                    <Text style={{ color: 'white' }}>Dapatkan Lokasi!</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Image upload */}
                    <Pressable onPress={selectImage} style={styles.imageContainer}>
                        {profileImage ? (
                            <Image style={styles.image} source={{ uri: profileImage }} />
                        ) : (
                            <Text>Upload Image</Text>
                        )}
                    </Pressable>

                    {/* Submit Button */}
                    <View style={styles.buttonContainer}>
                        <Button title="Simpan" color="#4CAF50" onPress={submit} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f3f3f3',
    },
    title: {
        paddingVertical: 18,
        backgroundColor: '#4B0082',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        borderRadius: 20
    },
    form: {
        padding: 10,
        marginBottom: 20,
    },
    scrollViewContent: {
        paddingBottom: 80, // Add space for the button at the bottom
    },
    input: {
        borderWidth: 1,
        borderColor: '#6A1B9A',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        marginVertical: 5,
        backgroundColor: 'white',
        color: '#333',
    },
    coordinatesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    locationBox: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    locationButtonContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    locationButton: {
        backgroundColor: '#4B0082', // Dark purple color
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8
    },
    mapButton: {
        backgroundColor: '#9370DB', // Light purple color
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8
    },
    imageContainer: {
        backgroundColor: '#fcfcfc',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 8,
        borderColor: '#6A1B9A',
        borderWidth: 1,
    },
    image: {
        width: 190,
        height: 190,
        borderRadius: 8,
    },
    buttonContainer: {
        marginVertical: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        overflow: 'hidden',
    },
});

export default Createdata;
