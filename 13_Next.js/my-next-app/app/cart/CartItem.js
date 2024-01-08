export default function CartItem({ item }) {

  return (
    <>
      <div className="cart-item">
        <p>{item}</p>
        <p>500원</p>
        <p>1개</p>
      </div>
    </>
  );
}