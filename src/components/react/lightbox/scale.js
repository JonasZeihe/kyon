const getScale = (zoomLevel) => {
  switch (zoomLevel) {
    case 1:
      return 1.25
    case 2:
      return 1.75
    default:
      return 1
  }
}

export default getScale
