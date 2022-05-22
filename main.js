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

const createImageNode = () => {
  const image = document.createElement('img')
  image.classList.add('images__image')
  return image
}

const appendImageNode = () => {
  const imageNode = createImageNode()
  imagesContainer.appendChild(imageNode)
  observer.observe(imageNode)
}

const popImageNode = () => {
  const imageNodes = [...document.querySelectorAll('.images__image')]
  imagesContainer.removeChild(imageNodes.at(-1))
}

const observer = new IntersectionObserver(async entries => {
  const [entry] = entries // intersection observer object
  if (entry.isIntersecting) {
    const imageNode = entry.target
    imageNode.src = await getRandomFoxURL()
    observer.unobserve(imageNode) // prevent further intersections observing
  }
})

const imagesContainer = document.querySelector('#images')

const addImageButton = document.querySelector('#addImage')
addImageButton.addEventListener('click', appendImageNode)

const dumpImagesButton = document.querySelector('#dumpImages')
dumpImagesButton.addEventListener('click', popImageNode)