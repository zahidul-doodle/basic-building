// const persons = [{
//     zahid: "zahidul islam",
//     anik: "shahriar anik"

// }]


// // console.log(persons[0].zahid)
// console.log(Object.keys(persons.at(0)));

// function print(param){
//     (Object.keys(persons.at(0)) === zahid ? )
// }


const jsonData = JSON.parse('{"anik":"Mr. Anik", "zahid":"Mr. Zahid"}');

function print(param){
  console.log(jsonData[param])
}

print('anik')