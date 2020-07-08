'use strict';

import { sanitizeText } from './sanitize';

test('cleans html of bad img and random-tag', () => {
  const funkyHtml =
    "<random-tag><h3>What's worth fighting for?</h3><p><br></p><ul><li>echoes</li></ul><p><br></p><p>         foobar</p><p><br></p><p><br></p><p>fdasjkl;</p><img>hey</img><img src='https://i.imgur.com/wPwD6xM.jpg'><div>null</div></random-tag>";

  const response = sanitizeText(funkyHtml);

  expect(response).toBeDefined();
  expect(response.includes('<random-tag>')).toBeFalsy();
  expect(response.includes('<img>')).toBeFalsy();
  expect(response.includes('<img src=')).toBeTruthy();
});
