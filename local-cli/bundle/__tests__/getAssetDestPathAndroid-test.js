/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

jest.disableAutomock()
  .dontMock('../getAssetDestPathAndroid')
  .dontMock('../assetPathUtils');

const getAssetDestPathAndroid = require('../getAssetDestPathAndroid');

describe('getAssetDestPathAndroid', () => {
  it('should use the right destination folder', () => {
    const asset = {
      name: 'icon',
      type: 'png',
      httpServerLocation: '/assets/test',
    };

    const expectDestPathForScaleToStartWith = (scale, path) => {
      if (!getAssetDestPathAndroid(asset, scale).startsWith(path)) {
        throw new Error(`asset for scale ${scale} should start with path '${path}'`);
      }
    };

    expectDestPathForScaleToStartWith(1, 'drawable-mdpi');
    expectDestPathForScaleToStartWith(1.5, 'drawable-hdpi');
    expectDestPathForScaleToStartWith(2, 'drawable-xhdpi');
    expectDestPathForScaleToStartWith(3, 'drawable-xxhdpi');
    expectDestPathForScaleToStartWith(4, 'drawable-xxxhdpi');
  });

  it('should lowercase path', () => {
    const asset = {
      name: 'Icon',
      type: 'png',
      httpServerLocation: '/assets/App/Test',
    };

    expect(getAssetDestPathAndroid(asset, 1)).toBe(
      'drawable-mdpi/app_test_icon.png'
    );
  });

  it('should remove `assets/` prefix', () => {
    const asset = {
      name: 'icon',
      type: 'png',
      httpServerLocation: '/assets/RKJSModules/Apps/AndroidSample/Assets',
    };

    expect(
      getAssetDestPathAndroid(asset, 1).startsWith('assets_')
    ).toBeFalsy();
  });
});
