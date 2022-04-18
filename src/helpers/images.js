const pickRandomImageUrl = (photos, size) => {

  const max = photos.length-1;
  const min = 0;
  const diff = max - min;
  
  let rand = Math.random();
  rand = Math.floor( rand * diff );

  rand = rand + min;

  return photos[rand].src[size];
}

export default pickRandomImageUrl;