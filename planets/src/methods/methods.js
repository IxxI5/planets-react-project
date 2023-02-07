/**
 * sort by Property
 * @param {string} property: name, diameter, population etc.
 * @param {array} array: array of objects to sort
 */
function sortByProperty(property, toggle, array) {
  let fa = undefined;
  let fb = undefined;

  array.sort((a, b) => {
    fa = a[property];
    fb = b[property];

    if (toggle !== undefined) {
      // distinguish numbers from strings for consistent sorting
      if (isNaN(parseInt(a[property])) === false) {
        return toggle ? fa - fb : fb - fa;
      }

      return toggle ? fa.localeCompare(fb) : fb.localeCompare(fa);
    } else {
      // on undefined recreate the original array based on ascending id
      return a.id - b.id;
    }
  });

  return array;
}

export { sortByProperty };
