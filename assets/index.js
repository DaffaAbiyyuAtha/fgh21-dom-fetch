const myButton = document.getElementById("button-survey");
const myForm = document.getElementById("form-survey");
const tbody = document.getElementById("tbody");
myForm.addEventListener("submit", inputData);
async function inputData(save) {
  save.preventDefault();

  const nameInput = save.target.name.value;
  const ageInput = save.target.age.value;

  const dataName = document.createElement("td");
  const row = document.createElement("tr");
  const names = document.getElementById("name");
  const nameValue = names.value;
  dataName.textContent = nameValue;

  const dataAge = document.createElement("td");
  const ages = document.getElementById("age");
  const ageValue = ages.value;
  dataAge.textContent = ageValue;

  const genders = document.getElementsByName("gender");
  const dataGander = document.createElement("td");
  let valueGander = "";

  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      valueGander += genders[i].value;
    }
  }
  dataGander.textContent = valueGander;

  const filter = document.getElementsByName("filter");
  const dataFilter = document.createElement("td");
  let valueFilter = "";

  for (let i = 0; i < filter.length; i++) {
    if (filter[i].checked) {
      valueFilter += filter[i].value;
    }
  }
  dataFilter.textContent = valueFilter;

  const cek = document.getElementsByName("cek");
  const dataCek = document.createElement("td");
  let valueCek = [];

  cek.forEach((e) => {
    if (e.checked === true) {
      valueCek.push(e.value);
    }
  });

  const valueNew = valueCek.join("; ");
  console.log(valueNew);
  dataCek.textContent = valueNew;

  tbody.appendChild(row);

  if (nameValue !== "") {
    if (ageValue !== "") {
      if (valueGander !== "") {
        if (valueFilter !== "") {
          if (valueCek !== "") {
            row.appendChild(dataName);
            row.appendChild(dataAge);
            row.appendChild(dataGander);
            row.appendChild(dataFilter);
            row.appendChild(dataCek);
          } else {
            window.alert("you must fill the choice");
          }
        } else {
          window.alert("Please insert your filter!");
        }
      } else {
        window.alert("Please insert your gender!");
      }
    } else {
      window.alert("Please insert your age!");
    }
  } else {
    window.alert("Please insert your name!");
  }
  const genderUpload = valueGander;
  const filterUpload = valueFilter;
  const datas = new URLSearchParams();

  datas.append("name", nameInput);
  datas.append("age", ageInput);
  datas.append("gender", genderUpload);
  datas.append("isSmoker", filterUpload);
  datas.append("cigarVariant", valueNew);

  const response = await fetch(
    "https://st2lww-8888.csb.app/daffa-abiyyu-atha/data",
    {
      method: "POST",
      body: datas,
    }
  );
  const uploadData = await response.json();
  if (uploadData.success === true) {
    alert(uploadData.message);
  } else {
    alert(uploadData.message);
  }
  const getData = await fetch(
    "https://st2lww-8888.csb.app/daffa-abiyyu-atha/data",
    {
      method: "GET",
    }
  );

  myForm.reset();
}
