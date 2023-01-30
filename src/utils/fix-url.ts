export const fixURI = (uri: string) => {
  if (uri.startsWith('ipfs')) {
    return uri
      .replace('ipfs://ipfs/', 'https://ipfs.io/ipfs/')
      .replace('ipfs://', 'https://ipfs.io/ipfs/');
  } else if (uri.startsWith('ar')) {
    return uri.replace('ar://', 'https://arweave.net/');
  } else {
    return uri.replace('gateway.pinata.cloud', 'ipfs.io');
  }
};
