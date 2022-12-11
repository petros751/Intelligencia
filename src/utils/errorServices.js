import Toastify from 'toastify-js'

const errorToastMessage = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#D13514",
        },
        onClick: function(){} // Callback after click
      }).showToast();
  };
  
  export { errorToastMessage };