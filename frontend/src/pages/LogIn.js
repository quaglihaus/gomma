import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography, ButtonBase, Stack, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ItemAnimation } from '../components/ItemAnimation'
import { useNavigate } from "react-router-dom";

function LogIn() {

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [errors, setErrors] = useState(false)

  let navigate = useNavigate();

  const endAnimation = {
      x: 0,
      y: 0,
      opacity: 1,
  }

  const initialAnimation = {
      x: 0,
      y: 40,
      opacity: 0
  }




  return (
      <Box>
          <ItemAnimation variant='down' animateInView={false} delay={0} oneTime={true}>
              <Typography variant='h1' color='primary.dark'>Uncle Juan's arepas</Typography>
          </ItemAnimation>
          <ItemAnimation variant='down' animateInView={false} delay={0.5} duration={2} oneTime={true}>
              <Typography  style={{marginTop:'40px'}} variant='h4' color='primary.dark'>Insert the candidate's name and the name of the company to proceed</Typography>
          </ItemAnimation>

          <ItemAnimation variant='down' animateInView={false} delay={1} oneTime={true}>
              <Stack direction='row' spacing={1}  justifyContent="center" alignItems="center">
                
              <TextField style={{marginTop:'15px'}}
                  error = {errors}
                  required
                  id="outlined-required"
                  label="Name of the candidate"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Stack>
          </ItemAnimation>

          <ItemAnimation variant='down' animateInView={false} delay={1.5} oneTime={true}>
              <Stack direction='row' spacing={1}  justifyContent="center" alignItems="center">
                <TextField style={{marginTop:'15px'}}
                  error = {errors}
                  required
                  id="outlined-required"
                  label="Company"
                  type="password"
                  value={company}
                  onChange={(event) => {
                    setCompany(event.target.value);
                  }}
                />
              </Stack>
          </ItemAnimation>
          <ItemAnimation variant='down' animateInView={false} delay={2} oneTime={true}>
              <Stack direction='row' spacing={1}  justifyContent="center" alignItems="center">
                  <Button style={{marginTop:'20px'}} variant='contained' color='secondary' onClick={() => {
                    if((name == "Martino" || name == "martino") && (company == "Pirelli" || company == "pirelli")){
                      navigate('/analysis')
                      setErrors(false)
                    } else {
                      setErrors(true)
                    }
                  }
                    }> Submit</Button>
              </Stack>
          </ItemAnimation>
      </Box>
  )
}

export default LogIn;
