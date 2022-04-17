const pickRandomImageUrl = (photos) => {

  const max = photos.length-1;
  const min = 0;
  const diff = max - min;
  
  let rand = Math.random();
  rand = Math.floor( rand * diff );

  rand = rand + min;

  console.log(photos[rand].url);
  return photos[rand].url;
}

export default pickRandomImageUrl;