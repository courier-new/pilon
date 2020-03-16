import { useEffect, useState } from 'react';

/**
 * Hook used to perform calculations in conjunction with changes in window size
 */
export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => ({
    height: isClient ? window.innerHeight : undefined,
    width: isClient ? window.innerWidth : undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    // Attach event listener to window to track changes
    const handleResize = () => setWindowSize(getSize());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
