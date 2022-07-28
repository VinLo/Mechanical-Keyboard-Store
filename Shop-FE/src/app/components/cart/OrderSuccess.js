import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { Typography } from '@material-ui/core'
import {Link} from 'react-router-dom'
const OrderSuccess = () => {
    return (
        <div className='orderSuccess'>
            <CheckCircleIcon/>
            <Typography>Sản phẩm của bạn đã thực hiện thành công</Typography>
            <Link to="/orders">Xem thông tin đơn hàng</Link>
        </div>
    )
}

export default OrderSuccess
