
/**
 * @fileoverview Loads the correct i18n symbols into pulsar.i18n.DateTimeSymbols
 *     This must be loaded before the main pulsar js file.
 * @author danchen@google.com (Daniel Chen)
 * TODO(danchen): Remove this and related BUILD rules if/when
 *     http://b/issue?id=7262523 is resolved.
 */


/**
 * This function loads the correct symbols file for the user's locale
 * We take the user's locale, turn it into lowercase, and search for the
 * locale that matches the longest prefix of the user's locale. Thus, a
 * locale no_NO_B would be matched to no and en_us would be matched to en. If
 * no match is found, we default to an empty string. Then, this string is joined
 * with 'i18n/symbols' using the separator '_' and '.js' is appended. Thus, if
 * we matched to fr_ca, we would get 'i18n/symbols_fr_ca.js', and if we matched
 * to an empty string, we would get 'i18n/symbols.js'. We then insert a script
 * tag that loads this file so it would execute immediately after this script
 * finishes executing.
 */
(function() {
  /*
   * AVAILABLE_LOCALES should be kept in sync with NON_DEFAULT_LOCALES in
   * //photos/chromeapp/src/builddefs/BUILD
   */
  var NON_DEFAULT_LOCALES = {
    'ar': true,
    'bg': true,
    'bn': true,
    'ca': true,
    'cs': true,
    'da': true,
    'de': true,
    'de_at': true,
    'de_ch': true,
    'el': true,
    'en_gb': true,
    'es': true,
    'es_419': true,
    'es_mx': true,
    'fa': true,
    'fi': true,
    'fil': true,
    'fr': true,
    'fr_ca': true,
    'fr_ch': true,
    'gu': true,
    'he': true,
    'hi': true,
    'hr': true,
    'hu': true,
    'id': true,
    'in': true,
    'it': true,
    'iw': true,
    'ja': true,
    'ko': true,
    'lt': true,
    'lv': true,
    'ml': true,
    'mr': true,
    'ms': true,
    'nb': true,
    'nl': true,
    'no': true,
    'pl': true,
    'pt': true,
    'pt_br': true,
    'pt_pt': true,
    'ro': true,
    'ru': true,
    'sk': true,
    'sl': true,
    'sr': true,
    'sv': true,
    'ta': true,
    'te': true,
    'th': true,
    'tl': true,
    'tr': true,
    'uk': true,
    'zh': true,
    'zh_cn': true,
    'zh_hk': true,
    'zh_tw': true
  };

  var splitLocaleArray =
      chrome.i18n.getMessage('@@ui_locale').toLowerCase().split('_');

  while (splitLocaleArray.length) {
    if (NON_DEFAULT_LOCALES[splitLocaleArray.join('_')]) {
      break;
    }
    splitLocaleArray.pop();
  }

  var newTag = document.createElement('script');
  newTag.src = ['i18n/symbols'].concat(splitLocaleArray).join('_') + '.js';
  document.body.appendChild(newTag);
})();
