if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.$ = function (selector) {
	var query = (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object' ? selector : document.querySelectorAll(selector);

	query.__proto__.forEach = Array.prototype.forEach;
	query.__proto__.map = Array.prototype.map;
	query.__proto__.filter = Array.prototype.filter;
	query.__proto__.reduce = Array.prototype.reduce;
	query.__proto__.some = Array.prototype.some;

	query.addClass = function (args) {
		var _this = this;

		if (typeof args === 'function') {
			this.forEach(function (item, index) {
				var res = args(index, item.className);
				if (!res) return item;
				res = res.split(' ');
				for (var i = 0; i < res.length; i++) {
					item.classList.add(res[i]);
				}
			});
		} else {
			if (!args) return this;
			args = args.split(' ');

			var _loop = function _loop(i) {
				_this.forEach(function (item) {
					return item.classList.add(args[i]);
				});
			};

			for (var i = 0; i < args.length; i++) {
				_loop(i);
			}
		}
		return this;
	};

	query.append = function (content) {
		if (typeof content === 'string') this.forEach(function (item) {
			return item.innerHTML = content;
		});else {
			if (typeof content.length !== 'undefined') this.forEach(function (item) {
				return Array.prototype.forEach.call(content, function (contentItem) {
					return item.appendChild(contentItem.cloneNode(true));
				});
			});else this.forEach(function (item) {
				return item.appendChild(content.cloneNode(true));
			});
		}
		return this;
	};

	query.html = function (string) {
		if (string) {
			if (typeof this.length == 'undefined') this.innerHTML = string;else this.forEach(function (item) {
				return item.innerHTML = string;
			});
		} else return this[0].innerHTML;
		return this;
	};

	query.attr = function () {
		for (var _len = arguments.length, attr = Array(_len), _key = 0; _key < _len; _key++) {
			attr[_key] = arguments[_key];
		}

		if (attr.length === 2) this.forEach(function (item) {
			return item.setAttribute(attr[0], attr[1]);
		});
		if (attr.length === 1) return this[0].getAttribute(attr[0]);
		return this;
	};

	query.children = function (filter) {
		if (typeof filter === 'undefined') return this[0].children;else return this[0].querySelectorAll(filter);
	};

	query.css = function (style) {
		if (typeof style === 'string') 
			return this[0].style[style];
		else 
			return this.forEach(function (item) {
				return Object.assign(item.style, style);
			});
	};

	query.data = function () {
		for (var _len2 = arguments.length, data = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			data[_key2] = arguments[_key2];
		}

		if (data.length === 0) return this[0].dataset;
		if (data.length === 1 && typeof data[0] === 'string') return this[0].dataset[data];
		if (data.length === 2) return this.forEach(function (item) {
			return item.dataset[data[0]] = data[1];
		});
		if (data.length === 1 && _typeof(data[0]) === 'object') return this.forEach(function (item) {
			return Object.assign(item.dataset, data[0]);
		});
	};

	query.on = function () {
		for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			args[_key3] = arguments[_key3];
		}

		if (args.length === 2) this[0].addEventListener(args[0], args[1]);
		if (args.length === 3) {
			var f = function f(arg, event) {
				var targetArr = query[0].querySelectorAll(':not(' + arg + ')');
				if (Array.prototype.indexOf.call(targetArr, event.target) == -1) args[2]();
			};
			f = f.bind(undefined, args[1]);
			this[0].addEventListener(args[0], f);
		}
		return this;
	};

	query.one = function (eventName, eventHandler) {
		var numCall = 0;
		this[0].addEventListener(eventName, function () {
			if (numCall === 0) {
				numCall++;
				eventHandler();
			}
		});
		return this;
	};

	query.each = function (func) {
		for (var i = 0; i < this.length; i++) {
			var out = func.apply(this[i], [i, this[i]]);
			if (out === false) break;
		}
		return this;
	};

	return query;
};