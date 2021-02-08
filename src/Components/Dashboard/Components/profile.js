import React from "react";

const Profile = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (
        <div className="mainpanel-wrapper">
            <h1>YOUR PROFILE</h1>
            <table className="profile-table">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{userData ? userData.name : ""}</td>
                    </tr>
                    <tr>
                        <td>SF ID</td>
                        <td>{userData ? userData.sf_id : ""}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{userData ? userData.mobile : ""}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{userData ? userData.email : ""}</td>
                    </tr>
                    <tr>
                        <td>College</td>
                        <td>{userData ? userData.college : ""}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{userData ? userData.city : ""}</td>
                    </tr>
                    <tr>
                        <td>State</td>
                        <td>{userData ? userData.state : ""}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Profile;