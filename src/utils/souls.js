export function soulsNeeded(current, target) {

  let total = 0;


  for (
    let i = current;
    i < target;
    i++
  ) {

    total +=
      100 +
      (i * i * 20);

  }


  return total;

}