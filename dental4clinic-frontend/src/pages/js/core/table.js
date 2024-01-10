
const changeClassRowCell = (rowCell, classForRemove, classForAdd) => {
  rowCell.classList.remove(classForRemove);
  rowCell.classList.add(classForAdd);
}

const changeClassRows = (rowCells, classForRemove, classForAdd) => {
  for (const rowCell of rowCells) {
    changeClassRowCell(rowCell, classForRemove, classForAdd)
  }
}

export { changeClassRows }
