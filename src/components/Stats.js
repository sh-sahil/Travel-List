export default function Stats({ items }) {
  if (!items.length) {
    return <p className="stats">Start adding some items to your packing list 🚀</p>;
  }

  const itemLength = items.length;
  const itemPacked = items.filter(item => item.packed).length;
  const itemPercentage = Math.round((itemPacked / itemLength) * 100);
  return (
    <footer className="stats">
      <em>
        {itemPercentage === 100
          ? "You have packed all the items... Ready to go ✈️"
          : `💼 You have ${itemLength} items on your list, and you already packed ${itemPacked} ${itemPercentage}%`}
      </em>
    </footer>
  );
}
