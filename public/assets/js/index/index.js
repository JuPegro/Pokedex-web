$(document).ready(function(){


    $("#delete-pokemon").on('click',function(e){
      e.preventDefault();   

      $.confirm({
        title: "Confirm",
        content: "Do you want to finish the selection?",
        buttons: {
          cancel: {
            text: "Cancel",
            btnClass: "btn btn-danger",
            action: () => {},
          },
          confirm: {
            text: "Accept",
            btnClass: "btn btn-success",
            action: function(){
                $("#form-delete").submit();
            },
          },
        },
      });

    });

});