import "../styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import PlausibleProvider from "next-plausible";
import WithSubnavigation from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if running on client side
    if (typeof window !== 'undefined') {
      const lastAccess = localStorage.getItem('lastAccess');
      const hasValidSubscription = localStorage.getItem('hasValidSubscription');
      
      const currentTime = new Date().getTime();
      const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      
      if (lastAccess && hasValidSubscription) {
        // Check if one month has passed
        if (currentTime - parseInt(lastAccess) > oneMonth) {
          // Reset if more than a month has passed
          localStorage.removeItem('hasValidSubscription');
          localStorage.removeItem('lastAccess');
          setShowOverlay(true);
        } else {
          setShowOverlay(false);
        }
      } else {
        setShowOverlay(true);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (inputValue === '456712') {
      setShowOverlay(false);
      // Save the current timestamp and subscription status
      localStorage.setItem('lastAccess', new Date().getTime().toString());
      localStorage.setItem('hasValidSubscription', 'true');
    } else {
      setError('کد نادرست است');
    }
  };

  if (showOverlay) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 9999,
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
          باید اشتراک بخرید
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="کد را وارد کنید"
          style={{
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
            textAlign: 'center',
            direction: 'rtl'
          }}
        />
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          تایید کد
        </button>
        <a 
          href="https://t.me/sooske2131" 
          style={{
            backgroundColor: '#0088cc',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          خرید اشتراک در تلگرام
        </a>
      </div>
    );
  }

  return (
    <PlausibleProvider
      domain="localpdf.tech"
      selfHosted
      customDomain="https://plausible.home.juli.sh"
      trackLocalhost
      enabled
    >
      <ChakraProvider>
        <div className="custom">
          <WithSubnavigation />
          <Box h="calc(100vh)">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </div>
      </ChakraProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
