import * as colorette from 'colorette'
import * as nodeEmoji from 'node-emoji'

export default class ConsoleLogger {

    static start = (text: string) => console.log(colorette.magenta(`${nodeEmoji.get('rocket')}  ${text}`))

    static info = (text: string) => console.log(colorette.blue(`${nodeEmoji.get('blue_book')}  ${text}`))

    static error = (text: string) => console.log(colorette.red(`${nodeEmoji.get('x')} ${text}`))
}
