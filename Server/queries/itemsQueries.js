export function getMyItmesQuery() {
    return `SELECT * FROM albumdb.itemsofalbum
      where idalbum=? and isactive=1;`;
  }
  export function getItemTypesQuery() {
    return `SELECT id as "optionLabel",description as "option" FROM datatype;`;
  }