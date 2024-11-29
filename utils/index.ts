import QH_CONSTANTS from '~/constants';
import { qhSecuredLS } from '~/utils/secure-ls';

export const getToken = () => qhSecuredLS.get(QH_CONSTANTS.AUTH_TOKEN);
