import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function CommonForm({ formcontrols, formData, setFormData, onSubmit, Buttontext }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                padding: 4,
                backgroundColor: '#fff',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
        >
            <Typography variant="h5" textAlign="center" mb={2}>
                Fill the Form
            </Typography>

            {formcontrols.map((control, index) => (
                control.componetype === 'input' && (
                    <TextField
                        key={index}
                        label={control.label}
                        name={control.name}
                        type={control.type}
                        placeholder={control.placeholder}
                        value={formData[control.name] || ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                )
            ))}

            <Button variant="contained" color="primary" type="submit">
                {Buttontext || 'Submit'}
            </Button>
        </Box>
    );
}

export default CommonForm;
