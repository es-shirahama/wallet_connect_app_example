const s3BucketPathName: { [address: string]: string } = {
  '0x672ee4ab48a6823559e4600b22ccdeef1c031ca5': 'myjoyfa',
  '0x1a3c2b149177cdf622d4bb100e23de427f565e70': 'joyfa',
  '0x43cc1ae5d86fd05c39c8fe0b5d5b358a658c5b8c': 'joyfa-polygon',
};

export const baseURL = (address: string, tokenId: string) => {
  // [TODO]
  const bucket = 'myjoyfa-prod';
  // const bucket = 'myjoyfa-dev';
  const bucketPath = `${s3BucketPathName[address]}/${tokenId}`;
  return `https://${bucket}.s3.ap-northeast-1.amazonaws.com/${bucketPath}`;
};

export const createImageURL = (address: string, tokenId: string) => {
  return `${baseURL(address, tokenId)}/thumbnail.png`;
  // return `${baseURL(address, tokenId)}/image.png`;
};

export const createUsdzURL = (address: string, tokenId: string) => {
  return `${baseURL(address, tokenId)}/model/right.usdz`;
};
