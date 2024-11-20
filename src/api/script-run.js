const pokemonData = require('../../assets/pokemons.json');

// Function to download an image
const downloadImage = (url, name) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Function to process the download of images
const processDownloadImages = () => {
  pokemonData.forEach((pokemon) => {
    const imageName = `${pokemon.name}.png`; // You can change the extension if needed
    downloadImage(pokemon.imageUrl, imageName);
  });
};

// Start downloading images
processDownloadImages();
