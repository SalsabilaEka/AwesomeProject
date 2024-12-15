import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#D8AFF1', '#FFFFFF']}
      style={styles.gradientBackground}
      
    >
      {/* Header */}
      <View style={styles.header}>
          <LinearGradient
            colors={['#4B0082', '#7831A4']}
            style={styles.headerBackground}
          >
            <Text style={styles.headerTitle}>GUMAS</Text>
            <Text style={styles.headerSubtitle}>Gerakan UMKM Maju Sleman</Text>
          </LinearGradient>
        </View>

      <ScrollView style={styles.container}>
        
        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Sekilas tentang UMKM di Sleman</Text>
          <Text style={styles.sectionText}>
            UMKM di Kabupaten Sleman mencakup berbagai bidang, antara lain makanan dan minuman, kerajinan tangan, perdagangan, jasa, serta sektor pariwisata, yang berkontribusi besar terhadap perekonomian lokal.
          </Text>
        </View>

        {/* Card Section */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>110.121</Text>
            <Text style={styles.cardLabel}>Jumlah UMKM Total</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>109.939</Text>
            <Text style={styles.cardLabel}>Jumlah Usaha Mikro</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>170</Text>
            <Text style={styles.cardLabel}>Jumlah Usaha Kecil</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardNumber}>11</Text>
            <Text style={styles.cardLabel}>Jumlah Usaha Menengah</Text>
          </View>
        </View>

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <Text style={styles.galleryTitle}>Galeri UMKM Sleman</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
            <Image source={{ uri: 'https://cdn.langit7.id/foto/850/langit7/berita/2022/12/08/1/26847/menengok-proses-pembuatan-keripik-belut-cemilan-khas-yogyakarta-efn.jpg' }} style={styles.galleryImage} />
            <Image source={{ uri: 'https://images.bisnis.com/posts/2019/12/13/1181057/um5.jpg' }} style={styles.galleryImage} />
            <Image source={{ uri: 'https://1.bp.blogspot.com/-ncNYABac_is/XZqrzxfunCI/AAAAAAAAHMM/9QZRk-3Th_wfBjnS4ie58bubBU0KXH3BACLcBGAsYHQ/s640/batik.jpg' }} style={styles.galleryImage} />
            <Image source={{ uri: 'https://cdn.idntimes.com/content-images/community/2020/08/106373316-272833037121373-536482253941973684-n-c873a686e7d36491544e3966d0641d80.jpg' }} style={styles.galleryImage} />
            <Image source={{ uri: 'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2024/01/27/811873858.png' }} style={styles.galleryImage} />
          </ScrollView>
        </View>

        {/* Additional Section */}
        <View style={styles.additionalSection}>
          <Text style={styles.additionalTitle}>Mari Dukung UMKM Sleman!</Text>
          <Text style={styles.additionalText}>
            Bergabunglah dalam gerakan ini untuk membantu memajukan UMKM dan meningkatkan kesejahteraan masyarakat.
          </Text>
          {/* Button to Open WebView */}
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Pelajari Lebih Lanjut</Text>
          </TouchableOpacity>
        </View>

        {/* WebView Modal */}
        <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.webViewContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
            <WebView source={{ uri: 'https://dataumkm.slemankab.go.id/newportal' }} style={styles.webView} />
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    backgroundColor: '#FFF5E3',
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
  },
  headerBackground: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    marginTop: 5,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#ffffffAA',
    borderRadius: 10,
    margin: 10,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    backgroundColor: '#4B9A1B',
    width: '45%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  gallerySection: {
    padding: 20,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  galleryScroll: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  additionalSection: {
    padding: 20,
    alignItems: 'center',
  },
  additionalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  additionalText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#6A1B9A',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
