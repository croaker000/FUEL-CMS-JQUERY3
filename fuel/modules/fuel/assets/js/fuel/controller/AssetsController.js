fuel.controller.AssetsController = jqx.createController(fuel.controller.BaseFuelController, {

	init: function(initObj){
		this._super(initObj);
	},

	items : function(){

		// call parent
		//fuel.controller.BaseFuelController.prototype.items.call(this);
		this._super();

		var _this = this;
		$('#group_id').on('change',function(e){
         $('#form_actions').trigger('submit');
		});
	},

	select : function(){
		this.notifications();
		$assetSelect = $('#asset_select');
		$assetPreview = $('#asset_preview');
		var selectedAssetFolder = this.initObj.folder;

		$assetSelect.on('change',function(e){
			var isImg = ($assetSelect.val() && $assetSelect.val().toLowerCase().match(/\.jpg$|\.jpeg$|\.gif$|\.png$|\.svg$/));
			if (isImg){
				$assetPreview.show().html('<img src="' + jqx.config.assetsPath + selectedAssetFolder + '/' + $assetSelect.val() + '" />');
				$('.img_only').show();
			} else {
				$assetPreview.hide();
				$('.img_only').hide();
			}
		})
      $assetSelect.on('keyup',function(e) {
         $assetSelect.trigger('change');
			return(false);
		});

		$assetSelect.trigger('change');
	},

	add_edit : function(){
		this._super();
		$('#resize_method').on('change',function(e){
			if ($(this).val() == 'resize_and_crop'){
				$('#master_dim').parents('tr').hide();
			} else {
				$('#master_dim').parents('tr').show();
			}
		})
		$('#resize_method').trigger('change');

      $('#back').on('click',function(e){
			e.preventDefault();
			window.location = $(this).data('url');
		})
	}

});
