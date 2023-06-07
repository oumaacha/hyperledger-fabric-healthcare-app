var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const main = require("./registerDoctor")
var app = express();
// couchdb def
const nano = require('nano')('http://localhost:5984');
const dbName = 'securehealth_db';
const db = nano.db.use(dbName);
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
app.use(bodyParser.json());

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const doctor = "patient_identity"
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

app.get('/api/queryalldoctors', async function (req, res) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userExists = await wallet.get(doctor);
        const users = await wallet.list()
        const doctors = [];
        (async () => {
            for (const user of users) {
              if (user !== 'admin') {
                try {
                  const body = await db.get(user);
                  doctors.push(body);
                } catch (err) {
                  console.log('Error retrieving document:', err);
                }
              }
            }
            res.status(200).json(doctors);
          })();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error.message});
    }
});

app.get('/api/readdoctor/:id', async function (req, res) {
    try{
    const doctorid = req.params.id
    const document = await db.get(doctorid);
    res.status(200).json(document);
    }catch(err){
    res.status(200).json("no data found"); 
    }
})

app.put('/api/updatedoctor', async function (req, res) {
    try{
        const doctorid = req.body.doctorid
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const phone = req.body.phone
        const address = req.body.address
        const gender = req.body.gender
        await db.get(doctorid, (err, body)=>{
            if(err) res.status(200).json("Update failed");
            else{
                console.log(body);
                body.firstname = firstname;
                body.lastname = lastname;
                body.phone = phone;
                body.address = address;
                body.gender = gender;
                db.insert(body,(err,body)=>{
                    if(err) res.status(200).json("Update failed");
                    else{
                        res.status(200).json("Successfully updated");
                    }
                })
            }
        });
    }catch(err){
        console.log(err);
    }
})

app.post('/api/adddoctor/', async function (req, res) {
    try {
        const doctorData = {
            id : req.body.id,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            phone : req.body.phone,
            gender : req.body.gender,
            password : req.body.password,
            hospital: req.body.hospital,
            speciality: req.body.speciality,
            address: req.body.address
        }
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the doctor.
        const userExists = await wallet.get(doctorData.id);
        if (userExists) {
            res.send(`An identity for the user ${doctorData.lastname} exists in the wallet`);
            return;
        }
        main(doctorData)
        res.send('Added succussfully');

    } catch (error) {
        res.status(500).send(`Failed to submit transaction: ${error.message}`);
    }
})


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

app.post('/api/logindoctor', async function (req, res) {
    try {
        const doctorId = req.body.id
        const doctorPassword = req.body.password
        const document = await db.get(doctorId);
        if(document.password === doctorPassword){
            res.status(200).send(true);
        }else{
            res.status(200).send("Credentails are incorrect !");
        }
    } catch (error) {
        res.status(200).send('Credentails are incorrect !');
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

        // Check to see if we've already enrolled the identity.
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
