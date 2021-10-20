function updateHTML(id, d,m,y,h,M,s, Name, desc,Dt){
    let ID = 'i'+id
    //console.log('id is: ', ID)

    
    para = document.getElementById(ID)
    if(para ==null){
        para = document.createElement('p')
        para.id = ID
    }

    jd = document.createElement('div')
    para.classList.add('card')
           
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

setInterval(()=>{
    schl = localStorage.getItem('schedule')
    if(schl!=null)
    { 
        schl = schl.split(',')
        for (let i = 1; i < schl.length; i+=10) {
            updateHTML( schl[i],schl[i+1],schl[i+2],schl[i+3],schl[i+4],schl[i+5],schl[i+6],schl[i+7],schl[i+8],schl[i+9])
        }

        //Doc.innerHTML = ""
    }
    //console.log(schl)
},1000)
