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

const createImageNode = async () => {
  const image = document.createElement('img')
  image.src = await getRandomFoxURL()
  image.classList.add('images__image')
  return image
}

const renderRandomFox = async () => {
  const imageNode = await createImageNode()
  imagesContainer.appendChild(imageNode)
}

const dumpImageNodes = () => {
  imagesContainer.delete()
}

const imagesContainer = document.querySelector('#images')

const addImageButton = document.querySelector('#addImage')
addImageButton.addEventListener('click', renderRandomFox)

const dumpImagesButton = document.querySelector('#dumpImages')
dumpImagesButton.addEventListener('click', dumpImageNodes)