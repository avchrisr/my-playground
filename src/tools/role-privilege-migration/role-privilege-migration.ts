const _ = require('lodash');
const Bluebird = require('bluebird');
const axios = require('axios');

const environments = [
    {
        hostname: 'fibonachos.rnd.hdh.nextgenaws.net',
        username: 'admin',
        password: 'Admin123!'
    }
];

const viewProtectedDataSourcePrivilege = {
    type: 'toggle',
    privilegeName: 'PATIENT_VIEW_PROTECTED_DATASOURCE',
    privilegeLabel: 'Protected Data View',
    description: 'Allows ability to view all protected patient data. All administrative privileges that display patient data should be coupled with this privilege in order for features to function properly.',
    required: false,
    enabled: false                      //  TODO: should this be set to true / false ???
};

main();

async function main() {

    /*
    for each environment in PROD. (get the list of PROD envs and credentials in advance)
    GET /roles
    for each role, check if the 'PATIENT_VIEW_PROTECTED_DATASOURCE' privilege exists   
    if it does not exist, insert it between 'Confidential Data View' and 'Break the Glass Ability' privileges in the Patient privilege group

    PATCH /roles/{id}
    {
        privilegeGroups
    }

    - PRINT OUT DETAILED REPORTS
      - site
      - number of total roles
      - number of roles with missing View Protected Data privilege
    */

    const beginTime = Date.now();

    console.log(`---------  BEGIN  -----------`);

    await checkForPrivilegesInRoles().catch((err: any) => {
        console.log('------------   main err   --------------');
        console.log(err);
    });

    console.log(`---------  END  -----------`);

    const endTime = Date.now();
    const totalTimeTook = endTime - beginTime;
    console.log(timeConversion(totalTimeTook));
}

async function checkForPrivilegesInRoles() {
    for await (const environment of environments) {
        const url = `https://${environment.hostname}/health-data-hub/api/v1/roles`;
        const options = {
            url,
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json'
            },
            // data: dataSource.buildPayload(),
            timeout: 30000,
            auth: {
                username: environment.username,
                password: environment.password
            }
          };

        const res: any = await axios(options).catch((err: any) => {
            console.log(`-------------  AXIOS ERROR  ---------------`);
            console.log(err);
            throw err;
        });

        // console.log(`-------------  res.data  ---------------`);
        // console.log(JSON.stringify(res.data, null, 4));


        // Q) what happens if the result set is too big we have to paginate?  pageSize = 100 max?  what if there are more than 100?


        if (_.isArray(res.data.data)) {
            res.data.data.forEach((role: any) => {
                console.log(`Environment = '${environment.hostname}' | Role = '${role.roleName}'`);

                // empty privilegeGroups means all privileges turned off. just continue.
                if (!_.isEmpty(role.privilegeGroups)) {
                    const patientPrivilegeGroup = role.privilegeGroups.find((privilegeGroup: any) => {
                        return privilegeGroup.groupName === 'Patient';
                    });
    
                    // console.log(`-------------  patientPrivilegeGroup  ---------------`);
                    // console.log(JSON.stringify(patientPrivilegeGroup, null, 4));
    
                    if (patientPrivilegeGroup) {
                        const viewProtectedDataSourcePrivilege = patientPrivilegeGroup.relatedPrivileges.find((privilege: any) => {
                            return privilege.privilegeName === 'PATIENT_VIEW_PROTECTED_DATASOURCE';
                        });
        
                        if (viewProtectedDataSourcePrivilege) {
                            // console.log(`View Protected DataSource privilege is present in Role = '${role.roleName}' in environment = '${environment.hostname}'`);
                        } else {
                            console.log(`View Protected DataSource privilege is MISSING in Role = '${role.roleName}' in environment = '${environment.hostname}'. Adding the privilege to the role...`);
    
                            // TODO: insert it and patch the role
    
    
    
                        }
                    } else {
                        console.log(`ERROR - patient privilege group NOT FOUND for Role = '${role.roleName}' in environment = '${environment.hostname}'`);
                    }
                }                
            });
        }
    }
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
