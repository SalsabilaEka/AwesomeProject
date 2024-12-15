import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons/faShop';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons/faFolderPlus';
import { faFilePen } from '@fortawesome/free-solid-svg-icons/faFilePen';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons/faMapLocationDot';
import Profil from './App';
import Createdata from './Createdata';
import Listdata from './Listdata';
import EditData from './Editdata';
import Peta from './Peta';

function HomeScreen() {
    return <Profil />;
}

function CreateScreen() {
    return <Createdata />;
}

function DataScreen() {
    return <Listdata />;
}

function EditScreen() {
    return <EditData />;
}

function PetaScreen() {
    return <Peta />;
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#8E44AD', // Warna ungu untuk tab aktif
                    tabBarInactiveTintColor: '#95A5A6', // Warna abu-abu untuk tab tidak aktif
                    tabBarStyle: {
                        backgroundColor: '#F8F9FA', // Warna latar belakang
                        borderTopWidth: 1,
                        borderTopColor: '#E5E7E9',
                        height: 60, // Tinggi bottom navigation
                    },
                    tabBarLabelStyle: {
                        fontSize: 12, // Ukuran font label
                        fontWeight: '500', // Ketebalan font
                        marginTop: -10, // Mengurangi jarak ke ikon
                        marginBottom: 8
                    },
                    tabBarItemStyle: {
                        justifyContent: 'center', // Memusatkan konten (ikon dan teks)
                        alignItems: 'center',
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faHouse} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Create"
                    component={CreateScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faFolderPlus} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="UMKM"
                    component={DataScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faShop} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Edit"
                    component={EditScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faFilePen} size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Map"
                    component={PetaScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faMapLocationDot} size={20} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
