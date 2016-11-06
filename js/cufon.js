var Cufon = (function() {
	var e = function() {
		return e.replace.apply(null, arguments)
	};
	var v = e.DOM = {
		ready : (function() {
			var M = false, O = {
				loaded : 1,
				complete : 1
			};
			var L = [], N = function() {
				if (M) {
					return
				}
				M = true;
				for ( var P; P = L.shift(); P()) {
				}
			};
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", N, false);
				window.addEventListener("pageshow", N, false)
			}
			if (!window.opera && document.readyState) {
				(function() {
					O[document.readyState] ? N() : setTimeout(arguments.callee,
							10)
				})()
			}
			if (document.readyState && document.createStyleSheet) {
				(function() {
					try {
						document.body.doScroll("left");
						N()
					} catch (P) {
						setTimeout(arguments.callee, 1)
					}
				})()
			}
			i(window, "load", N);
			return function(P) {
				if (!arguments.length) {
					N()
				} else {
					M ? P() : L.push(P)
				}
			}
		})(),
		root : function() {
			return document.documentElement || document.body
		},
		strict : (function() {
			var L;
			if (document.compatMode == "BackCompat") {
				return false
			}
			L = document.doctype;
			if (L) {
				return !/frameset|transitional/i.test(L.publicId)
			}
			L = document.firstChild;
			if (L.nodeType != 8
					|| /^DOCTYPE.+(transitional|frameset)/i.test(L.data)) {
				return false
			}
			return true
		})()
	};
	var q = e.CSS = {
		Size : function(M, L) {
			this.value = parseFloat(M);
			this.unit = String(M).match(/[a-z%]*$/)[0] || "px";
			this.convert = function(N) {
				return N / L * this.value
			};
			this.convertFrom = function(N) {
				return N / this.value * L
			};
			this.toString = function() {
				return this.value + this.unit
			}
		},
		addClass : function(M, L) {
			var N = M.className;
			M.className = N + (N && " ") + L;
			return M
		},
		color : g(function(M) {
			var L = {};
			L.color = M.replace(/^rgba\((.*?),\s*([\d.]+)\)/,
					function(O, N, P) {
						L.opacity = parseFloat(P);
						return "rgb(" + N + ")"
					});
			return L
		}),
		fontStretch : g(function(L) {
			if (typeof L == "number") {
				return L
			}
			if (/%$/.test(L)) {
				return parseFloat(L) / 100
			}
			return {
				"ultra-condensed" : 0.5,
				"extra-condensed" : 0.625,
				condensed : 0.75,
				"semi-condensed" : 0.875,
				"semi-expanded" : 1.125,
				expanded : 1.25,
				"extra-expanded" : 1.5,
				"ultra-expanded" : 2
			}[L] || 1
		}),
		getStyle : function(M) {
			var L = document.defaultView;
			if (L && L.getComputedStyle) {
				return new A(L.getComputedStyle(M, null))
			}
			if (M.currentStyle) {
				return new A(M.currentStyle)
			}
			return new A(M.style)
		},
		gradient : g(function(P) {
			var Q = {
				id : P,
				type : P.match(/^-([a-z]+)-gradient\(/)[1],
				stops : []
			}, M = P.substr(P.indexOf("(")).match(
					/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);
			for ( var O = 0, L = M.length, N; O < L; ++O) {
				N = M[O].split("=", 2).reverse();
				Q.stops.push([ N[1] || O / (L - 1), N[0] ])
			}
			return Q
		}),
		quotedList : g(function(O) {
			var N = [], M = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g, L;
			while (L = M.exec(O)) {
				N.push(L[3] || L[1])
			}
			return N
		}),
		recognizesMedia : g(function(Q) {
			var O = document.createElement("style"), N, M, L;
			O.type = "text/css";
			O.media = Q;
			try {
				O.appendChild(document.createTextNode("/**/"))
			} catch (P) {
			}
			M = f("head")[0];
			M.insertBefore(O, M.firstChild);
			N = (O.sheet || O.styleSheet);
			L = N && !N.disabled;
			M.removeChild(O);
			return L
		}),
		removeClass : function(N, M) {
			var L = RegExp("(?:^|\\s+)" + M + "(?=\\s|$)", "g");
			N.className = N.className.replace(L, "");
			return N
		},
		supports : function(N, M) {
			var L = document.createElement("span").style;
			if (L[N] === undefined) {
				return false
			}
			L[N] = M;
			return L[N] === M
		},
		textAlign : function(O, N, L, M) {
			if (N.get("textAlign") == "right") {
				if (L > 0) {
					O = " " + O
				}
			} else {
				if (L < M - 1) {
					O += " "
				}
			}
			return O
		},
		textShadow : g(function(P) {
			if (P == "none") {
				return null
			}
			var O = [], Q = {}, L, M = 0;
			var N = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;
			while (L = N.exec(P)) {
				if (L[0] == ",") {
					O.push(Q);
					Q = {};
					M = 0
				} else {
					if (L[1]) {
						Q.color = L[1]
					} else {
						Q[[ "offX", "offY", "blur" ][M++]] = L[2]
					}
				}
			}
			O.push(Q);
			return O
		}),
		textTransform : (function() {
			var L = {
				uppercase : function(M) {
					return M.toUpperCase()
				},
				lowercase : function(M) {
					return M.toLowerCase()
				},
				capitalize : function(M) {
					return M.replace(/(?:^|\s)./g, function(N) {
						return N.toUpperCase()
					})
				}
			};
			return function(O, N) {
				var M = L[N.get("textTransform")];
				return M ? M(O) : O
			}
		})(),
		whiteSpace : (function() {
			var N = {
				inline : 1,
				"inline-block" : 1,
				"run-in" : 1
			};
			var M = /^\s+/, L = /\s+$/;
			return function(R, P, Q, O, S) {
				if (S) {
					return R.replace(M, "").replace(L, "")
				}
				if (O) {
					if (O.nodeName.toLowerCase() == "br") {
						R = R.replace(M, "")
					}
				}
				if (N[P.get("display")]) {
					return R
				}
				if (!Q.previousSibling) {
					R = R.replace(M, "")
				}
				if (!Q.nextSibling) {
					R = R.replace(L, "")
				}
				return R
			}
		})()
	};
	q.ready = (function() {
		var L = !q.recognizesMedia("all"), P = false;
		var O = [], S = function() {
			L = true;
			for ( var V; V = O.shift(); V()) {
			}
		};
		var T = f("link"), U = f("style");
		var M = {
			"" : 1,
			"text/css" : 1
		};
		function N(V) {
			if (!M[V.type.toLowerCase()]) {
				return true
			}
			return V.disabled || R(V.sheet, V.media || "screen")
		}
		function R(X, aa) {
			if (!q.recognizesMedia(aa || "all")) {
				return true
			}
			if (!X || X.disabled) {
				return false
			}
			try {
				var ab = X.cssRules, Z;
				if (ab) {
					search: for ( var W = 0, V = ab.length; Z = ab[W], W < V; ++W) {
						switch (Z.type) {
						case 2:
							break;
						case 3:
							if (!R(Z.styleSheet, Z.media.mediaText)) {
								return false
							}
							break;
						default:
							break search
						}
					}
				}
			} catch (Y) {
			}
			return true
		}
		function Q() {
			if (document.createStyleSheet) {
				return true
			}
			var W, V;
			for (V = 0; W = T[V]; ++V) {
				if (W.rel.toLowerCase() == "stylesheet" && !N(W)) {
					return false
				}
			}
			for (V = 0; W = U[V]; ++V) {
				if (!N(W)) {
					return false
				}
			}
			return true
		}
		v.ready(function() {
			if (!P) {
				P = q.getStyle(document.body).isUsable()
			}
			if (L || (P && Q())) {
				S()
			} else {
				setTimeout(arguments.callee, 10)
			}
		});
		return function(V) {
			if (L) {
				V()
			} else {
				O.push(V)
			}
		}
	})();
	function D(N) {
		var M = this.face = N.face, L = {
			"\u0020" : 1,
			"\u00a0" : 1,
			"\u3000" : 1
		};
		this.glyphs = (function(Q) {
			var P, O = {
				"\u2011" : "\u002d",
				"\u00ad" : "\u2011"
			};
			for (P in O) {
				if (!k(O, P)) {
					continue
				}
				if (!Q[P]) {
					Q[P] = Q[O[P]]
				}
			}
			return Q
		})(N.glyphs);
		this.w = N.w;
		this.baseSize = parseInt(M["units-per-em"], 10);
		this.family = M["font-family"].toLowerCase();
		this.weight = M["font-weight"];
		this.style = M["font-style"] || "normal";
		this.viewBox = (function() {
			var P = M.bbox.split(/\s+/);
			var O = {
				minX : parseInt(P[0], 10),
				minY : parseInt(P[1], 10),
				maxX : parseInt(P[2], 10),
				maxY : parseInt(P[3], 10)
			};
			O.width = O.maxX - O.minX;
			O.height = O.maxY - O.minY;
			O.toString = function() {
				return [ this.minX, this.minY, this.width, this.height ]
						.join(" ")
			};
			return O
		})();
		this.ascent = -parseInt(M.ascent, 10);
		this.descent = -parseInt(M.descent, 10);
		this.height = -this.ascent + this.descent;
		this.spacing = function(V, Y, O) {
			var Z = this.glyphs, W, U, Q, aa = [], P = 0, X, T = -1, S = -1, R;
			while (R = V[++T]) {
				W = Z[R] || this.missingGlyph;
				if (!W) {
					continue
				}
				if (U) {
					P -= Q = U[R] || 0;
					aa[S] -= Q
				}
				X = W.w;
				if (isNaN(X)) {
					X = +this.w
				}
				if (X > 0) {
					X += Y;
					if (L[R]) {
						X += O
					}
				}
				P += aa[++S] = ~~X;
				U = W.k
			}
			aa.total = P;
			return aa
		}
	}
	function s() {
		var M = {}, L = {
			oblique : "italic",
			italic : "oblique"
		};
		this.add = function(N) {
			(M[N.style] || (M[N.style] = {}))[N.weight] = N
		};
		this.get = function(R, S) {
			var Q = M[R] || M[L[R]] || M.normal || M.italic || M.oblique;
			if (!Q) {
				return null
			}
			S = {
				normal : 400,
				bold : 700
			}[S] || parseInt(S, 10);
			if (Q[S]) {
				return Q[S]
			}
			var O = {
				1 : 1,
				99 : 0
			}[S % 100], U = [], P, N;
			if (O === undefined) {
				O = S > 400
			}
			if (S == 500) {
				S = 400
			}
			for ( var T in Q) {
				if (!k(Q, T)) {
					continue
				}
				T = parseInt(T, 10);
				if (!P || T < P) {
					P = T
				}
				if (!N || T > N) {
					N = T
				}
				U.push(T)
			}
			if (S < P) {
				S = P
			}
			if (S > N) {
				S = N
			}
			U.sort(function(W, V) {
				return (O ? (W >= S && V >= S) ? W < V : W > V
						: (W <= S && V <= S) ? W > V : W < V) ? -1 : 1
			});
			return Q[U[0]]
		}
	}
	function n() {
		function N(P, R) {
			try {
				if (P.contains) {
					return P.contains(R)
				}
				return P.compareDocumentPosition(R) & 16
			} catch (Q) {
			}
			return false
		}
		function L(Q) {
			var P = Q.relatedTarget;
			if (P && N(this, P)) {
				return
			}
			M(this, Q.type == "mouseover")
		}
		function O(P) {
			if (!P) {
				P = window.event
			}
			M(P.target || P.srcElement, P.type == "mouseenter")
		}
		function M(P, Q) {
			setTimeout(function() {
				var R = d.get(P).options;
				if (Q) {
					R = C(R, R.hover);
					R._mediatorMode = 1
				}
				e.replace(P, R, true)
			}, 10)
		}
		this.attach = function(P) {
			if (P.onmouseenter === undefined) {
				i(P, "mouseover", L);
				i(P, "mouseout", L)
			} else {
				i(P, "mouseenter", O);
				i(P, "mouseleave", O)
			}
		};
		this.detach = function(P) {
			if (P.onmouseenter === undefined) {
				//c(P, "mouseover", L);
				//c(P, "mouseout", L)
			} else {
				//c(P, "mouseenter", O);
				//c(P, "mouseleave", O)
			}
		}
	}
	function w() {
		var M = [], N = {};
		function L(R) {
			var O = [], Q;
			for ( var P = 0; Q = R[P]; ++P) {
				O[P] = M[N[Q]]
			}
			return O
		}
		this.add = function(P, O) {
			N[P] = M.push(O) - 1
		};
		this.repeat = function() {
			var O = arguments.length ? L(arguments) : M, P;
			for ( var Q = 0; P = O[Q++];) {
				e.replace(P[0], P[1], true)
			}
		}
	}
	function z() {
		var N = {}, L = 0;
		function M(O) {
			return O.cufid || (O.cufid = ++L)
		}
		this.get = function(O) {
			var P = M(O);
			return N[P] || (N[P] = {})
		}
	}
	function A(L) {
		var N = {}, M = {};
		this.extend = function(O) {
			for ( var P in O) {
				if (k(O, P)) {
					N[P] = O[P]
				}
			}
			return this
		};
		this.get = function(O) {
			return N[O] != undefined ? N[O] : L[O]
		};
		this.getSize = function(P, O) {
			return M[P] || (M[P] = new q.Size(this.get(P), O))
		};
		this.isUsable = function() {
			return !!L
		}
	}
	function i(M, L, N) {
		if (M.addEventListener) {
			M.addEventListener(L, N, false)
		} else {
			if (M.attachEvent) {
				M.attachEvent("on" + L, N)
			}
		}
	}
	function r(N, M) {
		if (M._mediatorMode) {
			return N
		}
		var O = d.get(N);
		var L = O.options;
		if (L) {
			if (L === M) {
				return N
			}
			if (L.hover) {
				u.detach(N)
			}
		}
		if (M.hover && M.hoverables[N.nodeName.toLowerCase()]) {
			u.attach(N)
		}
		O.options = M;
		return N
	}
	function g(L) {
		var M = {};
		return function(N) {
			if (!k(M, N)) {
				M[N] = L.apply(null, arguments)
			}
			return M[N]
		}
	}
	function t(P, O) {
		var L = q.quotedList(O.get("fontFamily").toLowerCase()), N;
		for ( var M = 0; N = L[M]; ++M) {
			if (G[N]) {
				return G[N].get(O.get("fontStyle"), O.get("fontWeight"))
			}
		}
		return null
	}
	function f(L) {
		return document.getElementsByTagName(L)
	}
	function k(M, L) {
		return M.hasOwnProperty(L)
	}
	function C() {
		var M = {}, L, P;
		for ( var O = 0, N = arguments.length; L = arguments[O], O < N; ++O) {
			for (P in L) {
				if (k(L, P)) {
					M[P] = L[P]
				}
			}
		}
		return M
	}
	function J(O, W, M, X, P, N) {
		var U = document.createDocumentFragment(), R;
		if (W === "") {
			return U
		}
		var V = X.separate;
		var S = W.split(y[V]), L = (V == "words");
		if (L && x) {
			if (/^\s/.test(W)) {
				S.unshift("")
			}
			if (/\s$/.test(W)) {
				S.push("")
			}
		}
		for ( var T = 0, Q = S.length; T < Q; ++T) {
			R = b[X.engine](O, L ? q.textAlign(S[T], M, T, Q) : S[T], M, X, P,
					N, T < Q - 1);
			if (R) {
				U.appendChild(R)
			}
		}
		return U
	}
	function c(M, L, N) {
		if (M.removeEventListener) {
			M.removeEventListener(L, N, false)
		} else {
			if (M.detachEvent) {
				M.detachEvent("on" + L, N)
			}
		}
	}
	function I(M, O) {
		var ad = M.nodeName.toLowerCase();
		if (O.ignore[ad]) {
			return
		}
		if (O.ignoreClass && O.ignoreClass.test(M.className)) {
			return
		}
		if (O.onBeforeReplace) {
			O.onBeforeReplace(M, O)
		}
		var ac = !O.textless[ad], Z = (O.trim === "simple");
		var aa = q.getStyle(r(M, O)).extend(O);
		if (parseFloat(aa.get("fontSize")) === 0) {
			return
		}
		var V = t(M, aa), Y, P, W, R, U, ab;
		var X = O.softHyphens, T = false, Q, S, N = /\u00ad/g;
		var L = O.modifyText;
		if (!V) {
			return
		}
		for (Y = M.firstChild; Y; Y = W) {
			P = Y.nodeType;
			W = Y.nextSibling;
			if (ac && P == 3) {
				if (X && M.nodeName.toLowerCase() != o) {
					Q = Y.data.indexOf("\u00ad");
					if (Q >= 0) {
						Y.splitText(Q);
						W = Y.nextSibling;
						W.deleteData(0, 1);
						S = document.createElement(o);
						S.appendChild(document.createTextNode("\u00ad"));
						M.insertBefore(S, W);
						W = S;
						T = true
					}
				}
				if (R) {
					R.appendData(Y.data);
					M.removeChild(Y)
				} else {
					R = Y
				}
				if (W) {
					continue
				}
			}
			if (R) {
				U = R.data;
				if (!X) {
					U = U.replace(N, "")
				}
				U = q.whiteSpace(U, aa, R, ab, Z);
				if (L) {
					U = L(U, R, M, O)
				}
				M.replaceChild(J(V, U, aa, O, Y, M), R);
				R = null
			}
			if (P == 1) {
				if (Y.firstChild) {
					if (Y.nodeName.toLowerCase() == "cufon") {
						b[O.engine](V, null, aa, O, Y, M)
					} else {
						arguments.callee(Y, O)
					}
				}
				ab = Y
			}
		}
		if (X && T) {
			E(M);
			if (!l) {
				i(window, "resize", j)
			}
			l = true
		}
		if (O.onAfterReplace) {
			O.onAfterReplace(M, O)
		}
	}
	function E(M) {
		var R, S, T, Q, L, P, N, O;
		R = M.getElementsByTagName(o);
		for (O = 0; S = R[O]; ++O) {
			S.className = h;
			Q = T = S.parentNode;
			if (Q.nodeName.toLowerCase() != p) {
				L = document.createElement(p);
				L.appendChild(S.previousSibling);
				T.insertBefore(L, S);
				L.appendChild(S)
			} else {
				Q = Q.parentNode;
				if (Q.nodeName.toLowerCase() == p) {
					T = Q.parentNode;
					while (Q.firstChild) {
						T.insertBefore(Q.firstChild, Q)
					}
					T.removeChild(Q)
				}
			}
		}
		for (O = 0; S = R[O]; ++O) {
			S.className = "";
			Q = S.parentNode;
			T = Q.parentNode;
			P = Q.nextSibling || T.nextSibling;
			N = (P.nodeName.toLowerCase() == p) ? Q : S.previousSibling;
			if (N.offsetTop >= P.offsetTop) {
				S.className = h;
				if (N.offsetTop < P.offsetTop) {
					L = document.createElement(p);
					T.insertBefore(L, Q);
					L.appendChild(Q);
					L.appendChild(P)
				}
			}
		}
	}
	function j() {
		if (B) {
			return
		}
		q.addClass(v.root(), K);
		clearTimeout(a);
		a = setTimeout(function() {
			B = true;
			q.removeClass(v.root(), K);
			E(document);
			B = false
		}, 100)
	}
	var x = " ".split(/\s+/).length == 0;
	var p = "cufonglue";
	var o = "cufonshy";
	var h = "cufon-shy-disabled";
	var K = "cufon-viewport-resizing";
	var d = new z();
	var u = new n();
	var H = new w();
	var m = false;
	var l = false;
	var a;
	var B = false;
	var b = {}, G = {}, F = {
		autoDetect : false,
		engine : null,
		forceHitArea : false,
		hover : false,
		hoverables : {
			a : true
		},
		ignore : {
			applet : 1,
			canvas : 1,
			col : 1,
			colgroup : 1,
			head : 1,
			iframe : 1,
			map : 1,
			noscript : 1,
			optgroup : 1,
			option : 1,
			script : 1,
			select : 1,
			style : 1,
			textarea : 1,
			title : 1,
			pre : 1
		},
		ignoreClass : null,
		modifyText : null,
		onAfterReplace : null,
		onBeforeReplace : null,
		printable : true,
		selector : (window.Sizzle
				|| (window.jQuery && function(L) {
					return jQuery(L)
				})
				|| (window.dojo && dojo.query)
				|| (window.glow && glow.dom && glow.dom.get)
				|| (window.Ext && Ext.query)
				|| (window.YAHOO && YAHOO.util && YAHOO.util.Selector && YAHOO.util.Selector.query)
				|| (window.$$ && function(L) {
					return $$(L)
				}) || (window.$ && function(L) {
					return $(L)
				}) || (document.querySelectorAll && function(L) {
					return document.querySelectorAll(L)
				}) || f),
		separate : "words",
		softHyphens : true,
		textless : {
			dl : 1,
			html : 1,
			ol : 1,
			table : 1,
			tbody : 1,
			thead : 1,
			tfoot : 1,
			tr : 1,
			ul : 1
		},
		textShadow : "none",
		trim : "advanced"
	};
	var y = {
		words : /\s/.test("\u00a0") ? /[^\S\u00a0]+/ : /\s+/,
		characters : "",
		none : /^/
	};
	e.now = function() {
		v.ready();
		return e
	};
	e.refresh = function() {
		H.repeat.apply(H, arguments);
		return e
	};
	e.registerEngine = function(M, L) {
		if (!L) {
			return e
		}
		b[M] = L;
		return e.set("engine", M)
	};
	e.registerFont = function(N) {
		if (!N) {
			return e
		}
		var L = new D(N), M = L.family;
		if (!G[M]) {
			G[M] = new s()
		}
		G[M].add(L);
		return e.set("fontFamily", '"' + M + '"')
	};
	e.replace = function(N, M, L) {
		M = C(F, M);
		if (!M.engine) {
			return e
		}
		if (!m) {
			q.addClass(v.root(), "cufon-active cufon-loading");
			q.ready(function() {
				q.addClass(q.removeClass(v.root(), "cufon-loading"),
						"cufon-ready")
			});
			m = true
		}
		if (M.hover) {
			M.forceHitArea = true
		}
		if (M.autoDetect) {
			delete M.fontFamily
		}
		if (typeof M.ignoreClass == "string") {
			M.ignoreClass = new RegExp("(?:^|\\s)(?:"
					+ M.ignoreClass.replace(/\s+/g, "|") + ")(?:\\s|$)")
		}
		if (typeof M.textShadow == "string") {
			M.textShadow = q.textShadow(M.textShadow)
		}
		if (typeof M.color == "string" && /^-/.test(M.color)) {
			M.textGradient = q.gradient(M.color)
		} else {
			delete M.textGradient
		}
		if (typeof N == "string") {
			if (!L) {
				H.add(N, arguments)
			}
			N = [ N ]
		} else {
			if (N.nodeType) {
				N = [ N ]
			}
		}
		q.ready(function() {
			for ( var P = 0, O = N.length; P < O; ++P) {
				var Q = N[P];
				if (typeof Q == "string") {
					e.replace(M.selector(Q), M, true)
				} else {
					I(Q, M)
				}
			}
		});
		return e
	};
	e.set = function(L, M) {
		F[L] = M;
		return e
	};
	return e
})();
Cufon
		.registerEngine(
				"vml",
				(function() {
					var e = document.namespaces;
					if (!e) {
						return
					}
					e.add("cvml", "urn:schemas-microsoft-com:vml");
					e = null;
					var b = document.createElement("cvml:shape");
					b.style.behavior = "url(#default#VML)";
					if (!b.coordsize) {
						return
					}
					b = null;
					var h = (document.documentMode || 0) < 8;
					document
							.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'
									+ (h ? "middle" : "text-bottom") + ";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;text-align:left;}cufonshy.cufon-shy-disabled,.cufon-viewport-resizing cufonshy{display:none;}cufonglue{white-space:nowrap;display:inline-block;}.cufon-viewport-resizing cufonglue{white-space:normal;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>")
									.replace(/;/g, "!important;"));
					function c(i, j) {
						return a(i, /(?:em|ex|%)$|^[a-z-]+$/i.test(j) ? "1em"
								: j)
					}
					function a(l, m) {
						if (!isNaN(m) || /px$/i.test(m)) {
							return parseFloat(m)
						}
						var k = l.style.left, j = l.runtimeStyle.left;
						l.runtimeStyle.left = l.currentStyle.left;
						l.style.left = m.replace("%", "em");
						var i = l.style.pixelLeft;
						l.style.left = k;
						l.runtimeStyle.left = j;
						return i
					}
					function f(l, k, j, n) {
						var i = "computed" + n, m = k[i];
						if (isNaN(m)) {
							m = k.get(n);
							k[i] = m = (m == "normal") ? 0 : ~~j.convertFrom(a(
									l, m))
						}
						return m
					}
					var g = {};
					function d(p) {
						var q = p.id;
						if (!g[q]) {
							var n = p.stops, o = document
									.createElement("cvml:fill"), i = [];
							o.type = "gradient";
							o.angle = 180;
							o.focus = "0";
							o.method = "none";
							o.color = n[0][1];
							for ( var m = 1, l = n.length - 1; m < l; ++m) {
								i.push(n[m][0] * 100 + "% " + n[m][1])
							}
							o.colors = i.join(",");
							o.color2 = n[l][1];
							g[q] = o
						}
						return g[q]
					}
					return function(ac, G, Y, C, K, ad, W) {
						var n = (G === null);
						if (n) {
							G = K.alt
						}
						var I = ac.viewBox;
						var p = Y.computedFontSize
								|| (Y.computedFontSize = new Cufon.CSS.Size(c(
										ad, Y.get("fontSize"))
										+ "px", ac.baseSize));
						var y, q;
						if (n) {
							y = K;
							q = K.firstChild
						} else {
							y = document.createElement("cufon");
							y.className = "cufon cufon-vml";
							y.alt = G;
							q = document.createElement("cufoncanvas");
							y.appendChild(q);
							if (C.printable) {
								var Z = document.createElement("cufontext");
								Z.appendChild(document.createTextNode(G));
								y.appendChild(Z)
							}
							if (!W) {
								y.appendChild(document
										.createElement("cvml:shape"))
							}
						}
						var ai = y.style;
						var R = q.style;
						var l = p.convert(I.height), af = Math.ceil(l);
						var V = af / l;
						var P = V * Cufon.CSS.fontStretch(Y.get("fontStretch"));
						var U = I.minX, T = I.minY;
						R.height = af;
						R.top = Math.round(p.convert(T - ac.ascent));
						R.left = Math.round(p.convert(U));
						ai.height = p.convert(ac.height) + "px";
						var F = Y.get("color");
						var ag = Cufon.CSS.textTransform(G, Y).split("");
						var L = ac.spacing(ag, f(ad, Y, p, "letterSpacing"), f(
								ad, Y, p, "wordSpacing"));
						if (!L.length) {
							return null
						}
						var k = L.total;
						var x = -U + k + (I.width - L[L.length - 1]);
						var ah = p.convert(x * P), X = Math.round(ah);
						var O = x + "," + I.height, m;
						var J = "r" + O + "ns";
						var u = C.textGradient && d(C.textGradient);
						var o = ac.glyphs, S = 0;
						var H = C.textShadow;
						var ab = -1, aa = 0, w;
						while (w = ag[++ab]) {
							var D = o[ag[ab]] || ac.missingGlyph, v;
							if (!D) {
								continue
							}
							if (n) {
								v = q.childNodes[aa];
								while (v.firstChild) {
									v.removeChild(v.firstChild)
								}
							} else {
								v = document.createElement("cvml:shape");
								q.appendChild(v)
							}
							v.stroked = "f";
							v.coordsize = O;
							v.coordorigin = m = (U - S) + "," + T;
							v.path = (D.d ? "m" + D.d + "xe" : "") + "m" + m
									+ J;
							v.fillcolor = F;
							if (u) {
								v.appendChild(u.cloneNode(false))
							}
							var ae = v.style;
							ae.width = X;
							ae.height = af;
							if (H) {
								var s = H[0], r = H[1];
								var B = Cufon.CSS.color(s.color), z;
								var N = document.createElement("cvml:shadow");
								N.on = "t";
								N.color = B.color;
								N.offset = s.offX + "," + s.offY;
								if (r) {
									z = Cufon.CSS.color(r.color);
									N.type = "double";
									N.color2 = z.color;
									N.offset2 = r.offX + "," + r.offY
								}
								N.opacity = B.opacity || (z && z.opacity) || 1;
								v.appendChild(N)
							}
							S += L[aa++]
						}
						var M = v.nextSibling, t, A;
						if (C.forceHitArea) {
							if (!M) {
								M = document.createElement("cvml:rect");
								M.stroked = "f";
								M.className = "cufon-vml-cover";
								t = document.createElement("cvml:fill");
								t.opacity = 0;
								M.appendChild(t);
								q.appendChild(M)
							}
							A = M.style;
							A.width = X;
							A.height = af
						} else {
							if (M) {
								q.removeChild(M)
							}
						}
						ai.width = Math.max(Math.ceil(p.convert(k * P)), 0);
						if (h) {
							var Q = Y.computedYAdjust;
							if (Q === undefined) {
								var E = Y.get("lineHeight");
								if (E == "normal") {
									E = "1em"
								} else {
									if (!isNaN(E)) {
										E += "em"
									}
								}
								Y.computedYAdjust = Q = 0.5 * (a(ad, E) - parseFloat(ai.height))
							}
							if (Q) {
								ai.marginTop = Math.ceil(Q) + "px";
								ai.marginBottom = Q + "px"
							}
						}
						return y
					}
				})());
