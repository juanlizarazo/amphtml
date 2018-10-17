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

// gulp test --unit --watch --files extensions/amp-lightbox/0.1/test/test-amp-lightbox.js

import '../amp-lightbox';

describes.realWin('amp-lightbox', {
  amp: {
    extensions: ['amp-lightbox'],
  },
}, env => {

  let win;
  let doc;

  beforeEach(() => {
    win = env.win;
    doc = win.document;
  });

  function createAmpLightbox(dataUrl) {
    const element = win.document.createElement('amp-lightbox');

    element.setAttribute('data-url', dataUrl);
    element.setAttribute('height', '100');

    doc.body.appendChild(element);

    return element.build()
        .then(() => element.layoutCallback())
        .then(() => element);
  }

  it('renders responsively', () => {
    return createAmpLightbox()
        .then(element => {
          console.log(element);
          expect(true).to.be.true;
        });
  });
});
