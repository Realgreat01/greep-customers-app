import SecureLS from 'secure-ls';

export const qhSecuredLS = new SecureLS({
  encodingType: 'des',
  encryptionSecret: ENV.SECURE_LS,
});
