import React from 'react';
import { toast } from 'react-toastify';

const CustomToast = ({ type, message }) => {
    const toastTypes = {
        info: toast.info,
        success: toast.success,
        danger: toast.error,
        warning: toast.warn
    };

    // Default to 'info' if an unrecognized type is provided
    const showToast = toastTypes[type] || toastTypes.info;

    return showToast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    });
};

export default CustomToast;
