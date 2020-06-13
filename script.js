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

    let e = $(this);
    
    e.addClass('active').siblings().removeClass('active');
    e.prevAll().addClass('active');
    
});

// tooltip init
$('[data-toggle="tooltip"]').tooltip();




// ---------------------
// FINANCES - Budgeting
// ---------------------

// month selector
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


// ---------------------------------
// FINANCES - Budgeting -> Assign
// ---------------------------------

// dummy data (replace this with api call)
const dummyData = [
    {
        name: "account",
        data: ['Batman Account','Foo Account','Lorem Account','Tea Account']
    },
    {
        name: "payees",
        data: ['Green Lantern','Batman','Aquaman','Superman']
    },
    {
        name: "categories",
        data: ['Inflow','Spare Funds','Inventory','Payment']
    },
    {
        name: "transaction",
        data: [
            {account: 'Batman Account', date: '2020-03-20', payee: 'Batman', category: 'Inflow', memo: 'this is a sample memo', outflow: '$5,000.00', inflow: '$0.00'},
            {account: 'Foo Account', date: '2020-04-25', payee: 'Green Lantern', category: 'Spare Funds', memo: 'this is a sample memo', outflow: '$7,000.00', inflow: '$0.00'},
            {account: 'Lorem account', date: '2020-05-15', payee: 'Aquaman', category: 'Inventory', memo: 'this is a sample memo', outflow: '$8,000.00', inflow: '$0.00'},
        ]
    }
];

// extract dummy contents from dummyData variable
const extractDummyContents = (dummyCategory) => {
    let contents = '';
    dummyData.forEach(catName => {
        if (catName.name === dummyCategory) {
            catName.data.forEach(acc => {
                contents += `<a href="#" data-transaction="update">${acc}</a>`;
            });
        }
    });
    //convert title to titleCase
    dummyCategory = dummyCategory.replace(/(\w+)/g, function(x) { return x[0].toUpperCase() + x.substring(1) });

    return `<b>${dummyCategory}</b>${contents}`;
};

// display dummy data on 'tbody.transaction-list'
if (document.querySelector('tbody.transaction-list')) {
    dummyData.forEach(catName => {
        if (catName.name === 'transaction') {
            catName.data.forEach(content => {
                document.querySelector('tbody.transaction-list').innerHTML += 
                `<tr class="transaction-details">
                    <td>
                        <input class="tag-select mr-2" type="checkbox" value=""> <i class="fas fa-tag"></i>
                    </td>
                    <td>
                        <span data-transaction="account">${content.account}</span>
                        <div class="input-group">
                            <input type="text" data-transaction="account" class="form-control" value="${content.account}">
                            <div class="popup-content">${extractDummyContents('account')}</div>
                        </div>
                    </td>
                    <td>
                        <span data-transaction="date">${content.date}</span>
                        <div class="input-group"><input type="date" data-transaction="date" class="form-control" value="${content.date}"></div>
                    </td>
                    <td>
                        <span data-transaction="payee">${content.payee}</span>
                        <div class="input-group">
                            <input type="text" data-transaction="payee" class="form-control" value="${content.payee}">
                            <div class="popup-content">${extractDummyContents('payees')}</div>
                        </div>
                    </td>
                    <td>
                        <span data-transaction="category">${content.category}</span>
                        <div class="input-group">
                            <input type="text" data-transaction="category" class="form-control" value="${content.category}">
                            <div class="popup-content">${extractDummyContents('categories')}</div>
                        </div>
                    </td>
                    <td>
                        <span data-transaction="memo">${content.memo}</span>
                        <div class="input-group"><input type="text" data-transaction="memo" class="form-control" value="${content.memo}"></div>
                    </td>
                    <td>
                        <span data-transaction="outflow">${content.outflow}</span>
                        <div class="input-group"><input type="text" data-transaction="outflow" class="form-control" value="${content.outflow}"></div>
                    </td>
                    <td>
                        <span data-transaction="inflow">${content.inflow}</span>
                        <div class="input-group mb-3"><input type="text" data-transaction="inflow" class="form-control" value="${content.inflow}"></div>
                        <div class="btn-toolbar float-right">
                                <a href="#" class="btn btn-sm mr-2 btn-secondary" data-transaction="cancel">Cancel</a>
                                <a href="#" class="btn btn-sm btn-success" data-transaction="save">Save</a>
                        </div>
                    </td>
                    <td> <i class="fas fa-copyright active"></i></td>
                </tr>`
            });
        }
    })
}

// edit transactions
$('tr.transaction-details span').click(function(){
    let parent = $(this).parents('tr');

    parent.addClass('show').siblings().removeClass('show');
    $(this).siblings('.input-group').find('input').focus().select();
    $(this).siblings('.input-group').find('.popup-content').addClass('show')
    parent.find('input[type="checkbox"]').prop( "checked", true );
});

// select inputs
$('.input-group input').focus(function(){
    $(this).parents('tr').find('.popup-content').removeClass('show');
    $(this).siblings().addClass('show');
});


// update transaction
$('a[data-transaction="update"]').click(function(){
    let parent = $(this).parents('.input-group');

    parent.find('input').val($(this).text());
    parent.find('.popup-content').removeClass('show')
})

// cancel transaction
$('a[data-transaction="cancel"]').click(function(){
    let parent = $(this).parents('tr');

	parent.removeClass('show');
    parent.find('input[type="checkbox"]').prop( "checked", false );
    parent.find('.popup-content').removeClass('show');
});

// save transaction
$('a[data-transaction="save"]').click(function(){
	let parent = $(this).parents('tr'),
        acc = parent.find('input[data-transaction="account"]').val(),
        dte = parent.find('input[data-transaction="date"]').val(),
        pay = parent.find('input[data-transaction="payee"]').val(),
        cat = parent.find('input[data-transaction="category"]').val(),
        mem = parent.find('input[data-transaction="memo"]').val(),
        ouf = parent.find('input[data-transaction="outflow"]').val(),
        inf = parent.find('input[data-transaction="inflow"]').val();

	parent.find('span[data-transaction="account"]').text(acc);
	parent.find('span[data-transaction="date"]').text(dte),
	parent.find('span[data-transaction="payee"]').text(pay),
	parent.find('span[data-transaction="category"]').text(cat),
	parent.find('span[data-transaction="memo"]').text(mem),
	parent.find('span[data-transaction="outflow"]').text(ouf),
	parent.find('span[data-transaction="inflow"]').text(inf);

    parent.removeClass('show');
    parent.find('input[type="checkbox"]').prop( "checked", false );
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