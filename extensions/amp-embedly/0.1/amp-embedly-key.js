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

import {Layout} from '../../../src/layout';
import {user} from '../../../src/log';

/** @const {string} */
export const TAG = 'amp-embedly-key';

/**
 * Implementation of the amp-embedly-key component.
 * See {@link ../amp-embedly-key.md} for the spec.
 */
export class AmpEmbedlyKey extends AMP.BaseElement {
  /** @param {!AmpElement} element */
  constructor(element) {
    super(element);

    /**
     * Embedly api key.
     *
     * @type {?string}
     * @private
     */
    this.key_ = null;
  }

  /** @override */
  buildCallback() {
    this.key_ = user().assert(
        this.element.getAttribute('value'),
        `The value attribute is required for <${TAG}> %s`,
        this.element
    );
  }

  /** @override */
  layoutCallback() {
  }

  /** @override */
  isLayoutSupported(layout) {
    return layout === Layout.NODISPLAY;
  }
}
