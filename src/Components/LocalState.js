export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) return undefined;
    
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined
  }
}

export const timeToMilitaryTime = secondsTime => Number.isInteger(secondsTime / 3600)
  ? secondsTime / 3600
  : Math.floor(secondsTime / 3600) + "30"
