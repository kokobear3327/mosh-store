export const documentToDomainObject = document => {
  const object = document.payload.val();
  object.id = document.payload.key;
  return object;
};
