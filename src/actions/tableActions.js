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
    let destRowWithPosition = helpers.setRowPositionFromTable(tables, destRow)

    // Find orgRow State
    let {cleanRow: orgRow} = helpers.findRowWithID(tables, orgRowID)
    let orgRowWithPosition = helpers.setRowPositionFromTable(tables, orgRow)

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

function removeForeignKeyConnection (destRowID, orgRowID) {
  return (dispatch, getState) => {
    const { tables } = getState()

    // Find destRow State
    let {cleanRow: destRow} = helpers.findRowWithID(tables, destRowID)

    // Find orgRow State
    let {cleanRow: orgRow} = helpers.findRowWithID(tables, orgRowID)

    // Remove destRow inbound connection key
    delete destRow.connections.outbound[orgRowID]

    // Remove org row outbound connection key
    delete orgRow.connections.inbound[destRowID]

    // Dispatch updateRow for both
    dispatch(updateRow(destRow))
    dispatch(updateRow(orgRow))

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
      dispatch(updateRow(helpers.setRowPositionFromDOM(row)))
      return dispatch(selectRow(tableID, row.id))
    })
  }
}

export function addRow (tableID, row) {
  return {type: types.ADD_ROW, tableID, row}
}

export function createTable () {
  return dispatch => {
    (async () => {
      let table = helpers.generateNewTable()
      await dispatch({type: types.CREATE_TABLE, table})
      await dispatch(addNewRow(table.id))
      await dispatch(updateTableWidth(table.id))
      await dispatch(disableEditAndSave())
      await dispatch(deselectOtherRows(table.id))
      await dispatch(checkSetRowSelection(table.id))
      return table
    })()
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
      // IF row selected / editable, clone and modify
      table.rows.map(row => {
        if (row.selected || row.edit) {
          // NOTE: seems like I should be handling edit: false here as well... Need to check out
          const newRow = Object.assign({}, row, {selected: false})

          if (nav.selectedRowID === row.id) {
            dispatch({type: types.DESELECT_NAV_ROW})
          }

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
    new Promise((resolve, reject) => {
      dispatch(selectNextRow(tableID, rowID))
      resolve()
    }).then(() => {
      return dispatch({type: types.REMOVE_ROW, tableID, rowID})
    })
  }
}

export function removeTable (tableID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let newTable = tables.filter(table => table.id !== tableID)[0]
    newTable && dispatch(selectTable(newTable.id))
    return dispatch({type: types.REMOVE_TABLE, tableID})
  }
}

function selectNextRow (tableID, rowID) {
  return (dispatch, getState) => {
    let { tables } = getState()
    let table = helpers.findTableWithID(tables, tableID)
    let rows = table.rows
    let newRowID = null

    if (rowID === null) {
      return dispatch({type: types.DESELECT_NAV_ROW})
    }

    // There is no next row, we're done.
    if (rows.length < 2) { return }

    // Clone current row & get its index
    let {cleanRow: row} = helpers.findRowWithID(tables, rowID)
    let rowIndex = rows.indexOf(row)

    // Find the next index to select
    if (rows[rowIndex + 1] !== undefined) {
      newRowID = rows[rowIndex + 1].id
    } else if (rows[rowIndex - 1] !== undefined) {
      newRowID = rows[rowIndex - 1].id
    }
    dispatch(selectRow(tableID, newRowID))
  }
}

export function selectRow (tableID, rowID = null) {
  console.log('=> selectRow')
  return (dispatch, getState) => {
    let { tables, nav } = getState()

    // Handles when adding a new foreign key
    if (nav.addFKOrigin !== null && nav.addFKOrigin !== rowID) {
      new Promise((resolve, reject) => {
        dispatch(addForeignKeyConnection(rowID, nav.addFKOrigin))
        resolve(tableID)
      }).then(tableID => {
        return dispatch(selectRow(tableID, rowID))
      })
    }

    // Handles when removing a foreign key
    if (nav.rmFKOrigin !== null && nav.rmFKOrigin !== rowID) {
      // Just had to use the new hotness!
      (async () => {
        await dispatch(removeForeignKeyConnection(rowID, nav.rmFKOrigin))
        return dispatch(selectRow(tableID, rowID))
      })()
    }

    if (rowID !== null && (tableID !== nav.selectedTableID || rowID !== nav.selectedRowID)) {
      dispatch(disableEditAndSave())
    }

    if (rowID === null) {
      let rows = tables.filter(table => table.id === tableID)[0].rows
      rowID = rows.length > 0 && rows[rows.length - 1].id
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
  return (dispatch, getState) => {
    (async () => {
      await dispatch({ type: types.TOGGLE_EDIT_ROW, tableID, rowID })
      await dispatch(updateTableWidth(tableID))
      return dispatch(updateAllTableRowsPosition(tableID))
    })()
  }
}

export function toggleEditTable (tableID) {
  return (dispatch, getState) => {
    (async () => {
      await dispatch({ type: types.TOGGLE_EDIT_TABLE, tableID })
      await dispatch(updateTableWidth(tableID))
      return dispatch(updateAllTableRowsPosition(tableID))
    })()
  }
}

export function updateAllOutboundConnections () {
  return (dispatch, getState) => {
    const { tables } = getState()
    const cleanTables = helpers.cloneObject(tables)
    cleanTables.map(table => {
      if (table.connectionCount < 1) { return table }
      table.rows.map(row => {
        Object.keys(row.connections.outbound).map(connection => {
          let { cleanRow } = helpers.findRowWithID(tables, connection)
          row.connections.outbound[connection] = cleanRow.position
        })
        return row
      })
      dispatch(updateTable(table))
    })
  }
}

export function updateAllTableRowsPosition (tableID) {
  // Also update connections here
  return (dispatch, getState) => {
    const { tables } = getState()
    const cleanTable = helpers.findTableWithID(tables, tableID)
    cleanTable.rows.map(row => dispatch(updateRow(row)))
    dispatch(updateAllOutboundConnections())
  }
}

export function updateInboundConnectionOrigin (remoteRowID, currentRow, data) {
  return (dispatch, getState) => {
    const { tables } = getState()

    // Find table of connection
    const { cleanRow: remoteRow } = helpers.findRowWithID(tables, remoteRowID)
    const currentRowPosition = helpers.setRowPositionFromTable(tables, currentRow).position
    remoteRow.connections.outbound[currentRow.id] = currentRowPosition

    return dispatch({type: types.UPDATE_ROW, tableID: remoteRow.tableID, rowID: remoteRow.id, row: remoteRow})
  }
}

export function updatePosition (tableID, data) {
  return {type: types.UPDATE_POSITION, tableID, position: {x: data.lastX, y: data.lastY}}
}

export function updateRow (row) {
  return (dispatch, getState) => {
    const { tables } = getState()
    const updatedRowPosition = helpers.setRowPositionFromTable(tables, row)
    return dispatch({type: types.UPDATE_ROW, tableID: row.tableID, rowID: row.id, row: updatedRowPosition})
  }
}

export function updateTable (table) {
  return {type: types.UPDATE_TABLE, table}
}

export function updateTableWidth (tableID) {
  return (dispatch, getState) => {
    const { tables } = getState()
    const cleanTable = helpers.findTableWithID(tables, tableID)
    const updatedTablePosition = helpers.setTableWidthFromDOM(tables, cleanTable)
    return dispatch(updateTable(updatedTablePosition))
  }
}
