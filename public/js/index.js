function App() {
  var me = this;

  App.prototype.init = function() {
    $('#getsponsor').on('click', function(e) {
      e.preventDefault();
      $('#getsponsorpopup').show().css({'position': 'fixed'});
    });
    $('.close-popup, .overlay-bg').on('click', function() {
      $('.overlay-bg, .overlay-content').hide();
    });

    $('#getsponsor-send-message').on('click', function(e) {
      e.preventDefault();
      var signupData = {name: $('#gnamepopup').val(), email: $('#gemailpopup').val(),
              org: $('#gorgpopup').val()};
      if (!signupData.name || !signupData.email || !signupData.org) {
        alert('Sorry, cannot sign you up. Some required information is missing.');
        return;
      }
      $.post('/getsponsorsignup', signupData, function(data) {
          if (data.success) {
            alert('Thank you for signing up.');
          } else {
            alert('Sorry, cannot sign you up. Please come back later.');
          }
          $('.overlay-bg, .overlay-content').hide();
        });
    });
    $('#becomesponsor').on('click', function(e) {
      e.preventDefault();
      $('#besponsorpopup').show().css({'position': 'fixed'});
    });

    $('#besponsor-send-message').on('click', function(e) {
      e.preventDefault();
      var signupData = {name: $('#bnamepopup').val(), email: $('#bemailpopup').val(),
              businessname: $('#bbusinessnamepopup').val(), loc: $('#blocpopup').val()};
      if (!signupData.name || !signupData.email || !signupData.businessname ||!signupData.loc) {
        alert('Sorry, cannot sign you up. Some required information is missing.');
        return;
      }
      $.post('/besponsorsignup', signupData, function(data) {
          if (data.success) {
            alert('Thank you for signing up.');
          } else {
            alert('Sorry, cannot sign you up. Please come back later.');
          }
          $('.overlay-bg, .overlay-content').hide();
        });
    });
  };
}
$(function() {
  window.app = new App();
  window.app.init();
});
