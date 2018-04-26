export const tables = [
  {
    'edit': false,
    'connectionCount': 2,
    'id': '2be8p0',
    'name': 'dogs',
    'position': {
      'x': 615,
      'y': 41,
      'width': 90
    },
    'rows': [
      {
        'color': 'gray',
        'connections': {
          'inbound': {
            '9h52tb-4': {
              'x': 903,
              'y': 167,
              'width': 90,
              'height': 28
            }
          },
          'outbound': {
            'pw7yu2-1': {
              'x': 390,
              'y': 243,
              'width': 107,
              'height': 28
            }
          }
        },
        'connectionColor': 'LightSeaGreen',
        'dataType': 'int',
        'edit': false,
        'id': '2be8p0-1',
        'selected': false,
        'tableID': '2be8p0',
        'title': 'id',
        'position': {
          'x': 615,
          'y': 69,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'Lime',
        'dataType': 'int',
        'edit': false,
        'id': '2be8p0-3',
        'selected': false,
        'tableID': '2be8p0',
        'title': 'age',
        'position': {
          'x': 615,
          'y': 97,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'HoneyDew',
        'dataType': 'varchar',
        'edit': false,
        'id': '2be8p0-2',
        'selected': false,
        'tableID': '2be8p0',
        'title': 'name',
        'position': {
          'x': 615,
          'y': 125,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'LightSteelBlue',
        'dataType': 'varchar',
        'edit': false,
        'id': '2be8p0-6',
        'selected': false,
        'tableID': '2be8p0',
        'title': 'breed',
        'position': {
          'x': 615,
          'y': 153,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'DarkOrange',
        'dataType': 'date',
        'edit': false,
        'id': '2be8p0-5',
        'selected': false,
        'tableID': '2be8p0',
        'title': 'birthday',
        'position': {
          'x': 615,
          'y': 181,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'PowderBlue',
        'dataType': 'boolean',
        'edit': false,
        'id': '2be8p0-4',
        'selected': false,
        'tableID': '2be8p0',
        'title': 'cute?',
        'position': {
          'x': 615,
          'y': 209,
          'width': 90,
          'height': 28
        }
      }
    ],
    'selected': false
  },
  {
    'edit': false,
    'connectionCount': 1,
    'id': '8gp5qd',
    'name': 'owners',
    'position': {
      'x': 214,
      'y': 117,
      'width': 90
    },
    'rows': [
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {
            'pw7yu2-2': {
              'x': 390,
              'y': 271,
              'width': 107,
              'height': 28
            }
          }
        },
        'connectionColor': 'LightGray',
        'dataType': 'int',
        'edit': false,
        'id': '8gp5qd-1',
        'selected': false,
        'tableID': '8gp5qd',
        'title': 'id',
        'position': {
          'x': 214,
          'y': 144,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'SkyBlue',
        'dataType': 'int',
        'edit': false,
        'id': '8gp5qd-3',
        'selected': false,
        'tableID': '8gp5qd',
        'title': 'age',
        'position': {
          'x': 214,
          'y': 172,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'BlueViolet',
        'dataType': 'text',
        'edit': false,
        'id': '8gp5qd-2',
        'selected': true,
        'tableID': '8gp5qd',
        'title': 'name',
        'position': {
          'x': 214,
          'y': 200,
          'width': 90,
          'height': 28
        }
      }
    ],
    'selected': true
  },
  {
    'edit': false,
    'connectionCount': 2,
    'id': 'pw7yu2',
    'name': 'dog_owners',
    'position': {
      'x': 390,
      'y': 217,
      'width': 107
    },
    'rows': [
      {
        'color': 'gray',
        'connections': {
          'inbound': {
            '2be8p0-1': {
              'x': 427,
              'y': 170,
              'width': 90,
              'height': 28
            }
          },
          'outbound': {}
        },
        'connectionColor': 'Red',
        'dataType': 'int',
        'edit': false,
        'id': 'pw7yu2-1',
        'selected': false,
        'tableID': 'pw7yu2',
        'title': 'dog_id',
        'position': {
          'x': 390,
          'y': 243,
          'width': 107,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {
            '8gp5qd-1': {
              'x': 962,
              'y': 152,
              'width': 90,
              'height': 28
            }
          },
          'outbound': {}
        },
        'connectionColor': 'Thistle',
        'dataType': 'int',
        'edit': false,
        'id': 'pw7yu2-2',
        'selected': false,
        'tableID': 'pw7yu2',
        'title': 'owner_id',
        'position': {
          'x': 390,
          'y': 273,
          'width': 107,
          'height': 28
        }
      }
    ],
    'selected': false
  },
  {
    'edit': false,
    'connectionCount': 1,
    'id': '9h52tb',
    'name': 'toys',
    'position': {
      'x': 400,
      'y': 31,
      'width': 90
    },
    'rows': [
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'Gold',
        'dataType': 'int',
        'edit': false,
        'id': '9h52tb-1',
        'selected': false,
        'tableID': '9h52tb',
        'title': 'id',
        'position': {
          'x': 400,
          'y': 58,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {
            '2be8p0-1': {
              'x': 615,
              'y': 69,
              'width': 90,
              'height': 28
            }
          }
        },
        'connectionColor': 'Sienna',
        'dataType': 'int',
        'edit': false,
        'id': '9h52tb-4',
        'selected': false,
        'tableID': '9h52tb',
        'title': 'dog_id',
        'position': {
          'x': 400,
          'y': 86,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'PaleTurquoise',
        'dataType': 'varchar',
        'edit': false,
        'id': '9h52tb-2',
        'selected': false,
        'tableID': '9h52tb',
        'title': 'name',
        'position': {
          'x': 400,
          'y': 114,
          'width': 90,
          'height': 28
        }
      },
      {
        'color': 'gray',
        'connections': {
          'inbound': {},
          'outbound': {}
        },
        'connectionColor': 'SlateBlue',
        'dataType': 'varchar',
        'edit': false,
        'id': '9h52tb-3',
        'selected': false,
        'tableID': '9h52tb',
        'title': 'brand',
        'position': {
          'x': 400,
          'y': 143,
          'height': 28,
          'width': 90
        }
      }
    ],
    'selected': false
  }
]
