'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const nano = require('nano')('http://localhost:5984');
const dbName = 'securehealth_db';
const db = nano.db.use(dbName);

async function main(doctorData) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '../config', 'profile-con-rabat.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.rabat.securehealth.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(doctorData.id);
        if (userIdentity) {
            console.log(`An identity for the user ${doctorData.lastname} already exists in the wallet`);
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: doctorData.id,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: doctorData.id,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: 'HospitalRabatMSP',
            type: 'X.509',
        };
        
        await wallet.put(doctorData.id, x509Identity);
        const document = {
            _id: doctorData.id, 
            firstname: doctorData.firstname,
            lastname: doctorData.lastname,
            password: doctorData.password,
            phone: doctorData.phone,
            gender: doctorData.gender,
            hospital: doctorData.hospital,
            speciality: doctorData.speciality,
            address: doctorData.address
        };
        db.insert(document, (err, body) => {
            if (err) {
              console.error('Error inserting document:', err);
            } else {
              console.log('Document inserted successfully:', body);
              console.log(`Successfully registered and enrolled ${doctorData.lastname} and imported it into the wallet`);
            }
        });
    } catch (error) {
        console.error(`Failed to register user ${doctorData.lastname} : ${error}`);
    }
}

module.exports = main;