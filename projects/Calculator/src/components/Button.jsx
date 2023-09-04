function Button({ character, clickHandler, typeButton }) {
  return (
    <button className={`button ${typeButton}`} onClick={clickHandler}>
      {character}
    </button>
  );
}

export { Button };
