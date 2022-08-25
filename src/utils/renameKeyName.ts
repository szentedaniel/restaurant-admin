export function renameKeyName(obj, oldName, newName) {
  const { [oldName]: value, ...remainingObj } = obj
  return {
    ...remainingObj,
    [newName]: value,
  }
}