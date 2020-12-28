function differenceArrayByTimestamp(originalArray, newArray) {
  let arr = [];
  let reversedNewArray = newArray.slice().reverse();
  let reversedOG = originalArray.slice().reverse();

  for (let i = 0; i < newArray.length; i++) {
    if (
      !reversedOG[i] ||
      reversedOG[i].timestamp !== reversedNewArray[i].timestamp
    ) {
      arr.push(reversedNewArray[i]);
    }
  }

  return arr.reverse();
}
export default differenceArrayByTimestamp;
