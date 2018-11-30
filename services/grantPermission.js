import Stow from '@stowprotocol/stow-js'
import IPFS from 'ipfs-mini';
import stowClient from './stow';

const ipfs = new IPFS({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    });

export const grantPermission = async (user, dataHash, ownerEncryptionPrivateKey, viewerEthereumAddress, viewerEncyptionPublicKey) => {
  const stow = await stowClient();
  const record = await stow.getRecord(dataHash);
  const web3 = stow.web3

  let file; let decryptedData; let reencrypted; let IPFSDataUri; 

  // Pull the owner encrypted record down from ipfs
  try {
    file = await new Promise((resolve, reject) => {
      ipfs.cat(record.dataUri, (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
      });
    });
  } catch (e) {
    throw new Error('IPFS upload failed', dataHash)
  }

  // Decrypt the file using the owner's private key
  try {
    const encryptedData = JSON.parse(file);
    decryptedData = await Stow.util.decrypt(ownerEncryptionPrivateKey, encryptedData);
  } catch (e) {
    throw new Error('Failed to decrypt data')
  }

  // Re-encrypt the file using the viewer's public key
  try {
    reencrypted = await Stow.util.encrypt(viewerEncyptionPublicKey, decryptedData);
  } catch (e) {
    throw new Error('failed to reencrypt data')
  }

  // Upload the viewer encrypted file up to a new location in IPFS
  try {
    IPFSDataUri = await new Promise((resolve, reject) => {
      ipfs.add(JSON.stringify(reencrypted), (err, ipfsRed) => {
        err ? reject(err) : resolve(ipfsRed);
      });
    });
  } catch (e) {
    throw new Error('failed to reupload')
  }

  // Create a new permissions record on the blockchain
  try {
    const { permissions } = await stow.getContractInstances();
    await permissions.grantAccess(dataHash, viewerEthereumAddress.toLowerCase(), IPFSDataUri, { from: user.toLowerCase() });
  } catch (e) {
    throw new Error(`failed to grant permissions`)
  }

  return true;
}

export default grantPermission;