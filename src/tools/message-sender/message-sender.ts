
// TODO: convert promises to async / await


const _ = require('lodash');
const bluebirdPromise = require('bluebird');
// const dateFormatter = require('date-fns/format');
// const nodeUuid = require('node-uuid');
const requestPromise = require('request-promise');
const readFileAsync = bluebirdPromise.promisify(require('fs').readFile);

class User {
    private username: string;
    private password: string;
    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }
}

class Message {
    private data: string;
    private filePath: string;
    private dataSourceIdentifier: string;
    private type: string;

    // if filePath exists, get it from there, otherwise, default to 'data' or vice versa
    constructor(data: string, filePath: string, dataSourceIdentifier: string, type: string) {
        this.data = data;
        this.filePath = filePath;
        this.dataSourceIdentifier = dataSourceIdentifier;
        this.type = type;
    };

    getData(): string {
        return this.data;
    }
    getFilePath(): string {
        return this.filePath;
    }
    getDataSourceIdentifier(): string {
        return this.dataSourceIdentifier;
    }
    getType(): string {
        return this.type;
    }

    async buildMessagePayload(): Promise<any> {
        let message: string = this.data;
        if (this.filePath) {
            message = await readFileAsync(`${__dirname}/data/${this.filePath}`, {encoding: 'utf-8'});
        }

        if (!this.dataSourceIdentifier) {
            console.log('ERROR: dataSourceIdentifier missing!');
        }
        const originalMessage = {
            data: message,
            type: this.type
        };
        const document = {
            data: message,
            type: this.type
        };
        return {
            originalMessage: originalMessage,
            message: document,
            dataSourceIdentifier: this.dataSourceIdentifier,
            setTTL: false
        };
    }
}

class MessageSender {
    url: string;
    messageSenderResponses: object = {};

    constructor(url: string) {
        this.url = url;
    }

    async send(messages: Message[], user: User): Promise<object> {
        return bluebirdPromise.mapSeries(messages, async (message: Message) => {


            console.log('---------   MESSAGE  -----------');
            console.log(JSON.stringify(message, null, 4));

            console.log('---------   MESSAGE  PAYLOAD  -----------');
            console.log(JSON.stringify(await message.buildMessagePayload(), null, 4));


            const options = {
                method: 'POST',
                auth: {
                    user: user.getUsername(),
                    pass: user.getPassword(),
                    sendImmediately: true
                },
                headers: {
                    'X-Requested-With': 'my-request',
                    'Content-Type': 'application/json'
                },
                uri: this.url,
                body: await message.buildMessagePayload(),
                json: true,
                rejectUnauthorized: false
            };

            const res: any = await requestPromise(options);

            console.log(`------------   ${message.getFilePath()} res   --------------`);
            console.log(JSON.stringify(res, null, 4));

            this.messageSenderResponses[message.getFilePath()] = res;
        }).then(() => {
            return this.messageSenderResponses;
        });
    }
    
    getMessageResponses(): any {
        return this.messageSenderResponses;
    }

    static createMessage(data: string, filePath: string, dataSourceIdentifier: string, type: string) {
        return new Message(data, filePath, dataSourceIdentifier, type);
    }
}


const beginTime = Date.now();

bluebirdPromise.try(async () => {

    const adminUser = new User('admin', 'Admin123!');
    const nonAdminUser = new User('sheldon', 'Sheldon123!');
    
    const url = `https://fibonachos.rnd.hdh.nextgenaws.net/health-data-hub/api/v1/messages`;
    const messageSender = new MessageSender(url);
    
    const messages: Message[] = [];

    messages.push(MessageSender.createMessage(null, 'patient-1-1.hl7', 'LAB5', 'HL7'));
    messages.push(MessageSender.createMessage(null, 'patient-1-2.hl7', 'LAB6', 'HL7'));

    const data: any = await messageSender.send(messages, adminUser);

    console.log('---------   DATA 1   -----------');
    console.log(JSON.stringify(data, null, 4));

    // console.log('----------   message responses  ----------');
    // console.log(JSON.stringify(messageSender.getMessageResponses(), null, 4));
    
}).then((data: any) => {

    console.log('---------   DATA 2  -----------');
    console.log(data);

}).catch((err: any) => {

    console.log('------------   main err   --------------');
    console.log(err);

}).finally(() => {
    console.log('DONE!');

    const endTime = Date.now();
    const totalTimeTook = endTime - beginTime;
    console.log(timeConversion(totalTimeTook));
});


function timeConversion(millisec: number) {
    const seconds: number = parseInt((millisec / 1000).toFixed(1));
    const minutes: number = parseInt((millisec / (1000 * 60)).toFixed(1));
    const hours: number = parseInt((millisec / (1000 * 60 * 60)).toFixed(1));
    const days: number = parseInt((millisec / (1000 * 60 * 60 * 24)).toFixed(1));

    if (seconds < 1) {
        return millisec + ' ms';
    } else if (seconds < 60) {
        return seconds + ' seconds';
    } else if (minutes < 60) {
        return minutes + ' minutes';
    } else if (hours < 24) {
        return hours + ' hours';
    } else {
        return days + ' days';
    }
}

export {};
