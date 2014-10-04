/* global jQuery */

(function ($) {
    'use strict';
    
    var pluginName = 'checkboxUtils';
    
    function Plugin(container) {
        var lastCheckboxClick = null,
            isSetMax = false,
            
            checkAll = function () {
                var checkboxes =  container.find(':checkbox').filter(':not(:disabled)');
                
                if (!isSetMax) {
                    checkboxes.prop('checked', true).trigger('change');
                    return;
                }
                
                checkboxes.each(function () {
                    if (this.disabled) {
                        return false;
                    }
                    $(this).prop('checked', true).trigger('change');
                });
            },
            
            uncheckAll = function () {
                container
                    .find(':checkbox')
                    .filter(':not(:disabled)')
                    .prop('checked', false)
                    .trigger('change');
            },
            
            toggle = function () {
                if (isSetMax) {
                    return;
                }
                
                container
                    .find(':checkbox')
                    .filter(':not(:disabled)')
                    .each(function () {
                        this.checked = !this.checked;
                    })
                    .trigger('change');
            },
            
            setRange = function (range) {
                lastCheckboxClick = null;
                
                if (range) {
                    setMax(0);
                    
                    container.on('click.' + pluginName + '.range', ':checkbox', function (event) {
                        if (!lastCheckboxClick) {
                            lastCheckboxClick = event.target;
                            return;
                        }

                        if (event.shiftKey) {
                            var checkboxes = container.find(':checkbox'),
                                from = checkboxes.index(lastCheckboxClick),
                                to = checkboxes.index(event.target),
                                start = Math.min(from, to),
                                end = Math.max(from, to) + 1;

                            checkboxes
                                .slice(start, end)
                                .filter(':not(:disabled)')
                                .prop('checked', lastCheckboxClick.checked)
                                .trigger('change');
                        }

                        lastCheckboxClick = event.target;
                    });
                } else {
                    container.off('click.' + pluginName + '.range');
                }
                
            },
            
            setMax = function (max) {
                max = parseInt(max);
                
                if (max > 0) {
                    setRange(false);
                    isSetMax = true;
                    
                    container.on('change.' + pluginName + '.max', ':checkbox', function () {
                        var disabled = container.find(':checkbox:checked').length === max;
                        
                        container
                            .find(':checkbox:not(:checked)')
                            .prop('disabled', disabled);
                    });
                } else {
                    isSetMax = false;
                    container.off('change.' + pluginName + '.max');
                }
            };
        
        return {
            check: checkAll,
            uncheck: uncheckAll,
            toggle: toggle,
            range: setRange,
            max: setMax
        };
    }
    
    $.fn[pluginName] = function (method) {
        var methodArgs = Array.prototype.slice.call(arguments, 1);
        
        return this.each(function () {
            var $this = $(this),
                data = $this.data(pluginName);
            
            if (!data) {
                $this.data(pluginName, (data = new Plugin($this)));
            }
            
            if (typeof method === 'string' && data[method]) {
                data[method].apply(data, methodArgs);
            }
        });
    };
}(jQuery));