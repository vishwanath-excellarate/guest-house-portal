import CryptoJS from "crypto-js";
import { SECRET_KEY } from "./commonString";

export const emailRegex = new RegExp("[a-z0-9]+@excellarate.com");

export const expireDayCalculation = (days = 1) => {
  let date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = date.toLocaleDateString();
  return expires;
};

export const setEncryptLocalStorage = (key, value, encrypted = true) => {
  if (encrypted) {
    const encryptedText = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    localStorage.setItem(key, encryptedText);
    return;
  }
  localStorage.setItem(key, value);
};

export const getEncryptLocalStorage = (key, decrypted = true) => {
  if (localStorage.getItem(key)) {
    if (decrypted) {
      try {
        const decryptedText = CryptoJS.AES.decrypt(
          localStorage.getItem(key),
          SECRET_KEY
        );
        const decryptedString = decryptedText?.toString(CryptoJS.enc.Utf8);
        return decryptedString;
      } catch (e) {
        console.error("Error in decryption method", e);
      }
    }
    const message = localStorage.getItem(key);
    return message;
  }
};
