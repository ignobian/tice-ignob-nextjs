function sortBy(array, sortParameter, sortOrder) {
  return array.sort(function(prev, next) {
      if (prev[sortParameter] > next[sortParameter]) {
          return sortOrder ? -1 : 1
      } else if (prev[sortParameter] < next[sortParameter]) {
          return sortOrder ? 1 : -1
      } else {
          return 0
      }
  });
}

function fetchItemsToDisplay(items, sortParameter, sortOrder, itemsPerPage, pageNumber) {
  // Write your code here
  // sort the 2D_string_array by sort parameter
  const sortedArray = sortBy(items, sortParameter, sortOrder);
  const skip = itemsPerPage * pageNumber
  sortedArray.splice(0, skip);
  return sortedArray.slice(0, skip + itemsPerPage)
}

const array = [['p2', '0', '4'], ['p1', '1', '0'], ['p3', '1', '0']]

console.log(fetchItemsToDisplay(array, 0, 0, 2, 1));