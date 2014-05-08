$(document).on('sfready', function() {

    console.log('sfready');

    var sf = keypoint.getSFClient();

    if (!sf) {
        alert('You are not authenticated. Please login first.');
        return false;
    }
    sf.query('SELECT Name, Amount FROM Opportunity ORDER BY Amount DESC LIMIT 5',
        function (data) {
            var ol = $('#top5', keypoint.getSlides()),
                html = '',
                opportunities = data.records,
                opportunity;
            for (var i=0; i<opportunities.length; i++) {
                opportunity = opportunities[i];
                html += '<li>' + opportunity.Name + ' (' + opportunity.Amount + ')</li>';
            }
            ol.html(html);
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;

});

$('body').on('click', '#soql-btn', function() {

    var sf = keypoint.getSFClient();

    if (!sf) {
        alert('You are not authenticated. Please login first.');
        return false;
    }
    sf.query($('#soql-query').val(),
        function (data) {
            $('#soql-result').html(JSON.stringify(data, undefined, 3));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
});
