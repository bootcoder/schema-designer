import * as types from './actionTypes'
import * as helpers from './actionHelpers'
// //////////////////////
// ///// ACTIONS ////////
// //////////////////////

export function addForeignKeyConnection (destRowID, orgRowID) {
  //
  // org means ORIGIN
  // dest means DESTINATION
  //
  return (dispatch, getState) => {
    const { tables } = getState()

    // Find destRow State
    let {cleanRow: destRow} = helpers.findRowWithID(tables, destRowID)
    let destRowWithPosition = helpers.setRowPosition(tables, destRow)

    // Find orgRow State
    let {cleanRow: orgRow} = helpers.findRowWithID(tables, orgRowID)
    let orgRowWithPosition = helpers.setRowPosition(tables, orgRow)

    // Set destRow inbound connection key org ID to org position
    destRowWithPosition.connections.inbound[orgRowID] = orgRowWithPosition.position

    // Set org row outbound connection key dest ID to dest position
    orgRowWithPosition.connections.outbound[destRowID] = destRowWithPosition.position

    // Dispatch updateRow for both
    dispatch(updateRow(orgRowWithPosition))
    dispatch(updateRow(destRowWithPosition))

    // Return dispatch to remove fk flag from nav state
    return dispatch({type: types.REMOVE_FK_OF_ORIGIN_ROW})
  }
}

export function addNewRow (tableID) {
  return (dispatch, getState) => {
    new Promise((resolve, reject) => {
      let { tables } = getState()
      let cleanTable = helpers.findTableWithID(tables, tableID)
      let newRow = helpers.generateRow(cleanTable)
      dispatch(addRow(tableID, newRow))
      resolve(newRow)
    }).then((row) => {
      return dispatch(selectRow(tableID, row.id))
    })
  }
}

export function addRow (tableID, row) {
  return {type: types.ADD_ROW, tableID, row}
}

export function createTable () {
  return dispatch => {
    let table = helpers.generateNewTable()
    dispatch({type: types.CREATE_TABLE, table})

    dispatch(disableEditAndSave())
    dispatch(deselectOtherRows(table.id))
    dispatch(checkSetRowSelection(table.id))
    return table
  }
}

export function checkSetRowSelection (tableID) {
  return (dispatch, getState) => {
    // Get state
    const { nav, tables } = getState()

    // IF no selectedRow in nav state selectRow from table.
    if (nav.selectedRowID === '') { return dispatch(selectRow(tableID)) }

    // Strip nav row ID to get table ID
    const navTableID = helpers.tableIDFromRowID(nav.selectedRowID)

    // IF nav table ID does not equal the tableID input
    if (navTableID !== tableID) {
      const table = helpers.findTableWithID(tables, tableID)
      // Dispatch select row for tables first row.
      return dispatch(selectRow(tableID, table.rows[0]))
    }
    // CATCH: Reselect row from nav state.
    return dispatch(selectRow(tableID, nav.selectedRowID))
  }
}

export function clearTables () {
  return {type: types.CLEAR_TABLES}
}

export function deselectOtherRows (tableID) {
  return (dispatch, getState) => {
    // Get the state for tables
    let { nav, tables } = getState()

    // Clone tables
    let newTables = [...tables]

    // Iterate over clone
    newTables.map(table => {
      // We don't need this table, return it
      if (table.id === tableID) { return table }

      // Iterate over all other tables
      table.rows.map(row => {
        // IF the row is selected or editable clone and modify
        if (row.selected || row.edit) {
          // NOTE: seems like I should be handling edit: false here as well... Need to check out
          const newRow = Object.assign({}, row, {selected: false})

          // IF nav row ID equals row.id
          if (nav.selectedRowID === row.id) {
            // Clear the row from the nav
            dispatch({type: types.DESELECT_NAV_ROW})
          }

          // Update the row
          dispatch(updateRow(newRow))
          return newRow
        }
        return row
      })
      return newTables
    })
  }
}

