import React, { useEffect, useState } from 'react';
import { Pressable, Text, SafeAreaView, View, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons/faPenSquare';
import { faShop } from '@fortawesome/free-solid-svg-icons/faShop';
import { launchImageLibrary } from 'react-native-image-picker';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Editdata = () => {
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
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => setDataUser(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

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
            console.log('Image Response:', response);
            setProfileImage(response.assets[0].uri); // Set the image URI to the state
        });
    };

    const submit = () => {
        if (!selectedUser) {
            alert("Pilih data untuk diedit");
            return;
        }

        const data = {
            umkm,
            produk,
            sektor,
            alamat,
            kontak,
            pemilik,
            omzet,
            status,
            keterangan,
            latitude: parseFloat(latitude) || null,
            longitude: parseFloat(longitude) || null,
            image: profileImage // Add the image to the data object
        };

        fetch(`${jsonUrl}/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                alert('Data tersimpan');
                clearForm();
                refreshPage();
            })
            .catch((error) => console.error(error));
    };

    const selectItem = (item) => {
        setSelectedUser(item);
        setUmkm(item.umkm);
        setProduk(item.produk);
        setSektor(item.sektor);
        setAlamat(item.alamat);
        setKontak(item.kontak);
        setPemilik(item.pemilik);
        setOmzet(item.omzet);
        setStatus(item.status);
        setKeterangan(item.keterangan);
        setLatitude(item.latitude ? item.latitude.toString() : '');
        setLongitude(item.longitude ? item.longitude.toString() : '');
        setProfileImage(item.image); // Set the current image URL for editing
    };

    const clearForm = () => {
        setUmkm('');
        setProduk('');
        setSektor('');
        setAlamat('');
        setKontak('');
        setPemilik('');
        setOmzet('');
        setStatus('');
        setKeterangan('');
        setLatitude('');
        setLongitude('');
        setProfileImage(null); // Clear the image state
        setSelectedUser(null);
    };

    const refreshPage = () => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => setDataUser(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    // Filter data based on the search term
    const filteredData = dataUser.filter(item =>
        item.umkm.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Use FlatList for the entire page to handle scrolling
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Edit Data UMKM</Text>
            <View style={styles.searchContainer}>
                <FontAwesomeIcon icon={faSearch} size={20} color={'#6A1B9A'} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Cari UMKM"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            <View style={styles.buttonRow}>
                <View style={{ marginLeft: 10 }}>
                    <Button title="Refresh Data" onPress={refreshPage} color={'#2196F3'} />
                </View>
            </View>
            <FlatList
                data={[{ key: 'form' }, ...filteredData]} // Use filtered data here
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    if (item.key === 'form') {
                        return (
                            <View style={styles.formContainer}>
                                {isLoading ? (
                                    <View style={styles.loadingContainer}>
                                        <Text style={styles.cardTitle}>Loading...</Text>
                                    </View>
                                ) : (
                                    <View>
                                        <View style={styles.formGroup}>
                                            <TextInput style={styles.input} placeholder="Nama Usaha" value={umkm} onChangeText={setUmkm} />
                                            <TextInput style={styles.input} placeholder="Produk/Jasa" value={produk} onChangeText={setProduk} />
                                            <TextInput style={styles.input} placeholder="Sektor Usaha" value={sektor} onChangeText={setSektor} />
                                            <TextInput style={styles.input} placeholder="Alamat Usaha" value={alamat} onChangeText={setAlamat} />
                                            <TextInput style={styles.input} placeholder="Kontak" value={kontak} onChangeText={setKontak} />
                                            <TextInput style={styles.input} placeholder="Pemilik Usaha" value={pemilik} onChangeText={setPemilik} />
                                            <TextInput style={styles.input} placeholder="Omzet Usaha" value={omzet} onChangeText={setOmzet} />
                                            <TextInput style={styles.input} placeholder="Status Usaha" value={status} onChangeText={setStatus} />
                                            <TextInput style={styles.input} placeholder="Keterangan" value={keterangan} onChangeText={setKeterangan} />
                                            <TextInput style={styles.input} placeholder="Latitude" value={latitude} onChangeText={setLatitude} />
                                            <TextInput style={styles.input} placeholder="Longitude" value={longitude} onChangeText={setLongitude} />
                                            {/* Image upload */}
                                            <Pressable onPress={selectImage} style={styles.imageContainer}>
                                                {profileImage ? (
                                                    <Image style={styles.image} source={{ uri: profileImage }} />
                                                ) : (
                                                    <Text>Upload Image</Text>
                                                )}
                                            </Pressable>
                                            <Button title="Simpan" color={'#4CAF50'} onPress={submit} />
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    } else {
                        return (
                            <TouchableOpacity onPress={() => selectItem(item)}>
                                <View style={styles.card}>
                                    <View style={styles.avatarContainer}>
                                        {item.image ? (
                                            <Image
                                                source={{ uri: item.image }}
                                                style={styles.avatarImage}
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faShop} size={50} color={'#6A1B9A'} />
                                        )}
                                    </View>
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{item.umkm}</Text>
                                        <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">{item.alamat}</Text>
                                    </View>
                                    <View style={styles.editIconContainer}>
                                        <FontAwesomeIcon icon={faPenSquare} size={20} color={'#4CAF50'} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    formContainer: {
        marginBottom: 2,
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: 20,
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
    formGroup: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
    },
    input: {
        borderWidth: 1,
        borderColor: '#6A1B9A',
        borderRadius: 8,
        padding: 8,
        marginVertical: 5,
    },
    imageContainer: {
        backgroundColor: '#fcfcfc',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#6A1B9A',
        borderWidth: 1,
    },
    image: {
        width: 190,
        height: 190,
        borderRadius: 8,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    list: {
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
        marginVertical: 10,
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 8, // Make the image round
    },
    cardContent: {
        flex: 1,
    },
    editIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6A1B9A',
        marginBottom: 5,
    },
    cardText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: '10',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Editdata;
