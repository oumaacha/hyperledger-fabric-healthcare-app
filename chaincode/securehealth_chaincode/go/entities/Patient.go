package entities

type Patient struct {
	PatientID         string   `json:"patientId"`
	FirstName         string   `json:"firstName"`
	LastName          string   `json:"lastName"`
	Age               int	   `json:"age"`
	Password          string   `json:"password"`
	PermissionGranted []string `json:"permissionGranted,omitempty" metadata:",optional"`
	ChangedBy	  string   `jsos:"changedBy"`
	IsDeleted	  bool     `json:"isDeleted"`
}

func NewPatient(patientID string , firstName string, lastName string, age int, password string, permissionGranted []string ,changedBy string ) *Patient {
	return &Patient{
		PatientID:         patientID,
		FirstName:         firstName,
		LastName:          lastName,
		Age:               age,
		Password:	   password,
		PermissionGranted: permissionGranted,
		ChangedBy:	   changedBy,
		IsDeleted:	   false,
	}
}
