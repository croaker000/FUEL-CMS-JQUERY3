jqx.load('plugin', 'jquery.placeholder');

fuel.controller.LoginController = jqx.lib.BaseController.extend({

	init: function(initObj){
		fuel.controller.BaseFuelController.prototype.notifications.call(this);
      //$('#user_name').focus();
      $('#user_name').trigger('focus');
		$('input').placeholder();
		this._super(initObj);
	}
});
