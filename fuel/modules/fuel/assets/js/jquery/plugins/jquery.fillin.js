/*
(c) Copyrights 2008

Author David McReynolds
Daylight Studio
dave@thedaylightstudio.com
*/

(function($){
	jQuery.fn.fillin = function(txt) {
		var txt_orig = txt;
		return this.each(function(){
			if (txt_orig == null) txt = $(this).val();

			// if this is a password field, make a dummy text box to display the default txt
			if ($(this).attr('type') == 'password'){
				var _pwd = $(this);
				_pwd.after('<input type="text" value="' + txt_orig + '" class="tmp_pwd_fillin" />');
            _pwd.on('keyup',function(){
					if ($(this).val() == ''){
						$(this).hide();
                  _tmp.show().trigger('focus');
					} else {
                  $(this).show().trigger('focus');
						_tmp.hide();
					}
				});

				_pwd.on('blur',function(){
					if ($(this).val() == '' || $(this).val() == txt_orig){
						$(this).hide();
						_tmp.show();
					}
				});
				_pwd.hide();

				_tmp = $('.tmp_pwd_fillin');
            _tmp.on('focus',function(){
					if (_pwd.val() == '' || $(this).val() == txt_orig){
						_tmp.hide();
                  _pwd.show().trigger('focus');
					}
				});

			}

			if ($(this).val() == '') $(this).val(txt);

			if ($(this).val() != txt && $(this).val() != ''){
				$(this).removeClass("fillin");
			} else {
				$(this).addClass("fillin");
			}

         $(this).on('focus', {t:txt}, function(e){
				if ($(this).val() == e.data['t']) {
					$(this).val("");
					$(this).removeClass("fillin");
				}
			});
         $(this).on('blur,change', {t:txt}, function(e){
				if ($(this).val() == "" || $(this).val() == e.data['t']){
					$(this).val(e.data['t']);
					$(this).addClass("fillin");
				} else {
					$(this).removeClass("fillin");
				}
			});
         $(this).on('keyup', {t:txt}, function(e){
				if ($(this).val() != e.data['t']) {
					$(this).removeClass("fillin");
				} else {
					$(this).addClass("fillin");
				}
			});

			return this;
		});
	};
})(jQuery);
