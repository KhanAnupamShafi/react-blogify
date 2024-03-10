import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const useReactPortal = (component, wrapperId = 'react-portal-wrapper') => {
  const [portalContainer, setPortalContainer] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setPortalContainer(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (portalContainer === null) return null;

  return createPortal(component, portalContainer);
};
export default useReactPortal;

export const createWrapperAndAppendToBody = (wrapperId) => {
  const element = document.createElement('div');
  element.setAttribute('id', wrapperId);
  document.body.appendChild(element);
  return element;
};
