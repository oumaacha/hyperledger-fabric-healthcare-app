var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '../config',  'profile-con-rabat.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
ccp.peers['peer0.rabat.securehealth.com'].tlsCACerts.pem = fs.readFileSync(path.resolve(__dirname, '../config', ccp.peers['peer0.rabat.securehealth.com'].tlsCACerts.path), 'utf8');
ccp.certificateAuthorities['ca.rabat.securehealth.com'].tlsCACerts.pem = fs.readFileSync(path.resolve(__dirname, '../config', ccp.certificateAuthorities['ca.rabat.securehealth.com'].tlsCACerts.path), 'utf8');
app.get('/api/queryallcars', async function (req, res) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get('anouar2');
        if (!userExists) {
            console.log('An identity for the user "anouar2" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
	    await gateway.connect(ccp, { wallet, identity: 'anouar2', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('securehealthcc');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('QueryAllPatients');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});
app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080'); 
