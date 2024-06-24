export const notFoundMessage = (entity: string) => {
  return { msg: `${entity} not found.` };
};

export const deletedMessage = (entity: string) => {
  return { msg: `${entity} has been deleted.` };
};

export const updatedMessage = (entity: string) => {
  return { msg: `${entity} has been updated.` };
};

export const createdMessage = (entity: string) => {
  return { msg: `${entity} has been created.` };
};
