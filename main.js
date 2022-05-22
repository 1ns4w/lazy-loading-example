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

const createImage = async () => {
  const image = document.createElement('img')
  image.classList.add('images__image')
  image.dataset.src = await getRandomFoxURL() // prop to hold url value til its rendered on intersection
  return image
}

const appendImage = async () => {
  const imageNode = await createImage()
  imagesContainer.appendChild(imageNode)
  observer.observe(imageNode)
}

const removeImages = () => {
  const images = [...imagesContainer.childNodes]
  images.forEach(image => image.remove())
}

const observer = new IntersectionObserver(entries => {
  const [entry] = entries // intersection observer object
  if (entry.isIntersecting) {
    const imageNode = entry.target
    imageNode.src = imageNode.dataset.src
    observer.unobserve(imageNode) // prevent further intersections observing
  }
})

const imagesContainer = document.querySelector('#images')

const addImageButton = document.querySelector('#addImage')
addImageButton.addEventListener('click', appendImage)

const dumpImagesButton = document.querySelector('#dumpImages')
dumpImagesButton.addEventListener('click', removeImages)