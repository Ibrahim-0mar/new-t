import { backendImagesUrl, imagesUrl } from '../config';

export const commonImgUrl = (imgName: string) => {
  return imagesUrl + 'common/' + imgName;
};

export const blogsImgUrl = (blogPathWithImgName: string) => {
  return `${imagesUrl}blogs/${blogPathWithImgName}`;
};

export const airportTransfersImgUrl = (imgName: string) => {
  return imagesUrl + 'airport-transfers/' + imgName;
};

export const agentImgUrl = (agentName: string) => {
  return (
    backendImagesUrl +
    `/public/images/agentsPng/${agentName!.toLowerCase().replace(' ', '')}.png`
  );
};

export const airportTransfersAgentImgUrl = (agentName: string) => {
  return (
    backendImagesUrl +
    `/public/images/tranferAgents/${agentName!.toLowerCase().replace(' ', '')}.png`
  );
};
