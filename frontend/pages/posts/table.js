import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import app from '../../components/firebase';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { useRouter } from 'next/router';






const database = getDatabase();
const dataRef = ref(database, '/accel');


const FirstPage = '<<'
const PreviousPage = '<'
const NextPage = '>'
const LastPage = '>>'


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Button
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {FirstPage}
      </Button>
      <Button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {PreviousPage}
      </Button>
      <Button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {NextPage}
      </Button>
      <Button
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {LastPage}
      </Button>
    </Box>
  );
}



TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};






var index = 0;
var firsttime = 0;
var time = 0;
var timeRoundDecimal = 0


export default function TablePage() {
    const router = useRouter();

   
    const [data, setData] = useState(null);
    const [rows, setRow] = useState(null);


    const [inputValue, setInputValue] = useState(null);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    

    useEffect(() => {
      //autenticacao
        if (!sessionStorage.getItem("isLoggedIn")){
          router.push('/');
          return;
        } 
        //timer.current = setInterval(() => {
            //limpamos as vars
            const rowsArray = [];
            index = 0;
            
            
            onValue(dataRef, (snapshot) => {
                setData(snapshot.val())
            });

            //push data if data valid
            for (var key in data) {
                if(!data[key].timestamp || !data[key].x || !data[key].y || !data[key].z)    { continue; }

                if(firsttime==0){
                    firsttime=data[key].timestamp
                }
                
                time=data[key].timestamp-firsttime
                timeRoundDecimal = time.toFixed(2)
                rowsArray.push(createData(index, timeRoundDecimal, data[key].x.toFixed(8), data[key].y.toFixed(8), data[key].z.toFixed(8)))
                index++
                console.log(timeRoundDecimal)
            }

            
            setRow(rowsArray)
    });    
    
    return (

        <Layout>
          <div align="center">
            <a href="/posts/charts">
                <Button variant="outlined">Charts</Button>
            </a>
            
            <a href="/posts/table">
                <Button variant="contained">Table</Button>
            </a>
          </div>
          <p></p>     
            
          {data ? (
                <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <StyledTableCell align="center">Index</StyledTableCell>
            <StyledTableCell align="center">Time since simulation start&nbsp;(sec)</StyledTableCell>
            <StyledTableCell align="center">X_Accel</StyledTableCell>
            <StyledTableCell align="center">Y_Accel</StyledTableCell>
            <StyledTableCell align="center">Z_Accel</StyledTableCell>
          </TableRow>
      </TableHead>
      <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            
            <StyledTableRow key={row.index}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.index}
              </StyledTableCell>
              <StyledTableCell align="center">{row.timestamp}</StyledTableCell>
              <StyledTableCell align="center">{row.accel_x}</StyledTableCell>
              <StyledTableCell align="center">{row.accel_y}</StyledTableCell>
              <StyledTableCell align="center">{row.acell_z}</StyledTableCell>
            </StyledTableRow>           
            
          ))}

          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </StyledTableRow>
          )}
      </TableBody>
      <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
      </TableFooter>
      </Table>
    </TableContainer>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Head>
                <title>First Post</title>
                <link rel="icon" href="/images/ricfazeres.jpg" />
            </Head>
            <h1>
                Go back to <Link href="/">home page</Link>
            </h1>
        </Layout>
    );
    

}





const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  //'&:last-child td, &:last-child th': {
  //  border: 0,
  //},
}));

function createData(index, timestamp, accel_x, accel_y, acell_z) {
  return { index, timestamp, accel_x, accel_y, acell_z };
}

