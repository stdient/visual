function quick_sort_full(l, r, arr) {
  let i = l, j = r;
  let x = arr[Math.floor((l + r) / 2)];

  while (i <= j) {
    while (arr[i] < x) ++i;
    while (arr[j] > x) --j;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      ++i; --j;
    }
  }

  if (l < j) quick_sort_full(l, j, arr);
  if (i < r) quick_sort_full(i, r, arr);
}

function quick_sort(arr) {
  quick_sort_full(0, arr.length - 1, arr);
}

function orderBy(obj_arr, property_arr) {
  if (typeof (obj_arr) != 'object')
    throw new Error("First argument is incorrect");

  obj_arr_sorted = obj_arr.slice();
}
