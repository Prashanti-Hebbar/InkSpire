import React, { useState, useEffect } from 'react'
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'

export default function Manageuser() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userdetails')) || []
    setUsers(stored)
  }, [])

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index)
    setUsers(updated)
    localStorage.setItem('userdetails', JSON.stringify(updated))
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Manage Users
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        View and manage all registered users.
      </Typography>

      <Paper elevation={0} sx={{
        borderRadius: 3,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Address</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Password</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? users.map((user, index) => (
                <TableRow key={index} sx={{
                  '&:hover': { bgcolor: 'rgba(102,126,234,0.05)' },
                  transition: 'background 0.2s',
                }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon sx={{ color: '#667eea', fontSize: 20 }} />
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleDelete(index)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No users found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
