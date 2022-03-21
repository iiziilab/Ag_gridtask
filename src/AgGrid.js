import React,{ useEffect, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import data from "./data";
import { companyEdit } from './companyStore';
import { useSelector, useDispatch } from 'react-redux';


const AgGrid = () => {
    const dispatch = useDispatch();
    const store2 = useSelector(state => state.companyStore)

    function ButtonActionRenderer(props) {
        // props is ICellRenererParams. See:
        // https://www.ag-grid.com/react-grid/component-cell-renderer/#cell-renderer-component-2
        const { id } = props.data;
        const [open, setOpen] = useState(false);
        const [memberPayload, setMemberPayload] = useState({
            id: id, 
            make:props.data.make, 
            model: props.data.model, 
            price: props.data.price
        });

        const handelChange =(e)=>{
            const {name, value} = e.target;
            setMemberPayload(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        
        const onClose = () => setOpen(false);
        const onSave = () => {
            dispatch(companyEdit(memberPayload));
            onClose();
        }
      
        return (
          <>
            <Button onClick={() => setOpen(true)}>Edit</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogContent>
                <TextField name="make" value={memberPayload.make} onChange={handelChange} /><br/>
                <TextField name="model" value={memberPayload.model} onChange={handelChange} /><br/>
                <TextField name="price" value={memberPayload.price} onChange={handelChange} />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Close
                </Button>
                <Button onClick={onSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        );
      }
   const [rowData, setrowData] = useState([
       {id: 1, make: "Toyota", model: "Celica", price: 35000},
       {id: 2, make: "Ford", model: "Mondeo", price: 32000},
       {id: 3, make: "Porsche", model: "Boxter", price: 72000}
   ]);
   
   const [columnDefs] = useState([
       { field: "make"  },
       { field: "model"  },
       { field: "price"  },
       {
            headerName: "action",
            minWidth: 150,
            cellRenderer: ButtonActionRenderer,
            editable: false,
            colId: "action"
        }
    ]);

    useEffect(()=>{
        const Rstore2 = store2.selectedUser;
        if(Rstore2){
            const state_arr = [];
            rowData.map(row=>{
                if(row.id === Rstore2.id){
                    const newObj = {};
                    newObj.id =Rstore2.id;
                    newObj.make =Rstore2.make;
                    newObj.model =Rstore2.model;
                    newObj.price =Rstore2.price;
                    state_arr.push(newObj);
                }else{
                    state_arr.push(row)
                }
            })
            setrowData(state_arr)
        }
    },[store2])

   return (
       <div className="ag-theme-alpine" style={{height: 400, width: 805}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}
            >
           </AgGridReact>
       </div>
   );
};

export default AgGrid;