
/*
 TODO:
 - insert data sources on the fly if not exist

 - command-line arguments support
   -file  (single or multiple files)  each file needs a datasourceidentifier, or the default DSI will be used
   -dir data  --  all files in the directory if 'file' does not exist. Defaults to currentDir
   -dsi LAB1  --  defaults to LAB1.  create it on the fly if not exist, with OPT_IN consent. (protected == false)
   -user admin
   -pass Admin123!


 - create data source script.  this is something manual run. no command-line interface as it'd be clumsy.
   - create-data-source.ts
*/

const _ = require('lodash');
const bluebirdPromise = require('bluebird');
const axios = require('axios');
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

            // console.log('---------   MESSAGE  -----------');
            // console.log(JSON.stringify(message, null, 4));

            // console.log('---------   MESSAGE  PAYLOAD  -----------');
            // console.log(JSON.stringify(await message.buildMessagePayload(), null, 4));

            const options = {
                url: this.url,
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                data: await message.buildMessagePayload(),
                timeout: 30000,
                auth: {
                    username: user.getUsername(),
                    password: user.getPassword()
                }
              };

            const res: any = await axios(options).catch((err: any) => {
                console.log(`-------------  AXIOS ERROR  ---------------`);
                console.log(err);
                throw err;
            });

            // console.log(`------------   ${message.getFilePath()} res.data   --------------`);
            // console.log(res.data);

            this.messageSenderResponses[message.getFilePath()] = res.data;
        }).then(() => {
            return this.messageSenderResponses;
        });
    }

    static createMessage(data: string, filePath: string, dataSourceIdentifier: string, type: string) {
        return new Message(data, filePath, dataSourceIdentifier, type);
    }
}

main();

async function main() {
    const beginTime = Date.now();

    console.log(`---------  BEGIN  -----------`);

    await sendMessages().catch((err: any) => {
        console.log('------------   main err   --------------');
        console.log(err);
    });

    console.log(`---------  END  -----------`);

    const endTime = Date.now();
    const totalTimeTook = endTime - beginTime;
    console.log(timeConversion(totalTimeTook));
}

async function sendMessages() {
    const adminUser = new User('admin', 'Admin123!');
    const nonAdminUser = new User('sheldon', 'Sheldon123!');
    
    const url = `https://fibonachos.rnd.hdh.nextgenaws.net/health-data-hub/api/v1/messages`;
    const messageSender = new MessageSender(url);
    
    const messages: Message[] = [];

    messages.push(MessageSender.createMessage(null, 'test-patient-1-1.hl7', 'LAB5', 'HL7'));
    messages.push(MessageSender.createMessage(null, 'test-patient-1-2.hl7', 'LAB6', 'HL7'));

    const responseData: any = await messageSender.send(messages, adminUser);

    console.log('---------   responseData   -----------');
    console.log(JSON.stringify(responseData, null, 4));
}

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