export function disableEditAndSave () {
  return (dispatch, getState) => {
    let { nav, tables } = getState()
    tables.map(table => {
      if (table.id !== nav.selectedTableID) { return table }
      let newTable = Object.assign({}, table, {edit: false})
      dispatch(updateTable(newTable))
      newTable.rows.map(row => {
        if (row.id !== nav.selectedRowID) { return row }
        let newRow = Object.assign({}, row, {edit: false})
        dispatch(updateRow(newRow))
        return newRow
      })
      return newTable
    })
    return tables
  }
}

export function moveDown (tableID, rowID) {
  return {type: types.MOVE_DOWN, tableID, rowID}
}

export function moveUp (tableID, rowID) {
  return {type: types.MOVE_UP, tableID, rowID}
}

export function removeRow (tableID, rowID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let {cleanRow: row, cleanTable: table} = helpers.findRowWithID(tables, rowID)
    let rows = table.rows
    let newRowID = null

    // Find the next index to select
    if (rows.length === 1) {
      // No action here, newRowID remains null, but the conditional is needed to catch
    } else if (rows[rows.indexOf(row) + 1] !== undefined) {
      newRowID = rows[rows.indexOf(row) + 1].id
    } else if (rows[rows.indexOf(row) - 1] !== undefined) {
      newRowID = rows[rows.indexOf(row) - 1].id
    }
    dispatch({type: types.REMOVE_ROW, tableID, rowID})
    return dispatch(selectRow(tableID, newRowID))
  }
}

export function removeTable (tableID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let newTable = tables.filter(table => table.id !== tableID)[0]
    // NOTE: not sure why I dispatched selectTable here. Investigate.
    newTable && dispatch(selectTable(newTable.id))
    return dispatch({type: types.REMOVE_TABLE, tableID})
  }
}

export function selectRow (tableID, rowID = null) {
  console.log(`top rowID: ${rowID}`)
  return (dispatch, getState) => {
    let { tables, nav } = getState()

    if (nav.fkOrigin !== null && nav.fkOrigin !== rowID) {
      new Promise((resolve, reject) => {
        dispatch(addForeignKeyConnection(rowID, nav.fkOrigin))
        resolve(tableID)
      }).then(tableID => {
        return dispatch(selectRow(tableID, rowID))
      })
    }

    if (rowID !== null && (tableID !== nav.selectedTableID || rowID !== nav.selectedRowID)) {
      dispatch(disableEditAndSave())
    }

    if (rowID === null) {
      let rows = tables.filter(table => table.id === tableID)[0].rows
      console.log(rows)
      rowID = rows.length > 0 && rows[rows.length - 1].id
      console.log(rowID)
    }

    return dispatch({type: types.SELECT_ROW, rowID, tableID})
  }
}

export function selectTable (tableID) {
  return dispatch => {
    dispatch(deselectOtherRows(tableID))
    dispatch(checkSetRowSelection(tableID))
    return dispatch({type: types.SELECT_TABLE, tableID})
  }
}

export function toggleEditRow (tableID, rowID) {
  return { type: types.TOGGLE_EDIT_ROW, tableID, rowID }
}

export function updateInboundConnectionOrigin (remoteRowID, currentRowID, data) {
  return (dispatch, getState) => {
    const { tables } = getState()

    // Find table of connection
    const { cleanRow: remoteRow } = helpers.findRowWithID(tables, remoteRowID)
    const { cleanRow: currentRow } = helpers.findRowWithID(tables, currentRowID)
    const currentRowPosition = helpers.setRowPosition(tables, currentRow).position
    remoteRow.connections.outbound[currentRowID] = currentRowPosition

    return dispatch(updateRow(remoteRow))
  }
}

export function updatePosition (tableID, data) {
  return {type: types.UPDATE_POSITION, tableID, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return (dispatch, getState) => {
    const { tables } = getState()
    const updatedRowPosition = helpers.setRowPosition(tables, row)
    return dispatch({type: types.UPDATE_ROW, tableID: row.tableID, rowID: row.id, row: updatedRowPosition})
  }
}

export function updateTable (table) {
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableName (tableID, name) {
  return {type: types.UPDATE_TABLE_NAME, tableID, name}
}
