
const changeClassRowCell = (rowCell, classForRemove, classForAdd) => {
  rowCell.classList.remove(classForRemove);
  rowCell.classList.add(classForAdd);
}

const changeClassRows = (rowCells, classForRemove, classForAdd) => {
  rowCells.forEach((rowCell) => {
    changeClassRowCell(rowCell, classForRemove, classForAdd)
  })
}

export { changeClassRows }
