(function(){
  $(document).ready(function() {
    
    /** 
     * Perform ajax POST to server to update text
     */

    var displayText = function (text) {
      $.post('/',{text: text || ''}, function () {
        // TODO: handle the response
      });
    };

    /**
     * Bind a click handdler to our add text button
     */

     $("#addText").click(function() {
      var text = $("#boardInput").val();
      displayText(text);
      $("#boardInput").val('');
     });

    /**
     * Bind event handler to our 'clear text' button
     */
     
     $('#clearText').click(function(){
      displayText('/clear');
     });

    /**
     * Bind click event handlers to our preset text
     * to submit our text to the server via POST
     */

    $('.preset').click(function() {
      var text = $(this).data('text');
      displayText(text);
    });

  });
})();