/**
 * sort by Property
 * @param {string} property: name, diameter, population etc.
 * @param {array} array: array of objects to sort
 */
function sortByProperty(property, toggle, array) {
  let fa = undefined;
  let fb = undefined;

  array.sort((a, b) => {
    if (isNaN(parseInt(a[property]))) {
      fa = a[property].toLowerCase();
      fb = b[property].toLowerCase();
    } else {
      fa = a[property];
      fb = b[property];
    }

    // on undefined recreate the original array based on increasing id
    if (toggle !== undefined) {
      return toggle ? fa - fb : fb - fa;
    } else {
      return a.id - b.id;
    }
  });

  return array;
}

/**
 * @description query results
 */
async function fetchData(residentsArray = []) {
  let index = residentsArray.length === 0 ? 1 : 0;
  let fetchPlanets = index === 1 ? true : false;

  let dataItems = [];
  let url = null;

  while (true) {
    // select planets or residents endpoints
    fetchPlanets
      ? (url = `https://swapi.dev/api/planets/?page=${index}&format=json`)
      : (url = residentsArray[index]);

    try {
      let res = await fetch(url);
      let data = await res.json();
      let results = fetchPlanets ? data.results : data;

      if (results !== undefined) {
        switch (fetchPlanets) {
          case true:
            results.map((item) => {
              dataItems.push(item);
            });
            break;

          case false:
            dataItems.push({ ...results });
            break;
        }
      } else {
        throw new Error("Exit Loop");
      }

      index++;
    } catch (error) {
      console.log(error);

      break;
    }
  }

  return dataItems;
}

export { sortByProperty, fetchData };
