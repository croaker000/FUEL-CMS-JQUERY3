fuel.controller.UserController = jqx.createController(fuel.controller.BaseFuelController, {

	init: function(initObj){
		this._super(initObj);
	},

	add_edit : function(){
		this._super();

		$('#is_invite').on('change',function() {
			$('#new_password').prop('disabled', function(i, v) { return !v; });
			$('#confirm_password').prop('disabled', function(i, v) { return !v; });
		});

		// trigger keyup initially just in case the values are the same
      $('#password,#confirm_password,#new_password').on('keyup',function() {/*nop*/});

		// toggle on off
		var toggleHTML = ' &nbsp; <input id="toggle_perms" name="toggle_perms" type="checkbox" value="1" class="float_right"/>';
		$('td.section h3').append(toggleHTML);
		var $perms = $('input:checkbox').not('#is_invite, #toggle_perms');

		$('#toggle_perms').on('click',function() {
		    $perms.attr('checked',$(this).is(':checked'));
		 });

		var toggleAllPerms = function(){
         //if ($perms.size() != $perms.filter(':checked').size()){
         if ($perms.length != $perms.filter(':checked').length){
            //$('#toggle_perms').removeAttr('checked');
            $('#toggle_perms').prop('checked',false);
			} else {
            //$('#toggle_perms').attr('checked',true);
            $('#toggle_perms').prop('checked',true);
			}
		}

		$perms.on('click',function(i){
			toggleAllPerms();
		})
		toggleAllPerms();




		$('.perms_list li input').on('click',function(e){
			$ul = $(this).parent().find('ul');
			if ($ul.length){
				if ($ul.css('display') == 'none'){
					$ul.slideDown('fast');
					$inputs = $ul.find('input');
					if (!$(':checked', $inputs).length){
						$inputs.prop('checked', true);
					}
				} else {
					$ul.slideUp('fast');
					$ul.find('input').prop('checked', false);
				}
			}
		});

		$('.perms_list li input').not(':checked').parent().find('ul').hide();

	}

});