Cufon
		.registerEngine(
				"canvas",
				(function() {
					var b = document.createElement("canvas");
					if (!b || !b.getContext || !b.getContext.apply) {
						return
					}
					b = null;
					var a = Cufon.CSS.supports("display", "inline-block");
					var e = !a
							&& (document.compatMode == "BackCompat" || /frameset|transitional/i
									.test(document.doctype.publicId));
					var f = document.createElement("style");
					f.type = "text/css";
					f
							.appendChild(document
									.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"
											+ (e ? ""
													: "font-size:1px;line-height:1px;")
											+ "}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;text-align:left;text-indent:-10000in;}"
											+ (a ? "cufon canvas{position:relative;}"
													: "cufon canvas{position:absolute;}") + "cufonshy.cufon-shy-disabled,.cufon-viewport-resizing cufonshy{display:none;}cufonglue{white-space:nowrap;display:inline-block;}.cufon-viewport-resizing cufonglue{white-space:normal;}}@media print{cufon{padding:0;}cufon canvas{display:none;}}")
											.replace(/;/g, "!important;")));
					document.getElementsByTagName("head")[0].appendChild(f);
					function d(p, h) {
						var n = 0, m = 0;
						var g = [], o = /([mrvxe])([^a-z]*)/g, k;
						generate: for ( var j = 0; k = o.exec(p); ++j) {
							var l = k[2].split(",");
							switch (k[1]) {
							case "v":
								g[j] = {
									m : "bezierCurveTo",
									a : [ n + ~~l[0], m + ~~l[1], n + ~~l[2],
											m + ~~l[3], n += ~~l[4],
											m += ~~l[5] ]
								};
								break;
							case "r":
								g[j] = {
									m : "lineTo",
									a : [ n += ~~l[0], m += ~~l[1] ]
								};
								break;
							case "m":
								g[j] = {
									m : "moveTo",
									a : [ n = ~~l[0], m = ~~l[1] ]
								};
								break;
							case "x":
								g[j] = {
									m : "closePath"
								};
								break;
							case "e":
								break generate
							}
							h[g[j].m].apply(h, g[j].a)
						}
						return g
					}
					function c(m, k) {
						for ( var j = 0, h = m.length; j < h; ++j) {
							var g = m[j];
							k[g.m].apply(k, g.a)
						}
					}
					return function(W, w, P, t, C, X) {
						var k = (w === null);
						if (k) {
							w = C.getAttribute("alt")
						}
						var A = W.viewBox;
						var m = P.getSize("fontSize", W.baseSize);
						var B = 0, O = 0, N = 0, u = 0;
						var z = t.textShadow, L = [];
						if (z) {
							for ( var V = z.length; V--;) {
								var F = z[V];
								var K = m.convertFrom(parseFloat(F.offX));
								var I = m.convertFrom(parseFloat(F.offY));
								L[V] = [ K, I ];
								if (I < B) {
									B = I
								}
								if (K > O) {
									O = K
								}
								if (I > N) {
									N = I
								}
								if (K < u) {
									u = K
								}
							}
						}
						var aa = Cufon.CSS.textTransform(w, P).split("");
						var E = W.spacing(aa, ~~m.convertFrom(parseFloat(P
								.get("letterSpacing")) || 0),
								~~m
										.convertFrom(parseFloat(P
												.get("wordSpacing")) || 0));
						if (!E.length) {
							return null
						}
						var h = E.total;
						O += A.width - E[E.length - 1];
						u += A.minX;
						var s, n;
						if (k) {
							s = C;
							n = C.firstChild
						} else {
							s = document.createElement("cufon");
							s.className = "cufon cufon-canvas";
							s.setAttribute("alt", w);
							n = document.createElement("canvas");
							s.appendChild(n);
							if (t.printable) {
								var T = document.createElement("cufontext");
								T.appendChild(document.createTextNode(w));
								s.appendChild(T)
							}
						}
						var ab = s.style;
						var H = n.style;
						var j = m.convert(A.height);
						var Z = Math.ceil(j);
						var M = Z / j;
						var G = M * Cufon.CSS.fontStretch(P.get("fontStretch"));
						var J = h * G;
						var Q = Math.ceil(m.convert(J + O - u));
						var o = Math.ceil(m.convert(A.height - B + N));
						n.width = Q;
						n.height = o;
						H.width = Q + "px";
						H.height = o + "px";
						B += A.minY;
						H.top = Math.round(m.convert(B - W.ascent)) + "px";
						H.left = Math.round(m.convert(u)) + "px";
						var r = Math.max(Math.ceil(m.convert(J)), 0) + "px";
						if (a) {
							ab.width = r;
							ab.height = m.convert(W.height) + "px"
						} else {
							ab.paddingLeft = r;
							ab.paddingBottom = (m.convert(W.height) - 1) + "px"
						}
						var Y = n.getContext("2d"), D = j / A.height;
						var S = window.devicePixelRatio || 1;
						if (S != 1) {
							n.width = Q * S;
							n.height = o * S;
							Y.scale(S, S)
						}
						Y.scale(D, D * M);
						Y.translate(-u, -B);
						Y.save();
						function U() {
							var x = W.glyphs, ac, l = -1, g = -1, y;
							Y.scale(G, 1);
							while (y = aa[++l]) {
								var ac = x[aa[l]] || W.missingGlyph;
								if (!ac) {
									continue
								}
								if (ac.d) {
									Y.beginPath();
									if (ac.code) {
										c(ac.code, Y)
									} else {
										ac.code = d("m" + ac.d, Y)
									}
									Y.fill()
								}
								Y.translate(E[++g], 0)
							}
							Y.restore()
						}
						if (z) {
							for ( var V = z.length; V--;) {
								var F = z[V];
								Y.save();
								Y.fillStyle = F.color;
								Y.translate.apply(Y, L[V]);
								U()
							}
						}
						var q = t.textGradient;
						if (q) {
							var v = q.stops, p = Y.createLinearGradient(0,
									A.minY, 0, A.maxY);
							for ( var V = 0, R = v.length; V < R; ++V) {
								p.addColorStop.apply(p, v[V])
							}
							Y.fillStyle = p
						} else {
							Y.fillStyle = P.get("color")
						}
						U();
						return s
					}
				})());