import * as actionTypes from "./actionTypes";
import CryptoJS from "crypto-js";

export function setEncryptionKey(key){
    return {type: actionTypes.SET_ENCRYPTION_KEY, payload: key}
}

export function decryptRecords(records, key){
    var decryptedRecords = [];

    for (let i = 0; i < records.length; i++) {

        var website = CryptoJS.AES.decrypt(records[i].website, key);
        var username = CryptoJS.AES.decrypt(records[i].username, key);
        var password = CryptoJS.AES.decrypt(records[i].password, key);

        var record = {
            id: i,
            visible: true,
            website: website.toString(CryptoJS.enc.Utf8),
            username: username.toString(CryptoJS.enc.Utf8),
            password: password.toString(CryptoJS.enc.Utf8)
        }

        decryptedRecords.push(record);
    }

    return decryptedRecords;
}

export function encryptRecords(records, key){
    var encryptedRecords = [];

    for (let i = 0; i < records.length; i++) {

        if(records[i].website === undefined || records[i].username === undefined || records[i].password === undefined ||records[i].website === "" || records[i].username === "" || records[i].password === ""){
            continue;
        }

        var website = CryptoJS.AES.encrypt(records[i].website, key);
        var username = CryptoJS.AES.encrypt(records[i].username, key);
        var password = CryptoJS.AES.encrypt(records[i].password, key);

        var record = {
            website: website.toString(),
            username: username.toString(),
            password: password.toString()
        }

        encryptedRecords.push(record);
    }

    return encryptedRecords;
}