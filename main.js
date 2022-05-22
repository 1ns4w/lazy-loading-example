const getRandomFoxURL = async () => {
  try {
      const response = await fetch('https://randomfox.ca/floof/')
      const data = (await response.json()).image
      return data
    }
  catch(e) {
    console.error(e)
  }
}

const createImageNode = (imageLink) => {
  const image = document.createElement('img')
  image.src = imageLink
  image.classList.add('images__image')
  return image
}

const renderImageNode = async () => {
  const imagesContainer = document.querySelector('.images')
  const randomFoxURL = await getRandomFoxURL()

  const imageNode = createImageNode(randomFoxURL)
  imagesContainer.appendChild(imageNode)
}

renderImageNode()