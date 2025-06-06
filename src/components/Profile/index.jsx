import React from "react";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import models from "../../modelData/models";

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Typography>Loading user info...</Typography>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await models.deleteUser(currentUser._id);
      await logout();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1">
        <strong>Name:</strong> {currentUser.first_name} {currentUser.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {currentUser.location}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {currentUser.description}
      </Typography>
      <div style={{ marginTop: "1rem", gap: "1rem", display: "flex" }}>
        <Button variant="contained" onClick={() => navigate("/edit-profile")}>
          Edit Profile
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
    </div>
  );
}

export default Profile;
