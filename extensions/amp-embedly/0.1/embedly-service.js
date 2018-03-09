/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Services} from '../../../src/services';
import {addParamsToUrl} from '../../../src/url';
import {dev} from '../../../src/log';
import {dict} from '../../../src/utils/object';

/**
 * Service used by the amp-embedly extension components.
 * @const {string}
 */
export const SERVICE_NAME = 'embedly';

/**
 * @const {string}
 */
const BASE_API_URL = 'https://api.embedly.com/1/oembed?';

/**
 * Provides the api key used with the embedly xhr requests.
 */
export class EmbedlyService {
  /**
   * @param {!../../../src/service/ampdoc-impl.AmpDoc} ampdoc
   */
  constructor(ampdoc) {
    /**
     * @private @const
     **/
    this.ampdoc_ = ampdoc;

    /**
     * Embedly api key.
     * @type {?string}
     * @private
     */
    this.key_ = null;
  }

  /**
   * Sets api key for service instance.
   * @param {string} key
   */
  set key(key) {
    this.key_ = key;
  }

  /**
   * Getter for embedly's api key.
   * @returns {*}
   */
  get key() {
    return dev().assertString(this.key_);
  }

  /**
   * Fetches oEmbed data from embedly's api for given url.
   *
   * @param {string} url
   * @return {!Promise}
   * */
  fetchOembedData(url) {
    const params = dict({
      'key': this.key_,
      'url': url,
      'secure': true, // To serve requested embeds with a SSL connection
      'scheme': 'https', // Request https embeds as default is protocol-less (//)
    });

    const apiResourceUrl = addParamsToUrl(BASE_API_URL, params);

    return Services.xhrFor(this.ampdoc_).fetchJson(apiResourceUrl, {
      requireAmpResponseSourceOrigin: false,
    }).then(res => res.json());
  }
}
