// const abc = '1234'
// const abcd = +abc
// console.log(typeof abc)
// console.log(typeof abcd)

document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault();
  let myName = document.getElementById("myName").value;
  let age = document.getElementById("age").value
  let gender = document.getElementById("gender").value;
  let menu = document.getElementById("selectMenu").value;
  const myModifiedName = capitalizeFirstLetter(myName);
  validate();
  function validate() {
    if (myName.trim() === "") {
      document.getElementById("isValidName").innerHTML = "Please, fill the Name Field";
      return false;
    }
    if (!isNaN(myName)) {
      document.getElementById("isValidName").innerHTML = "Name can't  be number !";
      return false;
    }
    if ((myName.length <= 3) || (myName.length > 20)) {
      document.getElementById("isValidName").innerHTML = "Name must be between 5 to 20 letters"
      return false;
    }
    if (age === "") {
      document.getElementById("isValidAge").innerHTML = "Please, fill the Age Field";
      return false;
    }
    if (age < 0) {
      document.getElementById("isValidAge").innerHTML = "Age can't be negative !";
      return false;
    }
    if (age > 90) {
      document.getElementById("isValidAge").innerHTML = "Age must be valid !";
      return false;
    }
    if (document.getElementById('gender').checked == false) {
      document.getElementById("isValidGender").innerHTML = "Please, Select the Gender Field";
      return false;
    }
    if (!menu.value) {
      document.getElementById("isValidMenu").innerHTML = "Please, select the Menu Field";
      return false;
    }

  }

  let formData = {
    name: myModifiedName,
    age: age,
    gender: gender,
    menu: menu,
  };
  addData(formData);
  // console.log(JSON.stringify(formData));
  // const jsonData = JSON.stringify(formData)
  // localStorage.setItem(formData.name, jsonData)

});

// text conversion 
function capitalizeFirstLetter(string) {
  let sentence = string.split(" ");
  let newSentence = []
  for (word of sentence) {
    newSentence.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  }
  return newSentence.join(" ");
}


// erase error message
function onChange() {
  if (myName.length !== 0 || age.length !== 0 || (document.getElementById('gender').checked == true) || menu.valu) {
    document.getElementById("isValidName").hidden();
    document.getElementById("isValidAge").innerHTML = "";
    document.getElementById("isValidGender").innerHTML = "";
    document.getElementById("isValidMenu").innerHTML = "";
  }
}


const addData = (formData) => {
  const { name, age, gender, menu } = formData;
  if (!name || !age || !gender || !menu) {
    return;
  }
  let myData = getData();
  myData[formData.name] = formData; // dynamically write object key and inside its value
  const stringiFiedData = JSON.stringify(myData);
  localStorage.setItem("form", stringiFiedData);
};

const displayData = (data) => {
  console.log("total rows:", data.length);

  let tbody = document.getElementById("showData");
  for (i = 0; i < data.length; i++) {
    let row = document.getElementById("showData").insertRow();
    // console.log(row);
    row.setAttribute("id", i + 1);
    row.insertCell(0).innerHTML = i + 1;
    row.insertCell(1).innerHTML = data[i].name;
    row.insertCell(2).innerHTML = data[i].age;
    row.insertCell(3).innerHTML = data[i].gender;
    row.insertCell(4).innerHTML = data[i].menu;
    row.insertCell(5).innerHTML = `<div style="display:flex">
        <button
            id="submitBtn"
            onclick= "seeDetails(this)"
            type="submit"
            class="btn btn-primary btn-sm"
            style="margin:5px"
          >
            See Details
          </button>
          <button
            id="updateBtn"
            onclick= "updateRow(this)"
            type="submit"
            class="btn btn-secondary btn-sm"
            style="margin:5px"
          >
            Update
          </button>
          <button
            id="deleteBtn"
            onclick= "deleteRow()"
            type="submit"
            class="btn btn-danger btn-sm"
            style="margin:5px"
          >
            Delete
          </button>
          </div>
          `;
  }
};

const getData = () => {
  const myData = localStorage.getItem("form");
  let objMyData;
  if (myData) {
    objMyData = JSON.parse(myData);
  } else {
    objMyData = {};
  }
  return objMyData;
};

