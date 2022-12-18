import * as Bowser from 'bowser';
import * as _ from 'lodash';
export class GddUtils {
  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static generateRandomUuid(): string {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  static isBrowserSupported(): boolean {
    const browser = Bowser.getParser(window.navigator.userAgent);

    const isValidBrowser = Boolean(
      browser.satisfies({
        chrome: '>1',
        firefox: '>1',
        'Microsoft Edge': '>=79',
      })
    );

    const browserCapabilitiesOK =
      'reversed' in document.createElement('ol') && // Edge before chromium
      'querySelector' in document &&
      'localStorage' in window &&
      'addEventListener' in window &&
      'IntersectionObserver' in window &&
      'indexedDB' in window &&
      'serviceWorker' in navigator &&
      'databases' in indexedDB;
    return isValidBrowser && browserCapabilitiesOK;
  }

  static pruneEmpty(obj: any) {
    return (function prune(current) {
      _.forOwn(current, function (value, key) {
        if (
          _.isUndefined(value) ||
          _.isNull(value) ||
          _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))
        ) {
          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;
    })(_.cloneDeep(obj)); // Do not modify the original object, create a clone instead
  }

  //https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  static hashCode = function (str: string) {
    var hash = 0,
      i,
      chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}
