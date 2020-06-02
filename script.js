// Author: @grantimbo
// Author URI: grantimbo.com


// ----------------
// General
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




// ---------------------------
// SUPPLY CHAIN - PO Creator
// ---------------------------

// PO Creator Inputs
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
$("#reviewPO").click(function(){

    let POinputs = [
        $(".POCreator select#template")[0],
        $(".POCreator select#supplier")[0],
        $(".POCreator select#shipAddress")[0],
        $(".POCreator select#shipMethod")[0],
        $(".POCreator select#exportTerm")[0],
        $(".POCreator select#paymentTerm")[0],
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

// saved templates buttons
$("#savedTemplates button.savedTempBtn").click(function(e){

    let text = e.target.innerText;
    $('#savedTemplates').modal('hide');

    setTimeout(function(){
        if (text != 'Edit') {
            $('#addPO').modal('toggle');
        } else {
            $('#editPO').modal('toggle');
        }
    }, 500)
});



// ------------------------------
// SUPPLY CHAIN - Order Tracking
// ------------------------------

// dot steps 
$('.steps .step').click(function(){

    let e = $(this),
        current = e.attr('data-steps');
    
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
});

// tooltip init
$('[data-toggle="tooltip"]').tooltip();




// ---------------------
// FINANCES - Budgeting
// ---------------------

$('.budget-month-selector a').click(function(e){
    e.preventDefault();
    if ( $(this).hasClass('nxt') ) {
        if ( !$('.month-select span.active:last-child').length ) {
            $('.month-select span.active').removeClass('active').next('span').addClass('active');
        }
    } else {
        if ( !$('.month-select span.active:first-child').length ) {
            $('.month-select span.active').removeClass('active').prev('span').addClass('active');
        }
    }
});

// operating expenses
$('#submitNewExpense').click(function(){

    let inputs = [
        $("#addOperatingExpenses input#date")[0],
        $("#addOperatingExpenses input#type")[0],
        $("#addOperatingExpenses input#budgeted")[0],
        $("#addOperatingExpenses input#saved")[0],
        $("#addOperatingExpenses input#total")[0]
    ]

    let addTemplate = `<tr>
            <td class="align-middle">${inputs[0].value}</td>
            <td class="align-middle">${inputs[1].value}</td>
            <td class="align-middle">${inputs[2].value}</td>
            <td class="align-middle">${inputs[3].value}%</td>
            <td class="align-middle">${inputs[4].value}%</td>
            <td class="align-middle">
                <div class="input-group">
                    <input type="text" class="form-control" aria-label="" placeholder="$0">
                    <div class="input-group-append">
                    <button class="btn btn-sm btn-outline-secondary" type="button">Submit</button>
                    </div>
                </div>
            </td>
        </tr>`;

    $(addTemplate).insertAfter('table#operatingExpenses tbody tr:last-child');

    inputs.forEach(element => {
        element.value = "";
    });

});


// ----------------------------------
// ADVERTISING - Campaign Management
// ----------------------------------

$('.campaign-management-btns button').click(function(e){
    $(this).toggleClass('active').siblings().removeClass('active');
    
    if (!$(this).hasClass('open-modal')) {
        let nav = e.target.dataset.layout;
        $('.campaign-management-layout').find('section.' + nav).toggleClass('active').siblings().removeClass('active');
    } else {
        $('.campaign-management-layout').find('section').removeClass('active');
    }
});

$('a.edit-avl').click(function(e){
    e.preventDefault();
    $(this).hide().siblings('.input-group').show().find('input').attr('placeholder', this.text);
});

$('button.save-avl').click(function(){
    let val = $(this).parent().siblings().val() + '%';
    $(this).parent().parent().hide().siblings().show().html(val);
});