import Stow from '@stowprotocol/stow-js'
import Web3 from 'web3';

import HDWalletProvider from 'truffle-hdwallet-provider';

const stowClient = () => {
  const ropsten = '';
  console.log(crypto);
  const provider = new HDWalletProvider(
    'c1586db8d25932d0c253b4e771b7cdeaa709dd5bcaedd3ce4da9838213eddb48',
    'https://ropsten.infura.io/Va1ePMhrONLFmTMOLAin',
  );
  const web3 = new Web3(provider.engine);
  const stow = new Stow(web3);
  return stow;	
};

export default stowClient;


