import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { singleOem } from '../redux/oem/action';

const OemDetail = () => {
    let {id} = useParams();
    const dispatch=useDispatch();
    const {oem,loading,error}=useSelector((store)=>store.oem);

    useEffect(()=>{
        dispatch(singleOem(id))
    },[dispatch,])
    console.log(oem,"single oem")
  return (
    <div className='border-2 pt-28'>
      <h1>jfffffffffffff</h1>
    </div>
  )
}

export default OemDetail
