'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const doctor = "naim"
async function main() {
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
        const userIdentity = await wallet.get(doctor);
        if (userIdentity) {
            console.log(`An identity for the user ${doctor} already exists in the wallet`);
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
            enrollmentID: doctor,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: doctor,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'HospitalRabatMSP',
            type: 'X.509',
        };
        await wallet.put(doctor, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${doctor} and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to register user ${doctor} : ${error}`);
        process.exit(1);
    }
}

main();