import React from 'react';
import Swal from "sweetalert2";

const useAlert = () => {
	const sweetAlert = React.useCallback(alertText => {
		const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    return Toast.fire({
      icon: 'success',
      title: `${alertText}`
    })
	}, [])

	return {
		actions: {
			sweetAlert
		}
	}
};

export default useAlert;
