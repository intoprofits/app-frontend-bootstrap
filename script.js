// Author: @grantimbo
// Author URI: grantimbo.com


// ----------------
// general
// ----------------

// sidebar toggle
$('button.sidebar-toggle').click(function() {

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


// ----------------
// order tracking
// ----------------

// dot steps 
$('.steps .step').click(function(){

    let current = $(this).attr('data-steps'),
        e = $(this);
    
    e.addClass('active').siblings().removeClass('active');
    e.prevAll().addClass('active');

    switch (current) {
        case "2":
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 17%');
            break;
        case "3":
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 34%');
            break;
        case "4":
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 51%');
            break;
        case "5":
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 67%');
            break;
        case "6":
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 83%');
            break;
        case "7":
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 100%');
            break;
        default:
            e.siblings('.progress').find('.progress-bar').attr('style', 'width: 0');
    }
})

// tooltip init
$('[data-toggle="tooltip"]').tooltip();



// ----------------
// po file modal
// ----------------

// PO select inputs
$(".POCreator select").change(function(e){

    // choose template - english or chinese
    if (e.target.id == 'template') {
        let POFile = $("#addPO table.pofile");

        if ($(this)[0].value != "English") {
            POFile.addClass('ch');
            POFile.removeClass('en');
        } else {
            POFile.removeClass('ch');
            POFile.addClass('en');
        }

    // else set value to PO modal values
    } else {
        let PONode = e.target.attributes.id.nodeValue;
        element = 'input#PO_' + PONode;

        $(element)[0].value = e.target.value;
    }

    $(".reviewpo.alert").addClass("d-none");
    $(this).removeClass('is-invalid');
});

// PO text inputs
$(".POCreator input").keyup(function(e){
    $(".reviewpo.alert").addClass("d-none");
    $(this).removeClass('is-invalid');
    let element = 'input#PO_' + e.target.id;
    console.log($(element)[0].value);
});

// review button
$("#reviewPO").click(function(e){

    let POinputs = [
        $(".POCreator select#template")[0],
        $(".POCreator select#supplier")[0],
        $(".POCreator select#shipAddress")[0],
        $(".POCreator select#shipMethod")[0],
        $(".POCreator select#exportTerm")[0],
        $(".POCreator select#product")[0],
        $(".POCreator input#quantity")[0],
        $(".POCreator input#unitCost")[0],
        $(".POCreator input#discount")[0]
    ]

    POinputs.forEach(element => {

        if (element.value == "") {
            $(element).addClass('is-invalid');
            $(".reviewpo.alert").removeClass("d-none");
            $(this).removeAttr("data-toggle");
        } else {
            $(element).removeClass('is-invalid');
            $(".reviewpo.alert").addClass("d-none");
            this.setAttribute("data-toggle", "modal");
        }
    });
});