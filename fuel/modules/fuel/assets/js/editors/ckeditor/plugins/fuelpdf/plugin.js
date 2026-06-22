// Register the plugin within the editor.
function fuelPDFEditWindow(selected, attrs, callback) {
	var url = jqx.config.basePath + 'ckf_assets/ckf_pdf/select?nocache=' + new Date().getTime();
	if (selected) url += '&selected=' + escape(selected);
	url += '&input=' + ((attrs.input) ? encodeURIComponent(attrs.input) : '');
	url += '&target=' + ((attrs.target) ? attrs.target : '');
	url += '&title=' + ((attrs.title) ? attrs.title : '');
	url += '&class=' + ((attrs.className) ? attrs.className : '');

	var html = '<iframe src="' + url +'" id="url_inline_iframe" class="inline_iframe" frameborder="0" scrolling="no" style="border: none; width: 850px;"></iframe>';
	$modal = fuel.modalWindow(html, 'inline_edit_modal', true);

	$modal.find('iframe#url_inline_iframe').bind('load', function(){
      $(this).off();		// to prevent double loading issue
		var iframeContext = this.contentDocument;
		jQuery('.cancel', iframeContext).add('.modal_close').click(function() {
			$modal.jqmHide();
			if ($(this).is('.save')){
				$urlSelect = $('#asset_select', iframeContext);
				$input =  $('#input', iframeContext);
				$target = $('#target', iframeContext);
				$title = $('#title', iframeContext);
				$class = $('#class', iframeContext);

				$selected = $('#selected', iframeContext);
				var selectedUrl = ($input.length && $input.val().length) ? $input.val() : $urlSelect.val();
				var isHTTP = (selectedUrl.match(/^\w+:\/\//)) ? true : false;
				var replace = '<a href="';

				if (selectedUrl.substr(0, 1) != '{') {
					if (selectedUrl.match(/\.pdf$/)){
						replace += myMarkItUpSettings.parserLeftDelimiter() + 'pdf_path(\'';
                  replace += selectedUrl;
                  if (!isHTTP) {
                     replace += '\')';
                  } else {
                     replace += '\',null,true)';
                  }
                  replace += myMarkItUpSettings.parserRightDelimiter();
					} else {
						if (!isHTTP) replace += myMarkItUpSettings.parserLeftDelimiter() + 'pdf_path(\'';
						replace += selectedUrl;
						if (!isHTTP) replace += '\')' +  myMarkItUpSettings.parserRightDelimiter();
					}
				} else {
					replace += selectedUrl;
				}

				replace += '"';
				if ($target.length && ($target.val().length != '' && $target.val() != '_self')){
					replace += ' target="' + $target.val() + '"';
				}
				if ($title.length && $title.val().length){
					replace += ' title="' + $title.val() + '"';
				}
				if ($class.length && $class.val().length){
					replace += ' class="' + $class.val() + '"';
				}
				replace += '>' + unescape($selected.val()) + '</a>';
            //console.log(replace);
				callback(replace);
			}
			return false;
		});
	});
}

CKEDITOR.plugins.add( 'fuelpdf', {
		icons: 'fuelpdf',
		init: function( editor ) {
				 editor.addCommand('fuelpdf', {
		      	exec: function( editor ) {
								var selection = editor.getSelection();
								element = selection.getStartElement();
								var input, target, title, className, linkPdfs;
								if ( element ) {
									element = element.getAscendant( 'a', true );
									if (element){
										var href = element.getAttribute('href');
										var regex = "^" + myMarkItUpSettings.parserLeftDelimiter(true) + "pdf_path\('(.*)'\)" + myMarkItUpSettings.parserRightDelimiter(true);
										input = href.replace(new RegExp(regex, 'g'), function(match, contents, offset, s) { return contents; });
										target = element.getAttribute('target');
										title = element.getAttribute('title');
										className = element.getAttribute('class');
									}
								}
								var selected = selection.getSelectedText();
								var selectedElem = selection.getSelectedElement();
								if (selectedElem){
									selected = selectedElem.getOuterHtml();
								}
								fuelPDFEditWindow(selected, {input: input, title: title, target: target, className: className}, function(replace){
									editor.insertHtml(replace);
								});
		        			}
	    		});
			 	editor.on( 'selectionChange', function( evt ) {
					var command = editor.getCommand( 'fuelunlink' ), element = evt.data.path.lastElement.getAscendant( 'a', true );
					if ( element && element.getName() == 'a' && element.getAttribute( 'href' ) )
						command.setState( CKEDITOR.TRISTATE_OFF );
					else
						command.setState( CKEDITOR.TRISTATE_DISABLED );
				});
			   editor.ui.addButton( 'fuelpdf', {label:'Insert PDF Link', command:'fuelpdf', toolbar:'insert'});
	}
});
