import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(currency, value) {
  return { currency, value };
}
let rows =[]
let exchange = JSON.parse(localStorage.getItem('exchange'))
if(exchange?.exchangeRate)
{
  let keys = Object.keys(exchange.exchangeRate)
  rows = keys.map(v=>(
    createData(v, exchange.exchangeRate[v])
  ))
}


export default function ModalBox({value ,setCurrencyModal}) {
  const [open, setOpen] = React.useState(value);
 

  const handleClose = () => {
    setOpen(false);
    setCurrencyModal(false)
  };

  let currencyName = (row)=>{
    let arr= row.currency.split("To")
    return arr[0].toUpperCase()+" To "+arr[1].toUpperCase()
  }

  return (
    <div>
     
      <Dialog open={value} onClose={handleClose}>
        <DialogTitle>Currency Exchange</DialogTitle>
        <DialogContent>
          <DialogContentText>
            100 USD value to other currency
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell align="right">Value</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.currency}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {currencyName(row)}
                    </TableCell>
                    <TableCell align="right">{Number(row.value)*100}</TableCell>
                  
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        
        </DialogActions>
      </Dialog>
    </div>
  );
}