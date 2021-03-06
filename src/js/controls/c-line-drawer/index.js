/*jslint browser: true */
/*globals ko, $ */
var ko = require('knockout');
var linefun = (function () {
    "use strict";

    ko.bindingHandlers.LineDrawSetSize = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            if (!value) { return; }
            element.height = value.height;
            element.width = value.width;
        }
    };

    ko.bindingHandlers.LineDrawNaturalSize = {
        init: function (element, valueAccessor) {
            var value = valueAccessor();
            function update() {
                value({
                    width: element.naturalWidth,
                    height: element.naturalHeight
                });
            }
            update();
            $(element).on('load', update);
        }
    };

    ko.bindingHandlers.LineDraw = {
        init: function (element, valueAccessor) {
            var value = valueAccessor(),
                ctx = element.getContext('2d'),
                $element = $(element);
            $element.on('mousedown', function (e) {
                var x = (e.pageX - $element.offset().left) / $element.width() * element.width,
                    y = (e.pageY - $element.offset().top) / $element.height() * element.height;
                ctx.beginPath();
                ctx.moveTo(x, y);
                function draw(e) {
                    var pen = parseInt($element.data('pen'), 10) || 1,
                        tx = (e.pageX - $element.offset().left) / $element.width() * element.width,
                        ty = (e.pageY - $element.offset().top) / $element.height() * element.height;
                    ctx.lineTo(tx, ty);
                    ctx.strokeStyle = 'rgb(255,0,0)';
                    ctx.lineWidth = pen;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                }
                function end() {
                    $element.off('mousemove', draw);
                    $element.off('mouseup', end);
                    value(element.toDataURL('image/png'));
                }
                $element.on('mousemove', draw);
                $element.on('mouseup', end);
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor()),
                ctx = element.getContext('2d');
            if (!value || value === '') {
                ctx.clearRect(0, 0, element.width, element.height);
            }
        }
    };

    ko.bindingHandlers.LineDrawPen = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor()),
                $element = $(element);
            $element.data('pen', value);
        }
    };
}());


function ViewModel(params) {
    var self = this;
    self.context = params.context;
    self.src = params.src;
    self.pen = params.pen;
    self.line = params.line;
    self.naturalSize = ko.observable();
    self.linefun = linefun;
    self.trigger = function (id) {
        self.context.events[id](self.context, self.output);
    };
}
ViewModel.prototype.id = 'line-drawer';

exports.register = function () {
    ko.components.register('line-drawer', {
        viewModel: {
            createViewModel: function (params, componentInfo) {
                var vm = new ViewModel(params);
                params.context.vms[vm.id] = vm;
                ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { delete params.context.vms[vm.id]; });
                return vm;
            }
        },
        template: '<img data-bind="attr: { src: src }, LineDrawNaturalSize: naturalSize" class="background" draggable="false"><canvas data-bind="LineDraw: line, LineDrawSetSize: naturalSize, LineDrawPen: pen"></canvas>',
        synchronous: true
    });
};