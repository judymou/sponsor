$(function() {
  var approve = ['Option 1'];
  var opt2 = ['Option 2'];
  var thism = ['This Month'];
  for (var a = 0; a < 11; a++) {
    approve.push(Math.ceil(Math.random() * 10) + 8);
    opt2.push(Math.ceil(Math.random() * 6));
    thism.push(0);
  }
  approve.push(0);
  opt2.push(0);
  thism.push(Math.ceil(Math.random() * 14) + 4);

  var chart = c3.generate({
    data: {
      columns: [
        approve,
        opt2,
        thism
      ],
      groups: [['Option 1', 'Option 2']],
      type: 'bar'
    },
    bar: {
      width: {
        ratio: 1.5
      }
    },
    axis: {
      x: {
        tick: {
          format: function (n) {
            return ["March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February"][n];
          },
          culling: false
        }
      }
    }
  });

  $("tbody.pending tr").each(function(i, item) {
    var row = $(item);
    row.find('.glyphicon-ok').click(function() {
      row.remove();
      var lastCol = row.find('td')[row.find('td').length - 1];
      lastCol.remove();
      row.append($("<td>").text("Approved"));
      $("tbody.approved").prepend(row);
    });
    row.find('.glyphicon-remove').click(function() {
      row.remove();
    });
  });
});
