import createPrefix from './createPrefixe';

const createAuthSymbol = createPrefix('EXAMPLE');

const EXAMPLE_TYPES = {
    INIT_APPLICATION_EXAMPLE: createAuthSymbol('INIT_APPLICATION_EXAMPLE'),
};

export default EXAMPLE_TYPES;