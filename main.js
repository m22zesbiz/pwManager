// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDeQRXgmt8TGpimvIqjA2xfIGz6K4i8R7o",
    authDomain: "mz-and-bb-web.firebaseapp.com",
    databaseURL: "https://mz-and-bb-web.firebaseio.com",
    projectId: "mz-and-bb-web",
    storageBucket: "mz-and-bb-web.appspot.com",
    messagingSenderId: "1031342826508",
    appId: "1:1031342826508:web:d421be036367526fae7a29"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var homeScreenEle = document.querySelector('#homeScreen')
var loginScreenEle = document.querySelector('#loginScreen')
var pwMgrScreenEle = document.querySelector('#pwMgrScreen')
var pwSaveScreenEle = document.querySelector('#pwSaveScreen')
var pwCreateScreenEle = document.querySelector('#pwCreateScreen')
var welcomeMessageEle = document.querySelector('#welcomeMessage')
var webNameEle = document.querySelector('#webName')
var webNameSplitEle = document.querySelector('#webNameSplit')
var iconEle = document.querySelectorAll('.icon')
var logoutBtnEle = document.querySelectorAll('.logoutBtn')
var homeBtnEle = document.querySelectorAll('.homeBtn')
var pwMgrBtnEle = document.querySelectorAll('.pwMgrBtn')
var pwSaveBtnEle = document.querySelectorAll('.pwSaveBtn')
var pwCreateBtnEle = document.querySelectorAll('.pwCreateBtn')
const db = firebase.firestore()

function copyDivToClipboard(eleID) {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById(eleID));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect
}