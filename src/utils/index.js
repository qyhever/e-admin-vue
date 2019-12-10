
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

export function queryLocalCity() {
  return new Promise((resolve, reject) => {
    const citysearch = new AMap.CitySearch()
    citysearch.getLocalCity()
    AMap.event.addListener(citysearch, 'complete', result => {
      if (result.info === 'OK') {
        const data = {
          province: result.province,
          city: result.city,
          adcode: result.adcode
        }
        window.LOCAL_CITY = data
        resolve(data)
      } else {
        reject(result)
      }
    })
    AMap.event.addListener(citysearch, 'err', err => {
      console.log('err', err)
      reject(err)
    })
  })
}

export async function getLocalCity() {
  if (window.LOCAL_CITY) {
    return window.LOCAL_CITY
  }
  return queryLocalCity()
}
