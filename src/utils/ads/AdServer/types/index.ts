export type adServerType = {
  type: string;
  version: string;
  beacons: {
    type: string;
    url: string;
  }[];
  bannerId: number;
  placementId: number;
  customization: {
    'background-color': string;
    brand: string;
    agent:string;
    prod:"true" |"false",
    direct:"true" |"false",
    queryParams?:string
  };
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  advertiser: string;
  rating: number;
  images: [
    {
      width: number;
      height: number;
      url: string;
    },
  ];
  clickUrl: string;
  refreshInterval: string;
};
