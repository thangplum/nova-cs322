import React, { useState, useEffect } from 'react';


const PrescreenForm = () => {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [studentID, setStudentID] = useState("");
  const [gender, setGender] = useState("male");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`First name: ${fname}\n
    Last name: ${lname}\n
    Email: ${email}\n
    Student ID: ${studentID}\n
    Gender: ${gender}
    `);
    setFname("");
    setLname("");
    setEmail("");
    setStudentID("");
    setGender("male");
  }

  return (
      <div className="container">
        <div id="pre-screen-form" className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center offset-sm-2 p-4">
            <h1 class="display-4 py-2 text-truncate">Prescreen Form</h1>
            <div className="px-2">
              <form className="justify-content-center" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="fname"
                    className="form-control"
                    placeholder="Enter your first name"
                    value={fname}
                    onChange={e => setFname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="lname"
                    className="form-control"
                    placeholder="Enter your last name"
                    value={lname}
                    onChange={e => setLname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    type="studentID"
                    className="form-control"
                    placeholder="Enter your student ID"
                    value={studentID}
                    onChange={e => setStudentID(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select id="inputState" class="form-control" value={gender} onChange={e => setGender(e.target.value)} >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="not-disclose">Prefer not to disclose</option>
                  </select>
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>

  );
};

export default PrescreenForm;