const setData = () => {
  const localData = getData();
  let myArr = [];
  for (key in localData) {
    // console.log(localData[key].age);
    // console.log(localData[key]);
    myArr.push(localData[key]);
  }
  displayData(myArr);
};
setData();

// see Details

function seeDetails(e) {
  //   console.log("clicked", e);
  let table = document.getElementById("table");
  if (table !== null) {
    for (let i = 0; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        // tableText(this)
        // console.log("==>", this);
        let rowDetails = {
          name: this.childNodes[1].innerText,
          age: this.childNodes[2].innerText,
          gender: this.childNodes[3].innerText,
          menu: this.childNodes[4].innerText,
        };
        console.log(rowDetails);
        // console.log("==>", this.childNodes[2].innerText);
        // console.log("==>", this.childNodes[3].innerText);
        // console.log("==>", this.childNodes[4].innerText);
      };
    }
  }
}
// function tableText(tableRow) {
//     console.log(tableRow);
// }

// function seeDetails(e) {
//     var table = document.getElementById("table");
//     for (let i in table.rows) {
//         let row = table.rows[i]
//         //iterate through rows
//         //rows would be accessed using the "row" variable assigned in the for loop
//         for (let j in row.cells) {
//             let col = row.cells[j]
//             console.log(col);
//             //iterate through columns
//             //columns would be accessed using the "col" variable assigned in the for loop
//         }
//     }
// }

function updateRow() {
  let table = document.getElementById("table");
  let updateBtn = document.getElementById("updateBtn");
  // changing btn to make update
  updateBtn.innerHTML = "Update";
  updateBtn.setAttribute("class", "btn btn-success");

  if (table !== null) {
    for (let i = 0; i < table.rows.length; i++) {
      table.rows[i].onclick = function () {
        //   console.log(rows[i]);
        // tableText(this)
        console.log("caught id update", this.id);
        let rowDetails = {
          name: this.childNodes[1].innerText,
          age: this.childNodes[2].innerText,
          gender: this.childNodes[3].innerText,
          menu: this.childNodes[4].innerText,
        };
        // console.log(rowDetails);
        showOldData(rowDetails);
      };
    }
  }

  function showOldData(rowDetails) {
    let formData2 = {
      name: "",
      age: "",
      gender: "",
      menu: "",
    };
    //grab the input filed by id
    const myName2 = document.getElementById("myName");
    const age2 = document.getElementById("age");
    const gender2 = document.getElementById("gender");
    const menu2 = document.getElementById("selectMenu");

    // get old data to set the field
    formData2.myName2 = rowDetails.name;
    formData2.age = rowDetails.age;
    formData2.gender2 = rowDetails.gender;
    formData2.menu2 = rowDetails.menu;
    // console.log(formData2.myName2);

    // showing now the old data in input field to make update
    myName2.value = formData2.myName2;
    age2.value = formData2.age;
    gender2.value = formData2.gender2;
    menu2.value = formData2.menu2;
  }

  //
  // document.getElementById("updateBtn").innerHTML === "Update" &&
  //   updateOldData();

  // if (!JSON.parse(localStorage.getItem("form"))) {
  //   localStorage.setItem("form", JSON.stringify([formData2]));
  // } else {
  //   var localStorageData = JSON.parse(localStorage.getItem("form"));
  //   localStorageData.push(formData2);
  //   localStorage.setItem("form", JSON.stringify(localStorageData));
  // }

  // function updateOldData() {
  //   var sData = JSON.parse(localStorage.getItem("form"));
  //   localStorage.clear();
  //   sData.map((element, index) => {
  //     element.name =
  //       element.name === tableData1.name
  //         ? document.getElementById("name").value
  //         : element.name;
  //   });
  //   localStorage.setItem("data", JSON.stringify(sData));
  //   location.reload();
  // }
}

// delete row
function deleteRow(id) {
  let table = document.getElementById("table");
  let deleteBtn = document.getElementById("deleteBtn");
  if (confirm("Are you sure to delete?")) {
    if (table !== null) {
      for (let row = 0; row < table.rows.length; row++) {
        table.rows[row].onclick = function () {
          console.log("caught id delete: ", this.id);
          document.getElementsByTagName("tr")[this.id].remove();
        }
      }
    }

  }

  let myData = getData();
  console.log("deleteClicked:", Object.keys(myData));
  map.myData((element, index) => { console.log(element); })
}
