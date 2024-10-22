/**
 * Basic sample plugin inserting abbreviation elements into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

CKEDITOR.plugins.add( 'fuelimage', {
   icons: 'fuelimage',
	init: function( editor ) {
		editor.on( 'doubleclick', function( evt ) {
         //console.log('ckeditor->fuelimage->doubleclick');
         var element = evt.data.element;
         if ( element.is( 'img' ) && !element.getAttribute( 'data-cke-real-element-type' )) {
				editor.execCommand('fuelimage');
         }
      }, null,null,100);
      editor.addCommand( 'fuelimage', {		// Define an editor command that opens our dialog.
         exec: function( editor ) {
            //console.log('ckeditor->fuelimage->doubleclick->fuelimage');
   			var selection = editor.getSelection();
   			element = selection.getStartElement();

   			var img = '', width, height, alt, align, className, imgFolder, imgOrder;
   			if ( element ) {
               element = element.getAscendant( 'img', true );
   				if (element) {
   					var src = element.getAttribute('src');
   					element.setAttribute('data-cke-saved-src', src);
   					// remove the img_path
   					var regex = "^" + myMarkItUpSettings.parserLeftDelimiter(true) + "img_path\\('(.+)'\\)" + myMarkItUpSettings.parserRightDelimiter(true);
   					img = src.replace(new RegExp(regex), function(match, contents, offset, s) {
   		   			return contents;
   	    			});
                  img = img.replace(jqx.config.assetsImgPath, '');		// remove the web path
      				width = element.getAttribute('width');
      				height = element.getAttribute('height');
      				alt = element.getAttribute('alt');
      				align = element.getAttribute('align');
                  className = element.getAttribute('class');
      			}
      		}
      		imgFolder = editor.element.getAttribute('data-img_folder');
      		imgOrder = editor.element.getAttribute('data-img_order');
      		myMarkItUpSettings.displayAssetInsert(img, {width: width, height: height, alt: alt, align: align, className: className, imgFolder: imgFolder, imgOrder: imgOrder}, function(imgHtml){
         		var regex = myMarkItUpSettings.parserLeftDelimiter(true) + "img_path\\('(.+)'\\)" + myMarkItUpSettings.parserRightDelimiter(true);
         		imgHtml = imgHtml.replace(new RegExp(regex, 'g'), function(match, contents, offset, s) {
         			var img = jqx.config.assetsImgPath + contents;
         			return img;
         	   });
         		editor.insertHtml(imgHtml);
         	});
         }
    	});

		editor.ui.addButton( 'FUELImage', {
			label: 'Insert an Image',
			command: 'fuelimage',
         toolbar: 'image',
         icon: 'fuelimage'
		});
	}
});
