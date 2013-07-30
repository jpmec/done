/* Start angularObscureLocalStorage */

// IMPORTANT - YOU SHOULD NOT CONSIDER THIS MODULE TO BE SECURE!!!
// AT MOST IT PROVIDES OBSCURITY, IT DOES NOT PROVIDE SECURITY!!!
// IT'S ONLY PURPOSE IS TO KEEP HONEST PEOPLE HONEST!!!

'use strict';

var angularObscureLocalStorage = angular.module('obscureLocalStorageModule', ['LocalStorageModule']);

// You should set a random salt, this can be any random string.
// e.g. angularObscureLocalStorage.constant('salt', 'BD8EA8C785B0928291F0E46205EA110F490303D6F45E70919C2197F1F997F5BF');
angularObscureLocalStorage.constant('salt', 'BD8EA8C785B0928291F0E46205EA110F490303D6F45E70919C2197F1F997F5BF');

angularObscureLocalStorage.service('obscureLocalStorageService', [
  '$rootScope',
  'localStorageService',
  'salt',
  function($rootScope, localStorageService, salt) {

    var getSalt = function () {
      return salt;
    };

    var defaultPassword = function () {
      return '';
    };

    // Checks the browser to see if local storage is supported
    var browserSupportsLocalStorage = function () {
      return localStorageService.isSupported();
    };

    // Directly adds a value to local storage
    // If local storage is not available in the browser use cookies
    // Example use: localStorageService.add('library','angular');
    var addToLocalStorage = function (key, value, password) {

      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

  //    console.log("addToLocalStorage");
  //    console.log("key: " + key);
  //    console.log("value: " + value);
  //    console.log("password: " + password);

  //    var mac = CryptoJS.HmacSHA256(value, password).toString();
  //    console.log("mac: " + mac);

  //    var obj = {key: key, value: value, mac: mac};
  //    var plaintext = JSON.stringify(obj);
  //    console.log("plaintext: " + plaintext);

  //    var ciphertext = CryptoJS.AES.encrypt(plaintext, password);
  //    console.log("ciphertext: " + ciphertext);

  //    return localStorageService.add(key, ciphertext);
      return localStorageService.add(key, value);
    };

    // Directly get a value from local storage
    // Example use: localStorageService.get('library'); // returns 'angular'
    var getFromLocalStorage = function (key, password) {

      if (typeof password === 'undefined') {
        password = '';
      }

  //    console.log("getFromLocalStorage");
  //    console.log("key: " + key);
  //    console.log("password: " + password);

  //    var ciphertext = localStorageService.get(key);
  //    console.log("ciphertext:" + ciphertext);

  //    var plaintext = CryptoJS.AES.decrypt(ciphertext, password);
  //    console.log("plaintext:" + plaintext);

  //    var obj = JSON.parse(plaintext);

  //    var mac = CryptoJS.HmacSHA256(obj.value, password).toString();

  //    if (mac === obj.mac) {
  //      return obj.value;
  //    }
  //    else {
  //      return null;
  //    }

      return localStorageService.get(key);
    };

    // Remove an item from local storage
    // Example use: localStorageService.remove('library'); // removes the key/value pair of library='angular'
    var removeFromLocalStorage = function (key, password) {
      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.remove(key);
    };

    // Remove all data for this app from local storage
    // Example use: localStorageService.clearAll();
    // Should be used mostly for development purposes
    var clearAllFromLocalStorage = function (password) {

      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.clearAll();
    };

    // Return array of keys for localStorage
    var getKeysForLocalStorage = function (password) {
      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.keys();
    };

    // Checks the browser to see if cookies are supported
    var browserSupportsCookies = function() {
      return localStorageService.cookie.isSupported();
    };

    // Directly adds a value to cookies
    // Typically used as a fallback is local storage is not available in the browser
    // Example use: localStorageService.cookie.add('library','angular');
    var addToCookies = function (key, value, password) {
      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.cookie.add(key, value);
    };

    // Directly get a value from a cookie
    // Example use: localStorageService.cookie.get('library'); // returns 'angular'
    var getFromCookies = function (key, password) {
      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.cookie.get(key);
    };

    var removeFromCookies = function (key, password) {
      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.cookie.remove(key);
    };

    var clearAllFromCookies = function (password) {
      if (typeof password === 'undefined') {
        password = defaultPassword();
      }

      return localStorageService.cookie.clearAll();
    };

    return {
      isSupported: browserSupportsLocalStorage,
      add: addToLocalStorage,
      get: getFromLocalStorage,
      remove: removeFromLocalStorage,
      clearAll: clearAllFromLocalStorage,
      keys: getKeysForLocalStorage,
      salt: getSalt,
      cookie: {
        isSupported: browserSupportsCookies,
        add: addToCookies,
        get: getFromCookies,
        remove: removeFromCookies,
        clearAll: clearAllFromCookies
      }
    };

  }
]);
