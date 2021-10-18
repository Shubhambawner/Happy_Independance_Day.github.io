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
    timeBox.innerHTML = `The time is: <h2> ${hr} hours, ${min} minutes and ${sec} seconds </h2>\n on ${day}. ${date}th of ${Month}. ${year}`
}, 1000)
 

function createHTML(id, d,m,y,h,M,s, Name, desc,Dt){
    let ID = 'i'+id
    //console.log('id is: ', ID)

    
    para = document.getElementById(ID)
    if(para ==null){
        para = document.createElement('p')
        para.id = ID
    }

    jd = document.createElement('div')
   
           
    let nowDt = new Date()
    
    let ss =s - nowDt.getSeconds() 
    let min =M - nowDt.getMinutes() 
    let hh =h - nowDt.getHours() 
    
    let dd =d - nowDt.getDate()
    let mm =m - nowDt.getMonth() 
    let yyyy =y - nowDt.getFullYear() 

    if(ss<0){min--;ss+=60}
    if(min<0){hh--;min+=60}
    if(hh<0){dd--;hh+=24}
    if(dd<0){mm--;
        if(mm==1 || mm==3 || mm==5|| mm==7|| mm==8|| mm==10|| mm==12){dd+=31}
        else if(mm==2 || leapYR(yyyy)){ dd+=29 }
        else if(mm==2 || !leapYR(yyyy)){ dd+=28 }
        else{dd+=30}
    }
    if(mm<0){yyyy--;mm+=12}
    if(yyyy<0){
          para.innerHTML = `<div class="t5" ><i>event: <b>${Name}</b> is now a History! </i> <button id="" onclick="remove(${id})">Remove</button></div><br><br><i>${Dt}</i> <br><br>Details: ${desc} `
    }
    else{

        if(yyyy>0){
            para.innerHTML = `<div class="t5" ><i><b>${Name}</b> in: </i>  <button id="" onclick="remove(${id})">Remove</button></div> <div><h2>${yyyy} Years, ${mm} Months, ${dd} Days    </h2>Details: <i>${desc}</i> <br><br> ${Dt}</div>   `
        }else if(mm>0){
            para.innerHTML = `<div class="t5" ><i><b>${Name}</b> in: </i>  <button id="" onclick="remove(${id})">Remove</button></div> <div><h2>${mm} Months, ${dd} Days, ${hh} Hours      </h2>Details: <i>${desc}</i> <br><br> ${Dt}</div>  `
        }else if(dd>0){
            para.innerHTML = `<div class="t5" ><i><b>${Name}</b> in: </i>  <button id="" onclick="remove(${id})">Remove</button></div> <div><h2>${dd} Days, ${hh} Hours, ${min} Minutes    </h2>Details: <i>${desc}</i> <br><br> ${Dt}</div> `
        }else{
            para.innerHTML = `<div class="t5" ><i><b>${Name}</b> in: </i>  <button id="" onclick="remove(${id})">Remove</button></div> <div><h2>${hh} Hours, ${min} Minutes, ${ss} Seconds </h2>Details: <i>${desc}</i> <br><br> ${Dt}</div> `
        }
        //para.innerHTML += ` `              
    }

    para.appendChild(document.createElement('hr'))

    Doc.appendChild(para)
    
    
}

function remove(id){
    sce = localStorage.getItem('schedule')
    sce = sce.split(',')
    console.log('target id',id)
    for (let i = 1; i < sce.length; i+=10) {
        if(sce[i]==`${id}`){
            removeFromLocalStorage(i)
            //sce.splice(id, 10)
            console.log('id to remove: ', id)
            break;
        }
    }
    
    document.getElementById('i'+id).style.display = 'none' 
    
}

function removeFromLocalStorage(index){
    sce = localStorage.getItem('schedule')
    sce = sce.split(',')
    sce.splice(index, 10)
    console.log('index removed: ', index, sce)
    localStorage.removeItem('schedule')
    localStorage.setItem('schedule',sce)

}

function addLocalStorage(Dt, Name, desc){
    if(localStorage.getItem('schedule')==null){
        schedule = [id]
        localStorage.setItem('schedule', schedule)
    }
    schedule = localStorage.getItem('schedule')
    schedule = schedule.split(',')
    //schedule = schedule.map(Number)// from stakoverflow!
    
    d = Dt.getDate()
    m = Dt.getMonth()
    y = Dt.getFullYear()

    h = Dt.getHours()
    M = Dt.getMinutes()
    s = Dt.getSeconds()

    
    
    jaguar = [id, d,m,y,h,M,s, Name, desc, Dt.toString()]
    //console.log(jaguar)
    id++
    schedule[0] = id
    
    schedule.push(jaguar)
    
    
    localStorage.removeItem('schedule')

    localStorage.setItem('schedule',schedule)
    console.log('lc after add ',localStorage.getItem('schedule').split(','))
    
    
}

function addClicked(){
    IPdate = document.getElementById('123').value
    IPtime = document.getElementById('124').value
    if(valid(IPdate, IPtime)){
        let Dt = new Date(IPdate+'T'+IPtime)
        Name = noComa(document.getElementById('121').value)
        Desc = noComa(document.getElementById('122').value)
        //Doc.appendChild(document.createElement('hr'))
        addLocalStorage(Dt,Name ,Desc )
        //driveHTML()
        //Doc.appendChild(document.createElement('hr'))
        
    }else{
        //alert('please follow the input format, machines are dumb')
    }
}

setInterval(()=>{
    schl = localStorage.getItem('schedule')
    if(schl!=null)
    { 
        schl = schl.split(',')
        for (let i = 1; i < schl.length; i+=10) {
            createHTML( schl[i],schl[i+1],schl[i+2],schl[i+3],schl[i+4],schl[i+5],schl[i+6],schl[i+7],schl[i+8],schl[i+9])
        }

        //Doc.innerHTML = ""
    }
    //console.log(schl)
},1000)

function valid(IPdate, IPtime){
     if(new Date(IPdate+'T'+'23:30:00')=='Invalid Date'){
        alert('Date format entered is invalid !!!\nplease follow the input format, machines are dumb')
        return false
    }
    if(new Date("2021-12-31"+'T'+IPtime)=='Invalid Date'){
        alert('Time format entered is  invalid !!!\nplease follow the input format, machines are dumb')
        return false
    }
    else{
        return true;
    }
}
function noComa(str){
    return str.replaceAll(',','٬')
}
function leapYR(yyyy){
    if(yyyy%100!=0 && yyyy%4==0){
        return true
    }else if(yyyy%400){
        return true
    }else{
        return false
    }
    
}
