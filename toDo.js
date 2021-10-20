if(localStorage.getItem('schedule')==null){
    id = 0
}else{
    id = Number(localStorage.getItem('schedule')[0])
    console.log('id found is: ',id)
}
Doc = document.getElementById('1')
timeBox = document.getElementById('11')
addBtn = document.getElementById('120')
 
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
        
    }
}

function noComa(str){
    return str.replaceAll(',','٬')
}


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
    
    //needs update
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