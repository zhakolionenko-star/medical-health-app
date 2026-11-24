import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SplashScreen } from './src/screens/SplashScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { OtpVerificationScreen } from './src/screens/OtpVerificationScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ScheduleScreen } from './src/screens/ScheduleScreen';
import { MapScreen } from './src/screens/MapScreen';

type Route =
  | 'splash'
  | 'welcome'
  | 'login'
  | 'register'
  | 'forgot'
  | 'otp'
  | 'home'
  | 'schedule'
  | 'map';

export default function App() {
  const [route, setRoute] = useState<Route>('splash');
  const [resetPhone, setResetPhone] = useState('+7 ');
  const [selectedDoctor, setSelectedDoctor] = useState<{
    name: string;
    specialty: string;
  }>({
    name: 'Др. Әсел Серікқызы',
    specialty: 'Кардиолог',
  });

  return (
    <>
      <StatusBar style="auto" />

      {route === 'splash' && <SplashScreen onFinish={() => setRoute('welcome')} />}

      {route === 'welcome' && (
        <WelcomeScreen
          onLoginPress={() => setRoute('login')}
          onRegisterPress={() => setRoute('register')}
        />
      )}

      {route === 'login' && (
        <LoginScreen
          onBack={() => setRoute('welcome')}
          onForgotPassword={() => setRoute('forgot')}
          onGoRegister={() => setRoute('register')}
          onLoginSuccess={() => setRoute('home')}
        />
      )}

      {route === 'register' && (
        <RegisterScreen
          onBack={() => setRoute('welcome')}
          onGoLogin={() => setRoute('login')}
          onRegisterSuccess={() => setRoute('home')}
        />
      )}

      {route === 'forgot' && (
        <ForgotPasswordScreen
          onBack={() => setRoute('login')}
          onSendOtp={(phone) => {
            setResetPhone(phone);
            setRoute('otp');
          }}
        />
      )}

      {route === 'otp' && (
        <OtpVerificationScreen
          phone={resetPhone}
          onBack={() => setRoute('forgot')}
          onResetSuccess={() => setRoute('login')}
        />
      )}

      {route === 'home' && (
        <HomeScreen
          onSelectDoctor={(doc) => {
            setSelectedDoctor({ name: doc.name, specialty: doc.specialty });
            setRoute('schedule');
          }}
          onOpenMap={() => setRoute('map')}
          onLogout={() => setRoute('login')}
        />
      )}

      {route === 'schedule' && (
        <ScheduleScreen
          doctorName={selectedDoctor.name}
          specialty={selectedDoctor.specialty}
          onBack={() => setRoute('home')}
        />
      )}

      {route === 'map' && <MapScreen onBack={() => setRoute('home')} />}
    </>
  );
}