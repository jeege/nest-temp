import { LeveledLogMethod, Logger } from 'winston'

export interface CustomLogger extends Logger {
    task: LeveledLogMethod
}