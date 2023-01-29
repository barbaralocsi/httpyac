import * as utils from '../../utils';
import { MQTTRequestClient } from './mqttRequestClient';

export const parseAmqpLine = utils.parseRequestLineFactory({
  protocol: 'MQTT',
  methodRegex: /^\s*(mqtt(s)?)\s*(?<url>.+?)\s*$/iu,
  protocolRegex: /^\s*mqtt(s)?:\/\/(?<url>.+?)\s*$/iu,
  requestClientFactory(request, context) {
    return new MQTTRequestClient(request, context);
  },
  modifyRequest(request) {
    request.supportsStreaming = true;
  },
});
