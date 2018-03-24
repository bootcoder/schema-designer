import * as types from '../actions/actionTypes'

const pgDataType = {
  boolean: {color: 'BurntOrange', toolTip: 'A Boolean data type can hold one of three possible values: true, false or null. You use boolean or bool keyword to declare a column with the Boolean data type.'},
  char: {color: 'Yellow', toolTip: 'CHAR(n) is the fixed-length character with space padded. If you insert a string that is shorter than the length of the column, PostgreSQL pads spaces. If you insert a string that is longer than the length of the column, PostgreSQL will issue an error.'},
  varchar: {color: 'Yellow', toolTip: ' VARCHAR(n) is the variable-length character string.  With VARCHAR(N),  you can store up to n characters. PostgreSQL does not pad spaces when the stored string is shorter than the length of the column.'},
  text: {color: 'Yellow', toolTip: ' TEXT is variable-length character string. Theoretically, text data is a character string with unlimited length.'},
  smallint: {color: 'Aqua', toolTip: 'Small integer ( SMALLINT)  is 2-byte signed integer that has a range from -32768 to 32767.'},
  int: {color: 'Aqua', toolTip: 'Integer ( INT) is 4-byte integer that has a range from -214783648 to -214783647.'},
  serial: {color: 'Aqua', toolTip: 'Serial is the same as integer except that PostgreSQL will automatically generate and populate values into the SERIAL column. This is similar to AUTO_INCREMENT column in MySQL or AUTOINCREMENT column in SQLite'},
  float: {color: 'Aqua', toolTip: 'float(n)  is a floating-point number whose precision, at least, n, up to a maximum of 8 bytes.'},
  real: {color: 'Aqua', toolTip: 'real or float8 is a double-precision (8-byte) floating-point number.'},
  numeric: {color: 'Aqua', toolTip: 'numeric or numeric(p,s) is a real number with p digits with s number after the decimal point. The numeric(p,s) is the exact number.'},
  data: {color: 'LightGreen', toolTip: 'DATEstores date values only.'},
  time: {color: 'LightGreen', toolTip: 'TIMEstores time of day values.'},
  timestamp: {color: 'LightGreen', toolTip: 'TIMESTAMP stores date and time.'},
  timestampz: {color: 'LightGreen', toolTip: 'TIMESTAMPZ stores both timestamp and time zone data.'},
  interval: {color: 'LightGreen', toolTip: 'INTERVAL stores periods of time.'},
  array: {color: 'HotPink', toolTip: 'In PostgreSQL, you can store an array of strings, an array of integers, etc., in array columns. The array comes to handy in some situations e.g., storing days of the week, months of the year, etc.'},
  uuid: {color: 'LightYellow', toolTip: 'The UUID data type allows you to store Universal Unique Identifiers defined by RFC 4122 . The UUID values guarantee a better uniqueness than SERIAL and can be used to hide sensitive data exposed to public such as values of id in URL, etc.'},
  json: {color: 'olive', toolTip: 'PostgreSQL provides two JSON data types: JSON and JSONB for storing JSON data. The JSON data type stores plain JSON data that requires reparsing for each processing, while JSONB data type stores JSON data in a binary format which is faster to process but slower to insert. In addition, JSONB supports indexing, which can be an advantage.'},
  jsonb: {color: 'olive', toolTip: 'PostgreSQL provides two JSON data types: JSON and JSONB for storing JSON data. The JSON data type stores plain JSON data that requires reparsing for each processing, while JSONB data type stores JSON data in a binary format which is faster to process but slower to insert. In addition, JSONB supports indexing, which can be an advantage.'}
}

const defaultState = {
  dataType: pgDataType,
  fkOrigin: null,
  selectedTableID: '',
  selectedRowID: '',
  windowWidth: 10000,
  windowHeight: 10000
}

export default function navReducer (state = defaultState, action) {
  switch (action.type) {
    case types.DESELECT_NAV_ROW:
      return Object.assign({}, state, {selectedRowID: ''})

    case types.REMOVE_FK_OF_ORIGIN_ROW:
      return Object.assign({}, state, {fkOrigin: null})

    case types.SET_DATA_TYPE:
      return Object.assign({}, state, {dataType: action.dataType})

    case types.SET_FOREIGN_KEY_OF_ORIGIN_ROW:
      return Object.assign({}, state, {fkOrigin: action.rowID})

    case types.SELECT_TABLE:
      return Object.assign({}, state, {selectedTableID: action.tableID})

    case types.SELECT_ROW:
      return Object.assign(
        {},
        state,
        {selectedTableID: action.tableID, selectedRowID: action.rowID})

    case types.CLEAR_TABLES:
      return defaultState

    default:
      return state
  }
}
