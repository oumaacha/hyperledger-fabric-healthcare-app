import React, { useState } from 'react';
import './Login.css';

const LoginForm = () => {
  const [role, setRole] = useState('admin');
  const [hospitalId, setHospitalId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLoginUser = () => {
    if (role === 'admin') {
      // Perform login logic for admin
    } else if (role === 'doctor') {
      // Perform login logic for doctor
    } else if (role === 'patient') {
      // Perform login logic for patient
    }
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 side-image">
          </div>
          <div className="col-md-6 right">
            <div className="input-box">
              <header>Sign In</header>
              <div className="input-field">
                <select
                  name="role"
                  className="form-control input"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
                <label htmlFor="role">Role</label>
              </div>
              {role === 'patient' && (
                <div className="input-field">
                  <select
                    name="hospital"
                    className="form-control input"
                    value={hospitalId}
                    onChange={(event) => setHospitalId(event.target.value)}
                  >
                    <option value="">Select a hospital you belong</option>
                    <option value="1">Hospital Rabat</option>
                    <option value="2">Hospital Casa</option>
                  </select>
                  <label htmlFor="hospital">Hospital</label>
                </div>
              )}
              <div className="input-field">
                <input
                  type="text"
                  className="form-control input"
                  id="email"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label htmlFor="email">Username</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="form-control input"
                  id="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field">
                <input
                  type="submit"
                  className="btn btn-primary submit"
                  value="Sign In"
                  onClick={handleLoginUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
