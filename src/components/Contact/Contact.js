export const Contact = ({ contact: { name, number, id }, onDelete }) => {
  return (
    <>
      <p>{name}: {number}</p>
      <button
        type="button"
        onClick={() => {onDelete(id)}}
      >
        Delete
      </button>
    </>
  );
};
