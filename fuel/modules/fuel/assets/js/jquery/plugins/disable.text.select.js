/* Replaces jquery.disable.text.pack.js */
(function($){

  $.fn.ctrlCmd = function(key) {

    var allowDefault = true;

    if (!Array.isArray(key)) {
       key = [key];
    }

    return this.on('keydown',function(e) {
        for (var i = 0, l = key.length; i < l; i++) {
            if(e.keyCode === key[i].toUpperCase().charCodeAt(0) && e.metaKey) {
                allowDefault = false;
            }
        };
        return allowDefault;
    });
};


$.fn.disableTextSelect = function() {
    this.ctrlCmd(['a', 'c']);
    return this.attr('unselectable', 'on')
               .css({'-moz-user-select':'-moz-none',
                     '-moz-user-select':'none',
                     '-o-user-select':'none',
                     '-khtml-user-select':'none',
                     '-webkit-user-select':'none',
                     '-ms-user-select':'none',
                     'user-select':'none'})
               .on('selectstart', false);
};

})(jQuery);
