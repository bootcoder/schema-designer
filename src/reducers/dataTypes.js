export const pg = {
  boolean: {color: 'DodgerBlue', toolTip: 'BOOLEAN data type can hold one of three possible values: true, false or null. You use boolean or bool keyword to declare a column with the Boolean data type.'},
  char: {color: 'lightblue', toolTip: 'CHAR(n) is the fixed-length character with space padded. If you insert a string that is shorter than the length of the column, PostgreSQL pads spaces. If you insert a string that is longer than the length of the column, PostgreSQL will issue an error.'},
  varchar: {color: 'lightblue', toolTip: 'VARCHAR(n) is the variable-length character string.  With VARCHAR(N),  you can store up to n characters. PostgreSQL does not pad spaces when the stored string is shorter than the length of the column.'},
  text: {color: 'lightblue', toolTip: 'TEXT is variable-length character string. Theoretically, text data is a character string with unlimited length.'},
  smallint: {color: 'lightgreen', toolTip: 'SMALLINT is 2-byte signed integer that has a range from -32768 to 32767.'},
  int: {color: 'lightgreen', toolTip: 'INT is 4-byte integer that has a range from -214783648 to -214783647.'},
  serial: {color: 'lightgreen', toolTip: 'SERIAL is the same as integer except that PostgreSQL will automatically generate and populate values into the SERIAL column. This is similar to AUTO_INCREMENT column in MySQL or AUTOINCREMENT column in SQLite'},
  float: {color: 'lightgreen', toolTip: 'FLOAT(n) is a floating-point number whose precision, at least, n, up to a maximum of 8 bytes.'},
  real: {color: 'lightgreen', toolTip: 'REAL or FLOAT8 is a double-precision (8-byte) floating-point number.'},
  numeric: {color: 'lightgreen', toolTip: 'NUMERIC or NUMERIC(p,s) is a real number with p digits with s number after the decimal point. The numeric(p,s) is the exact number.'},
  date: {color: 'lightseagreen', toolTip: 'DATE stores date values only.'},
  time: {color: 'lightseagreen', toolTip: 'TIME stores time of day values.'},
  timestamp: {color: 'lightseagreen', toolTip: 'TIMESTAMP stores date and time.'},
  timestampz: {color: 'lightseagreen', toolTip: 'TIMESTAMPZ stores both timestamp and time zone data.'},
  interval: {color: 'lightseagreen', toolTip: 'INTERVAL stores periods of time.'},
  array: {color: 'Violet', toolTip: 'ARRAY, In PostgreSQL, you can store an array of strings, an array of integers, etc., in array columns. The array comes to handy in some situations e.g., storing days of the week, months of the year, etc.'},
  uuid: {color: 'DarkSalmon', toolTip: 'UUID data type allows you to store Universal Unique Identifiers defined by RFC 4122 . The UUID values guarantee a better uniqueness than SERIAL and can be used to hide sensitive data exposed to public such as values of id in URL, etc.'},
  json: {color: 'RosyBrown', toolTip: 'PostgreSQL provides two JSON data types: JSON and JSONB for storing JSON data. The JSON data type stores plain JSON data that requires reparsing for each processing, while JSONB data type stores JSON data in a binary format which is faster to process but slower to insert. In addition, JSONB supports indexing, which can be an advantage.'},
  jsonb: {color: 'RosyBrown', toolTip: 'PostgreSQL provides two JSON data types: JSON and JSONB for storing JSON data. The JSON data type stores plain JSON data that requires reparsing for each processing, while JSONB data type stores JSON data in a binary format which is faster to process but slower to insert. In addition, JSONB supports indexing, which can be an advantage.'}
}
