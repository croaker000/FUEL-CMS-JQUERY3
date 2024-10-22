/**
 * Basic sample plugin inserting abbreviation elements into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'fuellink', {

   icons: 'fuellink,fuelunlink',	// Register the icons.

	// The plugin initialization logic goes inside this method.
	init: function( editor ) {
		editor.on( 'doubleclick', function( evt ) {
         var element = evt.data.element;
         if ( element.is( 'a' ) && !element.getAttribute( '_cke_realelement' )) {
				editor.execCommand('fuellink');
         }
      },null,null,100);
		// Define an editor command that opens our dialog.
		editor.addCommand( 'fuellink', {
	      exec: function( editor ) {
				var selection = editor.getSelection();
				element = selection.getStartElement();
				var input, target, title, className, linkPdfs;
				if ( element ) {
					element = element.getAscendant( 'a', true );
					if (element){
						var href = element.getAttribute('href');
						var regex = "^" + myMarkItUpSettings.parserLeftDelimiter(true) + "site_url\('(.*)'\)" + myMarkItUpSettings.parserRightDelimiter(true);
						input = href.replace(new RegExp(regex, 'g'), function(match, contents, offset, s) {
		   										return contents;
	    								}
									);
						target = element.getAttribute('target');
						title = element.getAttribute('title');
						className = element.getAttribute('class');
					}
				}
				linkPdfs = editor.element.getAttribute('data-link_pdfs');
				linkFilter = editor.element.getAttribute('data-link_filter');

				var selected = selection.getSelectedText();
				var selectedElem = selection.getSelectedElement();
				if (selectedElem){
					selected = selectedElem.getOuterHtml();
				}
				myMarkItUpSettings.displayLinkEditWindow(
               selected, {
                  input: input,
                  title: title,
                  target: target,
                  className: className,
                  linkPdfs:linkPdfs,
                  linkFilter:linkFilter
               }, function(replace) {
                     editor.insertHtml(replace);
				      }
            )
		   }
    	});

		editor.on( 'selectionChange', function( evt ) {		// Register selection change handler for the unlink button.
			var command = editor.getCommand( 'fuelunlink' ),
				 element = evt.data.path.lastElement.getAscendant( 'a', true );
			if ( element && element.getName() == 'a' && element.getAttribute( 'href' ) )
				command.setState( CKEDITOR.TRISTATE_OFF );
			else
				command.setState( CKEDITOR.TRISTATE_DISABLED );
		});

    	// Define an editor command that opens our dialog.
		editor.addCommand( 'fuelunlink', {
         exec: function( editor ) {
   			var selection = editor.getSelection(),
   				 bookmarks = selection.createBookmarks(),
   				 ranges = selection.getRanges(),
   				 rangeRoot,
   				 element;
   			for ( var i = 0 ; i < ranges.length ; i++ ) {
   				rangeRoot = ranges[i].getCommonAncestor( true );
   				element = rangeRoot.getAscendant( 'a', true );
   				if ( !element ) continue;
   				ranges[i].selectNodeContents( element );
   			}

   			selection.selectRanges( ranges );
   			editor.document.$.execCommand( 'unlink', false, null );
   			selection.selectBookmarks( bookmarks );
	      }
      });
		editor.ui.addButton( 'FUELLink', {
			label: 'Insert Link',
			command: 'fuellink',
         toolbar: 'insert',
         icon: 'fuellink'
		});
		editor.ui.addButton( 'FUELUnlink', {
			label: 'Remove Link',
			command: 'fuelunlink',
         toolbar: 'insert',
         icon: 'fuelunlink'
		});
	}
});
