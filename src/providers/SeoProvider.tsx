import { HelmetProvider } from 'react-helmet-async';
import type { ReactNode } from 'react';

export const SeoProvider = ({ children }: { children: ReactNode }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export default SeoProvider;
