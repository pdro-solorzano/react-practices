function getImageFromFact(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const { url } = data;
      return `https://cataas.com/${url}`;
    });
}

export { getImageFromFact };
