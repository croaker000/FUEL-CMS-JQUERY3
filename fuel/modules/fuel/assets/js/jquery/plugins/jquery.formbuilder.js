/*
 * FoM: jquery.formbuilder() rewritten to run in jquery 3.*
 * v3.0
 * 2024-10-19

(c) Copyrights 2011

Author David McReynolds
Daylight Studio
dave@thedaylightstudio.com
*/

;(function ($) {
   // Define the plugin's name
   var pluginName    = 'formBuilder';
   var version       = '3.0.0';

   var defaults = {
      _context: null,
   };

   function Plugin(element, options) {
      this.element = element;
      this.$element = $(element);
      this.settings = $.extend({}, defaults, {'_funcs':{}});
      this._init(options);
   }

   $.extend(Plugin.prototype, { // Initialization method
      _init: function (options) { // Initialization logic goes here
         //console.log('jquery.formbuilder 3.0 init');
         var funcs = {};
         if (options != undefined) {
            $.data(this, 'funcs', options);
            funcs = options;
         } else {
            funcs = $.data(this, 'funcs');
         }

		   for(var o in funcs) {
            var func = funcs[o];
            this.add(o,func);
         }
         //console.log('jquery.formbuilder 3.0 init done.');
      },

      form: function(context) {
         //console.log('jquery.formbuilder 3.0 form: '+((context)?context:'no context'));
			if (context){
            this.settings._context = context;
			}
         return this.settings._context;
         //console.log('jquery.formbuilder 3.0 form done.');
		},

      add: function(key,name) {
         //console.log('jquery.formbuilder 3.0 add: '+key);
			var func = (typeof(name) == 'string')?eval(name):name;
         this.settings._funcs[key] = func;
         //console.log('jquery.formbuilder 3.0 add done.');
      },

      call: function(key) {
         //console.log('jquery.formbuilder 3.0 call: '+key);
         if (this.settings._funcs[key] != undefined){
				if (this.settings._funcs[key].func != undefined){
					var func = eval(this.settings._funcs[key].func);
					var opts = this.settings._funcs[key].opts;
					func(this.form(),opts);
				} else {
					this.settings._funcs[key](this.form());
				}
			}
         //console.log('jquery.formbuilder 3.0 call done.');
		},

      run: function(context) {
         for(var n in this.settings._funcs){
				this.call(n);
			}
         //console.log('jquery.formbuilder 3.0 initialized and ran: ' + context);
      },

      test: function() {
         console.log(this);
         console.log('jquery.formbuilder 3.0 test');
      },

      destroy: function() {        // A destroy method to clean up if necessary
         this.$element.removeData('plugin_' + pluginName);
         this.$element.off('.' + pluginName);
         console.log('Plugin destroyed');
      }
    });

   $.fn[pluginName] = function (optionsOrMethod) {    // Prevent multiple instantiations of the plugin
      var args = arguments;
      return this.each(function () {
         var $this = $(this);
         var instance = $this.data('plugin_' + pluginName);
         if (!instance) { // If the plugin hasn't been initialized yet
            //console.log('jquery.formbuilder 3.0 START');
            var options = (typeof optionsOrMethod === 'object' || !optionsOrMethod) ? optionsOrMethod : {};
            $this.data('plugin_' + pluginName, new Plugin(this, options));
         } else { // If the plugin has been initialized and a method is called
            if (typeof optionsOrMethod === 'string' && typeof instance[optionsOrMethod] === 'function') { // Call the plugin method with any additional arguments
               instance[optionsOrMethod].apply(instance, Array.prototype.slice.call(args, 1));
            } else if (typeof optionsOrMethod === 'string') {
               $.error('Method ' + optionsOrMethod + ' does not exist on ' + pluginName);
            }
         }
      });
   };

})(jQuery);

/*
Explanation:

    IIFE (Immediately Invoked Function Expression): The entire plugin is wrapped in an IIFE to avoid polluting the global namespace.
    Plugin Constructor: function Plugin(element, options) creates the plugin object for each matched DOM element.
    Defaults: var defaults = {} defines the default plugin options that can be overridden by passing custom options when initializing the plugin.
    Initialization (_init) Method: This method is automatically called when the plugin is initialized and is responsible for setting up the plugin's basic functionality.
    Custom Methods (method1, method2, destroy): These are example methods that can be called externally once the plugin is initialized.
    $.fn[pluginName]: This is where the plugin is attached to jQuery’s prototype, allowing it to be called using $(element).myPlugin().
    Method Calling: The plugin distinguishes between an options object (to initialize the plugin) and a string (to call a method) inside the $.fn[pluginName] function.
    Destroy Method: The destroy method cleans up any changes the plugin has made to the DOM or event listeners.

Usage:

To use this plugin on an element, you'd initialize it like this:

// Initialize the plugin
$('#myElement').myPlugin({
    option1: 'customValue'
});

// Call a method
$('#myElement').myPlugin('method1', 'Some Data');

// Destroy the plugin instance
$('#myElement').myPlugin('destroy');

This template is modular and provides a clear structure for adding new features or methods. You can expand on this by adding more complex behaviors or handling additional events.

https://chatgpt.com/share/67154164-9420-8007-b3cb-3dfa090b0e37
*/
