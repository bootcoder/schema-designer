// //////////////////////
// ///// HELPERS ////////
// //////////////////////

export function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function setRowPosition (tables, row) {
  // Find table from rowID
  let { cleanTable: table } = findRowWithID(tables, row.id)

  // Clone input row - DO NOT get row from state
  let cleanRow = cloneObject(row)

  // Find table element / set initial position
  const tableElement = document.getElementById(table.id)
  const tablePosition = tableElement.getBoundingClientRect()

  // Find row element / set initial position
  const rowElement = document.getElementById(row.id)
  const rowPosition = rowElement.getBoundingClientRect()

  // Calculate diff between table state and table DOM position
  const diff = {
    x: Math.abs(table.position.x - tablePosition.x),
    y: Math.abs(table.position.y - tablePosition.y)
  }

  // Subtract initial position from diff
  const updatedPosition = Object.assign({}, {
    x: rowPosition.x - diff.x,
    y: rowPosition.y - diff.y,
    width: Math.floor(rowPosition.width),
    height: Math.floor(rowPosition.height)
  })

  // Update row with new position data - need x, y, height, width
  cleanRow.position = updatedPosition

  // Return the cleanRow
  return cleanRow
}

// DEFAULT table lives here.
export function generateNewTable () {
  const newTableID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)

  const newTable = {
    edit: false,
    connectionCount: 0,
    id: newTableID,
    // NOTE: Remove name placeholder and reset to 'new table' for production
    name: newTableID,
    position: {
      x: Math.floor(Math.random() * (800 - 50) + 50),
      y: Math.floor(Math.random() * (500 - 50) + 50) },
    selected: false
  }

  newTable.rows = [generateRow(newTable)]
  return newTable
}

// DEFAULT row lives here.
export function generateRow (table) {
  return {
    color: 'gray',
    connections: {
      inbound: {},
      outbound: {}
    },
    edit: false,
    id: generateRowID(table),
    selected: false,
    tableID: table.id,
    title: 'new_field'
  }
}

export function generateRowID (table) {
  // Strip away table ID from row ID
  // Find next highest int within rows
  // Assign new row ID concating table ID
  if (!table.rows) {
    return `${table.id}-${0}`
  }
  const findTrailingDigits = /-(\d+)/
  const lastID = table.rows.length > 0 && table.rows.reduce((max, b) => {
    const id = parseInt(findTrailingDigits.exec(b.id)[1], 10)
    return Math.max(max, id)
  }, parseInt(findTrailingDigits.exec(table.rows[0].id)[1], 10))
  return `${table.id}-${lastID + 1}`
}

export function tableIDFromRowID (rowID) {
  const regEx = /.+?(?=-\d+)/
  return regEx.exec(rowID)[0]
}

export function findTableWithID (tables, tableID) {
  return cloneObject(tables.filter(table => table.id === tableID)[0])
}

export function findRowWithID (tables, rowID) {
  const tableID = tableIDFromRowID(rowID)
  const table = tables.filter(table => table.id === tableID)[0]
  const row = table.rows.filter(row => row.id === rowID)[0]
  const cleanTable = cloneObject(table)
  const cleanRow = cloneObject(row)
  return { cleanRow, cleanTable }
}
