import React, { useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const Peta = () => {
    const webViewRef = useRef(null);

    const handleRefresh = () => {
        if (webViewRef.current) {
            webViewRef.current.reload(); // Reload the WebView to update the map
        }
    };

    return (
        <View style={styles.container}>
            {/* Judul */}
            <Text style={styles.title}>Peta Lokasi UMKM</Text>

            {/* Kotak untuk peta */}
            <View style={styles.mapContainer}>
                <WebView
                    ref={webViewRef}
                    originWhitelist={['*']}
                    source={require('./map.html')}
                    style={styles.map}
                />
            </View>

            {/* Tombol Refresh */}
            <View style={styles.buttonContainer}>
                <Button 
                    title="Refresh Peta" 
                    onPress={handleRefresh} 
                    color="#6a0dad" 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f9f9f9',
    },
    title: {
        paddingVertical: 18,
        backgroundColor: '#4B0082',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        borderRadius: 20
    },
    mapContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        marginVertical: 10,
    },
});

export default Peta;
