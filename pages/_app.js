import "../styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import PlausibleProvider from "next-plausible";
import WithSubnavigation from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

function MyApp({ Component, pageProps }) {
  useGoogleAnalytics();
  
  const [showOverlay, setShowOverlay] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastAccess = localStorage.getItem('lastAccess');
      const hasValidSubscription = localStorage.getItem('hasValidSubscription');
      
      const currentTime = new Date().getTime();
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      
      if (lastAccess && hasValidSubscription) {
        const expiryTime = parseInt(lastAccess) + oneMonth;
        const remaining = expiryTime - currentTime;
        
        if (remaining <= 0) {
          localStorage.removeItem('hasValidSubscription');
          localStorage.removeItem('lastAccess');
          setShowOverlay(true);
          setRemainingTime(null);
        } else {
          setShowOverlay(false);
          setRemainingTime(remaining);
          
          // Update remaining time every minute
          const timer = setInterval(() => {
            const newRemaining = expiryTime - new Date().getTime();
            if (newRemaining <= 0) {
              clearInterval(timer);
              setShowOverlay(true);
              setRemainingTime(null);
              localStorage.removeItem('hasValidSubscription');
              localStorage.removeItem('lastAccess');
            } else {
              setRemainingTime(newRemaining);
            }
          }, 60000); // Update every minute

          return () => clearInterval(timer);
        }
      } else {
        setShowOverlay(true);
        setRemainingTime(null);
      }
    }
  }, []);

  const generateTodayCode = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const staticNum = "947";

    // Calculate sum
    const total = year + parseInt(month) + parseInt(day) + parseInt(staticNum);
    
    // Create a seed from the total
    const seed = total.toString();
    
    // Generate SHA-256 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(seed);
    
    // Use SubtleCrypto API for hashing
    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
      // Get first 8 bytes (64 bits)
      const hashArray = new Uint8Array(hashBuffer).slice(0, 8);
      // Convert to base64
      const base64Code = btoa(String.fromCharCode.apply(null, hashArray));
      
      // Detailed console output
      console.group('Subscription Code Generator');
      console.log('Date Components:', {
        year,
        month,
        day,
        staticNum
      });
      console.log(`Calculation: ${year} + ${month} + ${day} + ${staticNum} = ${total}`);
      console.log('Final Code (64-bit):', base64Code);
      console.groupEnd();
      
      return base64Code;
    });
  };

  // Update handleSubmit to work with Promise
  const handleSubmit = async () => {
    const validCode = await generateTodayCode();
    
    if (inputValue === validCode) {
      setShowOverlay(false);
      setError('');
      // Save the current timestamp and subscription status
      localStorage.setItem('lastAccess', new Date().getTime().toString());
      localStorage.setItem('hasValidSubscription', 'true');
      
      // Set initial remaining time
      const oneMonth = 30 * 24 * 60 * 60 * 1000;
      setRemainingTime(oneMonth);
    } else {
      setError('کد نادرست است');
      console.log('Invalid code entered. Expected:', validCode, 'Received:', inputValue);
    }
  };

  const formatRemainingTime = (timeInMs) => {
    const days = Math.floor(timeInMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeInMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeInMs % (60 * 60 * 1000)) / (60 * 1000));
    return `${days} روز و ${hours} ساعت و ${minutes} دقیقه`;
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
          {remainingTime && (
            <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '14px',
              direction: 'rtl'
            }}>
              زمان باقی‌مانده اشتراک: {formatRemainingTime(remainingTime)}
            </div>
          )}
        </div>
      </ChakraProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
