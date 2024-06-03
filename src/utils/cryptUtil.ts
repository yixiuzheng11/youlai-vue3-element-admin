import CryptoJS from "crypto-js";
/**
 * 加密解密
 */
const keyStr = "yxzjhcyrj#199129";
const ivStr = "yxzjhcyrj#199129";
const cryptUtil = {
  encrypt: function (word: string) {
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const iv = CryptoJS.enc.Utf8.parse(ivStr);

    const src = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    //return encrypted.ciphertext.toString();
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },
};
export default cryptUtil;
