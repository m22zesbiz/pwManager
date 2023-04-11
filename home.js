window.addEventListener('DOMContentLoaded', function() {
    // Home Section
    var countdownEle = document.querySelector('#countdown')
    homeBtnEle.forEach((ele) => {
        ele.addEventListener('click', () => {
            homeScreenEle.style.display = 'none'
            loginScreenEle.style.display = 'none'
            pwMgrScreenEle.style.display = 'none'
            pwSaveScreenEle.style.display = 'none'
            pwCreateScreenEle.style.display = 'none'
            setTimeout(() => {
                homeScreenEle.style.display = 'block'
                loginScreenEle.style.display = 'none'
                pwMgrScreenEle.style.display = 'none'
                pwSaveScreenEle.style.display = 'none'
                pwCreateScreenEle.style.display = 'none'
            }, 500);
        })
    })

    function countdown() {
        var currentDate = Math.floor(Date.now());
        var startDate = new Date(2018, 4, 12);
        var diff = new Date(currentDate - startDate); 
        var daysPassed = diff.getDate() - 1; 
        var monthsPassed = diff.getMonth();
        var yearsPassed = diff.getFullYear() - 1970; 
        var totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
        if (daysPassed == 0 && monthsPassed == 0) {
            countdownEle.innerHTML = `與BB豬已一起渡過第${yearsPassed}年紀念日（第${totalDays}日）`;
        } else if (monthsPassed == 0) {
            countdownEle.innerHTML = `與BB豬已一起渡過${yearsPassed}年零${daysPassed}日（第${totalDays}日）`;
        } else if (daysPassed == 0) {
            countdownEle.innerHTML = `與BB豬已一起渡過${yearsPassed}年零${monthsPassed}個月（第${totalDays}日）`;
        } else {
            countdownEle.innerHTML = `與BB豬已一起渡過${yearsPassed}年${monthsPassed}個月零${daysPassed}日（第${totalDays}日）`;
        }
    }
    countdown()
    setInterval(() => {
        countdown()
    }, 1000);
})