$(document).ready(function() {
  var to, subject, text, atPos, dotPos;

  $("#sent").click(function(){
    validateForm();
	});

  function validateForm() {
    to=$("#email").val();
    subject=$("#subject").val();
    text=$("#content").val();
    atPos = $("#email").val().indexOf("@");
    dotPos = $("#email").val().indexOf(".");

    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= to.length) {
      $("#message").empty().html("<p>Email entered is not valid</p>");
    } else if (subject == null || subject == '') {
      $("#message").empty().html("<p>Section must have content</p>");
    }else if (text == null || text == '') {
      $("#message").empty().html("<p>Section must have content</p>");
    } else {
      $("#message").text("Sending E-mail Thank You For Your Patience");

      $.get("http://localhost:3000/send",{to:to,subject:subject,text:text},function(data){
        if(data=="sent") {
          $("#message").empty().html("<p>Email sent to: "+to+"</p>");
        }
        else {
          $("#message").empty().html("<p>Unable to send email</p>");
        }
      });
    }
  }//end validateForm
});
