import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { SignatureModal } from './components/SignatureModal';
import { useState } from 'react';

function AppContent() {
  const { authenticated, ready } = usePrivy();
  const [signatureVerified, setSignatureVerified] = useState(false);

  // Show signature modal when authenticated but not verified
  const needsSignature = authenticated && !signatureVerified;

  if (!ready) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="text-gradient">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {!authenticated ? (
        <Hero />
      ) : needsSignature ? (
        <>
          <Hero />
          <SignatureModal onSuccess={() => setSignatureVerified(true)} onClose={() => {}} />
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
}

export function App() {
  const appId = import.meta.env.VITE_PRIVY_APP_ID;

  // Demo mode if no app ID
  if (!appId) {
    return <DemoApp />;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#00f5ff',
          logo: '/logo.svg',
        },
        loginMethods: ['wallet'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <AppContent />
    </PrivyProvider>
  );
}

// Demo version without Privy
function DemoApp() {
  const [connected, setConnected] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <>
      <Navbar
        demoMode
        connected={connected}
        onConnect={() => setConnected(true)}
        onDisconnect={() => {
          setConnected(false);
          setVerified(false);
        }}
      />

      {!connected ? (
        <Hero demoMode onConnect={() => setConnected(true)} />
      ) : !verified ? (
        <>
          <Hero demoMode />
          <SignatureModal
            demoMode
            onSuccess={() => setVerified(true)}
            onClose={() => setConnected(false)}
          />
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
