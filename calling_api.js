const { axios } = require("axios");
const prompt = require('prompt-sync')();
const fs = require('fs');
const { PassThrough } = require("stream");

try {fs.readFile('mynewfile3.json','utf-8',function (err,data){
    let data1=JSON.parse(data)
    let Id_list=[]
    for (let x in data1){
        for (let y in data1[x]){
            console.log(x,":",data1[x]['name'])
            Id_list.push(data1[x]['id'])
            break
        }
    }
    const name = parseInt(prompt("Which courses you want :- ")); 
    for (let x=0;x<Id_list.length;x++){
        if (name===x){
            let request1=axios.get(`http://merakilearn.org/api/courses/${Id_list[x]}/exercises`)
            .then( function (res){
                let data2=res.data
                let b=[]
                let c=[]
                let f=1
                for (let i in data2){
                    for ( let y in data2[i]){
                        console.log()
                        console.log(f,":",data2[i][y]['name'])
                        b.push(f.toString())
                        c.push(data2[i][y]["slug"])
                        d=1
                        for (let m in data2[i][y]['childExercises']){
                            z=f.toString()+'.'+d.toString()
                            b.push(z)
                            c.push(data2[i][y]['childExercises'][m]["slug"])
                            console.log("  ",z,":",data2[i][y]['childExercises'][m]["name"])
                            d+=1
                        }f+=1
                    }
                }
                // console.log(b)
                // console.log(c)
                const name2 = (prompt("Which slug you want :- ")); 
                for (let i=0; i<b.length;i++){
                        if (name2 === b[i]){
                        let request2 = axios.get(`http://merakilearn.org/api/courses/12/exercise/getBySlug?slug=${c[i]}`)
                        .then (function (p) {
                            console.log(p.data['content'])                           
                        })
                        .catch (function (err) {
                            console.log(err)
                        })}
                }
            })
            .catch (function (error){
                console.log(error)
            })
        }
    }
})}
catch (err){
    axios.get("http://merakilearn.org/api/courses").then(function (res){
        let response = res.data
        fs.writeFile('mynewfile3.json',JSON.stringify(response.availableCourses), function (err) {
            if (err) throw err;
            });})
    .catch(function (error){
        console.log(error);
    })
}