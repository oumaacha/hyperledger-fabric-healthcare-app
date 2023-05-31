package main

import (
	"securehealth.com/entities"
	"encoding/json"
	"fmt"
	"strconv"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)


type PrimaryContract struct {
	contractapi.Contract
}

func (c *PrimaryContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	fmt.Println("============= START : Initialize Ledger ===========")
	initPatients := []Patient{
		Patient{PatientId:"PT0", FirstName:"Anouar1", LastName:"Oumaacha1", Age:24 },
		Patient{PatientId:"PT1", FirstName:"Anouar2", LastName:"Oumaacha2", Age:23 },
		Patient{PatientId:"PT2", FirstName:"Anouar3", LastName:"Oumaacha3", Age:23 },
		Patient{PatientId:"PT3", FirstName:"Anouar4", LastName:"Oumaacha4", Age:18 },
		Patient{PatientId:"PT4", FirstName:"Anouar5", LastName:"Oumaacha5", Age:28 },
	}

	for i, patient := range initPatients {
		patientBytes, err := json.Marshal(patient)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState("PAT"+strconv.Itoa(i), patientBytes)
		if err != nil {
			return err
		}

		fmt.Println("Added <--> ", patient)
	}

	fmt.Println("============= END : Initialize Ledger ===========")
	return nil
}
/*******************************************************************************************/
func (c *PrimaryContract) ReadPatient(ctx contractapi.TransactionContextInterface, patientId string) (*Patient, error) {
	 exists, err := c.PatientExists(ctx, patientId)
	 if err != nil {
	 	return nil, err
	 }
	 if !exists {
	 	return nil, errors.New("The patient " + patientId + " does not exist")
	}
	// patientId is the key
	patientBytes, err := ctx.GetStub().GetState(patientId)
	if err != nil {
		return nil, err
	}

	patient := new(Patient)
	err = json.Unmarshal(patientBytes, patient)
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (c *PrimaryContract) PatientExists(ctx contractapi.TransactionContextInterface, patientId string) (bool, error) {
	patientBytes, err := ctx.GetStub().GetState(patientId)
	if err != nil {
		return false, err
	}

	return patientBytes != nil && len(patientBytes) > 0, nil
}

// we will add new args later
func (s *PrimaryContract) createPatient(ctx contractapi.TransactionContextInterface, patientID string, firstName string, lastName string, age int) error {
	newPatient := Patient{
		PatientID:   patientID,
		FirstName:  firstName,
		LastName: lastName,
		Age:  age
	}

	patientAsBytes, _ := json.Marshal(newPatient)

	return ctx.GetStub().PutState(patientID, patientAsBytes)
}

func main() {

        chaincode, err := contractapi.NewChaincode(new(PrimaryContract))

        if err != nil {
                fmt.Printf("Error create fabcar chaincode: %s", err.Error())
                return
        }

        if err := chaincode.Start(); err != nil {
                fmt.Printf("Error starting fabcar chaincode: %s", err.Error())
        }
}
