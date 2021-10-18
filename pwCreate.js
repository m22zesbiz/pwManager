window.addEventListener('DOMContentLoaded', function() {
    // Password Creator
    var pwGenFormEle = document.querySelector('#pwGenForm')
    var mainForPwCreateEle = document.querySelector('#mainForPwCreate')
    var pwCreateHeadingEle = document.querySelector('#pwCreateHeading')
    var numOfDigitsEle = document.querySelector('#numOfDigits')
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

    pwCreateHeadingEle.addEventListener('click', () => {
        var dateNow = new Date(Date.now())
        var sevenDaysBeforeTodayDate
        var sevenDaysBeforeTodayMonth
        var sevenDaysBeforeTodayYear
        if (dateNow.getDate() > 7) {
            sevenDaysBeforeTodayDate = dateNow.getDate() - 7
            sevenDaysBeforeTodayMonth = dateNow.getMonth()
            sevenDaysBeforeTodayYear = dateNow.getYear() + 1900
        } else if (dateNow.getMonth() > 0) {
            sevenDaysBeforeTodayDate = dateNow.getDate() + 30 - 7
            sevenDaysBeforeTodayMonth = dateNow.getMonth() - 1
            sevenDaysBeforeTodayYear = dateNow.getYear() + 1900
        } else {
            sevenDaysBeforeTodayDate = dateNow.getDate() + 30 - 7
            sevenDaysBeforeTodayMonth = dateNow.getMonth() + 12 - 1
            sevenDaysBeforeTodayYear = dateNow.getYear() + 1900 - 1
        }
        var sevenDaysBeforeToday = new Date(sevenDaysBeforeTodayYear, sevenDaysBeforeTodayMonth, sevenDaysBeforeTodayDate)
        db.collection('PasswordGeneratedRecord').where('User', '==', firebase.auth().currentUser.email.split('@')[0]).where('Date', '<=', sevenDaysBeforeToday).get().then(function(snapshot) {
            snapshot.forEach((doc) => {
                db.collection('PasswordGeneratedRecord').doc(doc.id).delete()
            })
        })
        mainForPwCreateEle.style.display = 'none'
        var genHistory = document.createElement('section')
        genHistory.style.display = 'none'
        genHistory.style.overflowY = 'scroll'
        genHistory.style.height = 'calc(100vh - 68px - 50px - 30px)'
        var flexbox = document.createElement('div')
        flexbox.className = 'flexbox'
        var backBtn = document.createElement('div')
        backBtn.className = 'box'
        backBtn.style.textAlign = 'center'
        backBtn.innerHTML = '<'
        var genHistoryHeading = document.createElement('div')
        genHistoryHeading.className = 'box'
        genHistoryHeading.style.flex = '1'
        genHistoryHeading.style.textAlign = 'center'
        genHistoryHeading.innerHTML = '創建記錄'
        pwCreateScreenEle.append(genHistory)
        genHistory.append(flexbox)
        flexbox.append(backBtn)
        flexbox.append(genHistoryHeading)
        setTimeout(() => {
            genHistory.style.display = 'block'
            db.collection('PasswordGeneratedRecord').where('User', '==', firebase.auth().currentUser.email.split('@')[0]).orderBy('Date').get().then(function(snapshot) {
                var arrayOfPwGenHistory = []
                snapshot.forEach((doc) => {
                    arrayOfPwGenHistory.unshift(doc.data())
                })
                arrayOfPwGenHistory.forEach((obj) => {
                    var genHistoryList = document.createElement('div')
                    genHistoryList.className = 'flexbox'
                    genHistoryList.style.padding = '10px'
                    var pwHistory = document.createElement('div')
                    pwHistory.style.width = 'calc(50vw - 20px)'
                    pwHistory.innerHTML = obj.Password
                    var pwHistoryDate = document.createElement('div')
                    pwHistoryDate.style.width = 'calc(50vw - 20px)'
                    pwHistoryDate.innerHTML = new Date(Number(obj.Date.seconds + '000'))
                    genHistory.append(genHistoryList)
                    genHistoryList.append(pwHistory)
                    genHistoryList.append(pwHistoryDate)
                })
            })
        }, 500);
        backBtn.addEventListener('click', () => {
            genHistory.parentNode.removeChild(genHistory)
            setTimeout(() => {
                mainForPwCreateEle.style.display = 'block'
            }, 500);
        })
    })

    pwGenFormEle.addEventListener('submit', (e) => {
        e.preventDefault()
        var numOfDigits = numOfDigitsEle[numOfDigitsEle.selectedIndex].value.replace('位', '')
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
            db.collection('PasswordGeneratedRecord').add({
                Password: pwGen,
                User: firebase.auth().currentUser.email.split('@')[0],
                Date: new Date(),
            })
        }
    })

    copyGenPwEle.addEventListener('click', (e) => {
        e.preventDefault()
        copyDivToClipboard('showPwForGen')
    })

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