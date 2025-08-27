
import { Fs }           from './_super/fs'
import { Log }          from './_super/log'
import { Notification } from './_super/notification'
import { Os }           from './_super/os'
import { Window }       from './_super/window'

export const log = new Log( { forwardConsole: true } )
export const os = new Os()
export const notification = new Notification()
export const fs = new Fs()
export const appWindow = new Window( )

