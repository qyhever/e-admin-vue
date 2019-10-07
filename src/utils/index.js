
export function listToTree(list, id, key, parentKey) {
  const ret = []
  const temp = list.filter(v => v[parentKey] === id)
  temp.forEach(item => {
    ret.push({
      ...item,
      children: listToTree(list, item[key], key, parentKey)
    })
  })
  return ret
}
