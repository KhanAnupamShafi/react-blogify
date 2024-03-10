import { useMemo } from 'react';
import Loader from './Loader';

const PreLoader = ({ when }) => {
  const style = useMemo(
    () => ({
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(255, 255, 255, 0.4)',
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      height: '100vh',
    }),
    []
  );

  if (when) {
    return (
      <div style={style}>
        <Loader />
      </div>
    );
  }

  return false;
};

export default PreLoader;
