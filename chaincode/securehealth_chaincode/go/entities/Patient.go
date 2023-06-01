package entities

type Patient struct {
	PatientID        string `json:"patientId"`
	FirstName        string `json:"firstName"`
	LastName         string `json:"lastName"`
	Age              int	`json:"age"`
	Password         string `json:"password"`
	IsDeleted	 bool   `json:"isDeleted"`
}

func NewPatient(patientID string , firstName string, lastName string, password string, age int ) *Patient {
	return &Patient{
		PatientID:        patientID,
		FirstName:        firstName,
		LastName:         lastName,
		Age:              age,
		Password:	  password,
		IsDeleted:	  false,
	}
}
