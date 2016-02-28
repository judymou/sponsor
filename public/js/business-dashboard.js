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

  function countDeductions() {
    // get count of option 1 and option 2
    var opt1total = 0;
    var opt2total = 0;
    $("tbody.approved .amt-opt1").each(function(i, item) {
      opt1total += ($(item).text() * 1 || 0);
    });
    $("tbody.approved .amt-opt2").each(function(i, item) {
      opt2total += ($(item).text() * 1 || 0);
    });
    $("#count-option-1").text(opt1total);
    $("#count-option-2").text(opt2total);

    // get prices
    var price1 = ($("#price-option-1").val() || 0) * 1;
    var price2 = ($("#price-option-2").val() || 0) * 1;

    // calculate total donated
    var donated = price1 * opt1total + price2 * opt2total;
    donated += ($("#additional-donations").val() * 1 || 0);
    $("#donated").text(donated.toFixed(2) + '');

    // calculate adjusted revenue
    var revenue = $("#revenue").val() * 1 || 0;
    var adjusted = Math.max(0, revenue - donated);

    function calculateTax(revenue) {
      var price = 0;
      var remainder = revenue;

      var rates = [0.15, 0.25, 0.34, 0.39, 0.34, 0.35, 0.38, 0.35];
      var min = [0, 50, 75, 100, 335, 10000, 15000, 18333.333, 100000000000000];
      for (var r = 0; r < rates.length; r++) {
        remainder = revenue - (min[r] * 1000);
        if (revenue < min[r] * 1000) {
          break;
        } else if(revenue > min[r + 1] * 1000) {
          price += rates[r] * (min[r+1] - min[r]) * 1000;
        } else {
          price += rates[r] * remainder;
          break;
        }
      }
      return price;
    }

    $("#savings").text((calculateTax(revenue) - calculateTax(adjusted)).toFixed(2));
  }

  $("tbody.pending tr").each(function(i, item) {
    var row = $(item);
    row.find('.glyphicon-ok').click(function() {
      row.remove();
      var lastCol = row.find('td')[row.find('td').length - 1];
      lastCol.remove();
      row.append($("<td>").text("Approved"));
      $("tbody.approved").prepend(row);
      countDeductions();
    });
    row.find('.glyphicon-remove').click(function() {
      row.remove();
    });
  });

  countDeductions();
  $("#price-option-1, #price-option-2, #revenue, #additional-donations").on('change input', countDeductions);
});
