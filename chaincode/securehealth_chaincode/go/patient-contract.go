package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"securehealth.com/entities"
)

type PrimaryContract struct {
	contractapi.Contract
}

type QueryResult struct {
	Key    string             `json:"Key"`
	Record *entities.Patient
}

func (c *PrimaryContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	fmt.Println("============= START : Initialize Ledger ===========")
	initPatients := []entities.Patient{
		{PatientID: "PT0", FirstName: "Anouar1", LastName: "Oumaacha1", Age: 24},
		{PatientID: "PT1", FirstName: "Anouar2", LastName: "Oumaacha2", Age: 23},
		{PatientID: "PT2", FirstName: "Anouar3", LastName: "Oumaacha3", Age: 23},
		{PatientID: "PT3", FirstName: "Anouar4", LastName: "Oumaacha4", Age: 18},
		{PatientID: "PT4", FirstName: "Anouar5", LastName: "Oumaacha5", Age: 28},
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

func (c *PrimaryContract) ReadPatient(ctx contractapi.TransactionContextInterface, patientID string) (*entities.Patient, error) {
	exists, err := c.PatientExists(ctx, patientID)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.New("The patient " + patientID + " does not exist")
	}

	// patientID is the key
	patientBytes, err := ctx.GetStub().GetState(patientID)
	if err != nil {
		return nil, err
	}

	patient := new(entities.Patient)
	err = json.Unmarshal(patientBytes, patient)
	if err != nil {
		return nil, err
	}

	return patient, nil
}

func (c *PrimaryContract) PatientExists(ctx contractapi.TransactionContextInterface, patientID string) (bool, error) {
	patientBytes, err := ctx.GetStub().GetState(patientID)
	if err != nil {
		return false, err
	}

	return patientBytes != nil && len(patientBytes) > 0, nil
}

func (c *PrimaryContract) QueryAllPatients(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
	startKey := ""
	endKey := ""

	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []QueryResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		patient := new(entities.Patient)
		err = json.Unmarshal(queryResponse.Value, patient)
		if err != nil {
			return nil, err
		}

		queryResult := QueryResult{Key: queryResponse.Key, Record: patient}
		results = append(results, queryResult)
	}

	return results, nil
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
