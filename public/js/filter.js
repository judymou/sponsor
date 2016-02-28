$(function() {
  $(".filters input").click(function() {
    var items = ['food', 'travel', 'venue', 'theatre', 'clothing', 'software'];

    var count = 0;
    for (var i = 0; i < items.length; i++) {
      items[i] = items[i].toLowerCase();
      if ($('#' + items[i]).prop('checked')) {
        count++;
      }
    }

    if (count === items.length) {
      // all selected
      $(".place").show();
      return;
    }
    $(".place").hide();
    $(".place").each(function(p, item) {
      var place = $(item);
      var txt = place.text().toLowerCase();
      for (var i = 0; i < items.length; i++) {
        if ($("#" + items[i]).prop('checked') && txt.indexOf(items[i]) > -1) {
          place.show();
          break;
        }
      }
    });
  });
});
