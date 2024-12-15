import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button,
    Alert,
    Linking,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShop, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import RNFS from 'react-native-fs';

const Listdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/umkm';
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
                setFilteredData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
                setFilteredData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }

    function deleteData(id) {
        fetch(jsonUrl + '/' + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                Alert.alert('Notifikasi', 'Data terhapus');
                refreshPage();
            });
    }

    function openMap(latitude, longitude) {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url).catch((err) => console.error('Failed to open Google Maps', err));
    }

    const toggleDetails = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        if (text) {
            const filtered = dataUser.filter((item) =>
                item.umkm.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(dataUser);
        }
    };

    const downloadCSV = async () => {
        const csvHeader = 'ID,UMKM,Produk,Sektor,Alamat,Kontak,Latitude,Longitude\n';
        const csvRows = dataUser.map(item => `${item.id},${item.umkm},${item.produk},${item.sektor},${item.alamat},${item.kontak},${item.latitude},${item.longitude}`).join('\n');
        const csvContent = csvHeader + csvRows;

        const filePath = `${RNFS.DownloadDirectoryPath}/data_umkm.csv`;

        try {
            await RNFS.writeFile(filePath, csvContent, 'utf8');
            Alert.alert('Sukses', `File berhasil diunduh di: ${filePath}`);
        } catch (error) {
            console.error('Gagal menyimpan file:', error);
            Alert.alert('Error', 'Gagal menyimpan file');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.cardTitle}>Loading...</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.mainContainer}>
                        {/* Fixed Header, Search, and Download Button */}
                        <Text style={styles.title}>Data UMKM</Text>
                        <View style={styles.searchContainer}>
                            <FontAwesomeIcon icon={faSearch} size={20} color={'#6A1B9A'} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Cari UMKM"
                                value={searchText}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <View style={styles.buttonRow}>
                            <Button title="Download CSV" onPress={downloadCSV} color={'#4CAF50'} />
                            <View style={{ marginLeft: 10 }}>
                                <Button title="Refresh Data" onPress={refreshPage} color={'#2196F3'} />
                            </View>
                        </View>
                        {/* Scrollable FlatList of Data */}
                        <FlatList
                            style={styles.flatListContainer}
                            data={filteredData}
                            onRefresh={() => refreshPage()}
                            refreshing={refresh}
                            keyExtractor={({ id }) => id.toString()} // Ensure ID is a string for FlatList
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity>
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
                                                <TouchableOpacity onPress={() => openMap(item.latitude, item.longitude)}>
                                                    <Text style={styles.cardText}>Lokasi pada Google Maps!</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => toggleDetails(item.id)} style={styles.chevronContainer}>
                                                <FontAwesomeIcon icon={faChevronRight} size={20} color={'#4CAF50'} />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>

                                    {expandedId === item.id && (
                                        <View style={styles.detailsContainer}>
                                            <Text style={styles.detailsText}>Keterangan:</Text>
                                            <Text style={styles.cardText}>{item.produk}</Text>
                                            <Text style={styles.cardText}>{item.sektor}</Text>
                                            <Text style={styles.cardText}>{item.latitude} {item.longitude} </Text>
                                            <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">{item.alamat}</Text>
                                            <Text style={styles.cardText}>{item.kontak}</Text>
                                        </View>
                                    )}

                                    <View style={styles.buttonContainer}>
                                        <Button
                                            title="Hapus"
                                            onPress={() => Alert.alert('Hapus Data', 'Yakin akan menghapus data ini?', [
                                                { text: 'Tidak', onPress: () => console.log('Batal hapus') },
                                                { text: 'Ya', onPress: () => deleteData(item.id) },
                                            ])}
                                            color={'#E53935'}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );

};

export default Listdata;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        padding: 20,
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
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
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
        marginHorizontal: 5,
    },
    cardContent: {
        flex: 1,
    },
    chevronContainer: {
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
    buttonContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
    },
    detailsText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20, // Tambahkan jarak bawah untuk memastikan elemen terakhir terlihat
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: '10',
        alignItems: 'center',
        marginBottom: 20,
    },
    
});
