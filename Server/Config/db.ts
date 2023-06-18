import config from './config'

// The url for mongodb atlas is stored in env
let localURI = config.LOCAL_DB;
let remoteURI = config.PRODUCTION_DB;

export default {
    localURI: localURI,
    remoteURI: remoteURI
}