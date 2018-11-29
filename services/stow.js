import Stow from '@stowprotocol/stow-js'
import Web3 from 'web3';
import HDWalletProvider from 'truffle-hdwallet-provider';
import { ADMIN_PRIVATE_KEY, INFURA_KEY } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

const stowClient = async () => {
  const userPrivateKey = await AsyncStorage.getItem('@Stow:ethereumPrivateKey');
  const privateKey = userPrivateKey || ADMIN_PRIVATE_KEY;
  const url = `https://ropsten.infura.io/${INFURA_KEY}`
  const provider = new HDWalletProvider(privateKey, url);
  const web3 = new Web3(provider.engine);
  const stow = new Stow(web3);
  return stow;	
};

export default stowClient;


