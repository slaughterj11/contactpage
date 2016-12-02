$(document).ready(function() {
  var to, subject, text, atPos, dotPos;

  $("#send_email").click(function(){
    validateForm();
	});

  function validateForm() {
    to=$("#email").val();
    subject=$("#subject").val();
    text=$("#content").val();
    atPos = $("#email").val().indexOf("@");
    dotPos = $("#email").val().indexOf(".");

    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= to.length) {
      $("#message").empty().html("<p>Not a valid email</p>");
    } else if (subject == null || subject == '') {
      $("#message").empty().html("<p>Subject is required</p>");
    }else if (text == null || text == '') {
      $("#message").empty().html("<p>Must contain a body</p>");
    } else {
      $("#message").text("Sending E-mail...Please wait");

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
