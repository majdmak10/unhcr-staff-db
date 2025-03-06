"use client";

import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";

interface User {
  _id: string;
  fullName: string;
  email: string;
  position: string;
  address: string;
}

const AdminsPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] =
    useState<GridColumnVisibilityModel>({
      fullName: true,
      email: true,
      position: true,
      address: true,
    });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/get");
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch users");

        setUsers(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Full Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "position", headerName: "Position", flex: 1, minWidth: 150 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 200 },
  ];

  // Reset column visibility to default
  const handleResetColumns = () => {
    setColumnVisibility({
      fullName: true,
      email: true,
      position: true,
      address: true,
    });
  };

  // Custom Toolbar for Columns, Filters, and Export
  const CustomToolbar = () => (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
    >
      <Box>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Box>
      <Button onClick={handleResetColumns} variant="contained">
        Reset Columns
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && users.length > 0 && (
        <Box sx={{ height: 500, width: "100%", mt: 2 }}>
          <DataGrid
            rows={users.map((user) => ({ ...user, id: user._id }))} // MUI DataGrid requires an 'id' field
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            pagination
            columnVisibilityModel={columnVisibility}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibility(newModel)
            }
            slots={{ toolbar: CustomToolbar }} // Fix: Replace 'components' with 'slots'
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {!loading && !error && users.length === 0 && (
        <Alert severity="info">No users found.</Alert>
      )}
    </Container>
  );
};

export default AdminsPage;
