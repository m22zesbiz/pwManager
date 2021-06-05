window.addEventListener('DOMContentLoaded', function() {
    // Password Creator
    var pwGenFormEle = document.querySelector('#pwGenForm')
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
                while (webSelectionForGenPwEle.children[1]) {
                    webSelectionForGenPwEle.removeChild(webSelectionForGenPwEle.lastChild)
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
            webIfOtherForGenPwEle.value = ''
            loginIDForGenPwEle.value = ''
            emailForGenPwEle.value = ''
            phoneForGenPwEle.value = ''
            memoForGenPwEle.value = ''
            pwGenFormEle.reset()
            refreshWebSelectionForPwGen()
        })
})
        pwGenFormEle.addEventListener('submit', (e) => {
            e.preventDefault()
            var numOfDigits = pwGenFormEle.numOfDigits.value
            if (numOfDigits == '') {
                pwGenFormEle.reset()
            } else {
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
            }
        })

        copyGenPwEle.addEventListener('click', () => {copyDivToClipboard('showPwForGen')})

        saveBtnForGenPwEle.addEventListener('click', () => {
            var savePwDataForGenPw = {
                Web: webSelectionForGenPwEle[webSelectionForGenPwEle.selectedIndex].value,
                WebIfOther: webIfOtherForGenPwEle.value,
                Type: catForGenPwEle[catForGenPwEle.selectedIndex].value,
                LoginID: loginIDForGenPwEle.value,
                LoginPw: showPwForGenEle.innerHTML,
                Email: emailForGenPwEle.value,
                Phone: phoneForGenPwEle.value,
                Memo: memoForGenPwEle.value,
            }
            if (savePwDataForGenPw.LoginPw == '請選擇密碼位數並創建') {
                savingStatusEle.className = 'box'
                savingStatusEle.innerHTML = '請先創建密碼!'
                setTimeout(() => {
                    savingStatusEle.className = ''
                    savingStatusEle.innerHTML = ''
                }, 3000);
            } else if ((savePwDataForGenPw.Web == 'Other' || savePwDataForGenPw.Web == '請選擇網頁') && (savePwDataForGenPw.WebIfOther == '其他網頁...' || savePwDataForGenPw.WebIfOther == '')) {
                savingStatusEle.className = 'box'
                savingStatusEle.innerHTML = '欠缺網頁名稱!'
                setTimeout(() => {
                    savingStatusEle.className = ''
                    savingStatusEle.innerHTML = ''
                }, 3000);
            } else if ((savePwDataForGenPw.Web == 'Other' || savePwDataForGenPw.Web == '請選擇網頁') && (savePwDataForGenPw.WebIfOther.includes('@') || savePwDataForGenPw.WebIfOther.startsWith('0') || savePwDataForGenPw.WebIfOther.startsWith('1') || savePwDataForGenPw.WebIfOther.startsWith('2') || savePwDataForGenPw.WebIfOther.startsWith('3') || savePwDataForGenPw.WebIfOther.startsWith('4') || savePwDataForGenPw.WebIfOther.startsWith('5') || savePwDataForGenPw.WebIfOther.startsWith('6') || savePwDataForGenPw.WebIfOther.startsWith('7') || savePwDataForGenPw.WebIfOther.startsWith('8') || savePwDataForGenPw.WebIfOther.startsWith('9'))) {
                savingStatusEle.className = 'box'
                savingStatusEle.innerHTML = '網頁名稱無效!'
                setTimeout(() => {
                    savingStatusEle.className = ''
                    savingStatusEle.innerHTML = ''
                }, 3000);
            } else if (savePwDataForGenPw.Type == '請選擇類型') {
                savingStatusEle.className = 'box'
                savingStatusEle.innerHTML = '尚未選擇類型!'
                setTimeout(() => {
                    savingStatusEle.className = ''
                    savingStatusEle.innerHTML = ''
                }, 3000);
            } else if (savePwDataForGenPw.LoginID == '') {
                savingStatusEle.className = 'box'
                savingStatusEle.innerHTML = '欠缺登入ID!'
                setTimeout(() => {
                    savingStatusEle.className = ''
                    savingStatusEle.innerHTML = ''
                }, 3000);
            } else {
                if (savePwDataForGenPw.Web != 'Other' && savePwDataForGenPw.Web != '請選擇網頁') {
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
                            showPwForGenEle.innerHTML = '請選擇密碼位數並創建'
                            webIfOtherForGenPwEle.value = ''
                            loginIDForGenPwEle.value = ''
                            emailForGenPwEle.value = ''
                            phoneForGenPwEle.value = ''
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
                        showPwForGenEle.innerHTML = '請選擇密碼位數並創建'
                        webIfOtherForGenPwEle.value = ''
                        loginIDForGenPwEle.value = ''
                        emailForGenPwEle.value = ''
                        phoneForGenPwEle.value = ''
                        memoForGenPwEle.value = ''
                        refreshWebSelectionForPwGen()
                    }, 3000);
                }
            }
        })
    })