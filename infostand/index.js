$(function () {
    var months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];
    var templates = {
        mgi: $('#mgi-template').text().trim(),
        proc: $('#proc-template').text().trim()
    };
    $.when(
        $.getJSON('areas.js').then(Object),
        $.getJSON('districts.js').then(Object)
    ).done(function (areas, districts) {
        areas.forEach(function (area) {
            $('#area').append($('<option></option>').text(area[0]));
        });
        districts.forEach(function (district) {
            $('#district').append($('<option></option>').text(district[0]));
        });
        setInterval(function () {
            var area = areas[$('#area')[0].selectedIndex];
            var district = districts[$('#district')[0].selectedIndex];
            function standBuyer(p) {
                return ({
                    area: 'Префектур' + p + ' ' + area[1] + ' административного округа',
                    district: 'Управы район' + p + ' ' + district[0]
                })[district[1]];
            }
            $.each(templates, function (id, template) {
                $('#' + id).val(template
                    .replace(/\{\{area\}\}/g, area[1])
                    .replace(/\{\{district\}\}/g, district[0])
                    .replace(/\{\{stand-date\}\}/g, months[district[2].split('.')[1]-1])
                    .replace(/\{\{stand-buyer\}\}/g, standBuyer('а'))
                    .replace(/\{\{stand-buyer-rel\}\}/g, standBuyer('ы'))
                    .replace(/\{\{stand-buyer-instr\}\}/g, standBuyer('ой'))
                    .replace(/\{\{stand-seller\}\}/g, district[3])
                    .replace(/\{\{stand-total\}\}/g, district[4])
                    .replace(/\{\{stand-contract\}\}/g, district[5])
                    .replace(/\{\{ad-link\}\}/g, area[2])
                    .replace(/\{\{ad-date\}\}/g, months[area[3].split('.')[1]-1])
                    .replace(/\{\{address\}\}/g, $('#address').val() || '________________________________________')
                    .replace(/\{\{flat\}\}/g, $('#flat').val() || '_____')
                );
            });
        }, 1000);
    });
});
