// sidebar toggle
$('button.sidebar-toggle').on('click', function() {

    let sideBarToggle = $('button.sidebar-toggle i');

    // change icon
    if (sideBarToggle.hasClass('fa-chevron-left')) {
        sideBarToggle.removeClass('fa-chevron-left').addClass('fa-chevron-right');
    } else {
        sideBarToggle.removeClass('fa-chevron-right').addClass('fa-chevron-left');
    }

    // toggle classes
    $('main aside').toggleClass('hide');
    $('main section').toggleClass('full');

    // inventory analysis
    $('.table-responsive.inventory-analysis .hidden-fields').toggleClass('active');
});

// steps 
$('.steps .step').on('click', function(){

    let current = $(this).attr('data-steps'),
        e = $(this).addClass('active');

    switch (current) {
        case "2":
            e.siblings().removeClass('active');
            e.siblings('.step.s1').addClass('active');
            e.siblings('.step.s2').addClass('active');
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 20%');
            break;
        case "3":
            e.siblings().removeClass('active');
            e.siblings('.step.s1').addClass('active');
            e.siblings('.step.s2').addClass('active');
            e.siblings('.step.s3').addClass('active');
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 40%');
            break;
        case "4":
            e.siblings().removeClass('active');
            e.siblings('.step.s1').addClass('active');
            e.siblings('.step.s2').addClass('active');
            e.siblings('.step.s3').addClass('active');
            e.siblings('.step.s4').addClass('active');
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 60%');
            break;
        case "5":
            e.siblings().removeClass('active');
            e.siblings('.step.s1').addClass('active');
            e.siblings('.step.s2').addClass('active');
            e.siblings('.step.s3').addClass('active');
            e.siblings('.step.s4').addClass('active');
            e.siblings('.step.s5').addClass('active');
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 80%');
            break;
        case "6":
            e.siblings().addClass('active');
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 100%');
            break;
        default:
            e.siblings().removeClass('active');
            e.siblings('.step.s1').addClass('active');
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 0');
    }
})

// tooltip init
$('[data-toggle="tooltip"]').tooltip();