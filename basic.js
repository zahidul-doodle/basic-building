
document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const myName = document.getElementById("myName").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const menu = document.getElementById("selectMenu").value;
    const formData = {
        name: myName,
        age: age,
        gender: gender,
        menu: menu
    }
    // console.log(JSON.stringify(formData));
    // const jsonData = JSON.stringify(formData)
    // localStorage.setItem(formData.name, jsonData)

    addData(formData)

})

const addData = (formData) => {
    const { name, age, gender, menu } = formData;
    if (!name || !age || !gender || !menu) {
        return;
    }
    let myData = getData();
    myData[formData.name] = formData; // dynamically write object key and inside its value
    const stringiFiedData = JSON.stringify(myData);
    localStorage.setItem('form', stringiFiedData);
}

const displayData = (data) => {
    console.log(data.length)

    for (i = 0; i < data.length; i++) {
        let row = document.getElementById("showData").insertRow();
        row.insertCell(0).innerHTML = data[i].name;
        row.insertCell(1).innerHTML = data[i].age;
        row.insertCell(2).innerHTML = data[i].gender;
        row.insertCell(3).innerHTML = data[i].menu;
      }
}
const getData = () => {
    const myData = localStorage.getItem('form');
    let objMyData;
    if (myData) {
        objMyData = JSON.parse(myData);
    } else {
        objMyData = {}
    }
    return objMyData;
}

const setData = () => {
    const localData = getData();
    let myArr = []
    for (key in localData) {
        // console.log(localData[key].age);
        // console.log(localData[key]);
        myArr.push(localData[key])
    }
    displayData(myArr)
}
setData()


