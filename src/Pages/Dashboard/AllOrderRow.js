import React from 'react';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

const AllOrderRow = ({order, index, refetch}) => {

    const handleCancelOrderAdmin = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                fetch(`http://localhost:5000/order/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}` 
                }
                })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount) {
                        toast.success(`Order is Successfully Deleted`);
                        refetch()
                        
                    }
                    else {
                        toast.error('something went wrong, please try again');
                        
                    }
                })
            }
          });
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{order?.email}</td>
            <td>{order?.name}</td>
            <td>{order?.productName}</td>
            <td>
                {order?.paid && <span className='text-success'>PAID</span>}
                {!order?.paid && <span className='text-orange-400'>UNPAID</span>}
            </td>
            <td>pending...</td>
            <td>{order.paid ? <span>Not allowed</span> : <button onClick={() => handleCancelOrderAdmin(order._id)} className='btn btn-xs'>Cancle Order</button>}</td>
        </tr>
    );
};

export default AllOrderRow;