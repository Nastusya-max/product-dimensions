const getData = async (str) => {
  let data;
  try {
    const res = await fetch(str);
    if (!res.ok) {
      throw new error(res.statusText);
    }
    data = await res.json();
  } catch ({ message }) {
    throw new Error(message);
  }
  return data;
};
//returns a string of selected values
const getSelectValue = () => {
  const selectList = document.querySelectorAll(".select");

  let resultStr = Array.from(selectList).reduce((str, item) => {
    if (item.value) {
      return str + " " + item.value;
    } else {
      return "Not all values selected";
    }
  }, "");

  return resultStr;
};

const controlSelect = () => {
  const selectList = Array.from(document.querySelectorAll(".select"));

  selectList.forEach((item, index) => {
    index != 0 ? (item.disabled = true) : (item.disabled = false); //set the initial state of the select elements

    item.onchange = onChange;
    onChange(item);
  });

  function onChange(item) {
    const currentSelect = item.target;

    if (currentSelect) {
      //when changing the first select, the rest are reset
      if (selectList.indexOf(currentSelect) == 0) {
        selectList.forEach((item, index) => {
          if (index != 0) {
            item.children[0].selected = true;
            item.disabled = true;
          }
        });
      }

      const nextIndex = selectList.indexOf(currentSelect) + 1; //to go to the next select

      if (nextIndex < selectList.length) {
        selectList[nextIndex].disabled = false; //when you change the current select, the next select becomes available
      }
    }
  }
};

window.onload = () => {
  getData("./assets/dimensions.json")
    .then((data) => {
      promise = new Promise((resolve) => {
        class ViewModel {
          constructor() {
            this.values = ko.observableArray(data);
            this.dimensions = ko.observableArray(data);
          }
        }
        let vm = new ViewModel();

        resolve(ko.applyBindings(vm));
      }).then(controlSelect());
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

const btn = document.querySelector("#formButton");

btn.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(".selected-data").innerHTML = getSelectValue();
  console.log(getSelectValue());
});
