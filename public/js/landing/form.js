(function(){
  
  $('.floatlabel').SmartPlaceholders();
  
  var $form = $('#form'),
      $success = $('.success'),
      $smart = $('.smart-placeholder-wrapper'),
      parsley = $form.parsley();
  
  $form.submit(function(e) {
    e.preventDefault();
    if (parsley.validationResult == true) {
      var name = $('#name').val();
      success(name);
      clearForm(this); 
    }
  });
  
  function success(name) {
    $('.name').text(name);
    $("html, body").animate({ scrollTop: 0 }, 300);
    $success
      .slideDown()
      .delay(3000)
      .slideUp();
  }
  
  function clearForm(el) {
    el.reset();
    $smart.removeClass('focused, populated');
  }
  
})();