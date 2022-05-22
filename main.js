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

const createImageContainer = async () => {
  const imageContainer = document.createElement('div')
  imageContainer.classList.add('images__image-container')
  const image = document.createElement('img')
  image.classList.add('images__image')
  image.dataset.src = await getRandomFoxURL() // prop to hold url value til its rendered on intersection
  imageContainer.appendChild(image)
  return imageContainer
}

const appendImage = async () => {
  const imageContainer = await createImageContainer()
  imagesContainer.appendChild(imageContainer)
  observer.observe(imageContainer.firstChild)
}

const removeImages = () => {
  imagesContainer.remove([...imagesContainer.childNodes])
}

const observer = new IntersectionObserver(entries => {
  const [entry] = entries // intersection observer object
  if (entry.isIntersecting) {
    const image = entry.target
    image.src = image.dataset.src
    observer.unobserve(image) // prevent further intersections observing
  }
})

const imagesContainer = document.querySelector('#images')

const addImageButton = document.querySelector('#addImage')
addImageButton.addEventListener('click', appendImage)

const dumpImagesButton = document.querySelector('#dumpImages')
dumpImagesButton.addEventListener('click', removeImages)