var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const doctor = "naim"
const ccpPath = path.resolve(__dirname, '../config',  'profile-con-rabat.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
ccp.peers['peer0.rabat.securehealth.com'].tlsCACerts.pem = fs.readFileSync(path.resolve(__dirname, '../config', ccp.peers['peer0.rabat.securehealth.com'].tlsCACerts.path), 'utf8');
ccp.certificateAuthorities['ca.rabat.securehealth.com'].tlsCACerts.pem = fs.readFileSync(path.resolve(__dirname, '../config', ccp.certificateAuthorities['ca.rabat.securehealth.com'].tlsCACerts.path), 'utf8');
app.get('/api/queryallpatients', async function (req, res) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(doctor);
        if (!userExists) {
            console.log(`An identity for the user ${doctor} does not exist in the wallet`);
            console.log('Run the registerDoctor.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
	    await gateway.connect(ccp, { wallet, identity: doctor, discovery: { enabled: true, asLocalhost: true } });

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
        res.status(500).json({error: error.message});
    }
});
app.get('/api/readPatient/:patientid', async function (req, res) {
    try {
        // initialize params 
        const patientId = req.params.patientid

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(doctor);
        if (!userExists) {
            console.log(`An identity for the user ${doctor} does not exist in the wallet`);
            console.log('Run the registerDoctor.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
	    await gateway.connect(ccp, { wallet, identity: doctor, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('securehealthcc');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('ReadPatient',patientId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error.message});
    }
});

app.post('/api/addpatient/', async function (req, res) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(doctor);
        if (!userExists) {
            console.log(`An identity for the user ${doctor} does not exist in the wallet`);
            console.log('Run the registerDoctor.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: doctor, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('securehealthcc');
        // Submit the specified transaction.
        const result = await contract.submitTransaction('createPatient',req.body.patientId, req.body.firstname, req.body.lastname,req.body.age, req.body.password);
        res.send('Transaction has been submitted');
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).send(`Failed to submit transaction: ${error.message}`);
    }
})

app.post('/api/login', async function (req, res) {
    try {
        // patient credentials
        const patientId = req.body.patientId
        const patientPassword = req.body.password
        
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(doctor); // change this to patientUser
        if (!userExists) {
            console.log(`An identity for the user ${doctor} does not exist in the wallet`);
            console.log('Run the registerDoctor.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: doctor, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('securehealthcc');
        // Submit the specified transaction.
        const result = await contract.submitTransaction('GetPatientPassword',patientId);

        if(result == patientPassword){
            res.send(true);
        }else{
            res.send("The credentials are incorrect");
        }
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).send(`Failed to submit transaction: ${error.message}`);
    }
})


app.put('/api/updatepatient', async function (req, res) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(doctor);
        if (!userExists) {
            console.log(`An identity for the user ${doctor} does not exist in the wallet`);
            console.log('Run the registerDoctor.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: doctor, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('securehealthcc');
        // Submit the specified transaction.
        const result = await contract.submitTransaction('UpdatePatient',req.body.patientId, req.body.firstname, req.body.lastname,req.body.age);
        res.send('Transaction has been submitted');
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).send(`Failed to submit transaction: ${error.message}`);
    }
})

app.delete('/api/deletepatient/:patientid', async function (req, res) {
    try {
        // initialize params 
        const patientId = req.params.patientid

        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get(doctor);
        if (!userExists) {
            console.log(`An identity for the user ${doctor} does not exist in the wallet`);
            console.log('Run the registerDoctor.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: doctor, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospitalchannel');

        // Get the contract from the network.
        const contract = network.getContract('securehealthcc');

        // Submit the specified transaction.
        await contract.submitTransaction('DeletePatient',patientId);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');
        
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).json({ error: `Failed to submit transaction: ${error.message}` });
    }
})
app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080'); 
