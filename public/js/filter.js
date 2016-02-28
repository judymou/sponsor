$(function() {
  var items = ['Art', 'Venue', 'Transport', 'Food', 'Coupon', 'Service'];

  for (var i = 0; i < items.length; i++) {
    var label = $("<label class='active'>");
    label.append($("<input type='checkbox' checked/>").attr("id", items[i].toLowerCase()))
    label.append(items[i]);
    $(".filters").append(label);
  }

  $(".filters input").click(function() {
    $(this).parent().toggleClass('active');
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
