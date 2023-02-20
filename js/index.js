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

getData("./assets/dimensions.json")
  .then((data) => {
    promise = new Promise((resolve) => {
      class ViewModel {
        constructor() {
          this.values = ko.observableArray(data);
          this.dimensions = ko.observableArray(data);
        }

        str = ko.observable();

        getSelected = () => {
          let result = this.values().map((item) => {
            return item.values;
          });
          this.str(JSON.stringify(result));
          console.log(result);
        };

        checkSelect = function (obj, event) {
          if (!event.target.value || data.indexOf(obj) == 0) {
            data.forEach((item, index) => {
              const nextSelect = document.getElementById(
                `dimension${index + 1}`
              );
              if (index > data.indexOf(obj) && nextSelect) {
                item.values = undefined;
                nextSelect.selectedIndex = 0;
                nextSelect.disabled = true;
              }
            });
          }

          if (event.target.value) {
            if (data.indexOf(obj) != data.length - 1) {
              document.getElementById(
                `dimension${data.indexOf(obj) + 2}`
              ).disabled = false;
            }
          }
        };
      }
      let vm = new ViewModel();

      resolve(ko.applyBindings(vm));
    }).then();
  })
  .catch((err) => {
    console.log("Error:", err);
  });
