$(function() {
  var approve = ['Approved'];
  var thism = ['This Month', 0, 0, 0, 0, 0, 0];

  for (var a = 0; a < 6; a++) {
    approve.push(Math.ceil(Math.random() * 14) + 8);
  }

  approve.push(0);
  thism.push(Math.ceil(Math.random() * 14) + 4);

  var chart = c3.generate({
    data: {
      columns: [
        approve,
        thism
      ],
      type: 'bar',
      colors: function(n) {
        return '#ff0000';
      }
    },
    axis: {
      x: {
        tick: {
          format: function (n) {
            return ["August", "September", "October", "November", "December", "January", "February"][n];
          },
          culling: false
        }
      }
    }
  });

  $("tbody.pending tr").each(function(i, row) {
    console.log(row);
  });
});
