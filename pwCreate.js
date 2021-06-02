window.addEventListener('DOMContentLoaded', function() {
    // Password Creator
    var pwGenFormEle = document.querySelector('#pwGenForm')
    var pwGenSubmitEle = document.querySelector('#pwGenSubmit')
    var showPwForGenEle = document.querySelector('#showPwForGen')
    var copyGenPwEle = document.querySelector('#copyGenPw')
    var webSelectionForGenPwEle = document.querySelector('#webSelectionForGenPw')
    var webIfOtherForGenPwEle = document.querySelector('#webIfOtherForGenPw')
    var catForGenPwEle = document.querySelector('#catForGenPw')
    var loginIDForGenPwEle = document.querySelector('#loginIDForGenPw')
    var emailForGenPwEle = document.querySelector('#emailForGenPw')
    var phoneForGenPwEle = document.querySelector('#phoneForGenPw')
    var memoForGenPwEle = document.querySelector('#memoForGenPw')
    var saveBtnForGenPwEle = document.querySelector('#saveBtnForGenPw')
    var savingStatusEle = document.querySelector('#savingStatusForGenPw')

    function refreshWebSelectionForPwGen() {
        db.collection('Password').where('User', '==', firebase.auth().currentUser.email.split('@')[0]).get().then(function(snapshot) {
            var arrayOfWeb = []
            snapshot.forEach((doc) => {
                while (webSelectionForGenPwEle.firstChild) {
                    webSelectionForGenPwEle.removeChild(webSelectionForGenPwEle.firstChild)
                }
                arrayOfWeb.push(doc.data().Web)
                var uniqueArrayOfWeb = new Set(arrayOfWeb.sort())
                uniqueArrayOfWeb.forEach((web) => {
                    var webOption = document.createElement('option')
                    webOption.innerHTML = web
                    webOption.value = web
                    webSelectionForGenPwEle.append(webOption)
                })
            })
            var webOtherOption = document.createElement('option')
            webOtherOption.innerHTML = '其他'
            webOtherOption.value = 'Other'
            webSelectionForGenPwEle.append(webOtherOption)
        })
    }
    pwCreateBtnEle.forEach((ele) => {
        ele.addEventListener('click', function() {
            homeScreenEle.style.display = 'none'
            loginScreenEle.style.display = 'none'
            pwMgrScreenEle.style.display = 'none'
            pwSaveScreenEle.style.display = 'none'
            pwCreateScreenEle.style.display = 'none'
            setTimeout(() => {
                homeScreenEle.style.display = 'none'
                loginScreenEle.style.display = 'none'
                pwMgrScreenEle.style.display = 'none'
                pwSaveScreenEle.style.display = 'none'
                pwCreateScreenEle.style.display = 'block'
            }, 500);
            webIfOtherForGenPwEle.innerHTML = '其他網頁...'
            webIfOtherForGenPwEle.style.color = '#aaaaaa'
            loginIDForGenPwEle.innerHTML = '登入ID'
            loginIDForGenPwEle.style.color = '#aaaaaa'
            emailForGenPwEle.innerHTML = '電郵'
            emailForGenPwEle.style.color = '#aaaaaa'
            phoneForGenPwEle.innerHTML = '電話'
            phoneForGenPwEle.style.color = '#aaaaaa'
            refreshWebSelectionForPwGen()
            pwGenFormEle.reset()
            pwGenSubmitEle.addEventListener('click', () => {
                var numOfDigits = pwGenFormEle.numOfDigits.value
                if (numOfDigits == '') {
                    event.preventDefault()
                    pwGenFormEle.reset()
                } else {
                    event.preventDefault()
                    var char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*'
                    var charNoSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                    var lowerCaseString = 'abcdefghijklmnopqrstuvwxyz'
                    var upperCaseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    var numString = '0123456789'
                    var symbolString = '~!@#$%^&*'
                    var lowerCaseArray = lowerCaseString.split('')
                    var upperCaseArray = upperCaseString.split('')
                    var numArray = numString.split('')
                    var symbolArray = symbolString.split('')
                    var pwGen = ''
                    var genContainsSymbolsValue = document.querySelector('#genContainsSymbols').checked

                    function contains(target, pattern) {
                        var value = 0;
                        pattern.forEach(function(word) {
                            value = value + target.includes(word);
                        });
                        return (!Boolean(value))
                    }
                    if (genContainsSymbolsValue) {
                        while (contains(pwGen, lowerCaseArray) || contains(pwGen, upperCaseArray) || contains(pwGen, numArray)) {
                            pwGen = ''
                            while (pwGen.length < Number(numOfDigits)) {
                                var pwGenIndex = Math.floor(Math.random() * char.length)
                                pwGen += charNoSymbols.charAt(pwGenIndex)
                            }
                        }
                    } else {
                        while (contains(pwGen, lowerCaseArray) || contains(pwGen, upperCaseArray) || contains(pwGen, numArray) || contains(pwGen, symbolArray)) {
                            pwGen = ''
                            while (pwGen.length < Number(numOfDigits)) {
                                var pwGenIndex = Math.floor(Math.random() * char.length)
                                pwGen += char.charAt(pwGenIndex)
                            }
                        }
                    }
                    showPwForGenEle.innerHTML = pwGen
                    copyGenPwEle.addEventListener('click', copyDivToClipboard('showPwForGen'))
                }
            })
            webIfOtherForGenPwEle.addEventListener('focus', () => {
                if (webIfOtherForGenPwEle.innerHTML == '其他網頁...') {
                    webIfOtherForGenPwEle.innerHTML = ''
                    webIfOtherForGenPwEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        webIfOtherForGenPwEle.style.color = '#ffffff'
                    } else {
                        webIfOtherForGenPwEle.style.color = '#000000'
                    }
                }
            })
            webIfOtherForGenPwEle.addEventListener('focusout', () => {
                if (webIfOtherForGenPwEle.innerHTML == '') {
                    webIfOtherForGenPwEle.innerHTML = '其他網頁...'
                    webIfOtherForGenPwEle.style.color = '#aaaaaa'
                }
            })
            webIfOtherForGenPwEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            loginIDForGenPwEle.addEventListener('focus', () => {
                if (loginIDForGenPwEle.innerHTML == '登入ID') {
                    loginIDForGenPwEle.innerHTML = ''
                    loginIDForGenPwEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        loginIDForGenPwEle.style.color = '#ffffff'
                    } else {
                        loginIDForGenPwEle.style.color = '#000000'
                    }
                }
            })
            loginIDForGenPwEle.addEventListener('focusout', () => {
                if (loginIDForGenPwEle.innerHTML == '') {
                    loginIDForGenPwEle.innerHTML = '登入ID'
                    loginIDForGenPwEle.style.color = '#aaaaaa'
                }
            })
            loginIDForGenPwEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            emailForGenPwEle.addEventListener('focus', () => {
                if (emailForGenPwEle.innerHTML == '電郵') {
                    emailForGenPwEle.innerHTML = ''
                    emailForGenPwEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        emailForGenPwEle.style.color = '#ffffff'
                    } else {
                        emailForGenPwEle.style.color = '#000000'
                    }
                }
            })
            emailForGenPwEle.addEventListener('focusout', () => {
                if (emailForGenPwEle.innerHTML == '') {
                    emailForGenPwEle.innerHTML = '電郵'
                    emailForGenPwEle.style.color = '#aaaaaa'
                }
            })
            emailForGenPwEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            phoneForGenPwEle.addEventListener('focus', () => {
                if (phoneForGenPwEle.innerHTML == '電話') {
                    phoneForGenPwEle.innerHTML = ''
                    phoneForGenPwEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        phoneForGenPwEle.style.color = '#ffffff'
                    } else {
                        phoneForGenPwEle.style.color = '#000000'
                    }
                }
            })
            phoneForGenPwEle.addEventListener('focusout', () => {
                if (phoneForGenPwEle.innerHTML == '') {
                    phoneForGenPwEle.innerHTML = '電話'
                    phoneForGenPwEle.style.color = '#aaaaaa'
                }
            })
            phoneForGenPwEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
        })
    })
    saveBtnForGenPwEle.addEventListener('click', () => {
        event.preventDefault()
        var savePwDataForGenPw = {
            Web: webSelectionForGenPwEle[webSelectionForGenPwEle.selectedIndex].value,
            WebIfOther: webIfOtherForGenPwEle.innerHTML,
            Type: catForGenPwEle[catForGenPwEle.selectedIndex].value,
            LoginID: loginIDForGenPwEle.innerHTML,
            LoginPw: showPwForGenEle.innerHTML,
            Email: emailForGenPwEle.innerHTML,
            Phone: phoneForGenPwEle.innerHTML,
            Memo: memoForGenPwEle.value,
        }
        if (savePwDataForGenPw.LoginPw == '') {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '請先創建密碼!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForGenPw.Web == 'Other' && (savePwDataForGenPw.WebIfOther == '其他網頁...' || savePwDataForGenPw.WebIfOther == '')) {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '欠缺網頁名稱!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForGenPw.Web == 'Other' && (savePwDataForGenPw.WebIfOther.includes('@') || savePwDataForGenPw.WebIfOther.startsWith('0') || savePwDataForGenPw.WebIfOther.startsWith('1') || savePwDataForGenPw.WebIfOther.startsWith('2') || savePwDataForGenPw.WebIfOther.startsWith('3') || savePwDataForGenPw.WebIfOther.startsWith('4') || savePwDataForGenPw.WebIfOther.startsWith('5') || savePwDataForGenPw.WebIfOther.startsWith('6') || savePwDataForGenPw.WebIfOther.startsWith('7') || savePwDataForGenPw.WebIfOther.startsWith('8') || savePwDataForGenPw.WebIfOther.startsWith('9'))) {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '欠缺網頁無效!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForGenPw.LoginID == '登入ID' || savePwDataForGenPw.LoginID == '') {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '欠缺登入ID!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else {
            if (savePwDataForGenPw.Web !== 'Other') {
                var numOfPwForGenPw
                db.collection('Password').where('Web', '==', savePwDataForGenPw.Web).orderBy('Index', 'desc').limit(1).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        numOfPwForGenPw = doc.data().Index + 1
                    })
                    db.collection('Password').add({
                        Web: savePwDataForGenPw.Web,
                        Type: savePwDataForGenPw.Type,
                        ID: savePwDataForGenPw.LoginID,
                        Password: savePwDataForGenPw.LoginPw,
                        Email: savePwDataForGenPw.Email,
                        Phone: savePwDataForGenPw.Phone,
                        Memo: savePwDataForGenPw.Memo,
                        User: firebase.auth().currentUser.email.split('@')[0],
                        Index: numOfPwForGenPw,
                    })
                    savingStatusEle.innerHTML = '密碼已儲存!'
                    savingStatusEle.className = 'box'
                    setTimeout(() => {
                        savingStatusEle.innerHTML = ''
                        savingStatusEle.className = ''
                        webIfOtherForGenPwEle.innerHTML = '其他網頁...'
                        webIfOtherForGenPwEle.style.color = '#aaaaaa'
                        loginIDForGenPwEle.innerHTML = '登入ID'
                        loginIDForGenPwEle.style.color = '#aaaaaa'
                        emailForGenPwEle.innerHTML = '電郵'
                        emailForGenPwEle.style.color = '#aaaaaa'
                        phoneForGenPwEle.innerHTML = '電話'
                        phoneForGenPwEle.style.color = '#aaaaaa'
                        memoForGenPwEle.value = ''
                        refreshWebSelectionForPwGen()
                    }, 3000);
                })
            } else {
                db.collection('Password').add({
                    Web: savePwDataForGenPw.WebIfOther,
                    Type: savePwDataForGenPw.Type,
                    ID: savePwDataForGenPw.LoginID,
                    Password: savePwDataForGenPw.LoginPw,
                    Email: savePwDataForGenPw.Email,
                    Phone: savePwDataForGenPw.Phone,
                    Memo: savePwDataForGenPw.Memo,
                    User: firebase.auth().currentUser.email.split('@')[0],
                    Index: 1,
                })
                savingStatusEle.innerHTML = '密碼已儲存!'
                savingStatusEle.className = 'box'
                setTimeout(() => {
                    savingStatusEle.innerHTML = ''
                    savingStatusEle.className = ''
                    webIfOtherForGenPwEle.innerHTML = '其他網頁...'
                    webIfOtherForGenPwEle.style.color = '#aaaaaa'
                    loginIDForGenPwEle.innerHTML = '登入ID'
                    loginIDForGenPwEle.style.color = '#aaaaaa'
                    emailForGenPwEle.innerHTML = '電郵'
                    emailForGenPwEle.style.color = '#aaaaaa'
                    phoneForGenPwEle.innerHTML = '電話'
                    phoneForGenPwEle.style.color = '#aaaaaa'
                    memoForGenPwEle.value = ''
                    refreshWebSelectionForPwGen()
                }, 3000);
            }
        }
    })
})