import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import DataMahasiswa from './ListData';

function HomeScreen() {
    return (
        <Createdata />
    );
}

function DataMahasiswaScreen() {
    return (
        <DataMahasiswa />
    );
}

function WebScreen() {
    return (
        <WebView
            source={{ uri: 'https://github.com/SalsabilaEka' }}
        />
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Profil" component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUser} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Data Mahasiswa" component={DataMahasiswaScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUserGraduate} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Github" component={WebScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faGithub} size={20} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}