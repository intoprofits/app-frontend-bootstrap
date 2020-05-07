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
});