let fs;
fs = require('fs');

let file = "./data/dataAll.json";

let obj = JSON.parse(fs.readFileSync(file));
//

// let numberOfNull = 0;
let list=[];
let index;
index = obj.length;
for (let i=0; i<index; i++) {
    // let numberOfNull = 0;
    if (obj[i].classification === "Photograph") {    //有选择的输出json数据
    // objectNo += "'" + obj.records[i].id + "'" + ", ";
//     // obID += obj.records[i].id + ", ";
//     list += obj[i].artist.split(' ').reverse().pop() + ", "
        list += obj[i];
//         numberOfNull += 1;
        console.log(JSON.stringify(obj[i]));
        // fs.writeFileSync('./dataRembrandt.json',JSON.stringify(obj[i]), 'utf8');
//     obj[i].gender.replace("male","")
//     console.log(object)

    };
    // fs.writeFileSync('./dataRembrandt.json',JSON.stringify(obj[i]), 'utf8');

}
// console.log(JSON.stringify(list))
// console.log(numberOfNull)
// console.log(list);
// fs.writeFileSync('./dataVanDyck.json',JSON.stringify(obj[i]), 'utf8')
// fs.writeFile('./test.json', 'utf8')
