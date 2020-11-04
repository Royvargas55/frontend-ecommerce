import { TYPE_ALERT } from './values.config';
import Swal from 'sweetalert2';

export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '', text: string = ''){
    Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false,
        toast: true,
        position: 'top',
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
}