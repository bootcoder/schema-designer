import genRowColor from './rowColors.js'
import uuid from 'uuid/v1'

// //////////////////////
// ///// HELPERS ////////
// //////////////////////

export function cloneObject (obj) {
  if (!obj) {
    window.alert('No valid selection.')
    return null
  }
  return JSON.parse(JSON.stringify(obj))
}

// DEFAULT table lives here.
export function generateNewTable () {
  const newTableID = uuid().split('-')[0]

  const newTable = {
    edit: true,
    connectionCount: 0,
    id: newTableID,
    // NOTE: DEVELOPMENT DEBUGGER ONLY:
    // name: newTableID,
    name: 'new table',
    position: {
      x: Math.floor(Math.random() * (700 - 50) + 200),
      y: Math.floor(Math.random() * (600 - 50) + 50) },
    rows: [],
    selected: false
  }

  return newTable
}

// DEFAULT row lives here.
export function generateRow (table) {
  const connectionColor = genRowColor()
  const title = table.rows.length ? 'new_field' : 'id'
  const row = {
    color: 'gray',
    connections: {
      inbound: {},
      outbound: {}
    },
    connectionColor,
    dataType: 'int',
    edit: true,
    id: generateRowID(table),
    selected: false,
    tableID: table.id,
    title
  }
  return row
}

export function generateRowID (table) {
  // Strip away table ID from row ID
  // Find next highest int within rows
  // Assign new row ID concating table ID
  if (!table.rows) {
    return `${table.id}-${0}`
  }
  const findTrailingDigits = /-(\d+)/
  const lastID = table.rows.length && table.rows.reduce((max, b) => {
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
  return cloneObject(tables.find(table => table.id === tableID))
}

export function findRowWithID (tables, rowID) {
  const tableID = tableIDFromRowID(rowID)
  const table = tables.find(table => table.id === tableID)
  const row = table.rows.find(row => row.id === rowID)
  const cleanTable = cloneObject(table)
  const cleanRow = cloneObject(row)
  return { cleanRow, cleanTable }
}

export function setRowPositionFromDOM (row) {
  // Clone input row - DO NOT get row from state
  let cleanRow = cloneObject(row)

  // Find row element / set initial position
  const rowElement = document.getElementById(row.id)
  if (rowElement === null) { return row }
  const rowPosition = rowElement.getBoundingClientRect()

  const updatedPosition = Object.assign({}, {
    x: Math.floor(rowPosition.x),
    y: Math.floor(rowPosition.y),
    width: Math.floor(rowPosition.width),
    height: Math.floor(rowPosition.height)
  })

  // Update row with new position data - need x, y, height, width
  cleanRow.position = updatedPosition

  // Return the cleanRow
  return cleanRow
}

export function removeAllConnectionsFromTable (table, tableID) {
  table = cloneObject(table)
  table.rows.map(row => {
    Object.keys(row.connections.inbound).map(connection => {
      if (tableID === tableIDFromRowID(connection)) {
        delete row.connections.inbound[connection]
      }
    })

    Object.keys(row.connections.outbound).map(connection => {
      if (tableID === tableIDFromRowID(connection)) {
        delete row.connections.outbound[connection]
      }
    })

    return row
  })
  return table
}

export function setRowPositionFromTable (tables, row) {
  const cleanTable = findTableWithID(tables, row.tableID)
  let cleanRow = cloneObject(row)
  let rowIndex = cleanTable.rows.findIndex(el => el.id === row.id)
  let height = ((rowIndex + 1) * row.position.height)

  cleanRow.position.x = cleanTable.position.x
  cleanRow.position.y = cleanTable.position.y + height
  cleanRow.position.height = row.position.height
  cleanRow.position.width = cleanTable.position.width

  return cleanRow
}

export function setTableWidthFromDOM (table) {
  const cleanTable = cloneObject(table)
  const tableElement = document.getElementById(table.id)
  const position = tableElement.getBoundingClientRect()
  cleanTable.position.width = Math.floor(position.width)
  return cleanTable
}
