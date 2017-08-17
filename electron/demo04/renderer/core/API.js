// ## Imports

import { remote } from 'electron'
import { Application } from './Application'

window.context = {
  api: new Application(remote.getCurrentWebContents()),
  command: function () { },
  document: window.document
}

