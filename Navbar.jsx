import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { AuthContext } from "src/Auth/Authcontext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Store Rating App</Typography>

        <div>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin Dashboard
                </Button>
              )}
              {user.role === "owner" && (
                <Button color="inherit" component={Link} to="/owner">
                  Store Owner Dashboard
                </Button>
              )}
              {user.role === "user" && (
                <Button color="inherit" component={Link} to="/user">
                  User Dashboard
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
