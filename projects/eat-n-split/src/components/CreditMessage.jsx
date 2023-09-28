function CreditMessage({ credit, friendName }) {
  if (credit > 0) {
    return <span>{`${friendName} owes you $${credit}`}</span>;
  } else if (credit < 0) {
    return <span>{`You owe ${friendName} $${credit * -1}`}</span>;
  } else {
    return <span>{`You and ${friendName} are even`}</span>;
  }
}

export { CreditMessage };
