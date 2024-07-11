const form = document.getElementById("form-survey");
const endPoint = "https://st2lww-8888.csb.app/daffa-abiyyu-atha/data";
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const age = event.target.age.value;
  const gender = event.target.gender.value;
  const smoke = event.target.filter.value;
  const cigarVariant = event.target.cek;

  let cekVariant = [];
  cigarVariant.forEach((element) => {
    if (element.checked) {
      cekVariant.push(element.value);
    }
  });
  console.log(cekVariant);
  const strVariant = cekVariant.join("; ");
  if (name === "" || age <= 0 || gender === "" || smoke === "") {
    window.alert("You must fill the form!");
  } else {
    const dataForm = new URLSearchParams();
    dataForm.append("name", name);
    dataForm.append("age", age);
    dataForm.append("gender", gender);
    dataForm.append("isSmoker", smoke);
    dataForm.append("cigarVariant", strVariant);

    for (const [key, value] of dataForm.entries()) {
      console.log(`${key}, ${value}`);
    }
    const pushData = await fetch(endPoint, {
      method: "POST",
      body: dataForm,
    });
  }
  form.reset();
});

const tBody = document.getElementById("tbody");

async function getData() {
  const response = await fetch(endPoint);
  const data = await response.json();
  tBody.innerHTML = "";
  data.results.forEach((datas) => {
    const row = document.createElement("tr");
    const dataName = document.createElement("td");
    const dataAge = document.createElement("td");
    const dataGender = document.createElement("td");
    const dataSmoker = document.createElement("td");
    const dataVariant = document.createElement("td");
    dataName.textContent = datas.name;
    dataAge.textContent = datas.age;
    dataGender.textContent = datas.gender;
    if (datas.isSmoker) {
      dataSmoker.textContent = document.getElementById("yes").value;
    } else {
      dataSmoker.textContent = document.getElementById("no").value;
    }
    dataVariant.textContent = datas.cigarVariant.join("; ");
    row.appendChild(dataName);
    row.appendChild(dataAge);
    row.appendChild(dataGender);
    row.appendChild(dataSmoker);
    row.appendChild(dataVariant);
    tBody.appendChild(row);
  });
}
getData();
