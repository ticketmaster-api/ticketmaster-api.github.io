$('.nested-list').wrap("<div class='nested-list-wrapper'></div>");


$('.nested-list-wrapper').jstree({
    "core" : { // core options go here
        "multiple" : false, // no multiselection
        "themes" : {
            "dots" : true // no connecting dots between dots
        },
        "dblclick_toggle":false
    },
    "plugins" : ["state"] // activate the state plugin on this instance
});

$('.nested-list-wrapper')
    .on('before_open.jstree', function () {
        console.log('before_open');
        $('.jstree-themeicon').remove(); //remove needless element
    })
    .on('select_node.jstree', function (e, data) {
        data.instance.toggle_node(data.node); //set open on one click
    })
    /*.on('hover_node.jstree', function (e, data) {
     console.log( $('#'+data.node.id) );
     $('#'+data.node.id + '> i').addClass(hoveredCssClass);

     })*/
    .jstree();

var hoveredCssClass  = 'hovered';

function toggleTargetElement() {
    var me = $( this );
    if (me.is('a')){
        console.log(' return  i');
        return 'i'
    }else {
        console.log(' return  a');
        return 'a';
    }
};

function toggleIconClass(toggle) {
    var iconElement;
    var me = $( this );

    /*if (me.is('a')){
     iconElement = me.prev('i');
     }else {
     iconElement = me.next('a');
     }*/

    iconElement = me.prev('i');
    if(toggle){
        iconElement.addClass(hoveredCssClass);
    }else{
        iconElement.removeClass(hoveredCssClass);
    }
};


$('.jstree-container-ul')
    .on({
        mouseenter: function(){
            console.log('mouseenter');
            toggleIconClass.call(this, true );
        },
        mouseleave: function(){
            toggleIconClass.call(this, false );
        }
    },'a');
