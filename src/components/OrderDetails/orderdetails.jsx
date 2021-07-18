import React, { useEffect } from 'react';
import {
  TableContainer, Table, TableHead,
  TableBody, TableRow, TableCell
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOrderDetails } from './../../redux/Orders/orders.actions';

const columns = [
  
  {
    id: 'productName',
    label: 'Titulo'
  },
  {
    id: 'productPrice',
    label: 'Precio por unidad'
  },
  {
    id: 'quantity',
    label: 'Cantidad'
  }
]

const styles = {
  fontSize: '16px',
  width: '10%'
};

const formatText = (columnName, columnValue) => {
  switch(columnName) {
    case 'productPrice':
      return `$${columnValue}`;
    
    default:
      return columnValue;
  }
}

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const orderItems = order && order.orderItems;

  useEffect(() => {
    return () => {
      dispatch(
        setOrderDetails({})
      );
    }
  }, []);

  return (
    <TableContainer>
      <Table>

        <TableHead>
          <TableRow>

            {columns.map((col, pos) => {
              return (
                <TableCell
                  key={pos}
                  style={styles}
                >
                  {col.label}
                </TableCell>
              )
            })}

          </TableRow>
        </TableHead>

        <TableBody>

          {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => {
            return (
              <TableRow key={pos}>

                {columns.map((col, pos) => {
                  const columnName = col.id;
                  const columnValue = row[columnName];

                  return (
                    <TableCell
                      key={pos}
                      style={styles}
                    >
                      {formatText(columnName, columnValue)}
                    </TableCell>
                  )
                })}

              </TableRow>
            )
          })}

        </TableBody>

      </Table>
    </TableContainer>
  )
}

export default OrderDetails;