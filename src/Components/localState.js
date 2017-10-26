export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (e) => {
  try {
    const serializedState = JSON.stringify(this.state)
    localStorage.setItem('state', serializedState)
    var confirmationMessage = "goodbye";

    e.returnValue = confirmationMessage;  
    return confirmationMessage

  } catch (err) {
    return undefined
  }
}