import * as winston from "winston";
import * as path from 'path'
import DailyRotateFile = require("winston-daily-rotate-file");

export const WinstonConfig = {
    exitOnError: false,
    levels: {
        error: 0,
        warning: 1,
        info: 2,
        task: 3
    },
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => {
            if (info.stack) {
                info.message = info.stack
            }
            return `${info.timestamp} [${info.pid}] ${info.level}: ${info.message}`
        })
    ),
    defaultMeta: { pid: process.pid },
    transports: [
        new DailyRotateFile({
            dirname: path.resolve(__dirname, '../../logs'),
            filename: 'app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'task'
        }),
        new winston.transports.Console(),
        new winston.transports.File({
            dirname: path.resolve(__dirname, '../../logs'),
            filename: 'error.log',
            level: 'error'
        })
    ]
}