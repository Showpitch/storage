define(['exports', './storage'], function (exports, _storage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'Storage', {
    enumerable: true,
    get: function () {
      return _storage.Storage;
    }
  });
});