if(localStorage.getItem('schedule')==null){
    id = 0
}else{
    id = Number(localStorage.getItem('schedule')[0])
    console.log('id found is: ',id)
}
Doc = document.getElementById('1')
timeBox = document.getElementById('11')
addBtn = document.getElementById('120')
       
setInterval(()=>{
    let Dt = Date()
    day = Dt.slice(0,3)
    Month = Dt.slice(4,7)
    date = Dt.slice(8, 10)
    year = Dt.slice(11, 15)
    hr = Dt.slice(16, 18)
    min = Dt.slice( 19, 21)
    sec = Dt.slice(22, 24)
    timeBox.innerHTML = ` <h2> ${hr} hours, ${min} minutes and ${sec} seconds </h2>\n on ${day}. ${date}th of ${Month}. ${year}`
}, 1000)
 

