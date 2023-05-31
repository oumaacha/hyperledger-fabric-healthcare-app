package entities

import (
	"crypto/sha256"
	"encoding/hex"
)

type Patient struct {
	PatientID        string
	FirstName        string
	LastName         string
	Password         string
	Age              intg
}

func NewPatient(patientID string , 
	firstName string, 
	lastName string, 
	password string, 
	age int

	return &Patient{
		PatientID:        patientID,
		FirstName:        firstName,
		LastName:         lastName,
		Password:         passwordHash,
		Age:              age,
	}
}
