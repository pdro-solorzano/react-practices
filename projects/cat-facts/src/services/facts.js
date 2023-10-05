async function getRandomFact(url) {
  const res = await fetch(url);
  const data = await res.json();
  const { fact } = data;
  return fact;
}

export { getRandomFact };
