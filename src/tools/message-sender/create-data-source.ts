// const _ = require('lodash');
const bluebirdPromise = require('bluebird');
const axios = require('axios');

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

class DataSource {
    identifier: string;
    authority: boolean = true;
    isProtectedDataSource: boolean = false;

    constructor(identifier: string) {
        this.identifier = identifier;
    }

    getDataSourceIdentifier(): string {
        return this.identifier;
    }
    setProtectedDataSource(isProtectedDataSource: boolean) {
        this.isProtectedDataSource = isProtectedDataSource;
    }
    setAuthority(authority: boolean) {
        this.authority = authority;
    }

    buildPayload(): object {
        return {
            authority: this.authority,
            isProtectedDataSource: this.isProtectedDataSource,
            dataSourceName: this.identifier,
            defaultConsent: 'OPT_IN',
            dataSourceIdentifier: this.identifier,
            active: true
        };
    }
}

class ApiHelper {
    url: string;
    responses: object = {};

    constructor(url: string) {
        this.url = url;
    }

    async send(dataSources: DataSource[], user: User): Promise<object> {
        return bluebirdPromise.mapSeries(dataSources, async (dataSource: DataSource) => {

            // console.log('---------   DataSource  -----------');
            // console.log(JSON.stringify(dataSource, null, 4));

            // console.log('---------   DataSource  PAYLOAD  -----------');
            // console.log(JSON.stringify(dataSource.buildPayload(), null, 4));

            const options = {
                url: this.url,
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                },
                data: dataSource.buildPayload(),
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

            this.responses[dataSource.getDataSourceIdentifier()] = res.data;
        }).then(() => {
            return this.responses;
        });
    }
}

main();

async function main() {
    const beginTime = Date.now();

    console.log(`---------  BEGIN  -----------`);

    await createDataSources().catch((err: any) => {
        console.log('------------   main err   --------------');
        console.log(err);
    });

    console.log(`---------  END  -----------`);

    const endTime = Date.now();
    const totalTimeTook = endTime - beginTime;
    console.log(timeConversion(totalTimeTook));
}

async function createDataSources() {
    const adminUser = new User('admin', 'Admin123!');
    const nonAdminUser = new User('sheldon', 'Sheldon123!');
    
    const url = `https://fibonachos.rnd.hdh.nextgenaws.net/health-data-hub/api/v1/messages`;
    const apiHelper = new ApiHelper(url);
    
    const dataSources: DataSource[] = [];

    const lab5 = new DataSource('LAB5');
    lab5.setProtectedDataSource(true);
    const lab6 = new DataSource('LAB6');
    lab6.setProtectedDataSource(true);

    dataSources.push(lab5);
    dataSources.push(lab6);

    const responseData: any = await apiHelper.send(dataSources, adminUser);

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
