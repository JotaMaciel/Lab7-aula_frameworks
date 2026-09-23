import { useCallback, useState } from 'react';

export type LinkId = 'vsat' | 'vsat-bgan' | 'ospf' | 'bgp' | 'lte';

export type LinksStatus = Record<LinkId, boolean>;

const initialLinksStatus: LinksStatus = {
  vsat: true,
  'vsat-bgan': true,
  ospf: true,
  bgp: true,
  lte: true,
};

export const useFleetMonitor = () => {
  const [linksStatus, setLinksStatus] = useState<LinksStatus>(
    initialLinksStatus,
  );

  const toggleLink = useCallback((id: LinkId) => {
    setLinksStatus((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }, []);

  const isCategoryOnline = useCallback(
    (category: string) => {
      // Regra de negócio do laboratório:
      // se o VSAT cair, Carro e SUV ficam offline.
      if (['Carro', 'SUV'].includes(category)) {
        return linksStatus.vsat;
      }

      return true;
    },
    [linksStatus.vsat],
  );

  return {
    linksStatus,
    setLinksStatus,
    toggleLink,
    isCategoryOnline,
  };
};
