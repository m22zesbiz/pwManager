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
        var date = Math.floor(Date.now() / 1000)
        var sec = date % 60
        var min = (date - sec) / 60
        var hrs = (min - min % 60) / 60
        var day = (hrs - hrs % 24) / 24
        var startDate = new Date(2018, 4, 12) / 1000
        var secForStartDate = startDate % 60
        var minForStartDate = (startDate - secForStartDate) / 60
        var hrsForStartDate = (minForStartDate - minForStartDate % 60) / 60
        var dayForStartDate = (hrsForStartDate - hrsForStartDate % 24) / 24
        countdownEle.innerHTML = `與BB豬已一起渡過${day - dayForStartDate}日`
    }
    countdown()
    setInterval(() => {
        countdown()
    }, 1000);
})