const retrieveMessages = function () {
  $.get("/messages", (messages) => {
    console.log(messages);
    $("#messages").empty();
    messages.forEach(function (message) {
      console.log(message);
      $("#messages").append(
        '<div class="row messsage" >' + message.message + "</div>"
      );
    });
  });
};

$(document).ready(function () {
  console.log("Ready");

  $("#btnMessage").click(() => {
    let message = $("#messageBox").val();
    let data = {
      message,
    };
    $.get("/message", data, () => {
      $("#messageBox").val("");
    });
  });

  setInterval(() => {
    retrieveMessages();
  }, 1000);
});
