import React, { useState } from 'react'
import { Box, Button, Grid, Typography, Card, Stack } from '@mui/material';
import { ItemAnimation } from '../components/ItemAnimation'
import PirelliIcon from '../images/Logo_Pirelli.png'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function MainPage() {
  const [startDate, setStartDate] = useState('2020-11-01T01:35:00')
  const [endDate, setEndDate] = useState('2020-11-01T04:40:53')
  const [dataframe, setDataframe] = useState(null)

  function getMetrics(){
    console.log("start date=", startDate, " - end date=", endDate)
    
    fetch(`http://127.0.0.1:3010/hourlymean/${startDate}/${endDate}`, {method: 'GET'})
    .then(res => {
      res.text().then(text => {
          const data = text && JSON.parse(text);
          console.log(data)
          if (data["status"] == "success"){
            console.log("SUCCESSFULLY SUBMITTED")
            setDataframe(JSON.parse(data["dataframe"]))
            console.log(JSON.parse(data["dataframe"]))
          }
        }
      )      
    })
    .catch(err => {
        console.log(err)
    })
  }

  const handleStartDateChange = (date) => {
    console.log("date", date)
    setStartDate(date.$y+"-"+((date.$M+1).toString().length == 2 ? (date.$M+1) : ("0" + (date.$M+1)))+"-"+((date.$D).toString().length == 2 ? (date.$D) : ("0" + (date.$D)))+"T"+((date.$H).toString().length == 2 ? (date.$H) : ("0" + (date.$H)))+":"+((date.$m).toString().length == 2 ? (date.$m) : ("0" + (date.$m)))+":"+((date.$s).toString().length == 2 ? (date.$s) : ("0" + (date.$s))))
    console.log(date.$y+"-"+((date.$M+1).toString().length == 2 ? (date.$M+1) : ("0" + (date.$M+1)))+"-"+((date.$D).toString().length == 2 ? (date.$D) : ("0" + (date.$D)))+"T"+((date.$H).toString().length == 2 ? (date.$H) : ("0" + (date.$H)))+":"+((date.$m).toString().length == 2 ? (date.$m) : ("0" + (date.$m)))+":"+((date.$s).toString().length == 2 ? (date.$s) : ("0" + (date.$s))))
  }
  const handleEndDateChange = (date) => {
    console.log("date", date)
    setEndDate(date.$y+"-"+((date.$M+1).toString().length == 2 ? (date.$M+1) : ("0" + (date.$M+1)))+"-"+((date.$D).toString().length == 2 ? (date.$D) : ("0" + (date.$D)))+"T"+((date.$H).toString().length == 2 ? (date.$H) : ("0" + (date.$H)))+":"+((date.$m).toString().length == 2 ? (date.$m) : ("0" + (date.$m)))+":"+((date.$s).toString().length == 2 ? (date.$s) : ("0" + (date.$s))))
    console.log(date.$y+"-"+((date.$M+1).toString().length == 2 ? (date.$M+1) : ("0" + (date.$M+1)))+"-"+((date.$D).toString().length == 2 ? (date.$D) : ("0" + (date.$D)))+"T"+((date.$H).toString().length == 2 ? (date.$H) : ("0" + (date.$H)))+":"+((date.$m).toString().length == 2 ? (date.$m) : ("0" + (date.$m)))+":"+((date.$s).toString().length == 2 ? (date.$s) : ("0" + (date.$s))))
  }

  return (
      <Box style={{ padding: '15px' }}>
          {(dataframe == null) ?
                <Box>
                  <ItemAnimation variant='down' animateInView={false} delay={0} oneTime={true}>
                      <Stack sx={{ marginBottom: '10px' }} spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }} direction='row' justifyContent="center" alignItems="center">
                          <img src={PirelliIcon} lt="Pirelli logo" style={{ width: '100px', padding: '0px' }} />
                          <Typography variant='h4'>Metrics Calulator</Typography>
                      </Stack>
                  </ItemAnimation>
                  <ItemAnimation variant='down' animateInView={false} delay={0.5} oneTime={true}>
                      <Card sx={{ boxShadow: 3 }}>
                          <Box sx={{ padding: '10px' }}>
                              <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <Grid item xs={12} sm={6}>
                                    <StaticDateTimePicker ampm={false} defaultValue={dayjs('2020-11-01T01:35:00')}
                                      onChange={handleStartDateChange}/>
                                  </Grid>

                                  <Grid item xs={12} sm={6}>
                                    <StaticDateTimePicker ampm={false} defaultValue={dayjs("2020-11-01T04:40:53")}
                                    onChange={handleEndDateChange}/>
                                  </Grid>
                                </LocalizationProvider>

                                  <Grid item xs={12}>
                                      <Button fullWidth onClick={() => getMetrics()} variant="contained" >
                                          Create
                                      </Button>
                                  </Grid>

                              </Grid>
                          </Box>

                      </Card>
                  </ItemAnimation>
              </Box>
          : 
          <div>Hourly averaged matrics
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>DateTime</TableCell>
                    {dataframe["columns"].map((metric) => (
                      <TableCell>{metric}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataframe["data"].map((metrics, index) => (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{dataframe["index"][index].map((datetimeComponent, index3) =>
                      {if(index3 == 0){
                        let date = new Date(datetimeComponent);
                        return (date.toString())
                      } else {
                        return (" - " + datetimeComponent + ":00:00")
                      }
                      })}</TableCell>
                      {metrics.map((single_metric, index2) => ( 
                        <TableCell align="right">{single_metric}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button fullWidth onClick={() => setDataframe(null)} variant="contained" >
                Get Back
            </Button>
          </div>
          }
              

      </Box >
  )
  }
  
  export default MainPage;
  