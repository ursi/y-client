// output/Main/foreign.js
var initialize_f = (mk2Tuple) => (freshUid) => (freshCid) => () => {
  let userId = localStorage.getItem("userId");
  if (!userId)
    userId = freshUid;
  localStorage.setItem("userId", userId);
  const convoId = new URL(window.location.href).searchParams.get("convo");
  if (!convoId)
    window.location.href += "?convo=" + freshCid;
  return mk2Tuple(userId)(convoId);
};
var dateString = (ms) => new Date(ms);
var sendNotification = (playSound) => (soundUrl) => (person) => (message2) => () => {
  if (!document.hasFocus()) {
    if (playSound)
      new Audio(soundUrl).play();
    new Notification(`\u2144`, { body: person + ":\n" + message2 }).onclick = function() {
      focus(window);
      this.close();
    };
  }
};
var notificationsPermission = () => Notification.requestPermission();
var isSelecting = () => getSelection().type === `Range`;
var hasFocus = () => document.hasFocus();
var setItem = (key3) => (value5) => () => localStorage[key3] = value5;
var getItemImpl = (Nothing2) => (Just2) => (key3) => () => {
  const x = localStorage[key3];
  return x === void 0 ? Nothing2 : Just2(x);
};

// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};
var compose = function(dict) {
  return dict.compose;
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Boolean/index.js
var otherwise = true;

// output/Data.Function/index.js
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Type.Proxy/index.js
var $$Proxy = /* @__PURE__ */ function() {
  function $$Proxy2() {
  }
  ;
  $$Proxy2.value = new $$Proxy2();
  return $$Proxy2;
}();

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  var map110 = map(dictFunctor);
  return function(fa) {
    return function(f) {
      return map110(f)(fa);
    };
  };
};
var functorFn = {
  map: /* @__PURE__ */ compose(semigroupoidFn)
};
var functorArray = {
  map: arrayMap
};

// output/Control.Apply/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var applyFn = {
  apply: function(f) {
    return function(g) {
      return function(x) {
        return f(x)(g(x));
      };
    };
  },
  Functor0: function() {
    return functorFn;
  }
};
var apply = function(dict) {
  return dict.apply;
};
var applySecond = function(dictApply) {
  var apply1 = apply(dictApply);
  var map27 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map27($$const(identity2))(a))(b);
    };
  };
};
var lift2 = function(dictApply) {
  var apply1 = apply(dictApply);
  var map27 = map(dictApply.Functor0());
  return function(f) {
    return function(a) {
      return function(b) {
        return apply1(map27(f)(a))(b);
      };
    };
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var when = function(dictApplicative) {
  var pure17 = pure(dictApplicative);
  return function(v) {
    return function(v1) {
      if (v) {
        return v1;
      }
      ;
      if (!v) {
        return pure17(unit);
      }
      ;
      throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
};
var liftA1 = function(dictApplicative) {
  var apply5 = apply(dictApplicative.Apply0());
  var pure17 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply5(pure17(f))(a);
    };
  };
};

// output/Control.Bind/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var discard = function(dict) {
  return dict.discard;
};
var bindFn = {
  bind: function(m) {
    return function(f) {
      return function(x) {
        return f(m(x))(x);
      };
    };
  },
  Apply0: function() {
    return applyFn;
  }
};
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var composeKleisliFlipped = function(dictBind) {
  var bindFlipped1 = bindFlipped(dictBind);
  return function(f) {
    return function(g) {
      return function(a) {
        return bindFlipped1(f)(g(a));
      };
    };
  };
};
var composeKleisli = function(dictBind) {
  var bind15 = bind(dictBind);
  return function(f) {
    return function(g) {
      return function(a) {
        return bind15(f(a))(g);
      };
    };
  };
};
var discardUnit = {
  discard: function(dictBind) {
    return bind(dictBind);
  }
};
var join = function(dictBind) {
  var bind15 = bind(dictBind);
  return function(m) {
    return bind15(m)(identity3);
  };
};

// output/Data.Array/foreign.js
var replicateFill = function(count) {
  return function(value5) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value5);
  };
};
var replicatePolyfill = function(count) {
  return function(value5) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value5;
    }
    return result;
  };
};
var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons3(head6, tail2) {
    this.head = head6;
    this.tail = tail2;
  }
  var emptyList = {};
  function curryCons(head6) {
    return function(tail2) {
      return new Cons3(head6, tail2);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr6) {
    return function(xs) {
      return listToArray(foldr6(curryCons)(emptyList)(xs));
    };
  };
}();
var length = function(xs) {
  return xs.length;
};
var unconsImpl = function(empty6) {
  return function(next) {
    return function(xs) {
      return xs.length === 0 ? empty6({}) : next(xs[0])(xs.slice(1));
    };
  };
};
var indexImpl = function(just) {
  return function(nothing) {
    return function(xs) {
      return function(i) {
        return i < 0 || i >= xs.length ? nothing : just(xs[i]);
      };
    };
  };
};
var findIndexImpl = function(just) {
  return function(nothing) {
    return function(f) {
      return function(xs) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (f(xs[i]))
            return just(i);
        }
        return nothing;
      };
    };
  };
};
var _deleteAt = function(just) {
  return function(nothing) {
    return function(i) {
      return function(l) {
        if (i < 0 || i >= l.length)
          return nothing;
        var l1 = l.slice();
        l1.splice(i, 1);
        return just(l1);
      };
    };
  };
};
var reverse = function(l) {
  return l.slice().reverse();
};
var sortByImpl = function() {
  function mergeFromTo(compare5, fromOrdering, xs1, xs2, from3, to2) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to2 - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare5, fromOrdering, xs2, xs1, from3, mid);
    if (to2 - mid > 1)
      mergeFromTo(compare5, fromOrdering, xs2, xs1, mid, to2);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to2) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare5(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to2) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare5) {
    return function(fromOrdering) {
      return function(xs) {
        var out;
        if (xs.length < 2)
          return xs;
        out = xs.slice(0);
        mergeFromTo(compare5, fromOrdering, out, xs.slice(0), 0, xs.length);
        return out;
      };
    };
  };
}();
var slice = function(s) {
  return function(e) {
    return function(l) {
      return l.slice(s, e);
    };
  };
};
var unsafeIndexImpl = function(xs) {
  return function(n) {
    return xs[n];
  };
};

// output/Data.Semigroup/foreign.js
var concatString = function(s1) {
  return function(s2) {
    return s1 + s2;
  };
};
var concatArray = function(xs) {
  return function(ys) {
    if (xs.length === 0)
      return ys;
    if (ys.length === 0)
      return xs;
    return xs.concat(ys);
  };
};

// output/Data.Symbol/index.js
var reflectSymbol = function(dict) {
  return dict.reflectSymbol;
};

// output/Record.Unsafe/foreign.js
var unsafeGet = function(label) {
  return function(rec) {
    return rec[label];
  };
};
var unsafeSet = function(label) {
  return function(value5) {
    return function(rec) {
      var copy = {};
      for (var key3 in rec) {
        if ({}.hasOwnProperty.call(rec, key3)) {
          copy[key3] = rec[key3];
        }
      }
      copy[label] = value5;
      return copy;
    };
  };
};

// output/Data.Semigroup/index.js
var semigroupUnit = {
  append: function(v) {
    return function(v1) {
      return unit;
    };
  }
};
var semigroupString = {
  append: concatString
};
var semigroupRecordNil = {
  appendRecord: function(v) {
    return function(v1) {
      return function(v2) {
        return {};
      };
    };
  }
};
var semigroupArray = {
  append: concatArray
};
var appendRecord = function(dict) {
  return dict.appendRecord;
};
var semigroupRecord = function() {
  return function(dictSemigroupRecord) {
    return {
      append: appendRecord(dictSemigroupRecord)($$Proxy.value)
    };
  };
};
var append = function(dict) {
  return dict.append;
};
var semigroupRecordCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function(dictSemigroupRecord) {
      var appendRecord1 = appendRecord(dictSemigroupRecord);
      return function(dictSemigroup) {
        var append15 = append(dictSemigroup);
        return {
          appendRecord: function(v) {
            return function(ra) {
              return function(rb) {
                var tail2 = appendRecord1($$Proxy.value)(ra)(rb);
                var key3 = reflectSymbol2($$Proxy.value);
                var insert8 = unsafeSet(key3);
                var get3 = unsafeGet(key3);
                return insert8(append15(get3(ra))(get3(rb)))(tail2);
              };
            };
          }
        };
      };
    };
  };
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind15 = bind(dictMonad.Bind1());
  var pure17 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind15(f)(function(f$prime) {
        return bind15(a)(function(a$prime) {
          return pure17(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Bounded/foreign.js
var topInt = 2147483647;
var bottomInt = -2147483648;
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq8) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq8 : gt;
        };
      };
    };
  };
};
var ordBooleanImpl = unsafeCompareImpl;
var ordIntImpl = unsafeCompareImpl;
var ordNumberImpl = unsafeCompareImpl;
var ordStringImpl = unsafeCompareImpl;
var ordCharImpl = unsafeCompareImpl;

// output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqBooleanImpl = refEq;
var eqIntImpl = refEq;
var eqNumberImpl = refEq;
var eqCharImpl = refEq;
var eqStringImpl = refEq;
var eqArrayImpl = function(f) {
  return function(xs) {
    return function(ys) {
      if (xs.length !== ys.length)
        return false;
      for (var i = 0; i < xs.length; i++) {
        if (!f(xs[i])(ys[i]))
          return false;
      }
      return true;
    };
  };
};

// output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqNumber = {
  eq: eqNumberImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eqChar = {
  eq: eqCharImpl
};
var eqBoolean = {
  eq: eqBooleanImpl
};
var eq = function(dict) {
  return dict.eq;
};
var eq2 = /* @__PURE__ */ eq(eqBoolean);
var eqArray = function(dictEq) {
  return {
    eq: eqArrayImpl(eq(dictEq))
  };
};
var notEq = function(dictEq) {
  var eq33 = eq(dictEq);
  return function(x) {
    return function(y) {
      return eq2(eq33(x)(y))(false);
    };
  };
};

// output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {
  }
  ;
  LT2.value = new LT2();
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {
  }
  ;
  GT2.value = new GT2();
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {
  }
  ;
  EQ2.value = new EQ2();
  return EQ2;
}();
var eqOrdering = {
  eq: function(v) {
    return function(v1) {
      if (v instanceof LT && v1 instanceof LT) {
        return true;
      }
      ;
      if (v instanceof GT && v1 instanceof GT) {
        return true;
      }
      ;
      if (v instanceof EQ && v1 instanceof EQ) {
        return true;
      }
      ;
      return false;
    };
  }
};

// output/Data.Ring/foreign.js
var intSub = function(x) {
  return function(y) {
    return x - y | 0;
  };
};

// output/Data.Semiring/foreign.js
var intAdd = function(x) {
  return function(y) {
    return x + y | 0;
  };
};
var intMul = function(x) {
  return function(y) {
    return x * y | 0;
  };
};

// output/Data.Semiring/index.js
var zero = function(dict) {
  return dict.zero;
};
var semiringInt = {
  add: intAdd,
  zero: 0,
  mul: intMul,
  one: 1
};
var one = function(dict) {
  return dict.one;
};
var mul = function(dict) {
  return dict.mul;
};
var add = function(dict) {
  return dict.add;
};

// output/Data.Ring/index.js
var sub = function(dict) {
  return dict.sub;
};
var ringInt = {
  sub: intSub,
  Semiring0: function() {
    return semiringInt;
  }
};

// output/Data.Ord/index.js
var ordString = /* @__PURE__ */ function() {
  return {
    compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqString;
    }
  };
}();
var ordNumber = /* @__PURE__ */ function() {
  return {
    compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqNumber;
    }
  };
}();
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var ordChar = /* @__PURE__ */ function() {
  return {
    compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqChar;
    }
  };
}();
var ordBoolean = /* @__PURE__ */ function() {
  return {
    compare: ordBooleanImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqBoolean;
    }
  };
}();
var compare = function(dict) {
  return dict.compare;
};
var comparing = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(f) {
    return function(x) {
      return function(y) {
        return compare32(f(x))(f(y));
      };
    };
  };
};
var greaterThan = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(a1) {
    return function(a2) {
      var v = compare32(a1)(a2);
      if (v instanceof GT) {
        return true;
      }
      ;
      return false;
    };
  };
};
var lessThanOrEq = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(a1) {
    return function(a2) {
      var v = compare32(a1)(a2);
      if (v instanceof GT) {
        return false;
      }
      ;
      return true;
    };
  };
};
var min = function(dictOrd) {
  var compare32 = compare(dictOrd);
  return function(x) {
    return function(y) {
      var v = compare32(x)(y);
      if (v instanceof LT) {
        return x;
      }
      ;
      if (v instanceof EQ) {
        return x;
      }
      ;
      if (v instanceof GT) {
        return y;
      }
      ;
      throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
    };
  };
};

// output/Data.Bounded/index.js
var top = function(dict) {
  return dict.top;
};
var boundedInt = {
  top: topInt,
  bottom: bottomInt,
  Ord0: function() {
    return ordInt;
  }
};
var boundedChar = {
  top: topChar,
  bottom: bottomChar,
  Ord0: function() {
    return ordChar;
  }
};
var bottom = function(dict) {
  return dict.bottom;
};

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};
var showNumberImpl = function(n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};

// output/Data.Show/index.js
var showNumber = {
  show: showNumberImpl
};
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};

// output/Data.Generic.Rep/index.js
var Inl = /* @__PURE__ */ function() {
  function Inl2(value0) {
    this.value0 = value0;
  }
  ;
  Inl2.create = function(value0) {
    return new Inl2(value0);
  };
  return Inl2;
}();
var Inr = /* @__PURE__ */ function() {
  function Inr2(value0) {
    this.value0 = value0;
  }
  ;
  Inr2.create = function(value0) {
    return new Inr2(value0);
  };
  return Inr2;
}();
var Argument = function(x) {
  return x;
};
var to = function(dict) {
  return dict.to;
};
var from = function(dict) {
  return dict.from;
};

// output/Data.Maybe/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var map2 = /* @__PURE__ */ map(functorMaybe);
var fromMaybe = function(a) {
  return maybe(a)(identity4);
};
var fromJust = function() {
  return function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
  };
};
var eqMaybe = function(dictEq) {
  var eq8 = eq(dictEq);
  return {
    eq: function(x) {
      return function(y) {
        if (x instanceof Nothing && y instanceof Nothing) {
          return true;
        }
        ;
        if (x instanceof Just && y instanceof Just) {
          return eq8(x.value0)(y.value0);
        }
        ;
        return false;
      };
    }
  };
};
var applyMaybe = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return map2(v.value0)(v1);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorMaybe;
  }
};
var bindMaybe = {
  bind: function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Apply0: function() {
    return applyMaybe;
  }
};
var applicativeMaybe = /* @__PURE__ */ function() {
  return {
    pure: Just.create,
    Apply0: function() {
      return applyMaybe;
    }
  };
}();

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left3(value0) {
    this.value0 = value0;
  }
  ;
  Left3.create = function(value0) {
    return new Left3(value0);
  };
  return Left3;
}();
var Right = /* @__PURE__ */ function() {
  function Right3(value0) {
    this.value0 = value0;
  }
  ;
  Right3.create = function(value0) {
    return new Right3(value0);
  };
  return Right3;
}();
var note = function(a) {
  return maybe(new Left(a))(Right.create);
};
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      ;
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var map3 = /* @__PURE__ */ map(functorEither);
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var hush = /* @__PURE__ */ function() {
  return either($$const(Nothing.value))(Just.create);
}();
var applyEither = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Left) {
        return new Left(v.value0);
      }
      ;
      if (v instanceof Right) {
        return map3(v.value0)(v1);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorEither;
  }
};
var bindEither = {
  bind: /* @__PURE__ */ either(function(e) {
    return function(v) {
      return new Left(e);
    };
  })(function(a) {
    return function(f) {
      return f(a);
    };
  }),
  Apply0: function() {
    return applyEither;
  }
};
var applicativeEither = /* @__PURE__ */ function() {
  return {
    pure: Right.create,
    Apply0: function() {
      return applyEither;
    }
  };
}();

// output/Data.Identity/index.js
var Identity = function(x) {
  return x;
};
var functorIdentity = {
  map: function(f) {
    return function(m) {
      return f(m);
    };
  }
};
var applyIdentity = {
  apply: function(v) {
    return function(v1) {
      return v(v1);
    };
  },
  Functor0: function() {
    return functorIdentity;
  }
};
var applicativeIdentity = {
  pure: Identity,
  Apply0: function() {
    return applyIdentity;
  }
};

// output/Data.EuclideanRing/foreign.js
var intDegree = function(x) {
  return Math.min(Math.abs(x), 2147483647);
};
var intDiv = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
  };
};
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};

// output/Data.CommutativeRing/index.js
var commutativeRingInt = {
  Ring0: function() {
    return ringInt;
  }
};

// output/Data.EuclideanRing/index.js
var mod = function(dict) {
  return dict.mod;
};
var euclideanRingInt = {
  degree: intDegree,
  div: intDiv,
  mod: intMod,
  CommutativeRing0: function() {
    return commutativeRingInt;
  }
};
var div = function(dict) {
  return dict.div;
};

// output/Data.Monoid/index.js
var semigroupRecord2 = /* @__PURE__ */ semigroupRecord();
var monoidUnit = {
  mempty: unit,
  Semigroup0: function() {
    return semigroupUnit;
  }
};
var monoidString = {
  mempty: "",
  Semigroup0: function() {
    return semigroupString;
  }
};
var monoidRecordNil = {
  memptyRecord: function(v) {
    return {};
  },
  SemigroupRecord0: function() {
    return semigroupRecordNil;
  }
};
var memptyRecord = function(dict) {
  return dict.memptyRecord;
};
var monoidRecord = function() {
  return function(dictMonoidRecord) {
    var semigroupRecord1 = semigroupRecord2(dictMonoidRecord.SemigroupRecord0());
    return {
      mempty: memptyRecord(dictMonoidRecord)($$Proxy.value),
      Semigroup0: function() {
        return semigroupRecord1;
      }
    };
  };
};
var mempty = function(dict) {
  return dict.mempty;
};
var monoidRecordCons = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  var semigroupRecordCons2 = semigroupRecordCons(dictIsSymbol)();
  return function(dictMonoid) {
    var mempty13 = mempty(dictMonoid);
    var Semigroup0 = dictMonoid.Semigroup0();
    return function() {
      return function(dictMonoidRecord) {
        var memptyRecord1 = memptyRecord(dictMonoidRecord);
        var semigroupRecordCons1 = semigroupRecordCons2(dictMonoidRecord.SemigroupRecord0())(Semigroup0);
        return {
          memptyRecord: function(v) {
            var tail2 = memptyRecord1($$Proxy.value);
            var key3 = reflectSymbol2($$Proxy.value);
            var insert8 = unsafeSet(key3);
            return insert8(mempty13)(tail2);
          },
          SemigroupRecord0: function() {
            return semigroupRecordCons1;
          }
        };
      };
    };
  };
};

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Effect/index.js
var $runtime_lazy = function(name4, moduleName, init4) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name4 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init4();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
var lift22 = /* @__PURE__ */ lift2(applyEffect);
var semigroupEffect = function(dictSemigroup) {
  return {
    append: lift22(append(dictSemigroup))
  };
};
var monoidEffect = function(dictMonoid) {
  var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
  return {
    mempty: pureE(mempty(dictMonoid)),
    Semigroup0: function() {
      return semigroupEffect1;
    }
  };
};

// output/Effect.Ref/foreign.js
var _new = function(val) {
  return function() {
    return { value: val };
  };
};
var read = function(ref2) {
  return function() {
    return ref2.value;
  };
};
var write = function(val) {
  return function(ref2) {
    return function() {
      ref2.value = val;
    };
  };
};

// output/Effect.Ref/index.js
var $$new = _new;

// output/Data.Array.ST/foreign.js
var pushAll = function(as) {
  return function(xs) {
    return function() {
      return xs.push.apply(xs, as);
    };
  };
};
var unsafeFreeze = function(xs) {
  return function() {
    return xs;
  };
};
function copyImpl(xs) {
  return function() {
    return xs.slice();
  };
}
var thaw = copyImpl;
var sortByImpl2 = function() {
  function mergeFromTo(compare5, fromOrdering, xs1, xs2, from3, to2) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from3 + (to2 - from3 >> 1);
    if (mid - from3 > 1)
      mergeFromTo(compare5, fromOrdering, xs2, xs1, from3, mid);
    if (to2 - mid > 1)
      mergeFromTo(compare5, fromOrdering, xs2, xs1, mid, to2);
    i = from3;
    j = mid;
    k = from3;
    while (i < mid && j < to2) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare5(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to2) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare5) {
    return function(fromOrdering) {
      return function(xs) {
        return function() {
          if (xs.length < 2)
            return xs;
          mergeFromTo(compare5, fromOrdering, xs, xs.slice(0), 0, xs.length);
          return xs;
        };
      };
    };
  };
}();

// output/Data.Array.ST/index.js
var withArray = function(f) {
  return function(xs) {
    return function __do2() {
      var result = thaw(xs)();
      f(result)();
      return unsafeFreeze(result)();
    };
  };
};
var push = function(a) {
  return pushAll([a]);
};

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init4) {
    return function(xs) {
      var acc = init4;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init4) {
    return function(xs) {
      var acc = init4;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Control.Plus/index.js
var empty = function(dict) {
  return dict.empty;
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var uncurry = function(f) {
  return function(v) {
    return f(v.value0)(v.value1);
  };
};
var snd = function(v) {
  return v.value1;
};
var semigroupTuple = function(dictSemigroup) {
  var append15 = append(dictSemigroup);
  return function(dictSemigroup1) {
    var append23 = append(dictSemigroup1);
    return {
      append: function(v) {
        return function(v1) {
          return new Tuple(append15(v.value0)(v1.value0), append23(v.value1)(v1.value1));
        };
      }
    };
  };
};
var monoidTuple = function(dictMonoid) {
  var mempty6 = mempty(dictMonoid);
  var semigroupTuple1 = semigroupTuple(dictMonoid.Semigroup0());
  return function(dictMonoid1) {
    var semigroupTuple2 = semigroupTuple1(dictMonoid1.Semigroup0());
    return {
      mempty: new Tuple(mempty6, mempty(dictMonoid1)),
      Semigroup0: function() {
        return semigroupTuple2;
      }
    };
  };
};
var fst = function(v) {
  return v.value0;
};
var eqTuple = function(dictEq) {
  var eq8 = eq(dictEq);
  return function(dictEq1) {
    var eq17 = eq(dictEq1);
    return {
      eq: function(x) {
        return function(y) {
          return eq8(x.value0)(y.value0) && eq17(x.value1)(y.value1);
        };
      }
    };
  };
};
var ordTuple = function(dictOrd) {
  var compare5 = compare(dictOrd);
  var eqTuple1 = eqTuple(dictOrd.Eq0());
  return function(dictOrd1) {
    var compare12 = compare(dictOrd1);
    var eqTuple22 = eqTuple1(dictOrd1.Eq0());
    return {
      compare: function(x) {
        return function(y) {
          var v = compare5(x.value0)(y.value0);
          if (v instanceof LT) {
            return LT.value;
          }
          ;
          if (v instanceof GT) {
            return GT.value;
          }
          ;
          return compare12(x.value1)(y.value1);
        };
      },
      Eq0: function() {
        return eqTuple22;
      }
    };
  };
};

// output/Data.Bifunctor/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var bimap = function(dict) {
  return dict.bimap;
};
var lmap = function(dictBifunctor) {
  var bimap1 = bimap(dictBifunctor);
  return function(f) {
    return bimap1(f)(identity5);
  };
};
var bifunctorEither = {
  bimap: function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return new Left(v(v2.value0));
        }
        ;
        if (v2 instanceof Right) {
          return new Right(v1(v2.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  }
};

// output/Data.Monoid.Dual/index.js
var Dual = function(x) {
  return x;
};
var semigroupDual = function(dictSemigroup) {
  var append15 = append(dictSemigroup);
  return {
    append: function(v) {
      return function(v1) {
        return append15(v1)(v);
      };
    }
  };
};
var monoidDual = function(dictMonoid) {
  var semigroupDual1 = semigroupDual(dictMonoid.Semigroup0());
  return {
    mempty: mempty(dictMonoid),
    Semigroup0: function() {
      return semigroupDual1;
    }
  };
};

// output/Data.Monoid.Endo/index.js
var Endo = function(x) {
  return x;
};
var semigroupEndo = function(dictSemigroupoid) {
  var compose3 = compose(dictSemigroupoid);
  return {
    append: function(v) {
      return function(v1) {
        return compose3(v)(v1);
      };
    }
  };
};
var monoidEndo = function(dictCategory) {
  var semigroupEndo1 = semigroupEndo(dictCategory.Semigroupoid0());
  return {
    mempty: identity(dictCategory),
    Semigroup0: function() {
      return semigroupEndo1;
    }
  };
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var unwrap = function() {
  return coerce2;
};

// output/Data.Foldable/index.js
var unwrap2 = /* @__PURE__ */ unwrap();
var monoidEndo2 = /* @__PURE__ */ monoidEndo(categoryFn);
var foldr = function(dict) {
  return dict.foldr;
};
var traverse_ = function(dictApplicative) {
  var applySecond4 = applySecond(dictApplicative.Apply0());
  var pure17 = pure(dictApplicative);
  return function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(f) {
      return foldr22(function($449) {
        return applySecond4(f($449));
      })(pure17(unit));
    };
  };
};
var foldl = function(dict) {
  return dict.foldl;
};
var intercalate = function(dictFoldable) {
  var foldl22 = foldl(dictFoldable);
  return function(dictMonoid) {
    var append7 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(sep) {
      return function(xs) {
        var go = function(v) {
          return function(x) {
            if (v.init) {
              return {
                init: false,
                acc: x
              };
            }
            ;
            return {
              init: false,
              acc: append7(v.acc)(append7(sep)(x))
            };
          };
        };
        return foldl22(go)({
          init: true,
          acc: mempty6
        })(xs).acc;
      };
    };
  };
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr22 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append7 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(f) {
      return foldr22(function(x) {
        return function(acc) {
          return append7(f(x))(acc);
        };
      })(mempty6);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};
var foldMap = function(dict) {
  return dict.foldMap;
};
var surroundMap = function(dictFoldable) {
  var foldMap22 = foldMap(dictFoldable)(monoidEndo2);
  return function(dictSemigroup) {
    var append7 = append(dictSemigroup);
    return function(d) {
      return function(t) {
        return function(f) {
          var joined = function(a) {
            return function(m) {
              return append7(d)(append7(t(a))(m));
            };
          };
          return unwrap2(foldMap22(joined)(f))(d);
        };
      };
    };
  };
};
var foldM = function(dictFoldable) {
  var foldl22 = foldl(dictFoldable);
  return function(dictMonad) {
    var bind15 = bind(dictMonad.Bind1());
    var pure17 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(b0) {
        return foldl22(function(b) {
          return function(a) {
            return bind15(b)(flip(f)(a));
          };
        })(pure17(b0));
      };
    };
  };
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat2(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply5) {
    return function(map27) {
      return function(pure17) {
        return function(f) {
          return function(array) {
            function go(bot, top3) {
              switch (top3 - bot) {
                case 0:
                  return pure17([]);
                case 1:
                  return map27(array1)(f(array[bot]));
                case 2:
                  return apply5(map27(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply5(apply5(map27(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                  return apply5(map27(concat2)(go(bot, pivot)))(go(pivot, top3));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var identity6 = /* @__PURE__ */ identity(categoryFn);
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  var traverse22 = traverse(dictTraversable);
  return function(dictApplicative) {
    return traverse22(dictApplicative)(identity6);
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};
var sequence = function(dict) {
  return dict.sequence;
};

// output/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust6) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value5 = b;
            while (true) {
              var maybe2 = f(value5);
              if (isNothing2(maybe2))
                return result;
              var tuple = fromJust6(maybe2);
              result.push(fst2(tuple));
              value5 = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust6) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value5 = b;
            while (true) {
              var tuple = f(value5);
              result.push(fst2(tuple));
              var maybe2 = snd2(tuple);
              if (isNothing2(maybe2))
                return result;
              value5 = fromJust6(maybe2);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/index.js
var fromJust2 = /* @__PURE__ */ fromJust();
var unfoldable1Array = {
  unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
};

// output/Data.Unfoldable/index.js
var fromJust3 = /* @__PURE__ */ fromJust();
var unfoldr = function(dict) {
  return dict.unfoldr;
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
  Unfoldable10: function() {
    return unfoldable1Array;
  }
};

// output/Data.Array/index.js
var apply2 = /* @__PURE__ */ apply(applyMaybe);
var map1 = /* @__PURE__ */ map(functorMaybe);
var fromJust4 = /* @__PURE__ */ fromJust();
var append2 = /* @__PURE__ */ append(semigroupArray);
var unsafeIndex = function() {
  return unsafeIndexImpl;
};
var unsafeIndex1 = /* @__PURE__ */ unsafeIndex();
var uncons = /* @__PURE__ */ function() {
  return unconsImpl($$const(Nothing.value))(function(x) {
    return function(xs) {
      return new Just({
        head: x,
        tail: xs
      });
    };
  });
}();
var toUnfoldable = function(dictUnfoldable) {
  var unfoldr3 = unfoldr(dictUnfoldable);
  return function(xs) {
    var len = length(xs);
    var f = function(i) {
      if (i < len) {
        return new Just(new Tuple(unsafeIndex1(xs)(i), i + 1 | 0));
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 156, column 3 - line 158, column 26): " + [i.constructor.name]);
    };
    return unfoldr3(f)(0);
  };
};
var sortBy = function(comp) {
  return sortByImpl(comp)(function(v) {
    if (v instanceof GT) {
      return 1;
    }
    ;
    if (v instanceof EQ) {
      return 0;
    }
    ;
    if (v instanceof LT) {
      return -1 | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 829, column 31 - line 832, column 11): " + [v.constructor.name]);
  });
};
var sortWith = function(dictOrd) {
  var comparing2 = comparing(dictOrd);
  return function(f) {
    return sortBy(comparing2(f));
  };
};
var snoc = function(xs) {
  return function(x) {
    return withArray(push(x))(xs)();
  };
};
var $$null = function(xs) {
  return length(xs) === 0;
};
var init = function(xs) {
  if ($$null(xs)) {
    return Nothing.value;
  }
  ;
  if (otherwise) {
    return new Just(slice(0)(length(xs) - 1 | 0)(xs));
  }
  ;
  throw new Error("Failed pattern match at Data.Array (line 338, column 1 - line 338, column 45): " + [xs.constructor.name]);
};
var index = /* @__PURE__ */ function() {
  return indexImpl(Just.create)(Nothing.value);
}();
var last = function(xs) {
  return index(xs)(length(xs) - 1 | 0);
};
var unsnoc = function(xs) {
  return apply2(map1(function(v) {
    return function(v1) {
      return {
        init: v,
        last: v1
      };
    };
  })(init(xs)))(last(xs));
};
var fromFoldable = function(dictFoldable) {
  return fromFoldableImpl(foldr(dictFoldable));
};
var findIndex = /* @__PURE__ */ function() {
  return findIndexImpl(Just.create)(Nothing.value);
}();
var deleteAt = /* @__PURE__ */ function() {
  return _deleteAt(Just.create)(Nothing.value);
}();
var deleteBy = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2.length === 0) {
        return [];
      }
      ;
      return maybe(v2)(function(i) {
        return fromJust4(deleteAt(i)(v2));
      })(findIndex(v(v1))(v2));
    };
  };
};
var $$delete = function(dictEq) {
  return deleteBy(eq(dictEq));
};
var cons = function(x) {
  return function(xs) {
    return append2([x])(xs);
  };
};

// output/Data.FunctorWithIndex/foreign.js
var mapWithIndexArray = function(f) {
  return function(xs) {
    var l = xs.length;
    var result = Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(i)(xs[i]);
    }
    return result;
  };
};

// output/Data.FunctorWithIndex/index.js
var mapWithIndex = function(dict) {
  return dict.mapWithIndex;
};
var functorWithIndexArray = {
  mapWithIndex: mapWithIndexArray,
  Functor0: function() {
    return functorArray;
  }
};

// output/Data.FoldableWithIndex/index.js
var foldr8 = /* @__PURE__ */ foldr(foldableArray);
var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
var foldl8 = /* @__PURE__ */ foldl(foldableArray);
var foldrWithIndex = function(dict) {
  return dict.foldrWithIndex;
};
var foldlWithIndex = function(dict) {
  return dict.foldlWithIndex;
};
var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
  var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
  return function(dictMonoid) {
    var append7 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(f) {
      return foldrWithIndex1(function(i) {
        return function(x) {
          return function(acc) {
            return append7(f(i)(x))(acc);
          };
        };
      })(mempty6);
    };
  };
};
var foldableWithIndexArray = {
  foldrWithIndex: function(f) {
    return function(z) {
      var $289 = foldr8(function(v) {
        return function(y) {
          return f(v.value0)(v.value1)(y);
        };
      })(z);
      var $290 = mapWithIndex2(Tuple.create);
      return function($291) {
        return $289($290($291));
      };
    };
  },
  foldlWithIndex: function(f) {
    return function(z) {
      var $292 = foldl8(function(y) {
        return function(v) {
          return f(v.value0)(y)(v.value1);
        };
      })(z);
      var $293 = mapWithIndex2(Tuple.create);
      return function($294) {
        return $292($293($294));
      };
    };
  },
  foldMapWithIndex: function(dictMonoid) {
    return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
  },
  Foldable0: function() {
    return foldableArray;
  }
};
var foldMapWithIndex = function(dict) {
  return dict.foldMapWithIndex;
};

// output/Data.TraversableWithIndex/index.js
var traverseWithIndexDefault = function(dictTraversableWithIndex) {
  var sequence2 = sequence(dictTraversableWithIndex.Traversable2());
  var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
  return function(dictApplicative) {
    var sequence12 = sequence2(dictApplicative);
    return function(f) {
      var $174 = mapWithIndex4(f);
      return function($175) {
        return sequence12($174($175));
      };
    };
  };
};
var traverseWithIndex = function(dict) {
  return dict.traverseWithIndex;
};
var traversableWithIndexArray = {
  traverseWithIndex: function(dictApplicative) {
    return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
  },
  FunctorWithIndex0: function() {
    return functorWithIndexArray;
  },
  FoldableWithIndex1: function() {
    return foldableWithIndexArray;
  },
  Traversable2: function() {
    return traversableArray;
  }
};

// output/Data.NonEmpty/index.js
var NonEmpty = /* @__PURE__ */ function() {
  function NonEmpty2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  NonEmpty2.create = function(value0) {
    return function(value1) {
      return new NonEmpty2(value0, value1);
    };
  };
  return NonEmpty2;
}();
var singleton2 = function(dictPlus) {
  var empty6 = empty(dictPlus);
  return function(a) {
    return new NonEmpty(a, empty6);
  };
};
var functorNonEmpty = function(dictFunctor) {
  var map27 = map(dictFunctor);
  return {
    map: function(f) {
      return function(m) {
        return new NonEmpty(f(m.value0), map27(f)(m.value1));
      };
    }
  };
};
var foldableNonEmpty = function(dictFoldable) {
  var foldMap3 = foldMap(dictFoldable);
  var foldl6 = foldl(dictFoldable);
  var foldr6 = foldr(dictFoldable);
  return {
    foldMap: function(dictMonoid) {
      var append15 = append(dictMonoid.Semigroup0());
      var foldMap13 = foldMap3(dictMonoid);
      return function(f) {
        return function(v) {
          return append15(f(v.value0))(foldMap13(f)(v.value1));
        };
      };
    },
    foldl: function(f) {
      return function(b) {
        return function(v) {
          return foldl6(f)(f(b)(v.value0))(v.value1);
        };
      };
    },
    foldr: function(f) {
      return function(b) {
        return function(v) {
          return f(v.value0)(foldr6(f)(b)(v.value1));
        };
      };
    }
  };
};

// output/Data.List.Types/index.js
var identity7 = /* @__PURE__ */ identity(categoryFn);
var Nil = /* @__PURE__ */ function() {
  function Nil3() {
  }
  ;
  Nil3.value = new Nil3();
  return Nil3;
}();
var Cons = /* @__PURE__ */ function() {
  function Cons3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Cons3.create = function(value0) {
    return function(value1) {
      return new Cons3(value0, value1);
    };
  };
  return Cons3;
}();
var NonEmptyList = function(x) {
  return x;
};
var listMap = function(f) {
  var chunkedRevMap = function($copy_chunksAcc) {
    return function($copy_v) {
      var $tco_var_chunksAcc = $copy_chunksAcc;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(chunksAcc, v) {
        if (v instanceof Cons && (v.value1 instanceof Cons && v.value1.value1 instanceof Cons)) {
          $tco_var_chunksAcc = new Cons(v, chunksAcc);
          $copy_v = v.value1.value1.value1;
          return;
        }
        ;
        var unrolledMap = function(v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Nil)) {
            return new Cons(f(v1.value0), new Cons(f(v1.value1.value0), Nil.value));
          }
          ;
          if (v1 instanceof Cons && v1.value1 instanceof Nil) {
            return new Cons(f(v1.value0), Nil.value);
          }
          ;
          return Nil.value;
        };
        var reverseUnrolledMap = function($copy_v1) {
          return function($copy_acc) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result2;
            function $tco_loop2(v1, acc) {
              if (v1 instanceof Cons && (v1.value0 instanceof Cons && (v1.value0.value1 instanceof Cons && v1.value0.value1.value1 instanceof Cons))) {
                $tco_var_v1 = v1.value1;
                $copy_acc = new Cons(f(v1.value0.value0), new Cons(f(v1.value0.value1.value0), new Cons(f(v1.value0.value1.value1.value0), acc)));
                return;
              }
              ;
              $tco_done1 = true;
              return acc;
            }
            ;
            while (!$tco_done1) {
              $tco_result2 = $tco_loop2($tco_var_v1, $copy_acc);
            }
            ;
            return $tco_result2;
          };
        };
        $tco_done = true;
        return reverseUnrolledMap(chunksAcc)(unrolledMap(v));
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_chunksAcc, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return chunkedRevMap(Nil.value);
};
var functorList = {
  map: listMap
};
var map4 = /* @__PURE__ */ map(functorList);
var functorNonEmptyList = /* @__PURE__ */ functorNonEmpty(functorList);
var foldableList = {
  foldr: function(f) {
    return function(b) {
      var rev = function() {
        var go = function($copy_acc) {
          return function($copy_v) {
            var $tco_var_acc = $copy_acc;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(acc, v) {
              if (v instanceof Nil) {
                $tco_done = true;
                return acc;
              }
              ;
              if (v instanceof Cons) {
                $tco_var_acc = new Cons(v.value0, acc);
                $copy_v = v.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [acc.constructor.name, v.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_acc, $copy_v);
            }
            ;
            return $tco_result;
          };
        };
        return go(Nil.value);
      }();
      var $281 = foldl(foldableList)(flip(f))(b);
      return function($282) {
        return $281(rev($282));
      };
    };
  },
  foldl: function(f) {
    var go = function($copy_b) {
      return function($copy_v) {
        var $tco_var_b = $copy_b;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(b, v) {
          if (v instanceof Nil) {
            $tco_done1 = true;
            return b;
          }
          ;
          if (v instanceof Cons) {
            $tco_var_b = f(b)(v.value0);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_b, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go;
  },
  foldMap: function(dictMonoid) {
    var append23 = append(dictMonoid.Semigroup0());
    var mempty6 = mempty(dictMonoid);
    return function(f) {
      return foldl(foldableList)(function(acc) {
        var $283 = append23(acc);
        return function($284) {
          return $283(f($284));
        };
      })(mempty6);
    };
  }
};
var foldl2 = /* @__PURE__ */ foldl(foldableList);
var foldr2 = /* @__PURE__ */ foldr(foldableList);
var foldableNonEmptyList = /* @__PURE__ */ foldableNonEmpty(foldableList);
var semigroupList = {
  append: function(xs) {
    return function(ys) {
      return foldr2(Cons.create)(ys)(xs);
    };
  }
};
var append1 = /* @__PURE__ */ append(semigroupList);
var monoidList = /* @__PURE__ */ function() {
  return {
    mempty: Nil.value,
    Semigroup0: function() {
      return semigroupList;
    }
  };
}();
var traversableList = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    var map110 = map(Apply0.Functor0());
    var lift24 = lift2(Apply0);
    var pure17 = pure(dictApplicative);
    return function(f) {
      var $298 = map110(foldl2(flip(Cons.create))(Nil.value));
      var $299 = foldl2(function(acc) {
        var $301 = lift24(flip(Cons.create))(acc);
        return function($302) {
          return $301(f($302));
        };
      })(pure17(Nil.value));
      return function($300) {
        return $298($299($300));
      };
    };
  },
  sequence: function(dictApplicative) {
    return traverse(traversableList)(dictApplicative)(identity7);
  },
  Functor0: function() {
    return functorList;
  },
  Foldable1: function() {
    return foldableList;
  }
};
var unfoldable1List = {
  unfoldr1: function(f) {
    return function(b) {
      var go = function($copy_source) {
        return function($copy_memo) {
          var $tco_var_source = $copy_source;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(source2, memo) {
            var v = f(source2);
            if (v.value1 instanceof Just) {
              $tco_var_source = v.value1.value0;
              $copy_memo = new Cons(v.value0, memo);
              return;
            }
            ;
            if (v.value1 instanceof Nothing) {
              $tco_done = true;
              return foldl2(flip(Cons.create))(Nil.value)(new Cons(v.value0, memo));
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 135, column 22 - line 137, column 61): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_source, $copy_memo);
          }
          ;
          return $tco_result;
        };
      };
      return go(b)(Nil.value);
    };
  }
};
var unfoldableList = {
  unfoldr: function(f) {
    return function(b) {
      var go = function($copy_source) {
        return function($copy_memo) {
          var $tco_var_source = $copy_source;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(source2, memo) {
            var v = f(source2);
            if (v instanceof Nothing) {
              $tco_done = true;
              return foldl2(flip(Cons.create))(Nil.value)(memo);
            }
            ;
            if (v instanceof Just) {
              $tco_var_source = v.value0.value1;
              $copy_memo = new Cons(v.value0.value0, memo);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 142, column 22 - line 144, column 52): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_source, $copy_memo);
          }
          ;
          return $tco_result;
        };
      };
      return go(b)(Nil.value);
    };
  },
  Unfoldable10: function() {
    return unfoldable1List;
  }
};
var applyList = {
  apply: function(v) {
    return function(v1) {
      if (v instanceof Nil) {
        return Nil.value;
      }
      ;
      if (v instanceof Cons) {
        return append1(map4(v.value0)(v1))(apply(applyList)(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
    };
  },
  Functor0: function() {
    return functorList;
  }
};
var apply3 = /* @__PURE__ */ apply(applyList);
var applyNonEmptyList = {
  apply: function(v) {
    return function(v1) {
      return new NonEmpty(v.value0(v1.value0), append1(apply3(v.value1)(new Cons(v1.value0, Nil.value)))(apply3(new Cons(v.value0, v.value1))(v1.value1)));
    };
  },
  Functor0: function() {
    return functorNonEmptyList;
  }
};
var applicativeList = {
  pure: function(a) {
    return new Cons(a, Nil.value);
  },
  Apply0: function() {
    return applyList;
  }
};
var altList = {
  alt: append1,
  Functor0: function() {
    return functorList;
  }
};
var plusList = /* @__PURE__ */ function() {
  return {
    empty: Nil.value,
    Alt0: function() {
      return altList;
    }
  };
}();
var applicativeNonEmptyList = {
  pure: /* @__PURE__ */ function() {
    var $312 = singleton2(plusList);
    return function($313) {
      return NonEmptyList($312($313));
    };
  }(),
  Apply0: function() {
    return applyNonEmptyList;
  }
};

// output/Data.Batched/index.js
var map5 = /* @__PURE__ */ map(functorArray);
var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorArray);
var unwrap3 = /* @__PURE__ */ unwrap();
var monoidEndo3 = /* @__PURE__ */ monoidEndo(categoryFn);
var monoidDual2 = /* @__PURE__ */ monoidDual(monoidEndo3);
var foldMap1 = /* @__PURE__ */ foldMap(foldableArray);
var bind2 = /* @__PURE__ */ bind(bindMaybe);
var Single = /* @__PURE__ */ function() {
  function Single2(value0) {
    this.value0 = value0;
  }
  ;
  Single2.create = function(value0) {
    return new Single2(value0);
  };
  return Single2;
}();
var Batch = /* @__PURE__ */ function() {
  function Batch2(value0) {
    this.value0 = value0;
  }
  ;
  Batch2.create = function(value0) {
    return new Batch2(value0);
  };
  return Batch2;
}();
var semigroupBatched = {
  append: function(b1) {
    return function(b2) {
      if (b1 instanceof Batch && b1.value0.length === 0) {
        return b2;
      }
      ;
      if (b2 instanceof Batch && b2.value0.length === 0) {
        return b1;
      }
      ;
      return new Batch([b1, b2]);
    };
  }
};
var monoidBatched = /* @__PURE__ */ function() {
  return {
    mempty: new Batch([]),
    Semigroup0: function() {
      return semigroupBatched;
    }
  };
}();
var functorBatched = function(dictFunctor) {
  var map110 = map(dictFunctor);
  return {
    map: function(f) {
      return function(v) {
        if (v instanceof Single) {
          return new Single(map110(f)(v.value0));
        }
        ;
        if (v instanceof Batch) {
          return new Batch(map5(map(functorBatched(dictFunctor))(f))(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Batched (line 17, column 11 - line 19, column 39): " + [v.constructor.name]);
      };
    }
  };
};
var applyBatched = function(dictApply) {
  var apply5 = apply(dictApply);
  var functorBatched1 = functorBatched(dictApply.Functor0());
  return {
    apply: function(batched_af) {
      return function(batched_ab) {
        if (batched_af instanceof Single && batched_ab instanceof Single) {
          return new Single(apply5(batched_af.value0)(batched_ab.value0));
        }
        ;
        if (batched_af instanceof Batch) {
          return new Batch(mapFlipped2(batched_af.value0)(function(batched_af$prime) {
            return apply(applyBatched(dictApply))(batched_af$prime)(batched_ab);
          }));
        }
        ;
        if (batched_ab instanceof Batch) {
          return new Batch(map5(apply(applyBatched(dictApply))(batched_af))(batched_ab.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Batched (line 22, column 33 - line 28, column 67): " + [batched_af.constructor.name, batched_ab.constructor.name]);
      };
    },
    Functor0: function() {
      return functorBatched1;
    }
  };
};
var applicativeBatched = function(dictApplicative) {
  var applyBatched1 = applyBatched(dictApplicative.Apply0());
  return {
    pure: function() {
      var $63 = pure(dictApplicative);
      return function($64) {
        return Single.create($63($64));
      };
    }(),
    Apply0: function() {
      return applyBatched1;
    }
  };
};
var mapBoth = function(f) {
  return function(v) {
    if (v instanceof Single) {
      return new Single(f(v.value0));
    }
    ;
    if (v instanceof Batch) {
      return new Batch(map5(mapBoth(f))(v.value0));
    }
    ;
    throw new Error("Failed pattern match at Data.Batched (line 74, column 3 - line 76, column 43): " + [v.constructor.name]);
  };
};
var foldr3 = function(dict) {
  return dict.foldr;
};
var foldMap2 = function(dict) {
  return dict.foldMap;
};
var foldlDefault2 = function(dictNestedFoldable) {
  var foldMap22 = foldMap2(dictNestedFoldable)(monoidDual2);
  return function(c) {
    return function(u) {
      return function(xs) {
        return unwrap3(unwrap3(foldMap22(function() {
          var $65 = flip(c);
          return function($66) {
            return Dual(Endo($65($66)));
          };
        }())(xs)))(u);
      };
    };
  };
};
var foldrDefault2 = function(dictNestedFoldable) {
  var foldMap22 = foldMap2(dictNestedFoldable)(monoidEndo3);
  return function(c) {
    return function(u) {
      return function(xs) {
        return unwrap3(foldMap22(function($67) {
          return Endo(c($67));
        })(xs))(u);
      };
    };
  };
};
var nestedFoldableBatched = {
  foldr: function(f) {
    return foldrDefault2(nestedFoldableBatched)(f);
  },
  foldl: function(f) {
    return foldlDefault2(nestedFoldableBatched)(f);
  },
  foldMap: function(dictMonoid) {
    var foldMap22 = foldMap1(dictMonoid);
    return function(ab2m) {
      return function(v) {
        if (v instanceof Single) {
          return ab2m(v.value0);
        }
        ;
        if (v instanceof Batch) {
          return foldMap22(foldMap2(nestedFoldableBatched)(dictMonoid)(ab2m))(v.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Batched (line 57, column 18 - line 59, column 51): " + [v.constructor.name]);
      };
    };
  }
};
var foldr1 = /* @__PURE__ */ foldr3(nestedFoldableBatched);
var flattenMap = function(f) {
  return foldr1(function($68) {
    return Cons.create(f($68));
  })(Nil.value);
};
var flatten = /* @__PURE__ */ flattenMap(/* @__PURE__ */ identity(categoryFn));
var first = function(v) {
  if (v instanceof Single) {
    return new Just(v.value0);
  }
  ;
  if (v instanceof Batch) {
    return bind2(index(v.value0)(0))(first);
  }
  ;
  throw new Error("Failed pattern match at Data.Batched (line 68, column 9 - line 70, column 32): " + [v.constructor.name]);
};

// output/Data.JSValue/foreign.js
var jseq = (a) => (b) => a === b;

// output/Data.JSValue/index.js
var eqJSValue = {
  eq: jseq
};
var toJSValue = unsafeCoerce2;

// output/Effect.Uncurried/foreign.js
var mkEffectFn1 = function mkEffectFn12(fn) {
  return function(x) {
    return fn(x)();
  };
};

// output/PointFree/index.js
var compose2 = function(f) {
  return function(g) {
    return function(x) {
      return function(y) {
        return f(g(x)(y));
      };
    };
  };
};
var applyThird = function(f) {
  return function(x) {
    return function(y) {
      return function(z) {
        return f(y)(z)(x);
      };
    };
  };
};
var applySecond2 = function(f) {
  return function(x) {
    return function(y) {
      return f(y)(x);
    };
  };
};

// output/Producer/foreign.js
var unsafeEqImpl = (eq8) => (a) => (b) => eq8(a)(b);

// output/RefEq/foreign.js
var refEq2 = (a) => (b) => a === b;

// output/RefEq/index.js
var RefEq = /* @__PURE__ */ function() {
  function RefEq2(value0) {
    this.value0 = value0;
  }
  ;
  RefEq2.create = function(value0) {
    return new RefEq2(value0);
  };
  return RefEq2;
}();
var eqRefEq = {
  eq: function(v) {
    return function(v1) {
      return refEq2(v.value0)(v1.value0);
    };
  }
};

// output/Producer/index.js
var identity8 = /* @__PURE__ */ identity(categoryFn);
var eqTuple2 = /* @__PURE__ */ eqTuple(eqRefEq);
var produceProducer = {
  lift: identity8,
  produce: function(v) {
    return v(function(dictEq) {
      return function(v1) {
        return v1.value0(v1.value1);
      };
    });
  }
};
var unsafeEq = function(dictEq) {
  return unsafeEqImpl(eq(dictEq));
};
var eqProducer = {
  eq: function(v) {
    return function(v1) {
      return v(function(dictEq) {
        var unsafeEq1 = unsafeEq(dictEq);
        return function(v2) {
          return v1(function(dictEq1) {
            return function(v3) {
              var $58 = refEq2(v2.value0)(v3.value0);
              if ($58) {
                return unsafeEq1(v2.value1)(v3.value1);
              }
              ;
              return false;
            };
          });
        };
      });
    };
  }
};
var unRefEq = function(v) {
  return v.value0;
};
var producer3Helper = function(v) {
  return v.value0.value0(v.value1.value0)(v.value1.value1.value0)(v.value1.value1.value1);
};
var producer2Helper = function(v) {
  return v.value0.value0(v.value1.value0)(v.value1.value1);
};
var producer = function(dictEq) {
  return function(f) {
    return function(b) {
      return function(v) {
        return v(dictEq)(new Tuple(f, b));
      };
    };
  };
};
var producer2 = function(dictEq) {
  var producer7 = producer(eqTuple2(dictEq));
  return function(f) {
    return function(b) {
      return function(c) {
        return producer7(producer2Helper)(new Tuple(new RefEq(f), new Tuple(b, c)));
      };
    };
  };
};
var producer3 = function(dictEq) {
  var producer7 = producer(eqTuple2(dictEq));
  return function(f) {
    return function(b) {
      return function(c) {
        return function(d) {
          return producer7(producer3Helper)(new Tuple(new RefEq(f), new Tuple(b, new Tuple(c, d))));
        };
      };
    };
  };
};
var produce1 = function(dictEq) {
  return {
    lift: producer(dictEq)(identity8),
    produce: identity8
  };
};
var produceFunctionFunction = {
  lift: /* @__PURE__ */ function() {
    var $121 = producer(eqRefEq)(unRefEq);
    return function($122) {
      return $121(RefEq.create($122));
    };
  }(),
  produce: identity8
};
var produce = function(dict) {
  return dict.produce;
};
var lift = function(dict) {
  return dict.lift;
};

// output/VirtualDom/foreign.js
var setNodeProperty = (prop) => (value5) => (element3) => () => element3[prop] = value5;

// output/Control.Monad.Reader.Class/index.js
var local = function(dict) {
  return dict.local;
};
var ask = function(dict) {
  return dict.ask;
};

// output/Effect.Exception/foreign.js
function error(msg) {
  return new Error(msg);
}
function throwException(e) {
  return function() {
    throw e;
  };
}

// output/Effect.Exception/index.js
var $$throw = function($4) {
  return throwException(error($4));
};

// output/Control.Monad.Trans.Class/index.js
var lift3 = function(dict) {
  return dict.lift;
};

// output/Control.Monad.Writer.Class/index.js
var tell = function(dict) {
  return dict.tell;
};

// output/Effect.Class/index.js
var monadEffectEffect = {
  liftEffect: /* @__PURE__ */ identity(categoryFn),
  Monad0: function() {
    return monadEffect;
  }
};
var liftEffect = function(dict) {
  return dict.liftEffect;
};

// output/Control.Monad.Reader.Trans/index.js
var ReaderT = function(x) {
  return x;
};
var withReaderT = function(f) {
  return function(v) {
    return function($146) {
      return v(f($146));
    };
  };
};
var runReaderT = function(v) {
  return v;
};
var monadTransReaderT = {
  lift: function(dictMonad) {
    return function($147) {
      return ReaderT($$const($147));
    };
  }
};
var lift4 = /* @__PURE__ */ lift3(monadTransReaderT);
var mapReaderT = function(f) {
  return function(v) {
    return function($148) {
      return f(v($148));
    };
  };
};
var functorReaderT = function(dictFunctor) {
  return {
    map: function() {
      var $149 = map(dictFunctor);
      return function($150) {
        return mapReaderT($149($150));
      };
    }()
  };
};
var applyReaderT = function(dictApply) {
  var apply5 = apply(dictApply);
  var functorReaderT1 = functorReaderT(dictApply.Functor0());
  return {
    apply: function(v) {
      return function(v1) {
        return function(r) {
          return apply5(v(r))(v1(r));
        };
      };
    },
    Functor0: function() {
      return functorReaderT1;
    }
  };
};
var bindReaderT = function(dictBind) {
  var bind15 = bind(dictBind);
  var applyReaderT1 = applyReaderT(dictBind.Apply0());
  return {
    bind: function(v) {
      return function(k) {
        return function(r) {
          return bind15(v(r))(function(a) {
            var v1 = k(a);
            return v1(r);
          });
        };
      };
    },
    Apply0: function() {
      return applyReaderT1;
    }
  };
};
var applicativeReaderT = function(dictApplicative) {
  var applyReaderT1 = applyReaderT(dictApplicative.Apply0());
  return {
    pure: function() {
      var $154 = pure(dictApplicative);
      return function($155) {
        return ReaderT($$const($154($155)));
      };
    }(),
    Apply0: function() {
      return applyReaderT1;
    }
  };
};
var monadReaderT = function(dictMonad) {
  var applicativeReaderT1 = applicativeReaderT(dictMonad.Applicative0());
  var bindReaderT1 = bindReaderT(dictMonad.Bind1());
  return {
    Applicative0: function() {
      return applicativeReaderT1;
    },
    Bind1: function() {
      return bindReaderT1;
    }
  };
};
var monadAskReaderT = function(dictMonad) {
  var monadReaderT1 = monadReaderT(dictMonad);
  return {
    ask: pure(dictMonad.Applicative0()),
    Monad0: function() {
      return monadReaderT1;
    }
  };
};
var monadReaderReaderT = function(dictMonad) {
  var monadAskReaderT1 = monadAskReaderT(dictMonad);
  return {
    local: withReaderT,
    MonadAsk0: function() {
      return monadAskReaderT1;
    }
  };
};
var monadEffectReader = function(dictMonadEffect) {
  var Monad0 = dictMonadEffect.Monad0();
  var monadReaderT1 = monadReaderT(Monad0);
  return {
    liftEffect: function() {
      var $157 = lift4(Monad0);
      var $158 = liftEffect(dictMonadEffect);
      return function($159) {
        return $157($158($159));
      };
    }(),
    Monad0: function() {
      return monadReaderT1;
    }
  };
};
var monadTellReaderT = function(dictMonadTell) {
  var Monad1 = dictMonadTell.Monad1();
  var Semigroup0 = dictMonadTell.Semigroup0();
  var monadReaderT1 = monadReaderT(Monad1);
  return {
    tell: function() {
      var $163 = lift4(Monad1);
      var $164 = tell(dictMonadTell);
      return function($165) {
        return $163($164($165));
      };
    }(),
    Semigroup0: function() {
      return Semigroup0;
    },
    Monad1: function() {
      return monadReaderT1;
    }
  };
};

// output/Control.Monad.Writer.Trans/index.js
var WriterT = function(x) {
  return x;
};
var runWriterT = function(v) {
  return v;
};
var monadTransWriterT = function(dictMonoid) {
  var mempty6 = mempty(dictMonoid);
  return {
    lift: function(dictMonad) {
      var bind15 = bind(dictMonad.Bind1());
      var pure17 = pure(dictMonad.Applicative0());
      return function(m) {
        return bind15(m)(function(a) {
          return pure17(new Tuple(a, mempty6));
        });
      };
    }
  };
};
var mapWriterT = function(f) {
  return function(v) {
    return f(v);
  };
};
var functorWriterT = function(dictFunctor) {
  var map27 = map(dictFunctor);
  return {
    map: function(f) {
      return mapWriterT(map27(function(v) {
        return new Tuple(f(v.value0), v.value1);
      }));
    }
  };
};
var applyWriterT = function(dictSemigroup) {
  var append7 = append(dictSemigroup);
  return function(dictApply) {
    var apply5 = apply(dictApply);
    var Functor0 = dictApply.Functor0();
    var map27 = map(Functor0);
    var functorWriterT1 = functorWriterT(Functor0);
    return {
      apply: function(v) {
        return function(v1) {
          var k = function(v3) {
            return function(v4) {
              return new Tuple(v3.value0(v4.value0), append7(v3.value1)(v4.value1));
            };
          };
          return apply5(map27(k)(v))(v1);
        };
      },
      Functor0: function() {
        return functorWriterT1;
      }
    };
  };
};
var bindWriterT = function(dictSemigroup) {
  var append7 = append(dictSemigroup);
  var applyWriterT1 = applyWriterT(dictSemigroup);
  return function(dictBind) {
    var bind15 = bind(dictBind);
    var Apply0 = dictBind.Apply0();
    var map27 = map(Apply0.Functor0());
    var applyWriterT2 = applyWriterT1(Apply0);
    return {
      bind: function(v) {
        return function(k) {
          return bind15(v)(function(v1) {
            var v2 = k(v1.value0);
            return map27(function(v3) {
              return new Tuple(v3.value0, append7(v1.value1)(v3.value1));
            })(v2);
          });
        };
      },
      Apply0: function() {
        return applyWriterT2;
      }
    };
  };
};
var applicativeWriterT = function(dictMonoid) {
  var mempty6 = mempty(dictMonoid);
  var applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
  return function(dictApplicative) {
    var pure17 = pure(dictApplicative);
    var applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
    return {
      pure: function(a) {
        return pure17(new Tuple(a, mempty6));
      },
      Apply0: function() {
        return applyWriterT2;
      }
    };
  };
};
var monadWriterT = function(dictMonoid) {
  var applicativeWriterT1 = applicativeWriterT(dictMonoid);
  var bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
  return function(dictMonad) {
    var applicativeWriterT22 = applicativeWriterT1(dictMonad.Applicative0());
    var bindWriterT22 = bindWriterT1(dictMonad.Bind1());
    return {
      Applicative0: function() {
        return applicativeWriterT22;
      },
      Bind1: function() {
        return bindWriterT22;
      }
    };
  };
};
var monadEffectWriter = function(dictMonoid) {
  var lift6 = lift3(monadTransWriterT(dictMonoid));
  var monadWriterT1 = monadWriterT(dictMonoid);
  return function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var monadWriterT22 = monadWriterT1(Monad0);
    return {
      liftEffect: function() {
        var $249 = lift6(Monad0);
        var $250 = liftEffect(dictMonadEffect);
        return function($251) {
          return $249($250($251));
        };
      }(),
      Monad0: function() {
        return monadWriterT22;
      }
    };
  };
};
var monadTellWriterT = function(dictMonoid) {
  var Semigroup0 = dictMonoid.Semigroup0();
  var monadWriterT1 = monadWriterT(dictMonoid);
  return function(dictMonad) {
    var monadWriterT22 = monadWriterT1(dictMonad);
    return {
      tell: function() {
        var $252 = pure(dictMonad.Applicative0());
        var $253 = Tuple.create(unit);
        return function($254) {
          return WriterT($252($253($254)));
        };
      }(),
      Semigroup0: function() {
        return Semigroup0;
      },
      Monad1: function() {
        return monadWriterT22;
      }
    };
  };
};

// output/Data.List/index.js
var map6 = /* @__PURE__ */ map(functorMaybe);
var uncons2 = function(v) {
  if (v instanceof Nil) {
    return Nothing.value;
  }
  ;
  if (v instanceof Cons) {
    return new Just({
      head: v.value0,
      tail: v.value1
    });
  }
  ;
  throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
};
var toUnfoldable2 = function(dictUnfoldable) {
  return unfoldr(dictUnfoldable)(function(xs) {
    return map6(function(rec) {
      return new Tuple(rec.head, rec.tail);
    })(uncons2(xs));
  });
};
var reverse2 = /* @__PURE__ */ function() {
  var go = function($copy_acc) {
    return function($copy_v) {
      var $tco_var_acc = $copy_acc;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(acc, v) {
        if (v instanceof Nil) {
          $tco_done = true;
          return acc;
        }
        ;
        if (v instanceof Cons) {
          $tco_var_acc = new Cons(v.value0, acc);
          $copy_v = v.value1;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [acc.constructor.name, v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_acc, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return go(Nil.value);
}();
var $$null2 = function(v) {
  if (v instanceof Nil) {
    return true;
  }
  ;
  return false;
};
var mapMaybe = function(f) {
  var go = function($copy_acc) {
    return function($copy_v) {
      var $tco_var_acc = $copy_acc;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(acc, v) {
        if (v instanceof Nil) {
          $tco_done = true;
          return reverse2(acc);
        }
        ;
        if (v instanceof Cons) {
          var v1 = f(v.value0);
          if (v1 instanceof Nothing) {
            $tco_var_acc = acc;
            $copy_v = v.value1;
            return;
          }
          ;
          if (v1 instanceof Just) {
            $tco_var_acc = new Cons(v1.value0, acc);
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 419, column 5 - line 421, column 32): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.List (line 417, column 3 - line 417, column 27): " + [acc.constructor.name, v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_acc, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return go(Nil.value);
};
var head = function(v) {
  if (v instanceof Nil) {
    return Nothing.value;
  }
  ;
  if (v instanceof Cons) {
    return new Just(v.value0);
  }
  ;
  throw new Error("Failed pattern match at Data.List (line 230, column 1 - line 230, column 22): " + [v.constructor.name]);
};
var fromFoldable2 = function(dictFoldable) {
  return foldr(dictFoldable)(Cons.create)(Nil.value);
};

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// output/Data.Map.Internal/index.js
var Leaf = /* @__PURE__ */ function() {
  function Leaf2() {
  }
  ;
  Leaf2.value = new Leaf2();
  return Leaf2;
}();
var Two = /* @__PURE__ */ function() {
  function Two2(value0, value1, value22, value32) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
    this.value3 = value32;
  }
  ;
  Two2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return function(value32) {
          return new Two2(value0, value1, value22, value32);
        };
      };
    };
  };
  return Two2;
}();
var Three = /* @__PURE__ */ function() {
  function Three2(value0, value1, value22, value32, value42, value5, value6) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
    this.value3 = value32;
    this.value4 = value42;
    this.value5 = value5;
    this.value6 = value6;
  }
  ;
  Three2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return function(value32) {
          return function(value42) {
            return function(value5) {
              return function(value6) {
                return new Three2(value0, value1, value22, value32, value42, value5, value6);
              };
            };
          };
        };
      };
    };
  };
  return Three2;
}();
var TwoLeft = /* @__PURE__ */ function() {
  function TwoLeft2(value0, value1, value22) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
  }
  ;
  TwoLeft2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return new TwoLeft2(value0, value1, value22);
      };
    };
  };
  return TwoLeft2;
}();
var TwoRight = /* @__PURE__ */ function() {
  function TwoRight2(value0, value1, value22) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
  }
  ;
  TwoRight2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return new TwoRight2(value0, value1, value22);
      };
    };
  };
  return TwoRight2;
}();
var ThreeLeft = /* @__PURE__ */ function() {
  function ThreeLeft2(value0, value1, value22, value32, value42, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
    this.value3 = value32;
    this.value4 = value42;
    this.value5 = value5;
  }
  ;
  ThreeLeft2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return function(value32) {
          return function(value42) {
            return function(value5) {
              return new ThreeLeft2(value0, value1, value22, value32, value42, value5);
            };
          };
        };
      };
    };
  };
  return ThreeLeft2;
}();
var ThreeMiddle = /* @__PURE__ */ function() {
  function ThreeMiddle2(value0, value1, value22, value32, value42, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
    this.value3 = value32;
    this.value4 = value42;
    this.value5 = value5;
  }
  ;
  ThreeMiddle2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return function(value32) {
          return function(value42) {
            return function(value5) {
              return new ThreeMiddle2(value0, value1, value22, value32, value42, value5);
            };
          };
        };
      };
    };
  };
  return ThreeMiddle2;
}();
var ThreeRight = /* @__PURE__ */ function() {
  function ThreeRight2(value0, value1, value22, value32, value42, value5) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
    this.value3 = value32;
    this.value4 = value42;
    this.value5 = value5;
  }
  ;
  ThreeRight2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return function(value32) {
          return function(value42) {
            return function(value5) {
              return new ThreeRight2(value0, value1, value22, value32, value42, value5);
            };
          };
        };
      };
    };
  };
  return ThreeRight2;
}();
var KickUp = /* @__PURE__ */ function() {
  function KickUp2(value0, value1, value22, value32) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
    this.value3 = value32;
  }
  ;
  KickUp2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return function(value32) {
          return new KickUp2(value0, value1, value22, value32);
        };
      };
    };
  };
  return KickUp2;
}();
var singleton3 = function(k) {
  return function(v) {
    return new Two(Leaf.value, k, v, Leaf.value);
  };
};
var toUnfoldable3 = function(dictUnfoldable) {
  var unfoldr3 = unfoldr(dictUnfoldable);
  return function(m) {
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Nil) {
          $tco_done = true;
          return Nothing.value;
        }
        ;
        if (v instanceof Cons) {
          if (v.value0 instanceof Leaf) {
            $copy_v = v.value1;
            return;
          }
          ;
          if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
            $tco_done = true;
            return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), v.value1));
          }
          ;
          if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
            $tco_done = true;
            return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), new Cons(v.value0.value3, v.value1)));
          }
          ;
          if (v.value0 instanceof Two) {
            $copy_v = new Cons(v.value0.value0, new Cons(singleton3(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
            return;
          }
          ;
          if (v.value0 instanceof Three) {
            $copy_v = new Cons(v.value0.value0, new Cons(singleton3(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton3(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 624, column 18 - line 633, column 71): " + [v.value0.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 623, column 3 - line 623, column 19): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return unfoldr3(go)(new Cons(m, Nil.value));
  };
};
var lookup = function(dictOrd) {
  var compare5 = compare(dictOrd);
  return function(k) {
    var go = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Leaf) {
          $tco_done = true;
          return Nothing.value;
        }
        ;
        if (v instanceof Two) {
          var v2 = compare5(k)(v.value1);
          if (v2 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value2);
          }
          ;
          if (v2 instanceof LT) {
            $copy_v = v.value0;
            return;
          }
          ;
          $copy_v = v.value3;
          return;
        }
        ;
        if (v instanceof Three) {
          var v3 = compare5(k)(v.value1);
          if (v3 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value2);
          }
          ;
          var v4 = compare5(k)(v.value4);
          if (v4 instanceof EQ) {
            $tco_done = true;
            return new Just(v.value5);
          }
          ;
          if (v3 instanceof LT) {
            $copy_v = v.value0;
            return;
          }
          ;
          if (v4 instanceof GT) {
            $copy_v = v.value6;
            return;
          }
          ;
          $copy_v = v.value3;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return go;
  };
};
var member = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  return function(k) {
    return function(m) {
      return isJust(lookup12(k)(m));
    };
  };
};
var fromZipper = function($copy_dictOrd) {
  return function($copy_v) {
    return function($copy_tree) {
      var $tco_var_dictOrd = $copy_dictOrd;
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(dictOrd, v, tree) {
        if (v instanceof Nil) {
          $tco_done = true;
          return tree;
        }
        ;
        if (v instanceof Cons) {
          if (v.value0 instanceof TwoLeft) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Two(tree, v.value0.value0, v.value0.value1, v.value0.value2);
            return;
          }
          ;
          if (v.value0 instanceof TwoRight) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Two(v.value0.value0, v.value0.value1, v.value0.value2, tree);
            return;
          }
          ;
          if (v.value0 instanceof ThreeLeft) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Three(tree, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
            return;
          }
          ;
          if (v.value0 instanceof ThreeMiddle) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, tree, v.value0.value3, v.value0.value4, v.value0.value5);
            return;
          }
          ;
          if (v.value0 instanceof ThreeRight) {
            $tco_var_dictOrd = dictOrd;
            $tco_var_v = v.value1;
            $copy_tree = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, tree);
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, tree.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_tree);
      }
      ;
      return $tco_result;
    };
  };
};
var insert = function(dictOrd) {
  var fromZipper1 = fromZipper(dictOrd);
  var compare5 = compare(dictOrd);
  return function(k) {
    return function(v) {
      var up = function($copy_v1) {
        return function($copy_v2) {
          var $tco_var_v1 = $copy_v1;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v1, v2) {
            if (v1 instanceof Nil) {
              $tco_done = true;
              return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
            }
            ;
            if (v1 instanceof Cons) {
              if (v1.value0 instanceof TwoLeft) {
                $tco_done = true;
                return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
              }
              ;
              if (v1.value0 instanceof TwoRight) {
                $tco_done = true;
                return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
              }
              ;
              if (v1.value0 instanceof ThreeLeft) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                return;
              }
              ;
              if (v1.value0 instanceof ThreeMiddle) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                return;
              }
              ;
              if (v1.value0 instanceof ThreeRight) {
                $tco_var_v1 = v1.value1;
                $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_v1, $copy_v2);
          }
          ;
          return $tco_result;
        };
      };
      var down = function($copy_ctx) {
        return function($copy_v1) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, v1) {
            if (v1 instanceof Leaf) {
              $tco_done1 = true;
              return up(ctx)(new KickUp(Leaf.value, k, v, Leaf.value));
            }
            ;
            if (v1 instanceof Two) {
              var v2 = compare5(k)(v1.value1);
              if (v2 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper1(ctx)(new Two(v1.value0, k, v, v1.value3));
              }
              ;
              if (v2 instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(v1.value1, v1.value2, v1.value3), ctx);
                $copy_v1 = v1.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(v1.value0, v1.value1, v1.value2), ctx);
              $copy_v1 = v1.value3;
              return;
            }
            ;
            if (v1 instanceof Three) {
              var v3 = compare5(k)(v1.value1);
              if (v3 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper1(ctx)(new Three(v1.value0, k, v, v1.value3, v1.value4, v1.value5, v1.value6));
              }
              ;
              var v4 = compare5(k)(v1.value4);
              if (v4 instanceof EQ) {
                $tco_done1 = true;
                return fromZipper1(ctx)(new Three(v1.value0, v1.value1, v1.value2, v1.value3, k, v, v1.value6));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(v1.value1, v1.value2, v1.value3, v1.value4, v1.value5, v1.value6), ctx);
                $copy_v1 = v1.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v4 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(v1.value0, v1.value1, v1.value2, v1.value4, v1.value5, v1.value6), ctx);
                $copy_v1 = v1.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(v1.value0, v1.value1, v1.value2, v1.value3, v1.value4, v1.value5), ctx);
              $copy_v1 = v1.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [ctx.constructor.name, v1.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_v1);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
};
var pop = function(dictOrd) {
  var fromZipper1 = fromZipper(dictOrd);
  var compare5 = compare(dictOrd);
  return function(k) {
    var up = function($copy_ctxs) {
      return function($copy_tree) {
        var $tco_var_ctxs = $copy_ctxs;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(ctxs, tree) {
          if (ctxs instanceof Nil) {
            $tco_done = true;
            return tree;
          }
          ;
          if (ctxs instanceof Cons) {
            if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
              $tco_var_ctxs = ctxs.value1;
              $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
              return;
            }
            ;
            if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
              $tco_var_ctxs = ctxs.value1;
              $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
              return;
            }
            ;
            if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
            }
            ;
            if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
            }
            ;
            if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
            }
            ;
            if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
            }
            ;
            if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
            }
            ;
            if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
            }
            ;
            if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
            }
            ;
            if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
              $tco_done = true;
              return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
            }
            ;
            $tco_done = true;
            return unsafeCrashWith("The impossible happened in partial function `up`.");
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
        }
        ;
        return $tco_result;
      };
    };
    var removeMaxNode = function($copy_ctx) {
      return function($copy_m) {
        var $tco_var_ctx = $copy_ctx;
        var $tco_done1 = false;
        var $tco_result;
        function $tco_loop(ctx, m) {
          if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
            $tco_done1 = true;
            return up(ctx)(Leaf.value);
          }
          ;
          if (m instanceof Two) {
            $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
            $tco_done1 = true;
            return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
          }
          ;
          if (m instanceof Three) {
            $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done1 = true;
          return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
        }
        ;
        while (!$tco_done1) {
          $tco_result = $tco_loop($tco_var_ctx, $copy_m);
        }
        ;
        return $tco_result;
      };
    };
    var maxNode = function($copy_m) {
      var $tco_done2 = false;
      var $tco_result;
      function $tco_loop(m) {
        if (m instanceof Two && m.value3 instanceof Leaf) {
          $tco_done2 = true;
          return {
            key: m.value1,
            value: m.value2
          };
        }
        ;
        if (m instanceof Two) {
          $copy_m = m.value3;
          return;
        }
        ;
        if (m instanceof Three && m.value6 instanceof Leaf) {
          $tco_done2 = true;
          return {
            key: m.value4,
            value: m.value5
          };
        }
        ;
        if (m instanceof Three) {
          $copy_m = m.value6;
          return;
        }
        ;
        $tco_done2 = true;
        return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
      }
      ;
      while (!$tco_done2) {
        $tco_result = $tco_loop($copy_m);
      }
      ;
      return $tco_result;
    };
    var down = function($copy_ctx) {
      return function($copy_m) {
        var $tco_var_ctx = $copy_ctx;
        var $tco_done3 = false;
        var $tco_result;
        function $tco_loop(ctx, m) {
          if (m instanceof Leaf) {
            $tco_done3 = true;
            return Nothing.value;
          }
          ;
          if (m instanceof Two) {
            var v = compare5(k)(m.value1);
            if (m.value3 instanceof Leaf && v instanceof EQ) {
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
            }
            ;
            if (v instanceof EQ) {
              var max4 = maxNode(m.value0);
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max4.key, max4.value, m.value3), ctx))(m.value0)));
            }
            ;
            if (v instanceof LT) {
              $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
              $copy_m = m.value0;
              return;
            }
            ;
            $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three) {
            var leaves2 = function() {
              if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                return true;
              }
              ;
              return false;
            }();
            var v = compare5(k)(m.value4);
            var v3 = compare5(k)(m.value1);
            if (leaves2 && v3 instanceof EQ) {
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
            }
            ;
            if (leaves2 && v instanceof EQ) {
              $tco_done3 = true;
              return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
            }
            ;
            if (v3 instanceof EQ) {
              var max4 = maxNode(m.value0);
              $tco_done3 = true;
              return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max4.key, max4.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
            }
            ;
            if (v instanceof EQ) {
              var max4 = maxNode(m.value3);
              $tco_done3 = true;
              return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max4.key, max4.value, m.value6), ctx))(m.value3)));
            }
            ;
            if (v3 instanceof LT) {
              $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
              $copy_m = m.value0;
              return;
            }
            ;
            if (v3 instanceof GT && v instanceof LT) {
              $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
            $copy_m = m.value6;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
        }
        ;
        while (!$tco_done3) {
          $tco_result = $tco_loop($tco_var_ctx, $copy_m);
        }
        ;
        return $tco_result;
      };
    };
    return down(Nil.value);
  };
};
var foldableMap = {
  foldr: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
        }
        ;
        if (m instanceof Three) {
          return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
      };
    };
  },
  foldl: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
        }
        ;
        if (m instanceof Three) {
          return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
      };
    };
  },
  foldMap: function(dictMonoid) {
    var mempty6 = mempty(dictMonoid);
    var append23 = append(dictMonoid.Semigroup0());
    return function(f) {
      return function(m) {
        if (m instanceof Leaf) {
          return mempty6;
        }
        ;
        if (m instanceof Two) {
          return append23(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append23(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
        }
        ;
        if (m instanceof Three) {
          return append23(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append23(f(m.value2))(append23(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append23(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
      };
    };
  }
};
var foldableWithIndexMap = {
  foldrWithIndex: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value3)))(m.value0);
        }
        ;
        if (m instanceof Three) {
          return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m.value4)(m.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m.constructor.name]);
      };
    };
  },
  foldlWithIndex: function(f) {
    return function(z) {
      return function(m) {
        if (m instanceof Leaf) {
          return z;
        }
        ;
        if (m instanceof Two) {
          return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3);
        }
        ;
        if (m instanceof Three) {
          return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m.constructor.name]);
      };
    };
  },
  foldMapWithIndex: function(dictMonoid) {
    var mempty6 = mempty(dictMonoid);
    var append23 = append(dictMonoid.Semigroup0());
    return function(f) {
      return function(m) {
        if (m instanceof Leaf) {
          return mempty6;
        }
        ;
        if (m instanceof Two) {
          return append23(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append23(f(m.value1)(m.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3)));
        }
        ;
        if (m instanceof Three) {
          return append23(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append23(f(m.value1)(m.value2))(append23(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3))(append23(f(m.value4)(m.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value6)))));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m.constructor.name]);
      };
    };
  },
  Foldable0: function() {
    return foldableMap;
  }
};
var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMap);
var foldlWithIndex2 = /* @__PURE__ */ foldlWithIndex(foldableWithIndexMap);
var keys = /* @__PURE__ */ function() {
  return foldrWithIndex2(function(k) {
    return function(v) {
      return function(acc) {
        return new Cons(k, acc);
      };
    };
  })(Nil.value);
}();
var findMax = /* @__PURE__ */ function() {
  var go = function($copy_v) {
    return function($copy_v1) {
      var $tco_var_v = $copy_v;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v, v1) {
        if (v1 instanceof Leaf) {
          $tco_done = true;
          return v;
        }
        ;
        if (v1 instanceof Two) {
          $tco_var_v = new Just({
            key: v1.value1,
            value: v1.value2
          });
          $copy_v1 = v1.value3;
          return;
        }
        ;
        if (v1 instanceof Three) {
          $tco_var_v = new Just({
            key: v1.value4,
            value: v1.value5
          });
          $copy_v1 = v1.value6;
          return;
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 330, column 5 - line 330, column 22): " + [v.constructor.name, v1.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_v, $copy_v1);
      }
      ;
      return $tco_result;
    };
  };
  return go(Nothing.value);
}();
var empty2 = /* @__PURE__ */ function() {
  return Leaf.value;
}();
var $$delete2 = function(dictOrd) {
  var pop1 = pop(dictOrd);
  return function(k) {
    return function(m) {
      return maybe(m)(snd)(pop1(k)(m));
    };
  };
};
var alter = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  var delete1 = $$delete2(dictOrd);
  var insert12 = insert(dictOrd);
  return function(f) {
    return function(k) {
      return function(m) {
        var v = f(lookup12(k)(m));
        if (v instanceof Nothing) {
          return delete1(k)(m);
        }
        ;
        if (v instanceof Just) {
          return insert12(k)(v.value0)(m);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
      };
    };
  };
};
var unionWith = function(dictOrd) {
  var alter1 = alter(dictOrd);
  return function(f) {
    return function(m1) {
      return function(m2) {
        var go = function(k) {
          return function(m) {
            return function(v) {
              return alter1(function() {
                var $932 = maybe(v)(f(v));
                return function($933) {
                  return Just.create($932($933));
                };
              }())(k)(m);
            };
          };
        };
        return foldlWithIndex2(go)(m2)(m1);
      };
    };
  };
};
var union = function(dictOrd) {
  return unionWith(dictOrd)($$const);
};

// output/Data.Diff/index.js
var Left2 = /* @__PURE__ */ function() {
  function Left3(value0) {
    this.value0 = value0;
  }
  ;
  Left3.create = function(value0) {
    return new Left3(value0);
  };
  return Left3;
}();
var Right2 = /* @__PURE__ */ function() {
  function Right3(value0) {
    this.value0 = value0;
  }
  ;
  Right3.create = function(value0) {
    return new Right3(value0);
  };
  return Right3;
}();
var Both = /* @__PURE__ */ function() {
  function Both2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Both2.create = function(value0) {
    return function(value1) {
      return new Both2(value0, value1);
    };
  };
  return Both2;
}();
var maybeCons = function(ma) {
  return function(list) {
    if (ma instanceof Just) {
      return new Cons(ma.value0, list);
    }
    ;
    if (ma instanceof Nothing) {
      return list;
    }
    ;
    throw new Error("Failed pattern match at Data.Diff (line 42, column 21 - line 44, column 18): " + [ma.constructor.name]);
  };
};
var diffList = function(dictMonad) {
  var Bind1 = dictMonad.Bind1();
  var bind15 = bind(Bind1);
  var pure17 = pure(dictMonad.Applicative0());
  var map27 = map(Bind1.Apply0().Functor0());
  return function(f) {
    var go = function(acc) {
      return function(v) {
        return function(v1) {
          if (v instanceof Cons && v1 instanceof Cons) {
            return bind15(f(new Both(v.value0, v1.value0)))(function(mc) {
              return go(maybeCons(mc)(acc))(v.value1)(v1.value1);
            });
          }
          ;
          if (v instanceof Cons && v1 instanceof Nil) {
            return bind15(f(new Left2(v.value0)))(function(mc) {
              return go(maybeCons(mc)(acc))(v.value1)(Nil.value);
            });
          }
          ;
          if (v instanceof Nil && v1 instanceof Cons) {
            return bind15(f(new Right2(v1.value0)))(function(mc) {
              return go(maybeCons(mc)(acc))(Nil.value)(v1.value1);
            });
          }
          ;
          if (v instanceof Nil && v1 instanceof Nil) {
            return pure17(acc);
          }
          ;
          throw new Error("Failed pattern match at Data.Diff (line 29, column 12 - line 39, column 25): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    };
    return compose2(map27(reverse2))(go(Nil.value));
  };
};
var diffableList = {
  diff: function(dictMonad) {
    return diffList(dictMonad);
  }
};
var diff = function(dict) {
  return dict.diff;
};

// output/Data.Nullable/foreign.js
var nullImpl = null;
function nullable(a, r, f) {
  return a == null ? r : f(a);
}

// output/Data.Nullable/index.js
var toMaybe = function(n) {
  return nullable(n, Nothing.value, Just.create);
};

// output/MasonPrelude.Functor.Nested/index.js
var mmap = function(dictFunctor) {
  var map27 = map(dictFunctor);
  return function(dictFunctor1) {
    var $23 = map(dictFunctor1);
    return function($24) {
      return map27($23($24));
    };
  };
};

// output/MyMap/index.js
var coerce3 = /* @__PURE__ */ coerce();
var semigroupMyMap = function(dictOrd) {
  var unionWith2 = unionWith(dictOrd);
  return {
    append: function(v) {
      return function(v1) {
        return coerce3(unionWith2($$const)(v)(v1));
      };
    }
  };
};
var monoidMyMap = function(dictOrd) {
  var semigroupMyMap1 = semigroupMyMap(dictOrd);
  return {
    mempty: empty2,
    Semigroup0: function() {
      return semigroupMyMap1;
    }
  };
};
var foldableWithIndexMyMap = foldableWithIndexMap;
var singleton4 = /* @__PURE__ */ compose2(coerce3)(singleton3);

// output/WHATWG.DOM.DOMTokenList/foreign.js
var add2 = (tokens) => (dtl) => () => dtl.add.apply(dtl, tokens);
var remove = (tokens) => (dtl) => () => dtl.remove.apply(dtl, tokens);

// output/WHATWG.Internal/foreign.js
var instanceof_ = (value5) => (name4) => {
  try {
    return value5 instanceof window[name4];
  } catch (_) {
    return false;
  }
};
var unsafeGet2 = (key3) => (a) => () => a[key3];
var unsafeGetPure = (key3) => (a) => a[key3];

// output/WHATWG.Internal/index.js
var unsafeConvert = function(constructor) {
  return function(value5) {
    var $0 = instanceof_(value5)(constructor);
    if ($0) {
      return new Just(value5);
    }
    ;
    return Nothing.value;
  };
};

// output/Web.DOM.Document/foreign.js
var getEffProp = function(name4) {
  return function(doc) {
    return function() {
      return doc[name4];
    };
  };
};
var url = getEffProp("URL");
var documentURI = getEffProp("documentURI");
var origin = getEffProp("origin");
var compatMode = getEffProp("compatMode");
var characterSet = getEffProp("characterSet");
var contentType = getEffProp("contentType");
var _documentElement = getEffProp("documentElement");

// output/Web.DOM.Element/foreign.js
var getProp = function(name4) {
  return function(doctype) {
    return doctype[name4];
  };
};
var _namespaceURI = getProp("namespaceURI");
var _prefix = getProp("prefix");
var localName = getProp("localName");
var tagName = getProp("tagName");

// output/Web.DOM.ParentNode/foreign.js
var getEffProp2 = function(name4) {
  return function(node) {
    return function() {
      return node[name4];
    };
  };
};
var children = getEffProp2("children");
var _firstElementChild = getEffProp2("firstElementChild");
var _lastElementChild = getEffProp2("lastElementChild");
var childElementCount = getEffProp2("childElementCount");

// output/Web.DOM.Node/foreign.js
var getEffProp3 = function(name4) {
  return function(node) {
    return function() {
      return node[name4];
    };
  };
};
var baseURI = getEffProp3("baseURI");
var _ownerDocument = getEffProp3("ownerDocument");
var _parentNode = getEffProp3("parentNode");
var _parentElement = getEffProp3("parentElement");
var childNodes = getEffProp3("childNodes");
var _firstChild = getEffProp3("firstChild");
var _lastChild = getEffProp3("lastChild");
var _previousSibling = getEffProp3("previousSibling");
var _nextSibling = getEffProp3("nextSibling");
var _nodeValue = getEffProp3("nodeValue");
var textContent = getEffProp3("textContent");

// output/Data.Enum/foreign.js
function toCharCode(c) {
  return c.charCodeAt(0);
}
function fromCharCode(c) {
  return String.fromCharCode(c);
}

// output/Data.Enum/index.js
var bottom1 = /* @__PURE__ */ bottom(boundedChar);
var top1 = /* @__PURE__ */ top(boundedChar);
var toEnum = function(dict) {
  return dict.toEnum;
};
var fromEnum = function(dict) {
  return dict.fromEnum;
};
var toEnumWithDefaults = function(dictBoundedEnum) {
  var toEnum1 = toEnum(dictBoundedEnum);
  var fromEnum1 = fromEnum(dictBoundedEnum);
  var bottom22 = bottom(dictBoundedEnum.Bounded0());
  return function(low) {
    return function(high) {
      return function(x) {
        var v = toEnum1(x);
        if (v instanceof Just) {
          return v.value0;
        }
        ;
        if (v instanceof Nothing) {
          var $140 = x < fromEnum1(bottom22);
          if ($140) {
            return low;
          }
          ;
          return high;
        }
        ;
        throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
      };
    };
  };
};
var defaultSucc = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) + 1 | 0);
    };
  };
};
var defaultPred = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) - 1 | 0);
    };
  };
};
var charToEnum = function(v) {
  if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
    return new Just(fromCharCode(v));
  }
  ;
  return Nothing.value;
};
var enumChar = {
  succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
  pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
  Ord0: function() {
    return ordChar;
  }
};
var boundedEnumChar = /* @__PURE__ */ function() {
  return {
    cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
    toEnum: charToEnum,
    fromEnum: toCharCode,
    Bounded0: function() {
      return boundedChar;
    },
    Enum1: function() {
      return enumChar;
    }
  };
}();

// output/WHATWG.HTML.Types/index.js
var toNode = function() {
  return unsafeCoerce2;
};
var toMaybeKeyboardEvent = function() {
  return unsafeConvert("KeyboardEvent");
};
var toMaybeHTMLTextAreaElement = function() {
  return unsafeConvert("HTMLTextAreaElement");
};
var toMaybeHTMLElement = function() {
  return unsafeConvert("HTMLElement");
};
var toEventTarget = function() {
  return unsafeCoerce2;
};
var toElement = function() {
  return unsafeCoerce2;
};

// output/WHATWG.DOM.Document/foreign.js
var createElementImpl = (localName2) => (options) => (document4) => () => {
  return document4.createElement(localName2, options);
};
var createTextNode2 = (data) => (document4) => () => document4.createTextNode(data);

// output/WHATWG.DOM.Document/index.js
var createElement2 = function() {
  return createElementImpl;
};

// output/WHATWG.DOM.Element/foreign.js
var setAttributeImpl = (qualifiedName) => (value5) => (element3) => () => {
  return element3.setAttribute(qualifiedName, value5);
};
var removeAttributeImpl = (qualifiedName) => (element3) => () => element3.removeAttribute(qualifiedName);

// output/WHATWG.DOM.Element/index.js
var setAttribute2 = function() {
  return setAttributeImpl;
};
var scrollHeight2 = function() {
  return unsafeGet2("scrollHeight");
};
var removeAttribute2 = function() {
  return removeAttributeImpl;
};
var classList2 = function() {
  return unsafeGet2("classList");
};

// output/WHATWG.DOM.Node/foreign.js
var insertBeforeImpl = (node) => (child) => (parent2) => () => {
  return parent2.insertBefore(node, child);
};
var appendChildImpl = (child) => (parent2) => () => {
  return parent2.appendChild(child);
};
var replaceChildImpl = (node) => (child) => (parent2) => () => {
  return parent2.replaceChild(node, child);
};
var removeChildImpl = (child) => (parent2) => () => {
  return parent2.removeChild(child);
};

// output/WHATWG.DOM.Node/index.js
var replaceChild2 = function() {
  return function() {
    return function() {
      return replaceChildImpl;
    };
  };
};
var removeChild2 = function() {
  return function() {
    return removeChildImpl;
  };
};
var insertBefore2 = function() {
  return function() {
    return function() {
      return insertBeforeImpl;
    };
  };
};
var appendChild2 = function() {
  return function() {
    return appendChildImpl;
  };
};

// output/VirtualDom/index.js
var $runtime_lazy2 = function(name4, moduleName, init4) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name4 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init4();
    state2 = 2;
    return val;
  };
};
var toNode2 = /* @__PURE__ */ toNode();
var discard2 = /* @__PURE__ */ discard(discardUnit);
var setAttribute3 = /* @__PURE__ */ setAttribute2();
var pure2 = /* @__PURE__ */ pure(applicativeEffect);
var bind3 = /* @__PURE__ */ bind(bindEffect);
var classList3 = /* @__PURE__ */ classList2();
var append3 = /* @__PURE__ */ append(semigroupBatched);
var toEventTarget2 = /* @__PURE__ */ toEventTarget();
var foldM2 = /* @__PURE__ */ foldM(foldableList)(monadEffect);
var mempty2 = /* @__PURE__ */ mempty(monoidBatched);
var removeAttribute1 = /* @__PURE__ */ removeAttribute2();
var foldrWithIndex3 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMyMap);
var pure1 = /* @__PURE__ */ pure(applicativeList);
var map7 = /* @__PURE__ */ map(functorMaybe);
var bindWriterT2 = /* @__PURE__ */ bindWriterT(/* @__PURE__ */ semigroupTuple(semigroupBatched)(/* @__PURE__ */ semigroupMyMap(ordString)))(bindEffect);
var bindReaderT2 = /* @__PURE__ */ bindReaderT(bindWriterT2);
var bind1 = /* @__PURE__ */ bind(bindReaderT2);
var monoidMyMap2 = /* @__PURE__ */ monoidMyMap(ordString);
var monoidTuple2 = /* @__PURE__ */ monoidTuple(monoidBatched)(monoidMyMap2);
var monadWriterT2 = /* @__PURE__ */ monadWriterT(monoidTuple2)(monadEffect);
var ask2 = /* @__PURE__ */ ask(/* @__PURE__ */ monadAskReaderT(monadWriterT2));
var monadEffectReader2 = /* @__PURE__ */ monadEffectReader(/* @__PURE__ */ monadEffectWriter(monoidTuple2)(monadEffectEffect));
var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectReader2);
var createElement3 = /* @__PURE__ */ createElement2();
var discard22 = /* @__PURE__ */ discard2(bindReaderT2);
var monadTellWriterT2 = /* @__PURE__ */ monadTellWriterT(monoidTuple2)(monadEffect);
var tell2 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellReaderT(monadTellWriterT2));
var mempty1 = /* @__PURE__ */ mempty(monoidMyMap2);
var applicativeWriterT2 = /* @__PURE__ */ applicativeWriterT(monoidTuple2)(applicativeEffect);
var applicativeReaderT2 = /* @__PURE__ */ applicativeReaderT(applicativeWriterT2);
var traverse2 = /* @__PURE__ */ traverse(traversableList)(applicativeReaderT2);
var local2 = /* @__PURE__ */ local(/* @__PURE__ */ monadReaderReaderT(monadWriterT2));
var pure22 = /* @__PURE__ */ pure(applicativeReaderT2);
var coerce4 = /* @__PURE__ */ coerce();
var map12 = /* @__PURE__ */ map(functorEffect);
var appendChild3 = /* @__PURE__ */ appendChild2()();
var removeChild3 = /* @__PURE__ */ removeChild2()();
var functorWriterT2 = /* @__PURE__ */ functorWriterT(functorEffect);
var functorReaderT2 = /* @__PURE__ */ functorReaderT(functorWriterT2);
var map22 = /* @__PURE__ */ map(functorReaderT2);
var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorReaderT2);
var insertBefore3 = /* @__PURE__ */ insertBefore2()()();
var bind22 = /* @__PURE__ */ bind(bindMaybe);
var replaceChild3 = /* @__PURE__ */ replaceChild2()()();
var lift5 = /* @__PURE__ */ lift3(/* @__PURE__ */ monadTransWriterT(monoidTuple2))(monadEffect);
var tell1 = /* @__PURE__ */ tell(monadTellWriterT2);
var discard3 = /* @__PURE__ */ discard2(bindWriterT2);
var pure3 = /* @__PURE__ */ pure(applicativeWriterT2);
var eq12 = /* @__PURE__ */ eq(eqJSValue);
var mmap2 = /* @__PURE__ */ mmap(functorWriterT2)(functorMaybe);
var diff2 = /* @__PURE__ */ diff(diffableList);
var diff1 = /* @__PURE__ */ diff2(monadWriterT2);
var traverse_2 = /* @__PURE__ */ traverse_(applicativeReaderT2)(foldableList);
var mempty22 = /* @__PURE__ */ mempty(monoidList);
var lift1 = /* @__PURE__ */ lift3(monadTransReaderT)(monadWriterT2);
var Attr = /* @__PURE__ */ function() {
  function Attr2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Attr2.create = function(value0) {
    return function(value1) {
      return new Attr2(value0, value1);
    };
  };
  return Attr2;
}();
var Prop = /* @__PURE__ */ function() {
  function Prop2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Prop2.create = function(value0) {
    return function(value1) {
      return new Prop2(value0, value1);
    };
  };
  return Prop2;
}();
var AddClass = /* @__PURE__ */ function() {
  function AddClass2(value0) {
    this.value0 = value0;
  }
  ;
  AddClass2.create = function(value0) {
    return new AddClass2(value0);
  };
  return AddClass2;
}();
var Listener = /* @__PURE__ */ function() {
  function Listener2(value0) {
    this.value0 = value0;
  }
  ;
  Listener2.create = function(value0) {
    return new Listener2(value0);
  };
  return Listener2;
}();
var AlwaysSet = /* @__PURE__ */ function() {
  function AlwaysSet2(value0) {
    this.value0 = value0;
  }
  ;
  AlwaysSet2.create = function(value0) {
    return new AlwaysSet2(value0);
  };
  return AlwaysSet2;
}();
var VElement = /* @__PURE__ */ function() {
  function VElement2(value0) {
    this.value0 = value0;
  }
  ;
  VElement2.create = function(value0) {
    return new VElement2(value0);
  };
  return VElement2;
}();
var KeyedElement = /* @__PURE__ */ function() {
  function KeyedElement2(value0) {
    this.value0 = value0;
  }
  ;
  KeyedElement2.create = function(value0) {
    return new KeyedElement2(value0);
  };
  return KeyedElement2;
}();
var VText = /* @__PURE__ */ function() {
  function VText2(value0) {
    this.value0 = value0;
  }
  ;
  VText2.create = function(value0) {
    return new VText2(value0);
  };
  return VText2;
}();
var VRaw = /* @__PURE__ */ function() {
  function VRaw2(value0) {
    this.value0 = value0;
  }
  ;
  VRaw2.create = function(value0) {
    return new VRaw2(value0);
  };
  return VRaw2;
}();
var Remove = /* @__PURE__ */ function() {
  function Remove2(value0) {
    this.value0 = value0;
  }
  ;
  Remove2.create = function(value0) {
    return new Remove2(value0);
  };
  return Remove2;
}();
var InsertLast = /* @__PURE__ */ function() {
  function InsertLast2(value0) {
    this.value0 = value0;
  }
  ;
  InsertLast2.create = function(value0) {
    return new InsertLast2(value0);
  };
  return InsertLast2;
}();
var InsertBefore = /* @__PURE__ */ function() {
  function InsertBefore2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  InsertBefore2.create = function(value0) {
    return function(value1) {
      return new InsertBefore2(value0, value1);
    };
  };
  return InsertBefore2;
}();
var Switch = /* @__PURE__ */ function() {
  function Switch2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Switch2.create = function(value0) {
    return function(value1) {
      return new Switch2(value0, value1);
    };
  };
  return Switch2;
}();
var text = function($309) {
  return VText.create(function(v) {
    return {
      text: v,
      node: Nothing.value
    };
  }($309));
};
var setElementProperty = function(k) {
  return function(v) {
    return function(n) {
      return setNodeProperty(k)(v)(toNode2(n));
    };
  };
};
var setAttributes = function(attribute) {
  return function(elem3) {
    var go = function($copy_acc) {
      return function($copy_v) {
        var $tco_var_acc = $copy_acc;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(acc, v) {
          if (v instanceof Attr) {
            $tco_done = true;
            return function __do2() {
              setAttribute3(v.value0)(v.value1)(elem3)();
              return acc;
            };
          }
          ;
          if (v instanceof Prop) {
            $tco_done = true;
            return function __do2() {
              setElementProperty(v.value0)(v.value1)(elem3)();
              return acc;
            };
          }
          ;
          if (v instanceof AddClass) {
            $tco_done = true;
            return function __do2() {
              bind3(classList3(elem3))(add2([v.value0]))();
              return acc;
            };
          }
          ;
          if (v instanceof Listener) {
            $tco_done = true;
            return pure2(append3(acc)(v.value0(toEventTarget2(elem3))));
          }
          ;
          if (v instanceof AlwaysSet) {
            $tco_var_acc = acc;
            $copy_v = v.value0;
            return;
          }
          ;
          throw new Error("Failed pattern match at VirtualDom (line 579, column 5 - line 593, column 30): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_acc, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return foldM2(go)(mempty2)(attribute);
  };
};
var removeAttribute3 = function($copy_attr) {
  return function($copy_elem) {
    var $tco_var_attr = $copy_attr;
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(attr, elem3) {
      if (attr instanceof Attr) {
        $tco_done = true;
        return removeAttribute1(attr.value0)(elem3);
      }
      ;
      if (attr instanceof Prop) {
        $tco_done = true;
        return setElementProperty(attr.value0)(toJSValue(nullImpl))(elem3);
      }
      ;
      if (attr instanceof AddClass) {
        $tco_done = true;
        return bind3(classList3(elem3))(remove([attr.value0]));
      }
      ;
      if (attr instanceof Listener) {
        $tco_done = true;
        return pure2(unit);
      }
      ;
      if (attr instanceof AlwaysSet) {
        $tco_var_attr = attr.value0;
        $copy_elem = elem3;
        return;
      }
      ;
      throw new Error("Failed pattern match at VirtualDom (line 457, column 3 - line 462, column 42): " + [attr.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($tco_var_attr, $copy_elem);
    }
    ;
    return $tco_result;
  };
};
var noNodeError = function(dictMonadEffect) {
  return liftEffect(dictMonadEffect)($$throw("there is no node"));
};
var noNodeError1 = /* @__PURE__ */ noNodeError(monadEffectReader2);
var makeStyleNode = function(styleMap) {
  return new KeyedElement({
    tag: "style",
    styles: Nil.value,
    css: Nothing.value,
    attributes: Nil.value,
    children: foldrWithIndex3(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(new Tuple(k, new VElement({
            tag: "style",
            styles: Nil.value,
            css: Nothing.value,
            attributes: Nil.value,
            children: pure1(new VText({
              text: v,
              node: Nothing.value
            })),
            node: Nothing.value,
            noDiff: false
          })), acc);
        };
      };
    })(Nil.value)(styleMap),
    node: Nothing.value
  });
};
var keyedElement = function(tag) {
  return function(attributes) {
    return function(children2) {
      return new KeyedElement({
        tag,
        styles: Nil.value,
        css: Nothing.value,
        attributes,
        children: children2,
        node: Nothing.value
      });
    };
  };
};
var getNode = function(v) {
  if (v instanceof VElement) {
    return map7(toNode2)(v.value0.node);
  }
  ;
  if (v instanceof KeyedElement) {
    return map7(toNode2)(v.value0.node);
  }
  ;
  if (v instanceof VText) {
    return map7(toNode2)(v.value0.node);
  }
  ;
  if (v instanceof VRaw) {
    return map7(toNode2)(v.value0.node);
  }
  ;
  throw new Error("Failed pattern match at VirtualDom (line 474, column 11 - line 478, column 32): " + [v.constructor.name]);
};
var element = function(tag) {
  return function(attributes) {
    return function(children2) {
      return new VElement({
        tag,
        styles: Nil.value,
        css: Nothing.value,
        attributes,
        children: children2,
        node: Nothing.value,
        noDiff: false
      });
    };
  };
};
var changeParent = function(elem3) {
  return function(v) {
    return {
      doc: v.doc,
      parent: elem3
    };
  };
};
var placeNodeHelper = function(placer) {
  return function(v) {
    return function(traverser) {
      return bind1(ask2)(function(v1) {
        return bind1(liftEffect2(createElement3(v.tag)({})(v1.doc)))(function(elem3) {
          return bind1(liftEffect2(setAttributes(v.attributes)(elem3)))(function(subs) {
            return discard22(tell2(new Tuple(subs, mempty1)))(function() {
              return bind1(liftEffect2(placer({
                node: toNode2(elem3),
                parent: v1.parent
              })))(function() {
                return bind1(traverse2(function() {
                  var $311 = local2(changeParent(elem3));
                  return function($312) {
                    return $311(traverser($312));
                  };
                }())(v.children))(function(newChildren) {
                  return pure22(new Tuple(newChildren, elem3));
                });
              });
            });
          });
        });
      });
    };
  };
};
var addCss = function(v) {
  if (v instanceof Just) {
    return tell2(new Tuple(mempty2, coerce4(v.value0)));
  }
  ;
  if (v instanceof Nothing) {
    return pure22(unit);
  }
  ;
  throw new Error("Failed pattern match at VirtualDom (line 554, column 10 - line 556, column 23): " + [v.constructor.name]);
};
var placeNode = function(placer) {
  return function(svn) {
    return bind1(ask2)(function(v) {
      if (svn instanceof VElement) {
        return discard22(addCss(svn.value0.css))(function() {
          return bind1(placeNodeHelper(placer)(svn.value0)(addNode))(function(v1) {
            return pure22(new VElement({
              tag: svn.value0.tag,
              styles: svn.value0.styles,
              css: svn.value0.css,
              attributes: svn.value0.attributes,
              children: v1.value0,
              node: new Just(v1.value1),
              noDiff: svn.value0.noDiff
            }));
          });
        });
      }
      ;
      if (svn instanceof KeyedElement) {
        return discard22(addCss(svn.value0.css))(function() {
          return bind1(placeNodeHelper(placer)(svn.value0)(addKeyedNode))(function(v1) {
            return pure22(new KeyedElement({
              tag: svn.value0.tag,
              styles: svn.value0.styles,
              css: svn.value0.css,
              attributes: svn.value0.attributes,
              children: v1.value0,
              node: new Just(v1.value1)
            }));
          });
        });
      }
      ;
      if (svn instanceof VText) {
        return bind1(liftEffect2(createTextNode2(svn.value0.text)(v.doc)))(function(node) {
          return bind1(liftEffect2(placer({
            node: toNode2(node),
            parent: v.parent
          })))(function() {
            return pure22(new VText({
              text: svn.value0.text,
              node: new Just(node)
            }));
          });
        });
      }
      ;
      if (svn instanceof VRaw) {
        return liftEffect2(function __do2() {
          var node = map12(toNode2)(createElement3("div")({})(v.doc))();
          setNodeProperty("innerHTML")(toJSValue(svn.value0.html))(node)();
          placer({
            node,
            parent: v.parent
          })();
          return new VRaw({
            html: svn.value0.html,
            node: new Just(node)
          });
        });
      }
      ;
      throw new Error("Failed pattern match at VirtualDom (line 501, column 3 - line 526, column 43): " + [svn.constructor.name]);
    });
  };
};
var addNode = function(svn) {
  return placeNode(function(v) {
    return appendChild3(v.node)(v.parent);
  })(svn);
};
var addKeyedNode = function(v) {
  return bind1(addNode(v.value1))(function(addedVNode) {
    return pure22(new Tuple(v.value0, addedVNode));
  });
};
var applyPatch = function(patch) {
  if (patch instanceof Remove) {
    return bind1(ask2)(function(v) {
      return liftEffect2(function __do2() {
        removeChild3(patch.value0)(v.parent)();
        return Nothing.value;
      });
    });
  }
  ;
  if (patch instanceof InsertLast) {
    return map22(Just.create)(addNode(patch.value0));
  }
  ;
  if (patch instanceof InsertBefore) {
    return mapFlipped3(placeNode(function(v) {
      return insertBefore3(v.node)(patch.value1)(v.parent);
    })(patch.value0))(Just.create);
  }
  ;
  if (patch instanceof Switch) {
    return bind1(ask2)(function(v) {
      return liftEffect2(function __do2() {
        insertBefore3(patch.value0)(patch.value1)(v.parent)();
        return Nothing.value;
      });
    });
  }
  ;
  throw new Error("Failed pattern match at VirtualDom (line 129, column 20 - line 144, column 19): " + [patch.constructor.name]);
};
var removeVNode = function(svn) {
  return bind1(fromMaybe(noNodeError1)(bind22(getNode(svn))(function(node) {
    return new Just(applyPatch(new Remove(node)));
  })))(function() {
    return pure22(unit);
  });
};
var replaceNode = function(oldNode) {
  return placeNode(function(v) {
    return replaceChild3(v.node)(oldNode)(v.parent);
  });
};
var addAttribute = function($copy_attr) {
  return function($copy_elem) {
    var $tco_var_attr = $copy_attr;
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(attr, elem3) {
      if (attr instanceof Attr) {
        $tco_done = true;
        return lift5(setAttribute3(attr.value0)(attr.value1)(elem3));
      }
      ;
      if (attr instanceof Prop) {
        $tco_done = true;
        return lift5(setElementProperty(attr.value0)(attr.value1)(elem3));
      }
      ;
      if (attr instanceof AddClass) {
        $tco_done = true;
        return lift5(bind3(classList3(elem3))(add2([attr.value0])));
      }
      ;
      if (attr instanceof Listener) {
        $tco_done = true;
        return tell1(new Tuple(attr.value0(toEventTarget2(elem3)), mempty1));
      }
      ;
      if (attr instanceof AlwaysSet) {
        $tco_var_attr = attr.value0;
        $copy_elem = elem3;
        return;
      }
      ;
      throw new Error("Failed pattern match at VirtualDom (line 466, column 3 - line 471, column 39): " + [attr.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($tco_var_attr, $copy_elem);
    }
    ;
    return $tco_result;
  };
};
var diffAttributes = function(elem3) {
  var diffBoth = function(force2) {
    return function(sa1) {
      return function(sa2) {
        var $$switch = function(v) {
          return discard3(lift5(removeAttribute3(sa1)(elem3)))(function() {
            return discard3(addAttribute(sa2)(elem3))(function() {
              return pure3(new Just(sa2));
            });
          });
        };
        var forceUpdate = function(v) {
          if (force2) {
            return addAttribute(sa2)(elem3);
          }
          ;
          return pure3(unit);
        };
        if (sa1 instanceof Attr && sa2 instanceof Attr) {
          var $207 = sa1.value0 === sa2.value0;
          if ($207) {
            var $208 = sa1.value1 === sa2.value1;
            if ($208) {
              return discard3(forceUpdate(unit))(function() {
                return pure3(new Just(sa1));
              });
            }
            ;
            return discard3(addAttribute(sa2)(elem3))(function() {
              return pure3(new Just(sa2));
            });
          }
          ;
          return $$switch(unit);
        }
        ;
        if (sa1 instanceof AddClass && sa2 instanceof AddClass) {
          var $213 = sa1.value0 === sa2.value0;
          if ($213) {
            return pure3(new Just(sa1));
          }
          ;
          return $$switch(unit);
        }
        ;
        if (sa1 instanceof Prop && sa2 instanceof Prop) {
          var $216 = sa1.value0 === sa2.value0;
          if ($216) {
            var $217 = eq12(sa1.value1)(sa2.value1);
            if ($217) {
              return discard3(forceUpdate(unit))(function() {
                return pure3(new Just(sa1));
              });
            }
            ;
            return discard3(addAttribute(sa2)(elem3))(function() {
              return pure3(new Just(sa2));
            });
          }
          ;
          return $$switch(unit);
        }
        ;
        if (sa1 instanceof AlwaysSet && sa2 instanceof AlwaysSet) {
          return mmap2(AlwaysSet.create)(diffBoth(true)(sa1.value0)(sa2.value0));
        }
        ;
        return $$switch(unit);
      };
    };
  };
  return diff1(function(v) {
    if (v instanceof Left2) {
      return discard3(lift5(removeAttribute3(v.value0)(elem3)))(function() {
        return pure3(Nothing.value);
      });
    }
    ;
    if (v instanceof Right2) {
      return discard3(addAttribute(v.value0)(elem3))(function() {
        return pure3(new Just(v.value0));
      });
    }
    ;
    if (v instanceof Both) {
      return diffBoth(false)(v.value0)(v.value1);
    }
    ;
    throw new Error("Failed pattern match at VirtualDom (line 392, column 6 - line 401, column 51): " + [v.constructor.name]);
  });
};
var keyedDiffReplace = function(vnode1) {
  return function(v) {
    return function(tail1) {
      return function(tail2) {
        return bind1(diffSingle(vnode1)(v.value1))(function(newVNode) {
          return bind1(keyedDiff(tail1)(tail2))(function(rest) {
            return pure22(new Cons(new Tuple(v.value0, newVNode), rest));
          });
        });
      };
    };
  };
};
var keyedDiffRemove = function(removeMe) {
  return function(oldVNode) {
    return function(v) {
      return function(tail1) {
        return function(tail2) {
          return bind1(diffSingle(oldVNode)(v.value1))(function(newVNodeNoded) {
            return discard22(removeVNode(removeMe))(function() {
              return bind1(keyedDiff(tail1)(tail2))(function(rest) {
                return pure22(new Cons(new Tuple(v.value0, newVNodeNoded), rest));
              });
            });
          });
        };
      };
    };
  };
};
var keyedDiffInsertBefore = function(v) {
  return function(newVNode1$prime) {
    return function(v1) {
      return function(tail1) {
        return function(tail2) {
          return bind1(diffSingle(v.value1)(newVNode1$prime))(function(newVNode1) {
            return bind1(function() {
              var v2 = getNode(newVNode1);
              if (v2 instanceof Just) {
                return map22(fromMaybe(v1.value1))(applyPatch(new InsertBefore(v1.value1, v2.value0)));
              }
              ;
              if (v2 instanceof Nothing) {
                return noNodeError1;
              }
              ;
              throw new Error("Failed pattern match at VirtualDom (line 307, column 16 - line 309, column 27): " + [v2.constructor.name]);
            }())(function(newVNode2) {
              return bind1(keyedDiff(tail1)(tail2))(function(rest) {
                return pure22(new Cons(new Tuple(v1.value0, newVNode2), new Cons(new Tuple(v.value0, newVNode1), rest)));
              });
            });
          });
        };
      };
    };
  };
};
var keyedDiff = function(v) {
  return function(v1) {
    if (v instanceof Cons && v1 instanceof Cons) {
      var $257 = v.value0.value0 === v1.value0.value0;
      if ($257) {
        return keyedDiffReplace(v.value0.value1)(v1.value0)(v.value1)(v1.value1);
      }
      ;
      if (v.value1 instanceof Cons && v1.value1 instanceof Cons) {
        var $260 = v.value0.value0 === fst(v1.value1.value0);
        if ($260) {
          var $261 = v1.value0.value0 === fst(v.value1.value0);
          if ($261) {
            return bind1(diffSingle(snd(v.value1.value0))(v1.value0.value1))(function(newKey1VNode) {
              return bind1(diffSingle(v.value0.value1)(snd(v1.value1.value0)))(function(newKey2VNode) {
                return bind1(fromMaybe(noNodeError1)(bind22(getNode(newKey1VNode))(function(node1) {
                  return bind22(getNode(newKey2VNode))(function(node2) {
                    return new Just(applyPatch(new Switch(node1, node2)));
                  });
                })))(function() {
                  return bind1(keyedDiff(v.value1.value1)(v1.value1.value1))(function(rest) {
                    return pure22(new Cons(new Tuple(v1.value0.value0, newKey1VNode), new Cons(new Tuple(v.value0.value0, newKey2VNode), rest)));
                  });
                });
              });
            });
          }
          ;
          return keyedDiffInsertBefore(v.value0)(snd(v1.value1.value0))(v1.value0)(v.value1)(v1.value1.value1);
        }
        ;
        var $262 = v1.value0.value0 === fst(v.value1.value0);
        if ($262) {
          return keyedDiffRemove(v.value0.value1)(snd(v.value1.value0))(v1.value0)(v.value1.value1)(v1.value1);
        }
        ;
        return keyedDiffReplace(v.value0.value1)(v1.value0)(v.value1)(v1.value1);
      }
      ;
      if (v.value1 instanceof Cons && v1.value1 instanceof Nil) {
        var $267 = v1.value0.value0 === fst(v.value1.value0);
        if ($267) {
          return keyedDiffRemove(v.value0.value1)(snd(v.value1.value0))(v1.value0)(v.value1.value1)(v1.value1);
        }
        ;
        return keyedDiffReplace(v.value0.value1)(v1.value0)(v.value1)(v1.value1);
      }
      ;
      if (v.value1 instanceof Nil && v1.value1 instanceof Cons) {
        var $270 = v.value0.value0 === fst(v1.value1.value0);
        if ($270) {
          return keyedDiffInsertBefore(v.value0)(snd(v1.value1.value0))(v1.value0)(v.value1)(v1.value1.value1);
        }
        ;
        return keyedDiffReplace(v.value0.value1)(v1.value0)(v.value1)(v1.value1);
      }
      ;
      if (v.value1 instanceof Nil && v1.value1 instanceof Nil) {
        return keyedDiffReplace(v.value0.value1)(v1.value0)(v.value1)(v1.value1);
      }
      ;
      throw new Error("Failed pattern match at VirtualDom (line 236, column 12 - line 265, column 62): " + [v.value1.constructor.name, v1.value1.constructor.name]);
    }
    ;
    if (v1 instanceof Nil) {
      return discard22(traverse_2(function($313) {
        return removeVNode(snd($313));
      })(v))(function() {
        return pure22(mempty22);
      });
    }
    ;
    if (v instanceof Nil) {
      return traverse2(addKeyedNode)(v1);
    }
    ;
    throw new Error("Failed pattern match at VirtualDom (line 227, column 13 - line 269, column 46): " + [v.constructor.name, v1.constructor.name]);
  };
};
var diffSingle = function(svn1) {
  return function(svn2) {
    var replace3 = function(v) {
      var v1 = getNode(svn1);
      if (v1 instanceof Just) {
        return bind1(replaceNode(v1.value0)(svn2))(function(svn) {
          return pure22(svn);
        });
      }
      ;
      if (v1 instanceof Nothing) {
        return pure22(svn2);
      }
      ;
      throw new Error("Failed pattern match at VirtualDom (line 321, column 7 - line 326, column 29): " + [v1.constructor.name]);
    };
    if (svn1 instanceof VElement && svn2 instanceof VElement) {
      var $285 = svn1.value0.tag === svn2.value0.tag;
      if ($285) {
        if (svn1.value0.noDiff) {
          return replace3(unit);
        }
        ;
        var result = bind22(svn1.value0.node)(function(elem3) {
          return new Just(discard22(addCss(svn2.value0.css))(function() {
            return bind1(lift1(diffAttributes(elem3)(svn1.value0.attributes)(svn2.value0.attributes)))(function(attributes) {
              return bind1(local2(changeParent(elem3))($lazy_vDomDiff(340)(svn1.value0.children)(svn2.value0.children)))(function(children2) {
                return pure22(new VElement({
                  tag: svn1.value0.tag,
                  styles: svn1.value0.styles,
                  css: svn1.value0.css,
                  attributes,
                  children: children2,
                  node: svn1.value0.node,
                  noDiff: svn1.value0.noDiff
                }));
              });
            });
          }));
        });
        if (result instanceof Just) {
          return result.value0;
        }
        ;
        if (result instanceof Nothing) {
          return replace3(unit);
        }
        ;
        throw new Error("Failed pattern match at VirtualDom (line 348, column 11 - line 350, column 36): " + [result.constructor.name]);
      }
      ;
      return replace3(unit);
    }
    ;
    if (svn1 instanceof KeyedElement && svn2 instanceof KeyedElement) {
      var $291 = svn1.value0.tag === svn2.value0.tag;
      if ($291) {
        var result = bind22(svn1.value0.node)(function(elem3) {
          return new Just(discard22(addCss(svn2.value0.css))(function() {
            return bind1(lift1(diffAttributes(elem3)(svn1.value0.attributes)(svn2.value0.attributes)))(function(attributes) {
              return bind1(local2(changeParent(elem3))(keyedDiff(svn1.value0.children)(svn2.value0.children)))(function(children2) {
                return pure22(new KeyedElement({
                  tag: svn1.value0.tag,
                  styles: svn1.value0.styles,
                  css: svn1.value0.css,
                  attributes,
                  children: children2,
                  node: svn1.value0.node
                }));
              });
            });
          }));
        });
        if (result instanceof Just) {
          return result.value0;
        }
        ;
        if (result instanceof Nothing) {
          return replace3(unit);
        }
        ;
        throw new Error("Failed pattern match at VirtualDom (line 370, column 9 - line 372, column 34): " + [result.constructor.name]);
      }
      ;
      return replace3(unit);
    }
    ;
    if (svn1 instanceof VText && svn2 instanceof VText) {
      var $296 = svn1.value0.text === svn2.value0.text;
      if ($296) {
        return pure22(svn1);
      }
      ;
      return replace3(unit);
    }
    ;
    return replace3(unit);
  };
};
var $lazy_vDomDiff = /* @__PURE__ */ $runtime_lazy2("vDomDiff", "VirtualDom", function() {
  return diff2(monadReaderT(monadWriterT2))(function(v) {
    if (v instanceof Left2) {
      return discard22(removeVNode(v.value0))(function() {
        return pure22(Nothing.value);
      });
    }
    ;
    if (v instanceof Right2) {
      return bind1(addNode(v.value0))(function(singleNode) {
        return pure22(new Just(singleNode));
      });
    }
    ;
    if (v instanceof Both) {
      return map22(Just.create)(diffSingle(v.value0)(v.value1));
    }
    ;
    throw new Error("Failed pattern match at VirtualDom (line 211, column 7 - line 219, column 40): " + [v.constructor.name]);
  });
});
var vDomDiff = /* @__PURE__ */ $lazy_vDomDiff(208);
var render = function(doc) {
  return function(parents) {
    return function(oldVNodes) {
      return function(newVNodes) {
        return function __do2() {
          var v = runWriterT(runReaderT(vDomDiff(oldVNodes.body)(newVNodes.body))({
            doc,
            parent: parents.body
          }))();
          var headVdom = map12(fst)(runWriterT(runReaderT(vDomDiff(oldVNodes.head)(new Cons(makeStyleNode(coerce4(v.value1.value1)), newVNodes.head)))({
            doc,
            parent: parents.head
          })))();
          return new Tuple({
            head: headVdom,
            body: v.value0
          }, v.value1.value0);
        };
      };
    };
  };
};

// output/WHATWG.DOM.Event/foreign.js
var preventDefaultImpl = (event) => () => event.preventDefault();

// output/WHATWG.DOM.Event/index.js
var targetNullable = function() {
  return unsafeGetPure("target");
};
var targetNullable1 = /* @__PURE__ */ targetNullable();
var unsafeTarget = function() {
  return function($3) {
    return targetNullable1($3);
  };
};
var preventDefault2 = function() {
  return preventDefaultImpl;
};

// output/WHATWG.DOM.EventTarget/foreign.js
var addEventListenerImpl = (type) => (callback) => (options) => (target) => () => {
  target.addEventListener(type, callback, options);
};
var removeEventListenerImpl = (type) => (callback) => (options) => (target) => () => {
  target.removeEventListener(type, callback, options);
};

// output/WHATWG.DOM.EventTarget/index.js
var removeEventListener2 = function() {
  return function() {
    return removeEventListenerImpl;
  };
};
var addEventListener2 = function() {
  return function() {
    return addEventListenerImpl;
  };
};

// output/Attribute/index.js
var mapFlipped4 = /* @__PURE__ */ mapFlipped(functorEffect);
var produce2 = /* @__PURE__ */ produce(produceProducer);
var unsafeTarget2 = /* @__PURE__ */ unsafeTarget();
var addEventListener3 = /* @__PURE__ */ addEventListener2()();
var removeEventListener3 = /* @__PURE__ */ removeEventListener2()();
var producer32 = /* @__PURE__ */ producer3(/* @__PURE__ */ eqTuple(eqProducer)(/* @__PURE__ */ eqTuple(eqRefEq)(eqString)));
var producer4 = /* @__PURE__ */ producer(eqProducer);
var value3 = /* @__PURE__ */ function() {
  var $48 = Prop.create("value");
  return function($49) {
    return Single.create($48(toJSValue($49)));
  };
}();
var title2 = /* @__PURE__ */ function() {
  var $56 = Attr.create("title");
  return function($57) {
    return Single.create($56($57));
  };
}();
var property = /* @__PURE__ */ function() {
  return compose2(Single.create)(Prop.create);
}();
var onInputRefEq = function(toMsg) {
  return function(event) {
    return mapFlipped4(unsafeGet2("value")(unsafeTarget2(event)))(function() {
      var $126 = produce2(toMsg);
      return function($127) {
        return Just.create($126($127));
      };
    }());
  };
};
var makeListener = function(toEventCallback) {
  return function(targ) {
    return function(event) {
      return function(send) {
        var callback = mkEffectFn1(toEventCallback(send));
        return function __do2() {
          addEventListener3(event)(callback)({})(targ)();
          return removeEventListener3(event)(callback)({})(targ);
        };
      };
    };
  };
};
var onRefEq = function(handlerP) {
  return function(v) {
    return makeListener(function(msgCallback) {
      return function(event) {
        return function __do2() {
          var mmsg = produce2(handlerP)(event)();
          if (mmsg instanceof Just) {
            return msgCallback(mmsg.value0)();
          }
          ;
          if (mmsg instanceof Nothing) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Attribute (line 615, column 10 - line 617, column 32): " + [mmsg.constructor.name]);
        };
      };
    })(v.value0);
  };
};
var on2 = function(dictProduce) {
  var lift6 = lift(dictProduce);
  return function(eventName) {
    return function(toMsg) {
      return new Single(new Listener(function(targ) {
        return new Single(producer32(onRefEq)(lift6(toMsg))(new RefEq(targ))(eventName));
      }));
    };
  };
};
var on1 = /* @__PURE__ */ on2(produceProducer);
var onInput = function(dictProduce) {
  var $154 = on1("input");
  var $155 = producer4(onInputRefEq);
  var $156 = lift(dictProduce);
  return function($157) {
    return $154($155($156($157)));
  };
};
var on_RefEq = function(msg) {
  return function(v) {
    return makeListener(function(send) {
      return function(v1) {
        return send(produce2(msg));
      };
    })(v.value0);
  };
};
var on_ = function(dictProduce) {
  var lift6 = lift(dictProduce);
  return function(eventName) {
    return function(msg) {
      return new Single(new Listener(function(targ) {
        return new Single(producer32(on_RefEq)(lift6(msg))(new RefEq(targ))(eventName));
      }));
    };
  };
};
var onClick = function(dictProduce) {
  return on_(dictProduce)("click");
};
var id2 = /* @__PURE__ */ function() {
  var $202 = Attr.create("id");
  return function($203) {
    return Single.create($202($203));
  };
}();
var alwaysSet = /* @__PURE__ */ function() {
  return mapBoth(AlwaysSet.create);
}();

// output/Compat.Id/index.js
var convertId = function(a) {
  return a;
};

// output/Data.Argonaut.Core/foreign.js
function id3(x) {
  return x;
}
function stringify(j) {
  return JSON.stringify(j);
}
function isArray(a) {
  return Object.prototype.toString.call(a) === "[object Array]";
}
function _caseJson(isNull2, isBool, isNum, isStr, isArr, isObj, j) {
  if (j == null)
    return isNull2();
  else if (typeof j === "boolean")
    return isBool(j);
  else if (typeof j === "number")
    return isNum(j);
  else if (typeof j === "string")
    return isStr(j);
  else if (Object.prototype.toString.call(j) === "[object Array]")
    return isArr(j);
  else
    return isObj(j);
}
function _compare(EQ2, GT2, LT2, a, b) {
  if (a == null) {
    if (b == null)
      return EQ2;
    else
      return LT2;
  } else if (typeof a === "boolean") {
    if (typeof b === "boolean") {
      if (a === b)
        return EQ2;
      else if (a === false)
        return LT2;
      else
        return GT2;
    } else if (b == null)
      return GT2;
    else
      return LT2;
  } else if (typeof a === "number") {
    if (typeof b === "number") {
      if (a === b)
        return EQ2;
      else if (a < b)
        return LT2;
      else
        return GT2;
    } else if (b == null)
      return GT2;
    else if (typeof b === "boolean")
      return GT2;
    else
      return LT2;
  } else if (typeof a === "string") {
    if (typeof b === "string") {
      if (a === b)
        return EQ2;
      else if (a < b)
        return LT2;
      else
        return GT2;
    } else if (b == null)
      return GT2;
    else if (typeof b === "boolean")
      return GT2;
    else if (typeof b === "number")
      return GT2;
    else
      return LT2;
  } else if (isArray(a)) {
    if (isArray(b)) {
      for (var i = 0; i < Math.min(a.length, b.length); i++) {
        var ca = _compare(EQ2, GT2, LT2, a[i], b[i]);
        if (ca !== EQ2)
          return ca;
      }
      if (a.length === b.length)
        return EQ2;
      else if (a.length < b.length)
        return LT2;
      else
        return GT2;
    } else if (b == null)
      return GT2;
    else if (typeof b === "boolean")
      return GT2;
    else if (typeof b === "number")
      return GT2;
    else if (typeof b === "string")
      return GT2;
    else
      return LT2;
  } else {
    if (b == null)
      return GT2;
    else if (typeof b === "boolean")
      return GT2;
    else if (typeof b === "number")
      return GT2;
    else if (typeof b === "string")
      return GT2;
    else if (isArray(b))
      return GT2;
    else {
      var akeys = Object.keys(a);
      var bkeys = Object.keys(b);
      if (akeys.length < bkeys.length)
        return LT2;
      else if (akeys.length > bkeys.length)
        return GT2;
      var keys4 = akeys.concat(bkeys).sort();
      for (var j = 0; j < keys4.length; j++) {
        var k = keys4[j];
        if (a[k] === void 0)
          return LT2;
        else if (b[k] === void 0)
          return GT2;
        var ck = _compare(EQ2, GT2, LT2, a[k], b[k]);
        if (ck !== EQ2)
          return ck;
      }
      return EQ2;
    }
  }
}

// output/Foreign.Object/foreign.js
function _copyST(m) {
  return function() {
    var r = {};
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r[k] = m[k];
      }
    }
    return r;
  };
}
var empty3 = {};
function runST(f) {
  return f();
}
function _lookup(no, yes, k, m) {
  return k in m ? yes(m[k]) : no;
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys2 = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output/Data.Function.Uncurried/foreign.js
var runFn2 = function(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b);
    };
  };
};
var runFn4 = function(fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return function(d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

// output/Foreign.Object.ST/foreign.js
function poke2(k) {
  return function(v) {
    return function(m) {
      return function() {
        m[k] = v;
        return m;
      };
    };
  };
}

// output/Foreign.Object/index.js
var toUnfoldable4 = function(dictUnfoldable) {
  var $86 = toUnfoldable(dictUnfoldable);
  var $87 = toArrayWithKey(Tuple.create);
  return function($88) {
    return $86($87($88));
  };
};
var thawST = _copyST;
var mutate = function(f) {
  return function(m) {
    return runST(function __do2() {
      var s = thawST(m)();
      f(s)();
      return s;
    });
  };
};
var lookup2 = /* @__PURE__ */ function() {
  return runFn4(_lookup)(Nothing.value)(Just.create);
}();
var insert2 = function(k) {
  return function(v) {
    return mutate(poke2(k)(v));
  };
};
var fromHomogeneous = function() {
  return unsafeCoerce2;
};

// output/Data.Argonaut.Core/index.js
var eq3 = /* @__PURE__ */ eq(eqOrdering);
var verbJsonType = function(def) {
  return function(f) {
    return function(g) {
      return g(def)(f);
    };
  };
};
var toJsonType = /* @__PURE__ */ function() {
  return verbJsonType(Nothing.value)(Just.create);
}();
var ordJson = {
  compare: function(a) {
    return function(b) {
      return _compare(EQ.value, GT.value, LT.value, a, b);
    };
  },
  Eq0: function() {
    return eqJson;
  }
};
var eqJson = {
  eq: function(j1) {
    return function(j2) {
      return eq3(compare(ordJson)(j1)(j2))(EQ.value);
    };
  }
};
var caseJsonString = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
    };
  };
};
var toString = /* @__PURE__ */ toJsonType(caseJsonString);
var caseJsonObject = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
    };
  };
};
var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
var caseJsonBoolean = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), f, $$const(d), $$const(d), $$const(d), $$const(d), j);
    };
  };
};
var caseJsonArray = function(d) {
  return function(f) {
    return function(j) {
      return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), f, $$const(d), j);
    };
  };
};
var toArray = /* @__PURE__ */ toJsonType(caseJsonArray);

// output/Data.Argonaut.Decode.Error/index.js
var TypeMismatch = /* @__PURE__ */ function() {
  function TypeMismatch2(value0) {
    this.value0 = value0;
  }
  ;
  TypeMismatch2.create = function(value0) {
    return new TypeMismatch2(value0);
  };
  return TypeMismatch2;
}();
var UnexpectedValue = /* @__PURE__ */ function() {
  function UnexpectedValue2(value0) {
    this.value0 = value0;
  }
  ;
  UnexpectedValue2.create = function(value0) {
    return new UnexpectedValue2(value0);
  };
  return UnexpectedValue2;
}();
var AtIndex = /* @__PURE__ */ function() {
  function AtIndex2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  AtIndex2.create = function(value0) {
    return function(value1) {
      return new AtIndex2(value0, value1);
    };
  };
  return AtIndex2;
}();
var AtKey = /* @__PURE__ */ function() {
  function AtKey2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  AtKey2.create = function(value0) {
    return function(value1) {
      return new AtKey2(value0, value1);
    };
  };
  return AtKey2;
}();
var Named = /* @__PURE__ */ function() {
  function Named2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Named2.create = function(value0) {
    return function(value1) {
      return new Named2(value0, value1);
    };
  };
  return Named2;
}();
var MissingValue = /* @__PURE__ */ function() {
  function MissingValue2() {
  }
  ;
  MissingValue2.value = new MissingValue2();
  return MissingValue2;
}();

// output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head6, tail2) {
    this.head = head6;
    this.tail = tail2;
  };
  function finalCell(head6) {
    return new ConsCell(head6, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply5) {
    return function(map27) {
      return function(f) {
        var buildFrom = function(x, ys) {
          return apply5(map27(consList)(f(x)))(ys);
        };
        var go = function(acc, currentLen, xs) {
          if (currentLen === 0) {
            return acc;
          } else {
            var last3 = xs[currentLen - 1];
            return new Cont(function() {
              var built = go(buildFrom(last3, acc), currentLen - 1, xs);
              return built;
            });
          }
        };
        return function(array) {
          var acc = map27(finalCell)(f(array[array.length - 1]));
          var result = go(acc, array.length - 1, array);
          while (result instanceof Cont) {
            result = result.fn();
          }
          return map27(listToArray)(result);
        };
      };
    };
  };
}();

// output/Data.Int/foreign.js
var fromNumberImpl = function(just) {
  return function(nothing) {
    return function(n) {
      return (n | 0) === n ? just(n) : nothing;
    };
  };
};
var toNumber = function(n) {
  return n;
};

// output/Data.Number/foreign.js
var isFiniteImpl = isFinite;
function fromStringImpl(str, isFinite2, just, nothing) {
  var num = parseFloat(str);
  if (isFinite2(num)) {
    return just(num);
  } else {
    return nothing;
  }
}
var round = Math.round;

// output/Data.Number/index.js
var fromString = function(str) {
  return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
};

// output/Data.Int/index.js
var top2 = /* @__PURE__ */ top(boundedInt);
var bottom2 = /* @__PURE__ */ bottom(boundedInt);
var fromNumber = /* @__PURE__ */ function() {
  return fromNumberImpl(Just.create)(Nothing.value);
}();
var unsafeClamp = function(x) {
  if (!isFiniteImpl(x)) {
    return 0;
  }
  ;
  if (x >= toNumber(top2)) {
    return top2;
  }
  ;
  if (x <= toNumber(bottom2)) {
    return bottom2;
  }
  ;
  if (otherwise) {
    return fromMaybe(0)(fromNumber(x));
  }
  ;
  throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
};
var round2 = function($37) {
  return unsafeClamp(round($37));
};

// output/Data.List.NonEmpty/index.js
var wrappedOperation = function(name4) {
  return function(f) {
    return function(v) {
      var v1 = f(new Cons(v.value0, v.value1));
      if (v1 instanceof Cons) {
        return new NonEmpty(v1.value0, v1.value1);
      }
      ;
      if (v1 instanceof Nil) {
        return unsafeCrashWith("Impossible: empty list in NonEmptyList " + name4);
      }
      ;
      throw new Error("Failed pattern match at Data.List.NonEmpty (line 92, column 3 - line 94, column 81): " + [v1.constructor.name]);
    };
  };
};
var reverse3 = /* @__PURE__ */ wrappedOperation("reverse")(reverse2);
var head4 = function(v) {
  return v.value0;
};
var fromList = function(v) {
  if (v instanceof Nil) {
    return Nothing.value;
  }
  ;
  if (v instanceof Cons) {
    return new Just(new NonEmpty(v.value0, v.value1));
  }
  ;
  throw new Error("Failed pattern match at Data.List.NonEmpty (line 121, column 1 - line 121, column 57): " + [v.constructor.name]);
};
var cons3 = function(y) {
  return function(v) {
    return new NonEmpty(y, new Cons(v.value0, v.value1));
  };
};

// output/Data.Set/index.js
var map13 = /* @__PURE__ */ map(functorMaybe);
var union3 = function(dictOrd) {
  var union1 = union(dictOrd);
  return function(v) {
    return function(v1) {
      return union1(v)(v1);
    };
  };
};
var toList = function(v) {
  return keys(v);
};
var toUnfoldable5 = function(dictUnfoldable) {
  var $127 = toUnfoldable2(dictUnfoldable);
  return function($128) {
    return $127(toList($128));
  };
};
var singleton7 = function(a) {
  return singleton3(a)(unit);
};
var semigroupSet = function(dictOrd) {
  return {
    append: union3(dictOrd)
  };
};
var member2 = function(dictOrd) {
  var member12 = member(dictOrd);
  return function(a) {
    return function(v) {
      return member12(a)(v);
    };
  };
};
var insert4 = function(dictOrd) {
  var insert12 = insert(dictOrd);
  return function(a) {
    return function(v) {
      return insert12(a)(unit)(v);
    };
  };
};
var findMax2 = function(v) {
  return map13(function(v1) {
    return v1.key;
  })(findMax(v));
};
var empty4 = empty2;
var fromFoldable3 = function(dictFoldable) {
  var foldl22 = foldl(dictFoldable);
  return function(dictOrd) {
    var insert12 = insert4(dictOrd);
    return foldl22(function(m) {
      return function(a) {
        return insert12(a)(m);
      };
    })(empty4);
  };
};
var monoidSet = function(dictOrd) {
  var semigroupSet1 = semigroupSet(dictOrd);
  return {
    mempty: empty4,
    Semigroup0: function() {
      return semigroupSet1;
    }
  };
};

// output/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";
var _unsafeCodePointAt0 = function(fallback) {
  return hasCodePointAt ? function(str) {
    return str.codePointAt(0);
  } : fallback;
};
var _singleton = function(fallback) {
  return hasFromCodePoint ? String.fromCodePoint : fallback;
};
var _take = function(fallback) {
  return function(n) {
    if (hasStringIterator) {
      return function(str) {
        var accum = "";
        var iter = str[Symbol.iterator]();
        for (var i = 0; i < n; ++i) {
          var o = iter.next();
          if (o.done)
            return accum;
          accum += o.value;
        }
        return accum;
      };
    }
    return fallback(n);
  };
};
var _toCodePointArray = function(fallback) {
  return function(unsafeCodePointAt02) {
    if (hasArrayFrom) {
      return function(str) {
        return Array.from(str, unsafeCodePointAt02);
      };
    }
    return fallback;
  };
};

// output/Data.String.CodeUnits/foreign.js
var toCharArray = function(s) {
  return s.split("");
};
var singleton8 = function(c) {
  return c;
};
var length4 = function(s) {
  return s.length;
};
var _indexOf = function(just) {
  return function(nothing) {
    return function(x) {
      return function(s) {
        var i = s.indexOf(x);
        return i === -1 ? nothing : just(i);
      };
    };
  };
};
var take3 = function(n) {
  return function(s) {
    return s.substr(0, n);
  };
};
var drop3 = function(n) {
  return function(s) {
    return s.substring(n);
  };
};
var slice2 = function(b) {
  return function(e) {
    return function(s) {
      return s.slice(b, e);
    };
  };
};

// output/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

// output/Data.String.CodeUnits/index.js
var indexOf = /* @__PURE__ */ function() {
  return _indexOf(Just.create)(Nothing.value);
}();

// output/Data.String.Common/foreign.js
var split = function(sep) {
  return function(s) {
    return s.split(sep);
  };
};
var toLower = function(s) {
  return s.toLowerCase();
};

// output/Data.String.CodePoints/index.js
var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
var map8 = /* @__PURE__ */ map(functorMaybe);
var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
var div2 = /* @__PURE__ */ div(euclideanRingInt);
var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
var unsurrogate = function(lead) {
  return function(trail) {
    return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
  };
};
var isTrail = function(cu) {
  return 56320 <= cu && cu <= 57343;
};
var isLead = function(cu) {
  return 55296 <= cu && cu <= 56319;
};
var uncons3 = function(s) {
  var v = length4(s);
  if (v === 0) {
    return Nothing.value;
  }
  ;
  if (v === 1) {
    return new Just({
      head: fromEnum2(charAt(0)(s)),
      tail: ""
    });
  }
  ;
  var cu1 = fromEnum2(charAt(1)(s));
  var cu0 = fromEnum2(charAt(0)(s));
  var $42 = isLead(cu0) && isTrail(cu1);
  if ($42) {
    return new Just({
      head: unsurrogate(cu0)(cu1),
      tail: drop3(2)(s)
    });
  }
  ;
  return new Just({
    head: cu0,
    tail: drop3(1)(s)
  });
};
var unconsButWithTuple = function(s) {
  return map8(function(v) {
    return new Tuple(v.head, v.tail);
  })(uncons3(s));
};
var toCodePointArrayFallback = function(s) {
  return unfoldr2(unconsButWithTuple)(s);
};
var unsafeCodePointAt0Fallback = function(s) {
  var cu0 = fromEnum2(charAt(0)(s));
  var $46 = isLead(cu0) && length4(s) > 1;
  if ($46) {
    var cu1 = fromEnum2(charAt(1)(s));
    var $47 = isTrail(cu1);
    if ($47) {
      return unsurrogate(cu0)(cu1);
    }
    ;
    return cu0;
  }
  ;
  return cu0;
};
var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
var length5 = function($73) {
  return length(toCodePointArray($73));
};
var indexOf2 = function(p) {
  return function(s) {
    return map8(function(i) {
      return length5(take3(i)(s));
    })(indexOf(p)(s));
  };
};
var fromCharCode2 = /* @__PURE__ */ function() {
  var $74 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
  return function($75) {
    return singleton8($74($75));
  };
}();
var singletonFallback = function(v) {
  if (v <= 65535) {
    return fromCharCode2(v);
  }
  ;
  var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
  var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
  return fromCharCode2(lead) + fromCharCode2(trail);
};
var singleton9 = /* @__PURE__ */ _singleton(singletonFallback);
var takeFallback = function(n) {
  return function(v) {
    if (n < 1) {
      return "";
    }
    ;
    var v1 = uncons3(v);
    if (v1 instanceof Just) {
      return singleton9(v1.value0.head) + takeFallback(n - 1 | 0)(v1.value0.tail);
    }
    ;
    return v;
  };
};
var take4 = /* @__PURE__ */ _take(takeFallback);
var drop4 = function(n) {
  return function(s) {
    return drop3(length4(take4(n)(s)))(s);
  };
};

// output/Data.Argonaut.Decode.Decoders/index.js
var map9 = /* @__PURE__ */ map(functorEither);
var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEither);
var traverse3 = /* @__PURE__ */ traverse(traversableList)(applicativeEither);
var map14 = /* @__PURE__ */ map(functorFn);
var fromFoldable5 = /* @__PURE__ */ fromFoldable2(foldableArray);
var fromFoldable1 = /* @__PURE__ */ fromFoldable3(foldableList);
var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeEither);
var decodeString = /* @__PURE__ */ function() {
  return caseJsonString(new Left(new TypeMismatch("String")))(Right.create);
}();
var decodeJArray = /* @__PURE__ */ function() {
  var $52 = note(new TypeMismatch("Array"));
  return function($53) {
    return $52(toArray($53));
  };
}();
var decodeList = function(decoder) {
  return composeKleisliFlipped2(function() {
    var $54 = lmap2(Named.create("List"));
    var $55 = traverse3(decoder);
    return function($56) {
      return $54($55($56));
    };
  }())(map14(map9(fromFoldable5))(decodeJArray));
};
var decodeSet = function(dictOrd) {
  var fromFoldable22 = fromFoldable1(dictOrd);
  return function(decoder) {
    var $57 = map9(fromFoldable22);
    var $58 = decodeList(decoder);
    return function($59) {
      return $57($58($59));
    };
  };
};
var decodeBoolean = /* @__PURE__ */ function() {
  return caseJsonBoolean(new Left(new TypeMismatch("Boolean")))(Right.create);
}();
var decodeArray = function(decoder) {
  return composeKleisliFlipped2(function() {
    var $89 = lmap2(Named.create("Array"));
    var $90 = traverseWithIndex2(function(i) {
      var $92 = lmap2(AtIndex.create(i));
      return function($93) {
        return $92(decoder($93));
      };
    });
    return function($91) {
      return $89($90($91));
    };
  }())(decodeJArray);
};

// output/Record.Unsafe.Union/foreign.js
function unsafeUnionFn(r1, r2) {
  var copy = {};
  for (var k1 in r2) {
    if ({}.hasOwnProperty.call(r2, k1)) {
      copy[k1] = r2[k1];
    }
  }
  for (var k2 in r1) {
    if ({}.hasOwnProperty.call(r1, k2)) {
      copy[k2] = r1[k2];
    }
  }
  return copy;
}

// output/Record/index.js
var insert5 = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function() {
      return function(l) {
        return function(a) {
          return function(r) {
            return unsafeSet(reflectSymbol2(l))(a)(r);
          };
        };
      };
    };
  };
};
var get = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function() {
    return function(l) {
      return function(r) {
        return unsafeGet(reflectSymbol2(l))(r);
      };
    };
  };
};
var disjointUnion = function() {
  return function() {
    return function(l) {
      return function(r) {
        return unsafeUnionFn(l, r);
      };
    };
  };
};

// output/Data.Argonaut.Decode.Class/index.js
var bind4 = /* @__PURE__ */ bind(bindEither);
var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
var map10 = /* @__PURE__ */ map(functorMaybe);
var gDecodeJsonNil = {
  gDecodeJson: function(v) {
    return function(v1) {
      return new Right({});
    };
  }
};
var gDecodeJson = function(dict) {
  return dict.gDecodeJson;
};
var decodeRecord = function(dictGDecodeJson) {
  var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
  return function() {
    return {
      decodeJson: function(json) {
        var v = toObject(json);
        if (v instanceof Just) {
          return gDecodeJson1(v.value0)($$Proxy.value);
        }
        ;
        if (v instanceof Nothing) {
          return new Left(new TypeMismatch("Object"));
        }
        ;
        throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 103, column 5 - line 105, column 46): " + [v.constructor.name]);
      }
    };
  };
};
var decodeJsonString = {
  decodeJson: decodeString
};
var decodeJsonField = function(dict) {
  return dict.decodeJsonField;
};
var gDecodeJsonCons = function(dictDecodeJsonField) {
  var decodeJsonField1 = decodeJsonField(dictDecodeJsonField);
  return function(dictGDecodeJson) {
    var gDecodeJson1 = gDecodeJson(dictGDecodeJson);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      var insert8 = insert5(dictIsSymbol)()();
      return function() {
        return function() {
          return {
            gDecodeJson: function(object) {
              return function(v) {
                var fieldName = reflectSymbol2($$Proxy.value);
                var fieldValue = lookup2(fieldName)(object);
                var v1 = decodeJsonField1(fieldValue);
                if (v1 instanceof Just) {
                  return bind4(lmap3(AtKey.create(fieldName))(v1.value0))(function(val) {
                    return bind4(gDecodeJson1(object)($$Proxy.value))(function(rest) {
                      return new Right(insert8($$Proxy.value)(val)(rest));
                    });
                  });
                }
                ;
                if (v1 instanceof Nothing) {
                  return new Left(new AtKey(fieldName, MissingValue.value));
                }
                ;
                throw new Error("Failed pattern match at Data.Argonaut.Decode.Class (line 127, column 5 - line 134, column 44): " + [v1.constructor.name]);
              };
            }
          };
        };
      };
    };
  };
};
var decodeJsonBoolean = {
  decodeJson: decodeBoolean
};
var decodeJson = function(dict) {
  return dict.decodeJson;
};
var decodeSet2 = function(dictOrd) {
  var decodeSet1 = decodeSet(dictOrd);
  return function(dictDecodeJson) {
    return {
      decodeJson: decodeSet1(decodeJson(dictDecodeJson))
    };
  };
};
var decodeFieldId = function(dictDecodeJson) {
  var decodeJson12 = decodeJson(dictDecodeJson);
  return {
    decodeJsonField: function(j) {
      return map10(decodeJson12)(j);
    }
  };
};
var decodeArray2 = function(dictDecodeJson) {
  return {
    decodeJson: decodeArray(decodeJson(dictDecodeJson))
  };
};

// output/Data.Argonaut.Types.Generic/index.js
var defaultEncoding = {
  tagKey: "tag",
  valuesKey: "values",
  unwrapSingleArguments: false
};

// output/Data.Argonaut.Decode.Generic/index.js
var bind5 = /* @__PURE__ */ bind(bindEither);
var discard4 = /* @__PURE__ */ discard(discardUnit)(bindEither);
var when2 = /* @__PURE__ */ when(applicativeEither);
var pure4 = /* @__PURE__ */ pure(applicativeEither);
var map11 = /* @__PURE__ */ map(functorEither);
var lmap4 = /* @__PURE__ */ lmap(bifunctorEither);
var notEq1 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqArray(eqJson));
var withTag = function(e) {
  return function(j) {
    return function(name4) {
      var decodingErr = Named.create(name4);
      return bind5(note(decodingErr(new TypeMismatch("Object")))(toObject(j)))(function(jObj) {
        return bind5(note(decodingErr(new AtKey(e.tagKey, MissingValue.value)))(lookup2(e.tagKey)(jObj)))(function(jTag) {
          return bind5(note(decodingErr(new AtKey(e.tagKey, new TypeMismatch("String"))))(toString(jTag)))(function(tag) {
            return discard4(when2(tag !== name4)(new Left(decodingErr(new AtKey(e.tagKey, new UnexpectedValue(id3(tag)))))))(function() {
              return pure4({
                tag,
                decodingErr
              });
            });
          });
        });
      });
    };
  };
};
var withTagAndValues = function(e) {
  return function(j) {
    return function(name4) {
      return bind5(withTag(e)(j)(name4))(function(v) {
        return bind5(note(v.decodingErr(new TypeMismatch("Object")))(toObject(j)))(function(jObj) {
          return bind5(note(v.decodingErr(new AtKey(e.valuesKey, MissingValue.value)))(lookup2(e.valuesKey)(jObj)))(function(values2) {
            return pure4({
              tag: v.tag,
              values: values2,
              decodingErr: v.decodingErr
            });
          });
        });
      });
    };
  };
};
var decodeRepWith = function(dict) {
  return dict.decodeRepWith;
};
var genericDecodeJsonWith = function(dictGeneric) {
  var to2 = to(dictGeneric);
  return function(dictDecodeRep) {
    var decodeRepWith1 = decodeRepWith(dictDecodeRep);
    return function(e) {
      var $101 = map11(to2);
      var $102 = decodeRepWith1(e);
      return function($103) {
        return $101($102($103));
      };
    };
  };
};
var genericDecodeJson = function(dictGeneric) {
  var genericDecodeJsonWith1 = genericDecodeJsonWith(dictGeneric);
  return function(dictDecodeRep) {
    return genericDecodeJsonWith1(dictDecodeRep)(defaultEncoding);
  };
};
var decodeRepArgsArgument = function(dictDecodeJson) {
  var decodeJson5 = decodeJson(dictDecodeJson);
  return {
    decodeRepArgs: function(js) {
      return bind5(note(new TypeMismatch("NonEmptyArray"))(uncons(js)))(function(v) {
        return map11(function($104) {
          return function(v1) {
            return {
              init: v1,
              rest: v.tail
            };
          }(Argument($104));
        })(decodeJson5(v.head));
      });
    }
  };
};
var decodeRepArgs = function(dict) {
  return dict.decodeRepArgs;
};
var construct = function(dictDecodeRepArgs) {
  var decodeRepArgs1 = decodeRepArgs(dictDecodeRepArgs);
  return function(e) {
    return function(valuesArray) {
      return function(decodingErr) {
        return bind5(lmap4(decodingErr)(decodeRepArgs1(valuesArray)))(function(v) {
          return discard4(when2(notEq1(v.rest)([]))(new Left(decodingErr(new AtKey(e.valuesKey, new UnexpectedValue(id3(v.rest)))))))(function() {
            return pure4(v.init);
          });
        });
      };
    };
  };
};
var decodeRepConstructorArg = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(dictDecodeJson) {
    var construct2 = construct(decodeRepArgsArgument(dictDecodeJson));
    return {
      decodeRepWith: function(e) {
        return function(j) {
          var name4 = reflectSymbol2($$Proxy.value);
          return bind5(withTagAndValues(e)(j)(name4))(function(v) {
            if (e.unwrapSingleArguments) {
              return construct2(e)([v.values])(v.decodingErr);
            }
            ;
            return bind5(note(v.decodingErr(new AtKey(e.valuesKey, new TypeMismatch("Array"))))(toArray(v.values)))(function(valuesArray) {
              return construct2(e)(valuesArray)(v.decodingErr);
            });
          });
        };
      }
    };
  };
};

// output/Data.Argonaut.Encode.Encoders/index.js
var map15 = /* @__PURE__ */ map(functorArray);
var toUnfoldable6 = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
var toUnfoldable22 = /* @__PURE__ */ toUnfoldable5(unfoldableList);
var encodeString = id3;
var encodeList = function(encoder) {
  var $45 = map15(encoder);
  return function($46) {
    return id3($45(toUnfoldable6($46)));
  };
};
var encodeSet = function(dictOrd) {
  return function(encoder) {
    var $51 = encodeList(encoder);
    return function($52) {
      return $51(toUnfoldable22($52));
    };
  };
};
var encodeBoolean = id3;

// output/Data.Argonaut.Encode.Class/index.js
var gEncodeJsonNil = {
  gEncodeJson: function(v) {
    return function(v1) {
      return empty3;
    };
  }
};
var gEncodeJson = function(dict) {
  return dict.gEncodeJson;
};
var encodeRecord = function(dictGEncodeJson) {
  var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
  return function() {
    return {
      encodeJson: function(rec) {
        return id3(gEncodeJson1(rec)($$Proxy.value));
      }
    };
  };
};
var encodeJsonJString = {
  encodeJson: encodeString
};
var encodeJsonJBoolean = {
  encodeJson: encodeBoolean
};
var encodeJson = function(dict) {
  return dict.encodeJson;
};
var encodeSet2 = function(dictOrd) {
  var encodeSet1 = encodeSet(dictOrd);
  return function(dictEncodeJson) {
    return {
      encodeJson: encodeSet1(encodeJson(dictEncodeJson))
    };
  };
};
var gEncodeJsonCons = function(dictEncodeJson) {
  var encodeJson1 = encodeJson(dictEncodeJson);
  return function(dictGEncodeJson) {
    var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      var get3 = get(dictIsSymbol)();
      return function() {
        return {
          gEncodeJson: function(row) {
            return function(v) {
              return insert2(reflectSymbol2($$Proxy.value))(encodeJson1(get3($$Proxy.value)(row)))(gEncodeJson1(row)($$Proxy.value));
            };
          }
        };
      };
    };
  };
};

// output/Data.Argonaut.Encode.Generic/index.js
var encodeRepWith = function(dict) {
  return dict.encodeRepWith;
};
var genericEncodeJsonWith = function(dictGeneric) {
  var from3 = from(dictGeneric);
  return function(dictEncodeRep) {
    var encodeRepWith1 = encodeRepWith(dictEncodeRep);
    return function(e) {
      var $71 = encodeRepWith1(e);
      return function($72) {
        return $71(from3($72));
      };
    };
  };
};
var genericEncodeJson = function(dictGeneric) {
  var genericEncodeJsonWith1 = genericEncodeJsonWith(dictGeneric);
  return function(dictEncodeRep) {
    return genericEncodeJsonWith1(dictEncodeRep)(defaultEncoding);
  };
};
var encodeRepSum = function(dictEncodeRep) {
  var encodeRepWith1 = encodeRepWith(dictEncodeRep);
  return function(dictEncodeRep1) {
    var encodeRepWith2 = encodeRepWith(dictEncodeRep1);
    return {
      encodeRepWith: function(e) {
        return function(v) {
          if (v instanceof Inl) {
            return encodeRepWith1(e)(v.value0);
          }
          ;
          if (v instanceof Inr) {
            return encodeRepWith2(e)(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Argonaut.Encode.Generic (line 36, column 1 - line 38, column 50): " + [e.constructor.name, v.constructor.name]);
        };
      }
    };
  };
};
var encodeRepArgsArgument = function(dictEncodeJson) {
  var encodeJson3 = encodeJson(dictEncodeJson);
  return {
    encodeRepArgs: function(v) {
      return [encodeJson3(v)];
    }
  };
};
var encodeRepArgs = function(dict) {
  return dict.encodeRepArgs;
};
var encodeRepConstructor = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(dictEncodeRepArgs) {
    var encodeRepArgs1 = encodeRepArgs(dictEncodeRepArgs);
    return {
      encodeRepWith: function(e) {
        return function(v) {
          var values2 = function() {
            var vs = encodeRepArgs1(v);
            if (e.unwrapSingleArguments) {
              if (vs.length === 1) {
                return vs[0];
              }
              ;
              return id3(vs);
            }
            ;
            return id3(vs);
          }();
          return id3(insert2(e.tagKey)(id3(reflectSymbol2($$Proxy.value)))(insert2(e.valuesKey)(values2)(empty3)));
        };
      }
    };
  };
};

// output/Y.Shared.Event/foreign.js
var withProp_f = (k) => (v) => (o) => {
  return { ...o, [k]: v };
};

// output/Y.Shared.Id/foreign.js
var getNow = () => {
  return BigInt(Date.now());
};
var getRand = (max4) => () => {
  return BigInt(Math.floor(Math.random() * Number(max4)));
};

// output/Effect.Unsafe/foreign.js
var unsafePerformEffect = function(f) {
  return f();
};

// output/Y.Shared.Util.BigInt/foreign.js
var add_f = (b1) => (b2) => b1 + b2;
var zero_f = 0n;
var mul_f = (b1) => (b2) => b1 * b2;
var one_f = 1n;
var sub_f = (b1) => (b2) => b1 - b2;
var degree_f = (b) => Number(b);
var div_f = (b1) => (b2) => b1 / b2;
var mod_f = (b1) => (b2) => b1 % b2;
var eq_f = (b1) => (b2) => b1 === b2;
var compare_f = (lt) => (eq8) => (gt) => (b1) => (b2) => {
  if (b1 < b2)
    return lt;
  if (b1 > b2)
    return gt;
  return eq8;
};
var pow3 = (b1) => (b2) => b1 ** b2;
var fromInt = (n) => BigInt(n);
var toInt = (b) => Number(b);

// output/Y.Shared.Util.BigInt/index.js
var semiringBigInt = {
  add: add_f,
  zero: zero_f,
  mul: mul_f,
  one: one_f
};
var ringBigInt = {
  sub: sub_f,
  Semiring0: function() {
    return semiringBigInt;
  }
};
var eqBigInt = {
  eq: eq_f
};
var ordBigInt = /* @__PURE__ */ function() {
  return {
    compare: compare_f(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqBigInt;
    }
  };
}();
var commutativeRingBigInt = {
  Ring0: function() {
    return ringBigInt;
  }
};
var euclideanRingBigInt = {
  degree: degree_f,
  div: div_f,
  mod: mod_f,
  CommutativeRing0: function() {
    return commutativeRingBigInt;
  }
};

// output/Y.Shared.Id/index.js
var div3 = /* @__PURE__ */ div(euclideanRingBigInt);
var fromJust5 = /* @__PURE__ */ fromJust();
var mod3 = /* @__PURE__ */ mod(euclideanRingBigInt);
var greaterThan1 = /* @__PURE__ */ greaterThan(ordBigInt);
var zero2 = /* @__PURE__ */ zero(semiringBigInt);
var traverse4 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
var map16 = /* @__PURE__ */ map(functorMaybe);
var map23 = /* @__PURE__ */ map(functorArray);
var foldl3 = /* @__PURE__ */ foldl(foldableArray);
var add4 = /* @__PURE__ */ add(semiringBigInt);
var mul2 = /* @__PURE__ */ mul(semiringBigInt);
var pure12 = /* @__PURE__ */ pure(applicativeEffect);
var discard5 = /* @__PURE__ */ discard(discardUnit)(bindEither);
var when3 = /* @__PURE__ */ when(applicativeEither);
var bind23 = /* @__PURE__ */ bind(bindEither);
var pure23 = /* @__PURE__ */ pure(applicativeEither);
var decodeJson2 = /* @__PURE__ */ decodeJson(decodeJsonString);
var lmap5 = /* @__PURE__ */ lmap(bifunctorEither);
var encodeJson2 = /* @__PURE__ */ encodeJson(encodeJsonJString);
var eq4 = /* @__PURE__ */ eq(eqBigInt);
var compare2 = /* @__PURE__ */ compare(ordBigInt);
var toDigits = function(digits) {
  return function(n) {
    var base = fromInt(length(toCharArray(digits)));
    var rest = div3(n)(base);
    var low = singleton8(fromJust5(index(toCharArray(digits))(toInt(mod3(n)(base)))));
    var high = function() {
      var $102 = greaterThan1(rest)(zero2);
      if ($102) {
        return toDigits(digits)(rest);
      }
      ;
      return "";
    }();
    return high + low;
  };
};
var nsAllowedCharSeq = "abcdefghijklmnopqrstuvwxyz-_ ";
var idCharSeq = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var maxRand = /* @__PURE__ */ function() {
  var len = fromInt(4);
  return sub(ringBigInt)(pow3(fromInt(length4(idCharSeq)))(len))(one(semiringBigInt));
}();
var fromDigits = function(digits) {
  var base = fromInt(length4(digits));
  var $120 = map16(foldl3(function(acc) {
    return function(digit) {
      return add4(mul2(acc)(base))(digit);
    };
  })(zero2));
  var $121 = map16(map23(fromInt));
  var $122 = traverse4(function(ch) {
    return indexOf2(singleton8(ch))(digits);
  });
  return function($123) {
    return $120($121($122(toCharArray($123))));
  };
};
var getNs = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return function(proxy) {
    var v = reflectSymbol2(proxy);
    if (v === "") {
      return $$throw("Invalid namespace: cannot be empty");
    }
    ;
    var v1 = fromDigits(nsAllowedCharSeq)(toLower(v));
    if (v1 instanceof Nothing) {
      return $$throw("Invalid namespace: contains invalid char");
    }
    ;
    if (v1 instanceof Just) {
      return pure12(v1.value0);
    }
    ;
    throw new Error("Failed pattern match at Y.Shared.Id (line 99, column 10 - line 101, column 23): " + [v1.constructor.name]);
  };
};
var $$new2 = function(dictIsSymbol) {
  return function __do2() {
    getNs(dictIsSymbol)($$Proxy.value)();
    var time = getNow();
    var rand = getRand(maxRand)();
    return {
      time,
      rand
    };
  };
};
var parse = function(dictIsSymbol) {
  var getNs1 = getNs(dictIsSymbol);
  var $124 = split("-");
  return function($125) {
    return function(v) {
      if (v.length === 4) {
        return discard5(when3(v[1] !== toDigits(idCharSeq)(unsafePerformEffect(getNs1($$Proxy.value))))(new Left("Wrong namespace")))(function() {
          return bind23(note("Invalid timestamp")(fromDigits(idCharSeq)(v[2])))(function(time) {
            return bind23(note("Invalid random")(fromDigits(idCharSeq)(v[3])))(function(rand) {
              return pure23({
                time,
                rand
              });
            });
          });
        });
      }
      ;
      return new Left("Wrong number of parts");
    }($124($125));
  };
};
var decodeJsonId = function(dictIsSymbol) {
  var parse12 = parse(dictIsSymbol);
  return {
    decodeJson: function(json) {
      return bind23(decodeJson2(json))(function(str) {
        return lmap5(function($126) {
          return TypeMismatch.create(function(v) {
            return "not an id: " + v;
          }($126));
        })(parse12(str));
      });
    }
  };
};
var format = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  var getNs1 = getNs(dictIsSymbol);
  return function(v) {
    var timeStr = toDigits(idCharSeq)(v.time);
    var randStr = toDigits(idCharSeq)(v.rand);
    var ns0 = slice2(0)(1)(reflectSymbol2($$Proxy.value));
    var ns = toDigits(idCharSeq)(unsafePerformEffect(getNs1($$Proxy.value)));
    return ns0 + ("-" + (ns + ("-" + (timeStr + ("-" + randStr)))));
  };
};
var encodeJsonId = function(dictIsSymbol) {
  var format12 = format(dictIsSymbol);
  return {
    encodeJson: function(id5) {
      return encodeJson2(format12(id5));
    }
  };
};
var eqId = {
  eq: function(x) {
    return function(y) {
      return eq4(x.rand)(y.rand) && eq4(x.time)(y.time);
    };
  }
};
var ordId = {
  compare: function(x) {
    return function(y) {
      var v = compare2(x.rand)(y.rand);
      if (v instanceof LT) {
        return LT.value;
      }
      ;
      if (v instanceof GT) {
        return GT.value;
      }
      ;
      return compare2(x.time)(y.time);
    };
  },
  Eq0: function() {
    return eqId;
  }
};

// output/Y.Shared.Instant/foreign.js
var getNow_f = () => {
  return +Date.now();
};

// output/Data.String.Utils/foreign.js
function endsWithImpl(searchString, s) {
  return s.endsWith(searchString);
}
function startsWithImpl(searchString, s) {
  return s.startsWith(searchString);
}

// output/Data.String.Utils/index.js
var startsWith = function(searchString) {
  return function(s) {
    return startsWithImpl(searchString, s);
  };
};
var endsWith = function(searchString) {
  return function(s) {
    return endsWithImpl(searchString, s);
  };
};

// output/Y.Shared.Instant/index.js
var bind6 = /* @__PURE__ */ bind(bindEither);
var decodeJson3 = /* @__PURE__ */ decodeJson(decodeJsonString);
var pure5 = /* @__PURE__ */ pure(applicativeEither);
var compare3 = /* @__PURE__ */ compare(ordNumber);
var getNow2 = /* @__PURE__ */ mapFlipped(functorEffect)(getNow_f)(function(now) {
  return {
    milliseconds: now
  };
});
var fromMilliseconds = function(ms) {
  return {
    milliseconds: ms
  };
};
var decodeJsonInstant = {
  decodeJson: function(json) {
    var fail = function($90) {
      return Left.create(TypeMismatch.create($90));
    };
    return bind6(decodeJson3(json))(function(str) {
      var $76 = !(startsWith("e+")(str) && endsWith("ms")(str));
      if ($76) {
        return fail("bad format (prefix/suffix)");
      }
      ;
      var str$prime = slice2(2)(-2 | 0)(str);
      var v = fromString(str$prime);
      if (v instanceof Nothing) {
        return fail("bad format (number parse)");
      }
      ;
      if (v instanceof Just) {
        return pure5(fromMilliseconds(v.value0));
      }
      ;
      throw new Error("Failed pattern match at Y.Shared.Instant (line 83, column 10 - line 85, column 44): " + [v.constructor.name]);
    });
  }
};
var eqInstant = {
  eq: function(x) {
    return function(y) {
      return x.milliseconds === y.milliseconds;
    };
  }
};
var ordInstant = {
  compare: function(x) {
    return function(y) {
      return compare3(x.milliseconds)(y.milliseconds);
    };
  },
  Eq0: function() {
    return eqInstant;
  }
};
var asMilliseconds = function(v) {
  return v.milliseconds;
};
var encodeJsonInstant = {
  encodeJson: /* @__PURE__ */ function() {
    var $93 = encodeJson(encodeJsonJString);
    var $94 = show(showNumber);
    return function($95) {
      return $93(function(s) {
        return "e+" + (s + "ms");
      }($94(asMilliseconds($95))));
    };
  }()
};

// output/Y.Shared.Event/index.js
var gEncodeJsonCons2 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonJString);
var UserIsSymbol = {
  reflectSymbol: function() {
    return "User";
  }
};
var userIdIsSymbol = {
  reflectSymbol: function() {
    return "userId";
  }
};
var gEncodeJsonCons1 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonId(UserIsSymbol))(gEncodeJsonNil)(userIdIsSymbol)();
var nameIsSymbol = {
  reflectSymbol: function() {
    return "name";
  }
};
var MessageIsSymbol = {
  reflectSymbol: function() {
    return "Message";
  }
};
var encodeJsonId2 = /* @__PURE__ */ encodeJsonId(MessageIsSymbol);
var gEncodeJsonCons22 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonId2);
var gEncodeJsonCons3 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonInstant);
var timeSentIsSymbol = {
  reflectSymbol: function() {
    return "timeSent";
  }
};
var messageIdIsSymbol = {
  reflectSymbol: function() {
    return "messageId";
  }
};
var depIdsIsSymbol = {
  reflectSymbol: function() {
    return "depIds";
  }
};
var contentIsSymbol = {
  reflectSymbol: function() {
    return "content";
  }
};
var gEncodeJsonCons4 = /* @__PURE__ */ gEncodeJsonCons22(gEncodeJsonCons1)(messageIdIsSymbol)();
var isUnreadIsSymbol = {
  reflectSymbol: function() {
    return "isUnread";
  }
};
var EventIsSymbol = {
  reflectSymbol: function() {
    return "Event";
  }
};
var RoomIsSymbol = {
  reflectSymbol: function() {
    return "Room";
  }
};
var timeIsSymbol = {
  reflectSymbol: function() {
    return "time";
  }
};
var roomIdIsSymbol = {
  reflectSymbol: function() {
    return "roomId";
  }
};
var payloadIsSymbol = {
  reflectSymbol: function() {
    return "payload";
  }
};
var idIsSymbol = {
  reflectSymbol: function() {
    return "id";
  }
};
var bind7 = /* @__PURE__ */ bind(bindEither);
var map17 = /* @__PURE__ */ map(functorEither);
var gDecodeJsonCons2 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonString));
var gDecodeJsonCons1 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeJsonId(UserIsSymbol)))(gDecodeJsonNil)(userIdIsSymbol)()();
var decodeJson4 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons2(gDecodeJsonCons1)(nameIsSymbol)()())());
var decodeJsonId2 = /* @__PURE__ */ decodeJsonId(MessageIsSymbol);
var gDecodeJsonCons22 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonId2));
var gDecodeJsonCons3 = /* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonInstant));
var decodeJson1 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons2(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeSet2(ordId)(decodeJsonId2)))(/* @__PURE__ */ gDecodeJsonCons22(/* @__PURE__ */ gDecodeJsonCons3(gDecodeJsonCons1)(timeSentIsSymbol)()())(messageIdIsSymbol)()())(depIdsIsSymbol)()())(contentIsSymbol)()())());
var gDecodeJsonCons4 = /* @__PURE__ */ gDecodeJsonCons22(gDecodeJsonCons1)(messageIdIsSymbol)()();
var decodeJson22 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons2(gDecodeJsonCons4)(contentIsSymbol)()())());
var decodeJson32 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(gDecodeJsonCons4)());
var decodeJson42 = /* @__PURE__ */ decodeJson(/* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonBoolean))(gDecodeJsonCons4)(isUnreadIsSymbol)()())());
var EventPayload_SetName = /* @__PURE__ */ function() {
  function EventPayload_SetName3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_SetName3.create = function(value0) {
    return new EventPayload_SetName3(value0);
  };
  return EventPayload_SetName3;
}();
var EventPayload_MessageSend = /* @__PURE__ */ function() {
  function EventPayload_MessageSend3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageSend3.create = function(value0) {
    return new EventPayload_MessageSend3(value0);
  };
  return EventPayload_MessageSend3;
}();
var EventPayload_MessageEdit = /* @__PURE__ */ function() {
  function EventPayload_MessageEdit3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageEdit3.create = function(value0) {
    return new EventPayload_MessageEdit3(value0);
  };
  return EventPayload_MessageEdit3;
}();
var EventPayload_MessageDelete = /* @__PURE__ */ function() {
  function EventPayload_MessageDelete3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageDelete3.create = function(value0) {
    return new EventPayload_MessageDelete3(value0);
  };
  return EventPayload_MessageDelete3;
}();
var EventPayload_MessageSetIsUnread = /* @__PURE__ */ function() {
  function EventPayload_MessageSetIsUnread2(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageSetIsUnread2.create = function(value0) {
    return new EventPayload_MessageSetIsUnread2(value0);
  };
  return EventPayload_MessageSetIsUnread2;
}();
var encodeJsonEventPayload = {
  encodeJson: /* @__PURE__ */ function() {
    var withProp = function(dictEncodeJson) {
      var encodeJson3 = encodeJson(dictEncodeJson);
      return function(dictEncodeJson1) {
        var encodeJson1 = encodeJson(dictEncodeJson1);
        return function(k) {
          return function(v) {
            return function(a) {
              var v1 = toObject(encodeJson3(a));
              if (v1 instanceof Nothing) {
                return encodeJson3(a);
              }
              ;
              if (v1 instanceof Just) {
                return id3(withProp_f(k)(encodeJson1(v))(v1.value0));
              }
              ;
              throw new Error("Failed pattern match at Y.Shared.Event (line 118, column 7 - line 120, column 69): " + [v1.constructor.name]);
            };
          };
        };
      };
    };
    var withProp1 = withProp(encodeRecord(gEncodeJsonCons2(gEncodeJsonCons1)(nameIsSymbol)())())(encodeJsonJString);
    var withProp2 = withProp(encodeRecord(gEncodeJsonCons2(gEncodeJsonCons(encodeSet2(ordId)(encodeJsonId2))(gEncodeJsonCons22(gEncodeJsonCons3(gEncodeJsonCons1)(timeSentIsSymbol)())(messageIdIsSymbol)())(depIdsIsSymbol)())(contentIsSymbol)())())(encodeJsonJString);
    var withProp3 = withProp(encodeRecord(gEncodeJsonCons2(gEncodeJsonCons4)(contentIsSymbol)())())(encodeJsonJString);
    var withProp4 = withProp(encodeRecord(gEncodeJsonCons4)())(encodeJsonJString);
    var withProp5 = withProp(encodeRecord(gEncodeJsonCons(encodeJsonJBoolean)(gEncodeJsonCons4)(isUnreadIsSymbol)())())(encodeJsonJString);
    return function(v) {
      if (v instanceof EventPayload_SetName) {
        return withProp1("kind")("SetName")(v.value0);
      }
      ;
      if (v instanceof EventPayload_MessageSend) {
        return withProp2("kind")("MessageSend")(v.value0);
      }
      ;
      if (v instanceof EventPayload_MessageEdit) {
        return withProp3("kind")("MessageEdit")(v.value0);
      }
      ;
      if (v instanceof EventPayload_MessageDelete) {
        return withProp4("kind")("MessageDelete")(v.value0);
      }
      ;
      if (v instanceof EventPayload_MessageSetIsUnread) {
        return withProp5("kind")("MessageSetIsUnread")(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Y.Shared.Event (line 107, column 16 - line 112, column 80): " + [v.constructor.name]);
    };
  }()
};
var encodeJsonEvent = /* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonId(EventIsSymbol))(/* @__PURE__ */ gEncodeJsonCons(encodeJsonEventPayload)(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonId(RoomIsSymbol))(/* @__PURE__ */ gEncodeJsonCons3(gEncodeJsonNil)(timeIsSymbol)())(roomIdIsSymbol)())(payloadIsSymbol)())(idIsSymbol)())();
var decodeJsonEventPayload = {
  decodeJson: function(json) {
    var note$prime = function(s) {
      return function(v) {
        return note(new TypeMismatch(s))(v);
      };
    };
    return bind7(note$prime("expected object")(toObject(json)))(function(obj) {
      return bind7(note$prime("expected kind key")(lookup2("kind")(obj)))(function(kindJson) {
        return bind7(note$prime("expected kind is string")(toString(kindJson)))(function(kindStr) {
          if (kindStr === "SetName") {
            return map17(EventPayload_SetName.create)(decodeJson4(json));
          }
          ;
          if (kindStr === "MessageSend") {
            return map17(EventPayload_MessageSend.create)(decodeJson1(json));
          }
          ;
          if (kindStr === "MessageEdit") {
            return map17(EventPayload_MessageEdit.create)(decodeJson22(json));
          }
          ;
          if (kindStr === "MessageDelete") {
            return map17(EventPayload_MessageDelete.create)(decodeJson32(json));
          }
          ;
          if (kindStr === "MessageSetIsUnread") {
            return map17(EventPayload_MessageSetIsUnread.create)(decodeJson42(json));
          }
          ;
          return note$prime("bad kind")(Nothing.value);
        });
      });
    });
  }
};
var decodeJsonEvent = /* @__PURE__ */ decodeRecord(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeJsonId(EventIsSymbol)))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(decodeJsonEventPayload))(/* @__PURE__ */ gDecodeJsonCons(/* @__PURE__ */ decodeFieldId(/* @__PURE__ */ decodeJsonId(RoomIsSymbol)))(/* @__PURE__ */ gDecodeJsonCons3(gDecodeJsonNil)(timeIsSymbol)()())(roomIdIsSymbol)()())(payloadIsSymbol)()())(idIsSymbol)()())();

// output/Compat.Event/index.js
var EventPayload_SetName2 = /* @__PURE__ */ function() {
  function EventPayload_SetName3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_SetName3.create = function(value0) {
    return new EventPayload_SetName3(value0);
  };
  return EventPayload_SetName3;
}();
var EventPayload_MessageSend2 = /* @__PURE__ */ function() {
  function EventPayload_MessageSend3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageSend3.create = function(value0) {
    return new EventPayload_MessageSend3(value0);
  };
  return EventPayload_MessageSend3;
}();
var EventPayload_MessageEdit2 = /* @__PURE__ */ function() {
  function EventPayload_MessageEdit3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageEdit3.create = function(value0) {
    return new EventPayload_MessageEdit3(value0);
  };
  return EventPayload_MessageEdit3;
}();
var EventPayload_MessageDelete2 = /* @__PURE__ */ function() {
  function EventPayload_MessageDelete3(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_MessageDelete3.create = function(value0) {
    return new EventPayload_MessageDelete3(value0);
  };
  return EventPayload_MessageDelete3;
}();
var EventPayload_SetReadState = /* @__PURE__ */ function() {
  function EventPayload_SetReadState2(value0) {
    this.value0 = value0;
  }
  ;
  EventPayload_SetReadState2.create = function(value0) {
    return new EventPayload_SetReadState2(value0);
  };
  return EventPayload_SetReadState2;
}();
var toEventPayload = function(v) {
  if (v instanceof EventPayload_SetName2) {
    return new EventPayload_SetName({
      userId: v.value0.userId,
      name: v.value0.name
    });
  }
  ;
  if (v instanceof EventPayload_MessageSend2) {
    return new EventPayload_MessageSend({
      messageId: v.value0.message.id,
      depIds: v.value0.message.depIds,
      timeSent: v.value0.message.timeSent,
      content: v.value0.message.content,
      userId: v.value0.message.authorId
    });
  }
  ;
  if (v instanceof EventPayload_MessageEdit2) {
    return new EventPayload_MessageEdit({
      messageId: v.value0.messageId,
      content: v.value0.content,
      userId: v.value0.authorId
    });
  }
  ;
  if (v instanceof EventPayload_MessageDelete2) {
    return new EventPayload_MessageDelete({
      userId: v.value0.userId,
      messageId: v.value0.messageId
    });
  }
  ;
  if (v instanceof EventPayload_SetReadState) {
    return new EventPayload_MessageSetIsUnread({
      messageId: v.value0.messageId,
      isUnread: !v.value0.readState,
      userId: v.value0.userId
    });
  }
  ;
  throw new Error("Failed pattern match at Compat.Event (line 84, column 18 - line 113, column 8): " + [v.constructor.name]);
};
var toEvent2 = function(roomId) {
  return function(v) {
    return {
      id: v.id,
      time: v.time,
      payload: toEventPayload(v.payload),
      roomId
    };
  };
};
var fromEventPayload = function(convoId) {
  return function(v) {
    if (v instanceof EventPayload_SetName) {
      return new EventPayload_SetName2({
        convoId,
        userId: v.value0.userId,
        name: v.value0.name
      });
    }
    ;
    if (v instanceof EventPayload_MessageSend) {
      return new EventPayload_MessageSend2({
        convoId,
        message: {
          authorId: v.value0.userId,
          convoId,
          deleted: false,
          content: v.value0.content,
          id: v.value0.messageId,
          depIds: v.value0.depIds,
          timeSent: v.value0.timeSent
        }
      });
    }
    ;
    if (v instanceof EventPayload_MessageEdit) {
      return new EventPayload_MessageEdit2({
        convoId,
        messageId: v.value0.messageId,
        authorId: v.value0.userId,
        content: v.value0.content
      });
    }
    ;
    if (v instanceof EventPayload_MessageDelete) {
      return new EventPayload_MessageDelete2({
        convoId,
        messageId: v.value0.messageId,
        userId: v.value0.userId
      });
    }
    ;
    if (v instanceof EventPayload_MessageSetIsUnread) {
      return new EventPayload_SetReadState({
        convoId,
        userId: v.value0.userId,
        messageId: v.value0.messageId,
        readState: !v.value0.isUnread
      });
    }
    ;
    throw new Error("Failed pattern match at Compat.Event (line 116, column 28 - line 165, column 8): " + [v.constructor.name]);
  };
};
var fromEvent = function(v) {
  return {
    id: v.id,
    time: v.time,
    payload: fromEventPayload(convertId(v.roomId))(v.payload)
  };
};

// output/Y.Shared.Transmission/index.js
var ToServer_HelloIsSymbol = {
  reflectSymbol: function() {
    return "ToServer_Hello";
  }
};
var UserIsSymbol2 = {
  reflectSymbol: function() {
    return "User";
  }
};
var userIdIsSymbol2 = {
  reflectSymbol: function() {
    return "userId";
  }
};
var ToServer_SubscribeIsSymbol = {
  reflectSymbol: function() {
    return "ToServer_Subscribe";
  }
};
var RoomIsSymbol2 = {
  reflectSymbol: function() {
    return "Room";
  }
};
var roomIdIsSymbol2 = {
  reflectSymbol: function() {
    return "roomId";
  }
};
var gEncodeJsonCons5 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonId(RoomIsSymbol2))(gEncodeJsonNil)(roomIdIsSymbol2)();
var encodeRepArgsArgument2 = /* @__PURE__ */ encodeRepArgsArgument(/* @__PURE__ */ encodeRecord(gEncodeJsonCons5)());
var ToServer_PullIsSymbol = {
  reflectSymbol: function() {
    return "ToServer_Pull";
  }
};
var ToServer_PushIsSymbol = {
  reflectSymbol: function() {
    return "ToServer_Push";
  }
};
var eventIsSymbol = {
  reflectSymbol: function() {
    return "event";
  }
};
var ToClient_BroadcastIsSymbol = {
  reflectSymbol: function() {
    return "ToClient_Broadcast";
  }
};
var ToServer_Hello = /* @__PURE__ */ function() {
  function ToServer_Hello2(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Hello2.create = function(value0) {
    return new ToServer_Hello2(value0);
  };
  return ToServer_Hello2;
}();
var ToServer_Subscribe = /* @__PURE__ */ function() {
  function ToServer_Subscribe3(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Subscribe3.create = function(value0) {
    return new ToServer_Subscribe3(value0);
  };
  return ToServer_Subscribe3;
}();
var ToServer_Pull = /* @__PURE__ */ function() {
  function ToServer_Pull3(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Pull3.create = function(value0) {
    return new ToServer_Pull3(value0);
  };
  return ToServer_Pull3;
}();
var ToServer_Push = /* @__PURE__ */ function() {
  function ToServer_Push3(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Push3.create = function(value0) {
    return new ToServer_Push3(value0);
  };
  return ToServer_Push3;
}();
var ToClient_Broadcast = /* @__PURE__ */ function() {
  function ToClient_Broadcast3(value0) {
    this.value0 = value0;
  }
  ;
  ToClient_Broadcast3.create = function(value0) {
    return new ToClient_Broadcast3(value0);
  };
  return ToClient_Broadcast3;
}();
var genericToServer = {
  to: function(x) {
    if (x instanceof Inl) {
      return new ToServer_Hello(x.value0);
    }
    ;
    if (x instanceof Inr && x.value0 instanceof Inl) {
      return new ToServer_Subscribe(x.value0.value0);
    }
    ;
    if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inl)) {
      return new ToServer_Pull(x.value0.value0.value0);
    }
    ;
    if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inr)) {
      return new ToServer_Push(x.value0.value0.value0);
    }
    ;
    throw new Error("Failed pattern match at Y.Shared.Transmission (line 40, column 1 - line 40, column 54): " + [x.constructor.name]);
  },
  from: function(x) {
    if (x instanceof ToServer_Hello) {
      return new Inl(x.value0);
    }
    ;
    if (x instanceof ToServer_Subscribe) {
      return new Inr(new Inl(x.value0));
    }
    ;
    if (x instanceof ToServer_Pull) {
      return new Inr(new Inr(new Inl(x.value0)));
    }
    ;
    if (x instanceof ToServer_Push) {
      return new Inr(new Inr(new Inr(x.value0)));
    }
    ;
    throw new Error("Failed pattern match at Y.Shared.Transmission (line 40, column 1 - line 40, column 54): " + [x.constructor.name]);
  }
};
var genericToClient = {
  to: function(x) {
    return new ToClient_Broadcast(x);
  },
  from: function(x) {
    return x.value0;
  }
};
var encodeJsonToServer = {
  encodeJson: /* @__PURE__ */ genericEncodeJson(genericToServer)(/* @__PURE__ */ encodeRepSum(/* @__PURE__ */ encodeRepConstructor(ToServer_HelloIsSymbol)(/* @__PURE__ */ encodeRepArgsArgument(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonId(UserIsSymbol2))(gEncodeJsonNil)(userIdIsSymbol2)())())))(/* @__PURE__ */ encodeRepSum(/* @__PURE__ */ encodeRepConstructor(ToServer_SubscribeIsSymbol)(encodeRepArgsArgument2))(/* @__PURE__ */ encodeRepSum(/* @__PURE__ */ encodeRepConstructor(ToServer_PullIsSymbol)(encodeRepArgsArgument2))(/* @__PURE__ */ encodeRepConstructor(ToServer_PushIsSymbol)(/* @__PURE__ */ encodeRepArgsArgument(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(encodeJsonEvent)(gEncodeJsonCons5)(eventIsSymbol)())()))))))
};
var decodeJsonToClient = {
  decodeJson: /* @__PURE__ */ genericDecodeJson(genericToClient)(/* @__PURE__ */ decodeRepConstructorArg(ToClient_BroadcastIsSymbol)(/* @__PURE__ */ decodeArray2(decodeJsonEvent)))
};

// output/Compat.Transmission/index.js
var map18 = /* @__PURE__ */ map(functorArray);
var ToServer_Subscribe2 = /* @__PURE__ */ function() {
  function ToServer_Subscribe3(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Subscribe3.create = function(value0) {
    return new ToServer_Subscribe3(value0);
  };
  return ToServer_Subscribe3;
}();
var ToServer_Pull2 = /* @__PURE__ */ function() {
  function ToServer_Pull3(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Pull3.create = function(value0) {
    return new ToServer_Pull3(value0);
  };
  return ToServer_Pull3;
}();
var ToServer_Push2 = /* @__PURE__ */ function() {
  function ToServer_Push3(value0) {
    this.value0 = value0;
  }
  ;
  ToServer_Push3.create = function(value0) {
    return new ToServer_Push3(value0);
  };
  return ToServer_Push3;
}();
var ToClient_Broadcast2 = /* @__PURE__ */ function() {
  function ToClient_Broadcast3(value0) {
    this.value0 = value0;
  }
  ;
  ToClient_Broadcast3.create = function(value0) {
    return new ToClient_Broadcast3(value0);
  };
  return ToClient_Broadcast3;
}();
var toToServer = function(v) {
  if (v instanceof ToServer_Subscribe2) {
    return new ToServer_Subscribe({
      roomId: convertId(v.value0.convoId)
    });
  }
  ;
  if (v instanceof ToServer_Pull2) {
    return new ToServer_Pull({
      roomId: convertId(v.value0.convoId)
    });
  }
  ;
  if (v instanceof ToServer_Push2) {
    var roomId = convertId(v.value0.convoId);
    return new ToServer_Push({
      roomId,
      event: toEvent2(roomId)(v.value0.event)
    });
  }
  ;
  throw new Error("Failed pattern match at Compat.Transmission (line 36, column 14 - line 46, column 64): " + [v.constructor.name]);
};
var fromToClient = function(v) {
  return new ToClient_Broadcast2(map18(fromEvent)(v.value0));
};

// output/Css.Functions/index.js
var intercalate4 = /* @__PURE__ */ intercalate(foldableArray)(monoidString);
var $$var = function(name4) {
  return "var(--" + (name4 + ")");
};
var functionJ = function(name4) {
  return function(args) {
    return name4 + ("(" + (intercalate4(", ")(args) + ")"));
  };
};
var function3 = function(name4) {
  return function(a) {
    return function(b) {
      return function(c) {
        return functionJ(name4)([a, b, c]);
      };
    };
  };
};
var hsl = /* @__PURE__ */ function3("hsl");
var $$function = function(name4) {
  return function(a) {
    return functionJ(name4)([a]);
  };
};
var translateX = /* @__PURE__ */ $$function("translateX");
var calc = /* @__PURE__ */ $$function("calc");
var biOperator = function(operator) {
  return function(operand1) {
    return function(operand2) {
      return "(" + (operand1 + (" " + (operator + (" " + (operand2 + ")")))));
    };
  };
};
var sub2 = /* @__PURE__ */ biOperator("-");
var add5 = /* @__PURE__ */ biOperator("+");

// ../../../../nix/store/yskhxv2khmhhzbqhdnsi2iaaxlazmjix-murmur3-module/murmur3.js
function murmurhash3_32_gc(key3, seed) {
  var remainder2, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
  remainder2 = key3.length & 3;
  bytes = key3.length - remainder2;
  h1 = seed;
  c1 = 3432918353;
  c2 = 461845907;
  i = 0;
  while (i < bytes) {
    k1 = key3.charCodeAt(i) & 255 | (key3.charCodeAt(++i) & 255) << 8 | (key3.charCodeAt(++i) & 255) << 16 | (key3.charCodeAt(++i) & 255) << 24;
    ++i;
    k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1b = (h1 & 65535) * 5 + (((h1 >>> 16) * 5 & 65535) << 16) & 4294967295;
    h1 = (h1b & 65535) + 27492 + (((h1b >>> 16) + 58964 & 65535) << 16);
  }
  k1 = 0;
  switch (remainder2) {
    case 3:
      k1 ^= (key3.charCodeAt(i + 2) & 255) << 16;
    case 2:
      k1 ^= (key3.charCodeAt(i + 1) & 255) << 8;
    case 1:
      k1 ^= key3.charCodeAt(i) & 255;
      k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
      h1 ^= k1;
  }
  h1 ^= key3.length;
  h1 ^= h1 >>> 16;
  h1 = (h1 & 65535) * 2246822507 + (((h1 >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
  h1 ^= h1 >>> 13;
  h1 = (h1 & 65535) * 3266489909 + (((h1 >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
}

// output/Murmur3/foreign.js
var hashImpl = murmurhash3_32_gc;

// output/Murmur3/index.js
var hash = /* @__PURE__ */ flip(/* @__PURE__ */ runFn2(hashImpl));

// output/VirtualDom.Css/index.js
var pure6 = /* @__PURE__ */ pure(applicativeNonEmptyList);
var show2 = /* @__PURE__ */ show(showInt);
var foldr4 = /* @__PURE__ */ foldr(foldableArray);
var Id = /* @__PURE__ */ function() {
  function Id2() {
  }
  ;
  Id2.value = new Id2();
  return Id2;
}();
var Const = /* @__PURE__ */ function() {
  function Const2(value0) {
    this.value0 = value0;
  }
  ;
  Const2.create = function(value0) {
    return new Const2(value0);
  };
  return Const2;
}();
var Combine = /* @__PURE__ */ function() {
  function Combine2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Combine2.create = function(value0) {
    return function(value1) {
      return new Combine2(value0, value1);
    };
  };
  return Combine2;
}();
var Compose2 = /* @__PURE__ */ function() {
  function Compose3(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Compose3.create = function(value0) {
    return function(value1) {
      return new Compose3(value0, value1);
    };
  };
  return Compose3;
}();
var Declaration = /* @__PURE__ */ function() {
  function Declaration2(value0, value1, value22) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value22;
  }
  ;
  Declaration2.create = function(value0) {
    return function(value1) {
      return function(value22) {
        return new Declaration2(value0, value1, value22);
      };
    };
  };
  return Declaration2;
}();
var semigroupStringOp = /* @__PURE__ */ function() {
  return {
    append: Combine.create
  };
}();
var append12 = /* @__PURE__ */ append(semigroupStringOp);
var eqStringOp = {
  eq: function(x) {
    return function(y) {
      if (x instanceof Id && y instanceof Id) {
        return true;
      }
      ;
      if (x instanceof Const && y instanceof Const) {
        return x.value0 === y.value0;
      }
      ;
      if (x instanceof Combine && y instanceof Combine) {
        return eq(eqStringOp)(x.value0)(y.value0) && eq(eqStringOp)(x.value1)(y.value1);
      }
      ;
      if (x instanceof Compose2 && y instanceof Compose2) {
        return eq(eqStringOp)(x.value0)(y.value0) && eq(eqStringOp)(x.value1)(y.value1);
      }
      ;
      return false;
    };
  }
};
var eq13 = /* @__PURE__ */ eq(eqStringOp);
var toLists = /* @__PURE__ */ function() {
  var $127 = foldl(foldableList)(function(acc) {
    return function(v) {
      if (acc instanceof Right) {
        var $81 = eq13(v.value0)(acc.value0.value0.value0.value0);
        if ($81) {
          return new Right(new Tuple(cons3(v)(acc.value0.value0), acc.value0.value1));
        }
        ;
        return new Right(new Tuple(pure6(v), cons(acc.value0.value0)(acc.value0.value1)));
      }
      ;
      if (acc instanceof Left) {
        return new Right(new Tuple(pure6(v), acc.value0));
      }
      ;
      throw new Error("Failed pattern match at VirtualDom.Css (line 88, column 42 - line 94, column 50): " + [acc.constructor.name]);
    };
  })(new Left([]));
  return function($128) {
    return function(v) {
      if (v instanceof Right) {
        return cons(v.value0.value0)(v.value0.value1);
      }
      ;
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at VirtualDom.Css (line 97, column 8 - line 99, column 24): " + [v.constructor.name]);
    }($127($128));
  };
}();
var reverseJoinMap = function(f) {
  return function(sep) {
    return function(v) {
      var v1 = fromList(v.value1);
      if (v1 instanceof Just) {
        return reverseJoinMap(f)(sep)(v1.value0) + (sep + f(v.value0));
      }
      ;
      if (v1 instanceof Nothing) {
        return f(v.value0);
      }
      ;
      throw new Error("Failed pattern match at VirtualDom.Css (line 111, column 61 - line 113, column 21): " + [v1.constructor.name]);
    };
  };
};
var hash2 = /* @__PURE__ */ hash(0);
var apply4 = function(stringOp) {
  return function(str) {
    if (stringOp instanceof Id) {
      return str;
    }
    ;
    if (stringOp instanceof Const) {
      return stringOp.value0;
    }
    ;
    if (stringOp instanceof Combine) {
      return apply4(stringOp.value0)(str) + apply4(stringOp.value1)(str);
    }
    ;
    if (stringOp instanceof Compose2) {
      return apply4(stringOp.value0)(apply4(stringOp.value1)(str));
    }
    ;
    throw new Error("Failed pattern match at VirtualDom.Css (line 35, column 22 - line 39, column 47): " + [stringOp.constructor.name]);
  };
};
var makeHash = function(toCssOp) {
  var toCss = apply4(toCssOp);
  return function(c) {
    return {
      "class": c,
      css: toCss("." + c)
    };
  }("_" + show2(hash2(toCss("o"))));
};
var process = function(styles) {
  var $117 = $$null2(styles);
  if ($117) {
    return Nothing.value;
  }
  ;
  return Just.create(makeHash(foldr4(function(styleList) {
    return function(acc) {
      var v = head4(styleList);
      var declarations = " {\n" + (reverseJoinMap(function(v1) {
        return "	" + (v1.value1 + (": " + (v1.value2 + ";")));
      })("\n")(styleList) + "\n}");
      if (acc instanceof Id) {
        return append12(v.value0)(new Const(declarations));
      }
      ;
      return append12(acc)(append12(new Const("\n\n"))(append12(v.value0)(new Const(declarations))));
    };
  })(Id.value)(toLists(styles))));
};

// output/Css/index.js
var append13 = /* @__PURE__ */ append(semigroupString);
var show3 = /* @__PURE__ */ show(showNumber);
var append22 = /* @__PURE__ */ append(semigroupStringOp);
var mapFlipped5 = /* @__PURE__ */ mapFlipped(/* @__PURE__ */ functorBatched(functorIdentity));
var pure7 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeBatched(applicativeIdentity));
var intercalate5 = /* @__PURE__ */ intercalate(foldableArray)(monoidString);
var toUnit = function(suffix) {
  return function(n) {
    return show3(n) + suffix;
  };
};
var px = /* @__PURE__ */ toUnit("px");
var prepend = function(str) {
  return append22(new Const(str))(Id.value);
};
var mapSelector = function(op) {
  return function(styles) {
    return mapFlipped5(new Batch(styles))(function(v) {
      return new Declaration(new Compose2(op, v.value0), v.value1, v.value2);
    });
  };
};
var declaration = /* @__PURE__ */ function() {
  return compose2(pure7)(Declaration.create(Id.value));
}();
var display = /* @__PURE__ */ declaration("display");
var flex = /* @__PURE__ */ declaration("flex");
var flexDirection = /* @__PURE__ */ declaration("flex-direction");
var font = /* @__PURE__ */ declaration("font");
var fontFamily = /* @__PURE__ */ declaration("font-family");
var grid = /* @__PURE__ */ declaration("grid");
var gridAutoRows = /* @__PURE__ */ declaration("grid-auto-rows");
var height2 = /* @__PURE__ */ declaration("height");
var lineHeight = /* @__PURE__ */ declaration("line-height");
var margin = /* @__PURE__ */ declaration("margin");
var marginBottom = /* @__PURE__ */ declaration("margin-bottom");
var marginLeft = /* @__PURE__ */ declaration("margin-left");
var marginTop = /* @__PURE__ */ declaration("margin-top");
var opacity = /* @__PURE__ */ declaration("opacity");
var outline = /* @__PURE__ */ declaration("outline");
var overflow = /* @__PURE__ */ declaration("overflow");
var overflowX = /* @__PURE__ */ declaration("overflow-x");
var padding = /* @__PURE__ */ declaration("padding");
var paddingBottom = /* @__PURE__ */ declaration("padding-bottom");
var paddingTop = /* @__PURE__ */ declaration("padding-top");
var position = /* @__PURE__ */ declaration("position");
var transform = /* @__PURE__ */ declaration("transform");
var variable = /* @__PURE__ */ function() {
  var $579 = append13("--");
  return function($580) {
    return declaration($579($580));
  };
}();
var whiteSpace = /* @__PURE__ */ declaration("white-space");
var width2 = /* @__PURE__ */ declaration("width");
var color = /* @__PURE__ */ declaration("color");
var borderTop = /* @__PURE__ */ declaration("border-top");
var borderRadius = /* @__PURE__ */ declaration("border-radius");
var borderJ = /* @__PURE__ */ function() {
  var $708 = declaration("border");
  var $709 = intercalate5(" ");
  return function($710) {
    return $708($709($710));
  };
}();
var borderBottom = /* @__PURE__ */ declaration("border-bottom");
var border = /* @__PURE__ */ declaration("border");
var background = /* @__PURE__ */ declaration("background");

// output/Debug/foreign.js
var log2 = (a) => {
  console.log(a);
  return a;
};

// output/Css.Global/index.js
var mapFlipped6 = /* @__PURE__ */ mapFlipped(functorMaybe);
var show4 = /* @__PURE__ */ show(showInt);
var pure8 = /* @__PURE__ */ pure(applicativeList);
var insert6 = /* @__PURE__ */ insert(ordString);
var lookup3 = /* @__PURE__ */ lookup(ordString);
var append4 = /* @__PURE__ */ append(semigroupList);
var eq5 = /* @__PURE__ */ eq(/* @__PURE__ */ eqArray(eqString));
var identity9 = /* @__PURE__ */ identity(categoryFn);
var surroundMap2 = /* @__PURE__ */ surroundMap(foldableArray)(semigroupString);
var unwrap4 = /* @__PURE__ */ unwrap();
var pure13 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeBatched(applicativeIdentity));
var Rule = /* @__PURE__ */ function() {
  function Rule2(value0) {
    this.value0 = value0;
  }
  ;
  Rule2.create = function(value0) {
    return new Rule2(value0);
  };
  return Rule2;
}();
var Import = /* @__PURE__ */ function() {
  function Import2(value0) {
    this.value0 = value0;
  }
  ;
  Import2.create = function(value0) {
    return new Import2(value0);
  };
  return Import2;
}();
var rulesToStyleNodes = /* @__PURE__ */ function() {
  var $33 = mapMaybe(function(v) {
    return mapFlipped6(mapFlipped6(process(v.value1))(function(v1) {
      return v1.css;
    }))(function(ruleText) {
      return new Tuple(show4(hash(0)(ruleText)), element("style")(Nil.value)(pure8(text(ruleText))));
    });
  });
  var $34 = toUnfoldable3(unfoldableList);
  return function($35) {
    return $33($34($35));
  };
}();
var toChildNodes = /* @__PURE__ */ function() {
  var go = function($copy_stylesheet) {
    return function($copy_v) {
      var $tco_var_stylesheet = $copy_stylesheet;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(stylesheet, v) {
        if (v instanceof Cons) {
          if (v.value0 instanceof Rule) {
            $tco_var_stylesheet = {
              imports: stylesheet.imports,
              keyframes: stylesheet.keyframes,
              rules: applySecond2(insert6(v.value0.value0.selector))(stylesheet.rules)(fromMaybe(v.value0.value0.declarations)(mapFlipped6(lookup3(v.value0.value0.selector)(stylesheet.rules))(append4(v.value0.value0.declarations))))
            };
            $copy_v = v.value1;
            return;
          }
          ;
          if (v.value0 instanceof Import) {
            $tco_var_stylesheet = {
              imports: v.value0.value0,
              keyframes: stylesheet.keyframes,
              rules: stylesheet.rules
            };
            $copy_v = v.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Css.Global (line 61, column 21 - line 74, column 69): " + [v.value0.constructor.name]);
        }
        ;
        if (v instanceof Nil) {
          $tco_done = true;
          return function() {
            var $32 = eq5(stylesheet.imports)([]);
            if ($32) {
              return identity9;
            }
            ;
            return Cons.create(new Tuple("imports", element("style")(Nil.value)(pure8(text(surroundMap2("\n")(function(import_) {
              return "@import '" + (import_ + "';");
            })(stylesheet.imports))))));
          }()(rulesToStyleNodes(stylesheet.rules));
        }
        ;
        throw new Error("Failed pattern match at Css.Global (line 60, column 19 - line 92, column 45): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_stylesheet, $copy_v);
      }
      ;
      return $tco_result;
    };
  };
  return go({
    imports: [],
    keyframes: Nil.value,
    rules: empty2
  });
}();
var style = /* @__PURE__ */ function() {
  var $36 = keyedElement("style")(Nil.value);
  var $37 = flattenMap(unwrap4);
  return function($38) {
    return Single.create($36(toChildNodes($37(Batch.create($38)))));
  };
}();
var rule = function(selector) {
  return function(styles) {
    return pure13(new Rule({
      selector,
      declarations: flattenMap(unwrap4)(mapSelector(new Const(selector))(styles))
    }));
  };
};
var button2 = /* @__PURE__ */ rule("button");
var body = /* @__PURE__ */ rule("body");

// output/Css.Variables.Internal/index.js
var MapIndex = /* @__PURE__ */ function() {
  function MapIndex2(value0) {
    this.value0 = value0;
  }
  ;
  MapIndex2.create = function(value0) {
    return new MapIndex2(value0);
  };
  return MapIndex2;
}();
var mappingWithIndexMapIndexP = function(dictIsSymbol) {
  var reflectSymbol2 = reflectSymbol(dictIsSymbol);
  return {
    mappingWithIndex: function(v) {
      return function(v1) {
        return function(v2) {
          return v.value0(reflectSymbol2($$Proxy.value));
        };
      };
    }
  };
};

// output/Record.Builder/foreign.js
function copyRecord(rec) {
  var copy = {};
  for (var key3 in rec) {
    if ({}.hasOwnProperty.call(rec, key3)) {
      copy[key3] = rec[key3];
    }
  }
  return copy;
}
function unsafeModify(l) {
  return function(f) {
    return function(rec) {
      rec[l] = f(rec[l]);
      return rec;
    };
  };
}

// output/Record.Builder/index.js
var semigroupoidBuilder = semigroupoidFn;
var modify4 = function() {
  return function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(l) {
        return function(f) {
          return function(r1) {
            return unsafeModify(reflectSymbol2(l))(f)(r1);
          };
        };
      };
    };
  };
};
var categoryBuilder = categoryFn;
var build = function(v) {
  return function(r1) {
    return v(copyRecord(r1));
  };
};

// output/Heterogeneous.Mapping/index.js
var identity10 = /* @__PURE__ */ identity(categoryBuilder);
var compose1 = /* @__PURE__ */ compose(semigroupoidBuilder);
var modify5 = /* @__PURE__ */ modify4()();
var mappingWithIndex = function(dict) {
  return dict.mappingWithIndex;
};
var mapRecordWithIndexNil = {
  mapRecordWithIndexBuilder: function(v) {
    return function(v1) {
      return identity10;
    };
  }
};
var mapRecordWithIndexBuilder = function(dict) {
  return dict.mapRecordWithIndexBuilder;
};
var mapRecordWithIndexCons = function(dictIsSymbol) {
  var modify1 = modify5(dictIsSymbol);
  return function(dictMappingWithIndex) {
    var mappingWithIndex1 = mappingWithIndex(dictMappingWithIndex);
    return function(dictMapRecordWithIndex) {
      var mapRecordWithIndexBuilder1 = mapRecordWithIndexBuilder(dictMapRecordWithIndex);
      return function() {
        return function() {
          return {
            mapRecordWithIndexBuilder: function(v) {
              return function(f) {
                return compose1(modify1($$Proxy.value)(mappingWithIndex1(f)($$Proxy.value)))(mapRecordWithIndexBuilder1($$Proxy.value)(f));
              };
            }
          };
        };
      };
    };
  };
};
var hmapWithIndexRecord = function() {
  return function(dictMapRecordWithIndex) {
    return {
      hmapWithIndex: function() {
        var $102 = mapRecordWithIndexBuilder(dictMapRecordWithIndex)($$Proxy.value);
        return function($103) {
          return build($102($103));
        };
      }()
    };
  };
};
var hmapWithIndex = function(dict) {
  return dict.hmapWithIndex;
};

// output/Css.Variables/index.js
var disjointUnion2 = /* @__PURE__ */ disjointUnion()();
var mapFlipped7 = /* @__PURE__ */ mapFlipped(functorArray);
var toUnfoldable7 = /* @__PURE__ */ toUnfoldable4(unfoldableArray);
var fromHomogeneous2 = /* @__PURE__ */ fromHomogeneous();
var makeVariables = function() {
  return function(dictHMapWithIndex) {
    var hmapWithIndex2 = hmapWithIndex(dictHMapWithIndex);
    return function(dictHMapWithIndex1) {
      var hmapWithIndex1 = hmapWithIndex(dictHMapWithIndex1);
      return function() {
        return function() {
          return function(values2) {
            return function(fromVars) {
              var valVars = hmapWithIndex2(new MapIndex($$var))(values2);
              var raw = disjointUnion2(values2)(fromVars(valVars));
              return {
                styles: new Batch(mapFlipped7(toUnfoldable7(fromHomogeneous2(raw)))(uncurry(variable))),
                values: hmapWithIndex1(new MapIndex($$var))(raw)
              };
            };
          };
        };
      };
    };
  };
};

// output/Platform/foreign.js
var raf = (effect) => () => window.requestAnimationFrame(effect);

// output/WHATWG.HTML.Window/foreign.js
var window_ = () => window;
var windowPrime = window;

// output/WHATWG.HTML.Window/index.js
var window$prime = windowPrime;
var document3 = /* @__PURE__ */ unsafeGet2("document");
var document$prime = /* @__PURE__ */ document3(window$prime);

// output/Sub/index.js
var produce3 = /* @__PURE__ */ produce(produceProducer);
var addEventListener4 = /* @__PURE__ */ addEventListener2()();
var removeEventListener4 = /* @__PURE__ */ removeEventListener2()();
var producer22 = /* @__PURE__ */ producer2(/* @__PURE__ */ eqTuple(eqProducer)(eqString));
var applySecond3 = /* @__PURE__ */ applySecond(applyEffect);
var traverse5 = /* @__PURE__ */ traverse(traversableArray)(applicativeEffect);
var append5 = /* @__PURE__ */ append(semigroupArray);
var fromFoldable7 = /* @__PURE__ */ fromFoldable(foldableList);
var mempty3 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit));
var ActiveSub = /* @__PURE__ */ function() {
  function ActiveSub2(value0) {
    this.value0 = value0;
  }
  ;
  ActiveSub2.create = function(value0) {
    return new ActiveSub2(value0);
  };
  return ActiveSub2;
}();
var eqSingleSub = eqProducer;
var eq6 = /* @__PURE__ */ eq(eqSingleSub);
var unsafeDeleteAt = function() {
  return function(index4) {
    return function(array) {
      var v = deleteAt(index4)(array);
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Sub (line 101, column 30 - line 102, column 14): " + [v.constructor.name]);
    };
  };
};
var unsafeDeleteAt1 = /* @__PURE__ */ unsafeDeleteAt();
var sameAsActive = function(v) {
  return function(ss) {
    return eq6(v.value0.sub)(ss);
  };
};
var makeListener2 = function(toEventCallback) {
  return function(event) {
    return function(send) {
      return function __do2() {
        var window2 = window_();
        var callback = mkEffectFn1(toEventCallback(send));
        addEventListener4(event)(callback)({})(window2)();
        return removeEventListener4(event)(callback)({})(window2);
      };
    };
  };
};
var onRefEq2 = function(handlerP) {
  return makeListener2(function(msgCallback) {
    return function(event) {
      return function __do2() {
        var mmsg = produce3(handlerP)(event)();
        if (mmsg instanceof Just) {
          return msgCallback(mmsg.value0)();
        }
        ;
        if (mmsg instanceof Nothing) {
          return unit;
        }
        ;
        throw new Error("Failed pattern match at Sub (line 142, column 9 - line 144, column 31): " + [mmsg.constructor.name]);
      };
    };
  });
};
var on5 = function(dictProduce) {
  var lift6 = lift(dictProduce);
  return function(eventName) {
    return function(toMsg) {
      return new Single(producer22(onRefEq2)(lift6(toMsg))(eventName));
    };
  };
};
var launch = function(callback) {
  return function(v) {
    return function __do2() {
      var canceler2 = produce3(v)(callback)();
      return new ActiveSub({
        canceler: canceler2,
        sub: v
      });
    };
  };
};
var getCanceler = function(v) {
  return v.value0.canceler;
};
var something = function(activeSubs) {
  return function(newSub) {
    return function(callback) {
      var go = function($copy_current) {
        return function($copy_newSubs) {
          return function($copy_acc) {
            var $tco_var_current = $copy_current;
            var $tco_var_newSubs = $copy_newSubs;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(current, newSubs, acc) {
              var v = uncons(current);
              if (v instanceof Just) {
                var v1 = findIndex(sameAsActive(v.value0.head))(newSubs);
                if (v1 instanceof Just) {
                  $tco_var_current = v.value0.tail;
                  $tco_var_newSubs = unsafeDeleteAt1(v1.value0)(newSubs);
                  $copy_acc = {
                    keep: snoc(acc.keep)(v.value0.head),
                    cancel: acc.cancel
                  };
                  return;
                }
                ;
                if (v1 instanceof Nothing) {
                  $tco_var_current = v.value0.tail;
                  $tco_var_newSubs = newSubs;
                  $copy_acc = {
                    keep: acc.keep,
                    cancel: applySecond3(acc.cancel)(getCanceler(v.value0.head))
                  };
                  return;
                }
                ;
                throw new Error("Failed pattern match at Sub (line 68, column 28 - line 81, column 60): " + [v1.constructor.name]);
              }
              ;
              if (v instanceof Nothing) {
                $tco_done = true;
                return function __do2() {
                  acc.cancel();
                  var newAcitveSubs = traverse5(launch(callback))(newSubs)();
                  return append5(acc.keep)(newAcitveSubs);
                };
              }
              ;
              throw new Error("Failed pattern match at Sub (line 67, column 28 - line 87, column 41): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_current, $tco_var_newSubs, $copy_acc);
            }
            ;
            return $tco_result;
          };
        };
      };
      return go(activeSubs)(fromFoldable7(flatten(newSub)))({
        keep: [],
        cancel: mempty3
      });
    };
  };
};

// output/Throttle/index.js
var $runtime_lazy3 = function(name4, moduleName, init4) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name4 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init4();
    state2 = 2;
    return val;
  };
};
var throttle = function($$switch) {
  return function(callback) {
    return function __do2() {
      var throttlingRef = $$new(false)();
      var savedValueRef = $$new(Nothing.value)();
      var $lazy_go = $runtime_lazy3("go", "Throttle", function() {
        return $$switch(function __do3() {
          var savedValue = read(savedValueRef)();
          if (savedValue instanceof Just) {
            write(Nothing.value)(savedValueRef)();
            write(true)(throttlingRef)();
            $lazy_go(27)();
            return callback(savedValue.value0)();
          }
          ;
          if (savedValue instanceof Nothing) {
            return write(false)(throttlingRef)();
          }
          ;
          throw new Error("Failed pattern match at Throttle (line 23, column 9 - line 30, column 51): " + [savedValue.constructor.name]);
        });
      });
      var go = $lazy_go(18);
      return function(a) {
        return function __do3() {
          var throttling = read(throttlingRef)();
          if (throttling) {
            write(new Just(a))(savedValueRef)();
            return true;
          }
          ;
          write(true)(throttlingRef)();
          go();
          callback(a)();
          return false;
        };
      };
    };
  };
};

// output/WHATWG.HTML.Document/index.js
var map19 = /* @__PURE__ */ map(functorEffect);
var headNullable = /* @__PURE__ */ unsafeGet2("head");
var unsafeHead = /* @__PURE__ */ function() {
  var $3 = map19(unsafeCoerce2);
  return function($4) {
    return $3(headNullable($4));
  };
}();
var bodyNullable = /* @__PURE__ */ unsafeGet2("body");
var unsafeBody = /* @__PURE__ */ function() {
  var $7 = map19(unsafeCoerce2);
  return function($8) {
    return $7(bodyNullable($8));
  };
}();

// output/Platform/index.js
var bind8 = /* @__PURE__ */ bind(bindEffect);
var unwrap5 = /* @__PURE__ */ unwrap();
var map20 = /* @__PURE__ */ map(functorEffect);
var toElement2 = /* @__PURE__ */ toElement();
var mempty4 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidRecord()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "body";
  }
})(monoidList)()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "head";
  }
})(monoidList)()(monoidRecordNil))));
var append6 = /* @__PURE__ */ append(semigroupBatched);
var Cmd = function(x) {
  return x;
};
var semigroupCmd = {
  append: function(v) {
    return function(v1) {
      return function(sendMsg) {
        return function __do2() {
          v(sendMsg)();
          return v1(sendMsg)();
        };
      };
    };
  }
};
var monoidCmd = {
  mempty: /* @__PURE__ */ $$const(/* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit))),
  Semigroup0: function() {
    return semigroupCmd;
  }
};
var batch = /* @__PURE__ */ function() {
  return Batch.create;
}();
var app = function(init4) {
  return function(flags) {
    var v = runWriterT(init4.init(flags))();
    var modelRef = $$new(v.value0)();
    var doc = bind8(window_)(document3)();
    var head6 = map20(toElement2)(unsafeHead(doc))();
    var body2 = map20(toElement2)(unsafeBody(doc))();
    var initialView = init4.view(v.value0);
    var v1 = render(doc)({
      head: head6,
      body: body2
    })(mempty4)({
      head: flatten(new Batch(initialView.head)),
      body: flatten(new Batch(initialView.body))
    })();
    var vdomsRef = $$new(v1.value0)();
    var domSubsRef = $$new(v1.value1)();
    var activeSubsRef = $$new([])();
    var refs = {
      model: modelRef,
      vdoms: vdomsRef,
      domSubs: domSubsRef,
      activeSubs: activeSubsRef
    };
    var render2 = throttle(raf)(function(v2) {
      return function __do2() {
        var oldVDOMs = read(vdomsRef)();
        var v3 = render(doc)({
          head: head6,
          body: body2
        })(oldVDOMs)(v2.value1)();
        write(v3.value0)(vdomsRef)();
        write(v3.value1)(domSubsRef)();
        var model = read(modelRef)();
        v2.value0(model)(v3.value1)();
        return unit;
      };
    })();
    var sendMsg = function(msg) {
      return function __do2() {
        var currentModel = read(refs.model)();
        var v2 = runWriterT(init4.update(currentModel)(msg))();
        write(v2.value0)(refs.model)();
        var v3 = init4.view(v2.value0);
        var skipped = render2(new Tuple(handleSubs, {
          head: flatten(new Batch(v3.head)),
          body: flatten(new Batch(v3.body))
        }))();
        (function() {
          if (skipped) {
            var domSubs = read(refs.domSubs)();
            return handleSubs(v2.value0)(domSubs)();
          }
          ;
          return unit;
        })();
        return unwrap5(v2.value1)(sendMsg)();
      };
    };
    var handleSubs = function(model) {
      return function(domSubs) {
        return function __do2() {
          var activeSubs = read(refs.activeSubs)();
          var newActiveSubs2 = something(activeSubs)(append6(domSubs)(init4.subscriptions(model)))(sendMsg)();
          return write(newActiveSubs2)(refs.activeSubs)();
        };
      };
    };
    var newActiveSubs = something([])(append6(v1.value1)(init4.subscriptions(v.value0)))(sendMsg)();
    write(newActiveSubs)(activeSubsRef)();
    return unwrap5(v.value1)(sendMsg)();
  };
};
var afterRender = /* @__PURE__ */ function() {
  var $67 = tell(monadTellWriterT(monoidCmd)(monadEffect));
  return function($68) {
    return $67(Cmd($$const($68)));
  };
}();

// output/Design/index.js
var hmapWithIndexRecord2 = /* @__PURE__ */ hmapWithIndexRecord();
var borderWidth1IsSymbol = {
  reflectSymbol: function() {
    return "borderWidth1";
  }
};
var mapRecordWithIndexCons2 = /* @__PURE__ */ mapRecordWithIndexCons(borderWidth1IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(borderWidth1IsSymbol));
var gray1IsSymbol = {
  reflectSymbol: function() {
    return "gray1";
  }
};
var mapRecordWithIndexCons1 = /* @__PURE__ */ mapRecordWithIndexCons(gray1IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(gray1IsSymbol));
var hue1IsSymbol = {
  reflectSymbol: function() {
    return "hue1";
  }
};
var mapRecordWithIndexCons22 = /* @__PURE__ */ mapRecordWithIndexCons(hue1IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(hue1IsSymbol));
var purple1IsSymbol = {
  reflectSymbol: function() {
    return "purple1";
  }
};
var saturation1IsSymbol = {
  reflectSymbol: function() {
    return "saturation1";
  }
};
var mapRecordWithIndexCons3 = /* @__PURE__ */ mapRecordWithIndexCons(purple1IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(purple1IsSymbol))(/* @__PURE__ */ mapRecordWithIndexCons(saturation1IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(saturation1IsSymbol))(mapRecordWithIndexNil)()())()();
var accent1IsSymbol = {
  reflectSymbol: function() {
    return "accent1";
  }
};
var backgroundIsSymbol = {
  reflectSymbol: function() {
    return "background";
  }
};
var colorIsSymbol = {
  reflectSymbol: function() {
    return "color";
  }
};
var lighterBackground22IsSymbol = {
  reflectSymbol: function() {
    return "lighterBackground22";
  }
};
var lighterBackground32IsSymbol = {
  reflectSymbol: function() {
    return "lighterBackground32";
  }
};
var lighterBackground60IsSymbol = {
  reflectSymbol: function() {
    return "lighterBackground60";
  }
};
var show5 = /* @__PURE__ */ show(showInt);
var sv = /* @__PURE__ */ makeVariables()(/* @__PURE__ */ hmapWithIndexRecord2(/* @__PURE__ */ mapRecordWithIndexCons2(/* @__PURE__ */ mapRecordWithIndexCons1(/* @__PURE__ */ mapRecordWithIndexCons22(mapRecordWithIndexCons3)()())()())()()))(/* @__PURE__ */ hmapWithIndexRecord2(/* @__PURE__ */ mapRecordWithIndexCons(accent1IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(accent1IsSymbol))(/* @__PURE__ */ mapRecordWithIndexCons(backgroundIsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(backgroundIsSymbol))(/* @__PURE__ */ mapRecordWithIndexCons2(/* @__PURE__ */ mapRecordWithIndexCons(colorIsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(colorIsSymbol))(/* @__PURE__ */ mapRecordWithIndexCons1(/* @__PURE__ */ mapRecordWithIndexCons22(/* @__PURE__ */ mapRecordWithIndexCons(lighterBackground22IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(lighterBackground22IsSymbol))(/* @__PURE__ */ mapRecordWithIndexCons(lighterBackground32IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(lighterBackground32IsSymbol))(/* @__PURE__ */ mapRecordWithIndexCons(lighterBackground60IsSymbol)(/* @__PURE__ */ mappingWithIndexMapIndexP(lighterBackground60IsSymbol))(mapRecordWithIndexCons3)()())()())()())()())()())()())()())()())()()))()()({
  borderWidth1: "1px",
  hue1: "0",
  gray1: "#e6e6e6",
  purple1: "#634372",
  saturation1: "0%"
})(function(r) {
  var makeBackground = function(percent) {
    return hsl(r.hue1)(r.saturation1)(show5(percent) + "%");
  };
  return {
    accent1: r.purple1,
    background: makeBackground(12),
    color: r.gray1,
    lighterBackground22: makeBackground(22),
    lighterBackground32: makeBackground(32),
    lighterBackground60: makeBackground(60)
  };
});
var vars = /* @__PURE__ */ function() {
  return sv.values;
}();
var staticStyles = /* @__PURE__ */ function() {
  return style([body([sv.styles, margin("0"), fontFamily("monospace"), background(vars.background), color(vars.color)]), button2([background(vars.lighterBackground32), color(vars.color), border("none"), variable("padding")("4px"), paddingTop($$var("padding")), paddingBottom($$var("padding")), fontFamily("monospace")]), rule("::-webkit-scrollbar")([variable("size")("10px"), width2($$var("size")), height2($$var("size"))]), rule("::-webkit-scrollbar-thumb")([background(vars.lighterBackground60), borderRadius("3px")]), rule("::-webkit-scrollbar-track")([background(vars.lighterBackground22)])]);
}();
var panel = /* @__PURE__ */ batch([/* @__PURE__ */ display("grid"), /* @__PURE__ */ gridAutoRows("fit-content(100%)")]);
var inputStyles = /* @__PURE__ */ function() {
  return batch([outline("none"), background(vars.lighterBackground22), color(vars.color), fontFamily("monospace")]);
}();
var inputStyles2 = /* @__PURE__ */ batch([inputStyles, /* @__PURE__ */ border("none"), /* @__PURE__ */ borderRadius("5px"), /* @__PURE__ */ padding("3px"), /* @__PURE__ */ lineHeight("1.25")]);
var inputBoxBorderWidth = 1;
var following = /* @__PURE__ */ mapSelector(/* @__PURE__ */ prepend("* + "));

// output/Effect.Exception.Unsafe/index.js
var unsafeThrowException = function($1) {
  return unsafePerformEffect(throwException($1));
};
var unsafeThrow = function($2) {
  return unsafeThrowException(error($2));
};

// output/Html/index.js
var unwrap6 = /* @__PURE__ */ unwrap();
var foldr5 = /* @__PURE__ */ foldr(foldableArray);
var bind9 = /* @__PURE__ */ bind(bindMaybe);
var pure9 = /* @__PURE__ */ pure(applicativeMaybe);
var text2 = function($20) {
  return Single.create(text($20));
};
var keyedS = function(tag) {
  return function(styles) {
    return function(attributes) {
      return function(children2) {
        var styles$prime = flattenMap(unwrap6)(new Batch(styles));
        var mstyles = process(styles$prime);
        return new Single(new KeyedElement(function(r) {
          if (mstyles instanceof Just) {
            return {
              attributes: new Cons(new AddClass(mstyles["value0"]["class"]), r.attributes),
              css: new Just(singleton4(mstyles["value0"]["class"])(mstyles.value0.css)),
              children: r.children,
              node: r.node,
              styles: r.styles,
              tag: r.tag
            };
          }
          ;
          if (mstyles instanceof Nothing) {
            return r;
          }
          ;
          throw new Error("Failed pattern match at Html (line 312, column 9 - line 318, column 23): " + [mstyles.constructor.name]);
        }({
          tag,
          styles: styles$prime,
          css: Nothing.value,
          attributes: flatten(new Batch(attributes)),
          children: foldr5(function(v) {
            return function(acc) {
              return fromMaybe(acc)(bind9(first(v.value1))(function(first2) {
                return pure9(new Cons(new Tuple(v.value0, first2), acc));
              }));
            };
          })(Nil.value)(children2),
          node: Nothing.value
        })));
      };
    };
  };
};
var elementS = function(tag) {
  return function(styles) {
    return function(attributes) {
      return function(children2) {
        var styles$prime = flattenMap(unwrap6)(new Batch(styles));
        var mstyles = process(styles$prime);
        return new Single(new VElement(function(r) {
          if (mstyles instanceof Just) {
            return {
              attributes: new Cons(new AddClass(mstyles["value0"]["class"]), r.attributes),
              css: new Just(singleton4(mstyles["value0"]["class"])(mstyles.value0.css)),
              children: r.children,
              noDiff: r.noDiff,
              node: r.node,
              styles: r.styles,
              tag: r.tag
            };
          }
          ;
          if (mstyles instanceof Nothing) {
            return r;
          }
          ;
          throw new Error("Failed pattern match at Html (line 350, column 15 - line 356, column 23): " + [mstyles.constructor.name]);
        }({
          tag,
          styles: styles$prime,
          css: Nothing.value,
          attributes: flatten(new Batch(attributes)),
          children: flatten(new Batch(children2)),
          node: Nothing.value,
          noDiff: false
        })));
      };
    };
  };
};
var inputS = /* @__PURE__ */ applyThird(/* @__PURE__ */ elementS("input"))([]);
var spanS = /* @__PURE__ */ elementS("span");
var textareaS = /* @__PURE__ */ elementS("textarea");
var element2 = function(tag) {
  return function(attributes) {
    return function(children2) {
      return new Single(new VElement({
        tag,
        styles: Nil.value,
        css: Nothing.value,
        attributes: flatten(new Batch(attributes)),
        children: flatten(new Batch(children2)),
        node: Nothing.value,
        noDiff: false
      }));
    };
  };
};
var title3 = function(t) {
  return element2("title")([])([text2(t)]);
};
var divS = /* @__PURE__ */ elementS("div");
var buttonS = /* @__PURE__ */ elementS("button");
var button3 = /* @__PURE__ */ element2("button");

// output/InputBox/index.js
var undo = function(v) {
  return {
    content: v.prevContent,
    prevContent: v.content,
    height: v.height,
    selectionRange: v.selectionRange
  };
};
var setSelectionRange3 = function(range3) {
  return function(v) {
    return {
      content: v.content,
      prevContent: v.prevContent,
      height: v.height,
      selectionRange: range3
    };
  };
};
var setHeight2 = function(newHeight) {
  return function(v) {
    return {
      content: v.content,
      prevContent: v.prevContent,
      height: newHeight,
      selectionRange: v.selectionRange
    };
  };
};
var setCursor = /* @__PURE__ */ function() {
  var $30 = join(bindFn)(Tuple.create);
  return function($31) {
    return setSelectionRange3($30($31));
  };
}();
var setContent = function(newContent) {
  return function(v) {
    return {
      content: newContent,
      prevContent: v.content,
      height: v.height,
      selectionRange: v.selectionRange
    };
  };
};
var setContentAndCursor = function(str) {
  var $32 = setCursor(length5(str));
  var $33 = setContent(str);
  return function($34) {
    return $32($33($34));
  };
};
var selectionStart3 = function(v) {
  return fst(v.selectionRange);
};
var selectionEnd3 = function(v) {
  return snd(v.selectionRange);
};
var height3 = function(v) {
  return v.height;
};
var defaultHeight = 30;
var reset = function(v) {
  return {
    content: "",
    prevContent: v.content,
    height: defaultHeight,
    selectionRange: new Tuple(0, 0)
  };
};
var $$default = /* @__PURE__ */ function() {
  return {
    content: "",
    prevContent: "",
    height: defaultHeight,
    selectionRange: new Tuple(0, 0)
  };
}();
var content = function(v) {
  return v.content;
};

// output/ModelMsg/index.js
var eq14 = /* @__PURE__ */ eq(eqId);
var Edit = /* @__PURE__ */ function() {
  function Edit2() {
  }
  ;
  Edit2.value = new Edit2();
  return Edit2;
}();
var WebSocketOpened = /* @__PURE__ */ function() {
  function WebSocketOpened2() {
  }
  ;
  WebSocketOpened2.value = new WebSocketOpened2();
  return WebSocketOpened2;
}();
var TransmissionReceived = /* @__PURE__ */ function() {
  function TransmissionReceived2(value0) {
    this.value0 = value0;
  }
  ;
  TransmissionReceived2.create = function(value0) {
    return new TransmissionReceived2(value0);
  };
  return TransmissionReceived2;
}();
var UpdateInputBox = /* @__PURE__ */ function() {
  function UpdateInputBox2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  UpdateInputBox2.create = function(value0) {
    return function(value1) {
      return new UpdateInputBox2(value0, value1);
    };
  };
  return UpdateInputBox2;
}();
var SendMessage = /* @__PURE__ */ function() {
  function SendMessage2() {
  }
  ;
  SendMessage2.value = new SendMessage2();
  return SendMessage2;
}();
var SelectThread = /* @__PURE__ */ function() {
  function SelectThread2(value0) {
    this.value0 = value0;
  }
  ;
  SelectThread2.create = function(value0) {
    return new SelectThread2(value0);
  };
  return SelectThread2;
}();
var NewThread = /* @__PURE__ */ function() {
  function NewThread2() {
  }
  ;
  NewThread2.value = new NewThread2();
  return NewThread2;
}();
var SelectMessageParent = /* @__PURE__ */ function() {
  function SelectMessageParent2(value0) {
    this.value0 = value0;
  }
  ;
  SelectMessageParent2.create = function(value0) {
    return new SelectMessageParent2(value0);
  };
  return SelectMessageParent2;
}();
var UpdateNameInput = /* @__PURE__ */ function() {
  function UpdateNameInput2(value0) {
    this.value0 = value0;
  }
  ;
  UpdateNameInput2.create = function(value0) {
    return new UpdateNameInput2(value0);
  };
  return UpdateNameInput2;
}();
var UpdateName = /* @__PURE__ */ function() {
  function UpdateName2() {
  }
  ;
  UpdateName2.value = new UpdateName2();
  return UpdateName2;
}();
var SelectSibling = /* @__PURE__ */ function() {
  function SelectSibling2(value0) {
    this.value0 = value0;
  }
  ;
  SelectSibling2.create = function(value0) {
    return new SelectSibling2(value0);
  };
  return SelectSibling2;
}();
var Undo = /* @__PURE__ */ function() {
  function Undo2() {
  }
  ;
  Undo2.value = new Undo2();
  return Undo2;
}();
var UpdateNotificationSound = /* @__PURE__ */ function() {
  function UpdateNotificationSound2(value0) {
    this.value0 = value0;
  }
  ;
  UpdateNotificationSound2.create = function(value0) {
    return new UpdateNotificationSound2(value0);
  };
  return UpdateNotificationSound2;
}();
var Focused = /* @__PURE__ */ function() {
  function Focused2() {
  }
  ;
  Focused2.value = new Focused2();
  return Focused2;
}();
var eqInputAction = {
  eq: function(x) {
    return function(y) {
      return true;
    };
  }
};
var eq32 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqInputAction));
var eqMsg = {
  eq: function(v) {
    return function(v1) {
      if (v instanceof UpdateInputBox && v1 instanceof UpdateInputBox) {
        return eq32(v.value0)(v1.value0) && v.value1 === v1.value1;
      }
      ;
      if (v instanceof SendMessage && v1 instanceof SendMessage) {
        return true;
      }
      ;
      if (v instanceof WebSocketOpened && v1 instanceof WebSocketOpened) {
        return true;
      }
      ;
      if (v instanceof SelectThread && v1 instanceof SelectThread) {
        return eq14(v.value0)(v1.value0);
      }
      ;
      if (v instanceof NewThread && v1 instanceof NewThread) {
        return true;
      }
      ;
      if (v instanceof SelectMessageParent && v1 instanceof SelectMessageParent) {
        return eq14(v.value0)(v1.value0);
      }
      ;
      if (v instanceof UpdateNameInput && v1 instanceof UpdateNameInput) {
        return v.value0 === v1.value0;
      }
      ;
      if (v instanceof UpdateName && v1 instanceof UpdateName) {
        return true;
      }
      ;
      if (v instanceof SelectSibling && v1 instanceof SelectSibling) {
        return eq14(v.value0)(v1.value0);
      }
      ;
      if (v instanceof Focused && v1 instanceof Focused) {
        return true;
      }
      ;
      if (v instanceof Undo && v1 instanceof Undo) {
        return true;
      }
      ;
      return false;
    };
  }
};

// output/WHATWG.DOM.Mixin.NonElementParentNode/foreign.js
var getElementByIdImpl = (id5) => (document4) => () => document4.getElementById(id5);

// output/WHATWG.DOM.Mixin.NonElementParentNode/index.js
var getElementById = function() {
  return getElementByIdImpl;
};

// output/WHATWG.HTML.HTMLTextAreaElement/index.js
var value4 = /* @__PURE__ */ unsafeGet2("value");
var selectionStart4 = /* @__PURE__ */ unsafeGet2("selectionStart");
var selectionEnd4 = /* @__PURE__ */ unsafeGet2("selectionEnd");

// output/WHATWG.HTML.KeyboardEvent/index.js
var metaKey3 = /* @__PURE__ */ unsafeGetPure("metaKey");
var key2 = /* @__PURE__ */ unsafeGetPure("key");
var ctrlKey3 = /* @__PURE__ */ unsafeGetPure("ctrlKey");

// output/WHATWG.HTML.Mixin.DocumentOrShadowRoot/index.js
var map21 = /* @__PURE__ */ map(functorEffect);
var activeElementNullable = function() {
  return unsafeGet2("activeElement");
};
var activeElementNullable1 = /* @__PURE__ */ activeElementNullable();
var activeElement = function() {
  var $3 = map21(toMaybe);
  return function($4) {
    return $3(activeElementNullable1($4));
  };
};

// output/WHATWG.HTML.Mixin.HTMLOrSVGElement/foreign.js
var focusImpl = (options) => (element3) => () => element3.focus(options);

// output/WHATWG.HTML.Mixin.HTMLOrSVGElement/index.js
var focus3 = function() {
  return function() {
    return focusImpl;
  };
};

// output/Input/index.js
var bind10 = /* @__PURE__ */ bind(bindEffect);
var mapFlipped8 = /* @__PURE__ */ mapFlipped(functorEffect);
var getElementById2 = /* @__PURE__ */ getElementById();
var toMaybeHTMLTextAreaElement2 = /* @__PURE__ */ toMaybeHTMLTextAreaElement();
var map24 = /* @__PURE__ */ map(functorEffect);
var scrollHeight3 = /* @__PURE__ */ scrollHeight2();
var pure10 = /* @__PURE__ */ pure(applicativeEffect);
var bind12 = /* @__PURE__ */ bind(/* @__PURE__ */ bindWriterT(semigroupCmd)(bindEffect));
var liftEffect3 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectWriter(monoidCmd)(monadEffectEffect));
var on6 = /* @__PURE__ */ on2(produceFunctionFunction);
var mapFlipped1 = /* @__PURE__ */ mapFlipped(functorMaybe);
var toMaybeKeyboardEvent2 = /* @__PURE__ */ toMaybeKeyboardEvent();
var activeElement2 = /* @__PURE__ */ activeElement();
var eq15 = /* @__PURE__ */ eq(eqRefEq);
var toMaybeHTMLElement2 = /* @__PURE__ */ toMaybeHTMLElement();
var focus4 = /* @__PURE__ */ focus3()();
var preventDefault3 = /* @__PURE__ */ preventDefault2();
var ref = /* @__PURE__ */ unsafePerformEffect(/* @__PURE__ */ $$new($$default));
var id4 = "input";
var updateState = function __do() {
  var oldState = read(ref)();
  var doc = document$prime();
  var mtextarea = mapFlipped8(getElementById2(id4)(doc))(toMaybeHTMLTextAreaElement2)();
  var newState = function() {
    if (mtextarea instanceof Just) {
      var value5 = value4(mtextarea.value0)();
      var height4 = map24(toNumber)(scrollHeight3(mtextarea.value0))();
      var selectionStart5 = selectionStart4(mtextarea.value0)();
      var selectionEnd5 = selectionEnd4(mtextarea.value0)();
      var newState2 = setSelectionRange3(new Tuple(selectionStart5, selectionEnd5))(setHeight2(height4 + inputBoxBorderWidth)(setContent(value5)(oldState)));
      write(newState2)(ref)();
      return new Just(newState2);
    }
    ;
    if (mtextarea instanceof Nothing) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Input (line 53, column 7 - line 70, column 32): " + [mtextarea.constructor.name]);
  }();
  return new Tuple(oldState, newState);
};
var infuse = function(addIB) {
  return function(update3) {
    return function(model) {
      return function(msg) {
        return bind12(liftEffect3(function __do2() {
          var v = updateState();
          if (v.value1 instanceof Just) {
            return v.value1.value0;
          }
          ;
          if (v.value1 instanceof Nothing) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Input (line 40, column 9 - line 42, column 35): " + [v.value1.constructor.name]);
        }))(function(currentInputBox) {
          return update3(addIB(model)(currentInputBox))(msg);
        });
      };
    };
  };
};
var onInput2 = /* @__PURE__ */ on6("input")(function(v) {
  return function __do2() {
    var v1 = updateState();
    if (v1.value1 instanceof Just) {
      var height4 = height3(v1.value1.value0);
      var helper2 = function(b) {
        return function(update3) {
          return function(ma) {
            var helper22 = function(a) {
              if (b) {
                return new Just(update3(a));
              }
              ;
              return ma;
            };
            if (ma instanceof Just) {
              return helper22(ma.value0);
            }
            ;
            if (ma instanceof Nothing) {
              return helper22(new Tuple(Nothing.value, height4));
            }
            ;
            throw new Error("Failed pattern match at Input (line 122, column 15 - line 124, column 55): " + [ma.constructor.name]);
          };
        };
      };
      return mapFlipped1(helper2(content(v1.value1.value0) === "/edit " && content(v1.value0) === "/edit")(function(v2) {
        return new Tuple(new Just(Edit.value), v2.value1);
      })(helper2(height4 !== height3(v1.value0))(function(v2) {
        return new Tuple(v2.value0, height4);
      })(Nothing.value)))(uncurry(UpdateInputBox.create));
    }
    ;
    if (v1.value1 instanceof Nothing) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Input (line 108, column 7 - line 136, column 32): " + [v1.value1.constructor.name]);
  };
});
var hitEnter = function($69) {
  return function(v) {
    if (v instanceof Just) {
      var $60 = key2(v.value0) === "Enter";
      if ($60) {
        return function __do2() {
          var document4 = document$prime();
          var body2 = unsafeBody(document4)();
          var v1 = activeElement2(document4)();
          if (v1 instanceof Just) {
            var $62 = eq15(new RefEq(body2))(new RefEq(v1.value0));
            if ($62) {
              bind10(map24(toMaybeHTMLElement2)(getElementById2(id4)(document4)))(maybe(pure10(unit))(focus4({})))();
              preventDefault3(v.value0)();
              return Nothing.value;
            }
            ;
            return Nothing.value;
          }
          ;
          if (v1 instanceof Nothing) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Input (line 171, column 13 - line 183, column 38): " + [v1.constructor.name]);
        };
      }
      ;
      return pure10(Nothing.value);
    }
    ;
    if (v instanceof Nothing) {
      return pure10(Nothing.value);
    }
    ;
    throw new Error("Failed pattern match at Input (line 165, column 6 - line 187, column 30): " + [v.constructor.name]);
  }(toMaybeKeyboardEvent2($69));
};
var focusInput = /* @__PURE__ */ afterRender(/* @__PURE__ */ bind10(/* @__PURE__ */ bind10(document$prime)(/* @__PURE__ */ function() {
  var $70 = map24(toMaybeHTMLElement2);
  var $71 = getElementById2(id4);
  return function($72) {
    return $70($71($72));
  };
}()))(/* @__PURE__ */ maybe(/* @__PURE__ */ pure10(unit))(/* @__PURE__ */ focus4({}))));
var detectSpecial = /* @__PURE__ */ on6("keydown")(function($73) {
  return function(v) {
    if (v instanceof Just) {
      var $66 = key2(v.value0) === "Enter" && (ctrlKey3(v.value0) || metaKey3(v.value0));
      if ($66) {
        return function __do2() {
          preventDefault3(v.value0)();
          return new Just(SendMessage.value);
        };
      }
      ;
      var $67 = key2(v.value0) === "z" && ctrlKey3(v.value0);
      if ($67) {
        return function __do2() {
          preventDefault3(v.value0)();
          return new Just(Undo.value);
        };
      }
      ;
      return pure10(Nothing.value);
    }
    ;
    if (v instanceof Nothing) {
      return pure10(Nothing.value);
    }
    ;
    throw new Error("Failed pattern match at Input (line 142, column 8 - line 153, column 33): " + [v.constructor.name]);
  }(toMaybeKeyboardEvent2($73));
});
var html = function(model) {
  return textareaS([height2(px(height3(model.inputBox))), flex("1"), borderJ([px(inputBoxBorderWidth), "solid", vars.color]), padding(".45em"), inputStyles, borderTop("none")])([id2(id4), alwaysSet(value3(content(model.inputBox))), alwaysSet(property("selectionStart")(toJSValue(selectionStart3(model.inputBox)))), alwaysSet(property("selectionEnd")(toJSValue(selectionEnd3(model.inputBox)))), onInput2, detectSpecial])([]);
};

// output/TreeMap/index.js
var foldl4 = /* @__PURE__ */ foldl(foldableList);
var mapFlipped9 = /* @__PURE__ */ mapFlipped(functorMaybe);
var bind11 = /* @__PURE__ */ bind(bindEither);
var mapFlipped12 = /* @__PURE__ */ mapFlipped(functorEither);
var traverse6 = /* @__PURE__ */ traverse(traversableArray);
var traverse12 = /* @__PURE__ */ traverse6(applicativeEither);
var map25 = /* @__PURE__ */ map(functorEither);
var toUnfoldable8 = /* @__PURE__ */ toUnfoldable3(unfoldableArray);
var bind13 = /* @__PURE__ */ bind(bindMaybe);
var pure11 = /* @__PURE__ */ pure(applicativeNonEmptyList);
var TreeMap = function(x) {
  return x;
};
var toTreeMap = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  var insert8 = insert(dictOrd);
  var $$delete3 = $$delete2(dictOrd);
  var $185 = foldl4(function(v) {
    return function(v1) {
      return function(acc$prime) {
        var v2 = lookup12(v1.id)(acc$prime.parents);
        if (v2 instanceof Just && v2.value0 instanceof Left) {
          return {
            parents: insert8(v1.id)(new Right({
              value: v1.value,
              parent: v1.parent,
              children: v2.value0.value0
            }))(acc$prime.parents),
            leaves: acc$prime.leaves
          };
        }
        ;
        if (v2 instanceof Nothing) {
          return {
            leaves: insert8(v1.id)({
              value: v1.value,
              parent: v1.parent,
              children: []
            })(acc$prime.leaves),
            parents: acc$prime.parents
          };
        }
        ;
        return unsafeThrow("Tree.purs: Something has gone wrong");
      }(function() {
        if (v1.parent instanceof Just) {
          var v2 = lookup12(v1.parent.value0)(v.leaves);
          if (v2 instanceof Just) {
            return {
              leaves: $$delete3(v1.parent.value0)(v.leaves),
              parents: insert8(v1.parent.value0)(new Right({
                children: [v1.id],
                parent: v2.value0.parent,
                value: v2.value0.value
              }))(v.parents)
            };
          }
          ;
          if (v2 instanceof Nothing) {
            var v3 = lookup12(v1.parent.value0)(v.parents);
            if (v3 instanceof Just && v3.value0 instanceof Left) {
              return {
                parents: insert8(v1.parent.value0)(new Left(snoc(v3.value0.value0)(v1.id)))(v.parents),
                leaves: v.leaves
              };
            }
            ;
            if (v3 instanceof Just && v3.value0 instanceof Right) {
              return {
                parents: insert8(v1.parent.value0)(new Right({
                  children: snoc(v3.value0.value0.children)(v1.id),
                  parent: v3.value0.value0.parent,
                  value: v3.value0.value0.value
                }))(v.parents),
                leaves: v.leaves
              };
            }
            ;
            if (v3 instanceof Nothing) {
              return {
                parents: insert8(v1.parent.value0)(new Left([v1.id]))(v.parents),
                leaves: v.leaves
              };
            }
            ;
            throw new Error("Failed pattern match at TreeMap (line 67, column 19 - line 88, column 86): " + [v3.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at TreeMap (line 56, column 15 - line 88, column 86): " + [v2.constructor.name]);
        }
        ;
        if (v1.parent instanceof Nothing) {
          return v;
        }
        ;
        throw new Error("Failed pattern match at TreeMap (line 54, column 11 - line 90, column 27): " + [v1.parent.constructor.name]);
      }());
    };
  })({
    leaves: empty2,
    parents: empty2
  });
  return function($186) {
    return TreeMap($185($186));
  };
};
var removeLeaf = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  var $$delete3 = $$delete2(dictOrd);
  var Eq0 = dictOrd.Eq0();
  var delete1 = $$delete(Eq0);
  var eq8 = eq(eqArray(Eq0));
  var insert8 = insert(dictOrd);
  return function(key3) {
    return function(v) {
      var v1 = lookup12(key3)(v.leaves);
      if (v1 instanceof Just) {
        var potentialNewLeaves = $$delete3(key3)(v.leaves);
        var newParentData = mapFlipped9(v1.value0.parent)(function(pid) {
          var v2 = lookup12(pid)(v.parents);
          if (v2 instanceof Just && v2.value0 instanceof Right) {
            var newChildren = delete1(key3)(v2.value0.value0.children);
            return new Tuple(eq8(newChildren)([]), new Tuple(pid, new Right({
              children: newChildren,
              parent: v2.value0.value0.parent,
              value: v2.value0.value0.value
            })));
          }
          ;
          return unsafeThrow("removeLeaf");
        });
        if (newParentData instanceof Just && (newParentData.value0.value0 && newParentData.value0.value1.value1 instanceof Right)) {
          return {
            leaves: insert8(newParentData.value0.value1.value0)(newParentData.value0.value1.value1.value0)(potentialNewLeaves),
            parents: $$delete3(newParentData.value0.value1.value0)(v.parents)
          };
        }
        ;
        if (newParentData instanceof Just && !newParentData.value0.value0) {
          return {
            leaves: potentialNewLeaves,
            parents: insert8(newParentData.value0.value1.value0)(newParentData.value0.value1.value1)(v.parents)
          };
        }
        ;
        if (newParentData instanceof Nothing) {
          return {
            leaves: potentialNewLeaves,
            parents: v.parents
          };
        }
        ;
        return unsafeThrow("removeLeaf 2");
      }
      ;
      if (v1 instanceof Nothing) {
        return v;
      }
      ;
      throw new Error("Failed pattern match at TreeMap (line 223, column 3 - line 269, column 18): " + [v1.constructor.name]);
    };
  };
};
var lookupEither = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  return function(key3) {
    return function(v) {
      var v1 = lookup12(key3)(v.parents);
      if (v1 instanceof Just && v1.value0 instanceof Right) {
        return new Right(v1.value0.value0);
      }
      ;
      if (v1 instanceof Nothing) {
        var v2 = lookup12(key3)(v.leaves);
        if (v2 instanceof Just) {
          return new Right(v2.value0);
        }
        ;
        if (v2 instanceof Nothing) {
          return new Left("key not found");
        }
        ;
        throw new Error("Failed pattern match at TreeMap (line 139, column 16 - line 141, column 40): " + [v2.constructor.name]);
      }
      ;
      return unsafeThrow("Tree.purs: lookup: Something has gone wrong");
    };
  };
};
var siblings = function(dictOrd) {
  var lookupEither1 = lookupEither(dictOrd);
  var $$delete3 = $$delete(dictOrd.Eq0());
  return function(key3) {
    return function(tm) {
      var find3 = applySecond2(lookupEither1)(tm);
      return bind11(lookupEither1(key3)(tm))(function(v) {
        if (v.parent instanceof Just) {
          return bind11(mapFlipped12(find3(v.parent.value0))(function() {
            var $187 = $$delete3(key3);
            return function($188) {
              return $187(function(v1) {
                return v1.children;
              }($188));
            };
          }()))(traverse12(function() {
            var $189 = map25(function(v1) {
              return v1.value;
            });
            return function($190) {
              return $189(find3($190));
            };
          }()));
        }
        ;
        if (v.parent instanceof Nothing) {
          return new Right([]);
        }
        ;
        throw new Error("Failed pattern match at TreeMap (line 150, column 9 - line 155, column 30): " + [v.parent.constructor.name]);
      });
    };
  };
};
var lookup5 = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  return function(key3) {
    return function(v) {
      var v1 = lookup12(key3)(v.parents);
      if (v1 instanceof Just && v1.value0 instanceof Right) {
        return new Just(v1.value0.value0);
      }
      ;
      if (v1 instanceof Nothing) {
        return lookup12(key3)(v.leaves);
      }
      ;
      return unsafeThrow("Tree.purs: lookup: Something has gone wrong");
    };
  };
};
var member3 = function(dictOrd) {
  var lookup12 = lookup5(dictOrd);
  return function(key3) {
    return function(tm) {
      return maybe(false)(function(v) {
        return true;
      })(lookup12(key3)(tm));
    };
  };
};
var removeLeafRecursive = function(dictOrd) {
  var lookup12 = lookup5(dictOrd);
  var eq8 = eq(eqArray(dictOrd.Eq0()));
  var removeLeaf1 = removeLeaf(dictOrd);
  return function(shouldRemove) {
    return function(key3) {
      return function(tm) {
        var v = lookup12(key3)(tm);
        if (v instanceof Just) {
          var $155 = eq8(v.value0.children)([]) && shouldRemove(v.value0);
          if ($155) {
            var newTm = removeLeaf1(key3)(tm);
            if (v.value0.parent instanceof Just) {
              return removeLeafRecursive(dictOrd)(shouldRemove)(v.value0.parent.value0)(newTm);
            }
            ;
            if (v.value0.parent instanceof Nothing) {
              return newTm;
            }
            ;
            throw new Error("Failed pattern match at TreeMap (line 282, column 9 - line 284, column 27): " + [v.value0.parent.constructor.name]);
          }
          ;
          return tm;
        }
        ;
        if (v instanceof Nothing) {
          return tm;
        }
        ;
        throw new Error("Failed pattern match at TreeMap (line 278, column 3 - line 288, column 18): " + [v.constructor.name]);
      };
    };
  };
};
var leaves = function(v) {
  return toUnfoldable8(v.leaves);
};
var isLeaf = function(dictOrd) {
  var lookup12 = lookup5(dictOrd);
  return function(key3) {
    return function(tm) {
      return maybe(false)(function($191) {
        return $$null(function(v) {
          return v.children;
        }($191));
      })(lookup12(key3)(tm));
    };
  };
};
var getThread = function(dictOrd) {
  var lookup12 = lookup5(dictOrd);
  var siblings1 = siblings(dictOrd);
  return function(start) {
    return function(tm) {
      var helper2 = function(acc) {
        return applySecond2(go)(applySecond2(cons3)(acc));
      };
      var go = function(key3) {
        return function(f) {
          return bind13(lookup12(key3)(tm))(function(v) {
            var v1 = siblings1(key3)(tm);
            if (v1 instanceof Right) {
              var f$primed = f(new Tuple(v.value, v1.value0));
              if (v.parent instanceof Just) {
                return helper2(f$primed)(v.parent.value0);
              }
              ;
              if (v.parent instanceof Nothing) {
                return new Just(f$primed);
              }
              ;
              throw new Error("Failed pattern match at TreeMap (line 169, column 17 - line 171, column 38): " + [v.parent.constructor.name]);
            }
            ;
            if (v1 instanceof Left) {
              return unsafeThrow("Tree.purs: getThread");
            }
            ;
            throw new Error("Failed pattern match at TreeMap (line 166, column 13 - line 172, column 59): " + [v1.constructor.name]);
          });
        };
      };
      return mapFlipped9(go(start)(pure11))(reverse3);
    };
  };
};
var findLeaf = function(dictOrd) {
  var lookup12 = lookup5(dictOrd);
  return function(id5) {
    return function(tm) {
      return bind13(lookup12(id5)(tm))(function(v) {
        var v1 = uncons(v.children);
        if (v1 instanceof Just) {
          return findLeaf(dictOrd)(v1.value0.head)(tm);
        }
        ;
        if (v1 instanceof Nothing) {
          return new Just(id5);
        }
        ;
        throw new Error("Failed pattern match at TreeMap (line 194, column 9 - line 196, column 29): " + [v1.constructor.name]);
      });
    };
  };
};
var findNewLeaf = function(dictOrd) {
  var member12 = member3(dictOrd);
  var findLeaf1 = findLeaf(dictOrd);
  var lookup12 = lookup5(dictOrd);
  return function(key3) {
    return function(oldTM) {
      return function(newTM) {
        var $176 = member12(key3)(newTM);
        if ($176) {
          return findLeaf1(key3)(newTM);
        }
        ;
        return bind13(bind13(lookup12(key3)(oldTM))(function(v) {
          return v.parent;
        }))(applySecond2(applySecond2(findNewLeaf(dictOrd))(oldTM))(newTM));
      };
    };
  };
};
var empty5 = {
  leaves: empty2,
  parents: empty2
};
var edit = function(dictOrd) {
  var lookup12 = lookup(dictOrd);
  var insert8 = insert(dictOrd);
  return function(key3) {
    return function(f) {
      return function(v) {
        var v1 = lookup12(key3)(v.leaves);
        if (v1 instanceof Just) {
          return {
            leaves: insert8(key3)(f(v1.value0))(v.leaves),
            parents: v.parents
          };
        }
        ;
        if (v1 instanceof Nothing) {
          var v2 = lookup12(key3)(v.parents);
          if (v2 instanceof Just && v2.value0 instanceof Right) {
            return {
              leaves: v.leaves,
              parents: insert8(key3)(new Right(f(v2.value0.value0)))(v.parents)
            };
          }
          ;
          return v;
        }
        ;
        throw new Error("Failed pattern match at TreeMap (line 203, column 3 - line 212, column 16): " + [v1.constructor.name]);
      };
    };
  };
};

// output/Y.Client.WebSocket/foreign.js
var newConnection = ({ url: url2 }) => () => {
  const client = new WebSocket(url2);
  return client;
};
var onOpen = (k) => (client) => () => {
  client.addEventListener("open", () => {
    k();
  });
};
var onTransmission_f = (decode2) => (k) => (client) => () => {
  client.addEventListener("message", (event) => {
    const text3 = event.data.toString();
    console.log("Transmission received:", text3);
    const val = decode2(text3);
    k(val)();
  });
};
var transmit_f = (text3) => (client) => () => {
  console.log("Sending transmission:", text3);
  client.send(text3);
};

// output/Data.Argonaut.Parser/foreign.js
function _jsonParser(fail, succ2, s) {
  try {
    return succ2(JSON.parse(s));
  } catch (e) {
    return fail(e.message);
  }
}

// output/Data.Argonaut.Parser/index.js
var jsonParser = function(j) {
  return _jsonParser(Left.create, Right.create, j);
};

// output/Y.Shared.Util.Codable/index.js
var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindMaybe);
var encode = function(dict) {
  return dict.encode;
};
var encodableArgonaut = function(dictEncodeJson) {
  return {
    encode: function() {
      var $14 = encodeJson(dictEncodeJson);
      return function($15) {
        return stringify($14($15));
      };
    }()
  };
};
var decode = function(dict) {
  return dict.decode;
};
var decodableMaybeArgonaut = function(dictDecodeJson) {
  return {
    decode: composeKleisli2(function($16) {
      return hush(jsonParser($16));
    })(function() {
      var $17 = decodeJson(dictDecodeJson);
      return function($18) {
        return hush($17($18));
      };
    }())
  };
};

// output/Y.Client.WebSocket/index.js
var transmit = function(dictEncodable) {
  var encode2 = encode(dictEncodable);
  return function(tn) {
    return function(client) {
      return transmit_f(encode2(tn))(client);
    };
  };
};
var onTransmission = function(dictDecodable) {
  return onTransmission_f(decode(dictDecodable));
};

// output/WebSocketSub/index.js
var pure14 = /* @__PURE__ */ pure(applicativeEffect);
var onTransmission2 = /* @__PURE__ */ onTransmission(/* @__PURE__ */ decodableMaybeArgonaut(decodeJsonToClient));
var producer23 = /* @__PURE__ */ producer2(/* @__PURE__ */ eqTuple(eqRefEq)(eqRefEq));
var canceler = /* @__PURE__ */ pure14(unit);
var helper = function(v) {
  return function(v1) {
    return function(msgCallback) {
      return function __do2() {
        onTransmission2(function($15) {
          return msgCallback(v.value0($15));
        })(v1.value0)();
        return canceler;
      };
    };
  };
};
var wsToSub = function(toMsg) {
  return function(client) {
    return new Single(producer23(helper)(new RefEq(toMsg))(new RefEq(client)));
  };
};

// output/Main/index.js
var $$new3 = /* @__PURE__ */ $$new2({
  reflectSymbol: function() {
    return "Event";
  }
});
var transmit2 = /* @__PURE__ */ transmit(/* @__PURE__ */ encodableArgonaut(encodeJsonToServer));
var ordTuple2 = /* @__PURE__ */ ordTuple(ordId)(ordId);
var member4 = /* @__PURE__ */ member2(ordTuple2);
var pure15 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeWriterT(monoidCmd)(applicativeEffect));
var discard6 = /* @__PURE__ */ discard(discardUnit);
var bindWriterT3 = /* @__PURE__ */ bindWriterT(semigroupCmd)(bindEffect);
var discard1 = /* @__PURE__ */ discard6(bindWriterT3);
var liftEffect4 = /* @__PURE__ */ liftEffect(/* @__PURE__ */ monadEffectWriter(monoidCmd)(monadEffectEffect));
var insert7 = /* @__PURE__ */ insert4(ordTuple2);
var pure16 = /* @__PURE__ */ pure(applicativeEffect);
var mapFlipped10 = /* @__PURE__ */ mapFlipped(functorArray);
var compare4 = /* @__PURE__ */ compare(ordInstant);
var onClick2 = /* @__PURE__ */ onClick(/* @__PURE__ */ produce1(eqMsg));
var eq7 = /* @__PURE__ */ eq(eqId);
var siblings2 = /* @__PURE__ */ siblings(ordId);
var lessThanOrEq2 = /* @__PURE__ */ lessThanOrEq(/* @__PURE__ */ ordTuple(ordBoolean)(ordInstant));
var foldl5 = /* @__PURE__ */ foldl(foldableArray);
var min4 = /* @__PURE__ */ min(ordBoolean);
var isLeaf2 = /* @__PURE__ */ isLeaf(ordId);
var min1 = /* @__PURE__ */ min(ordInstant);
var eqMaybe2 = /* @__PURE__ */ eqMaybe(eqId);
var notEq2 = /* @__PURE__ */ notEq(eqMaybe2);
var mempty5 = /* @__PURE__ */ mempty(monoidBatched);
var eq16 = /* @__PURE__ */ eq(eqMaybe2);
var lookup6 = /* @__PURE__ */ lookup5(ordId);
var onInput3 = /* @__PURE__ */ onInput(produceFunctionFunction);
var mapFlipped13 = /* @__PURE__ */ mapFlipped(functorMaybe);
var bind14 = /* @__PURE__ */ bind(bindMaybe);
var lookup1 = /* @__PURE__ */ lookup(ordId);
var show6 = /* @__PURE__ */ show(showInt);
var foldl12 = /* @__PURE__ */ foldl(foldableList);
var insert1 = /* @__PURE__ */ insert(ordId);
var toTreeMap2 = /* @__PURE__ */ toTreeMap(ordId);
var mapFlipped22 = /* @__PURE__ */ mapFlipped(functorList);
var edit2 = /* @__PURE__ */ edit(ordId);
var removeLeafRecursive2 = /* @__PURE__ */ removeLeafRecursive(ordId);
var on7 = /* @__PURE__ */ on5(produceFunctionFunction);
var getThread2 = /* @__PURE__ */ getThread(ordId);
var fromFoldable8 = /* @__PURE__ */ fromFoldable(foldableNonEmptyList);
var map26 = /* @__PURE__ */ map(functorArray);
var pure24 = /* @__PURE__ */ pure(applicativeMaybe);
var bind24 = /* @__PURE__ */ bind(bindWriterT3);
var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
var lift23 = /* @__PURE__ */ lift2(applyEffect);
var UserIsSymbol3 = {
  reflectSymbol: function() {
    return "User";
  }
};
var new1 = /* @__PURE__ */ $$new2(UserIsSymbol3);
var ConvoIsSymbol = {
  reflectSymbol: function() {
    return "Convo";
  }
};
var new2 = /* @__PURE__ */ $$new2(ConvoIsSymbol);
var lift21 = /* @__PURE__ */ lift2(applyEither);
var parse2 = /* @__PURE__ */ parse(UserIsSymbol3);
var parse1 = /* @__PURE__ */ parse(ConvoIsSymbol);
var format2 = /* @__PURE__ */ format(UserIsSymbol3);
var format1 = /* @__PURE__ */ format(ConvoIsSymbol);
var tell3 = /* @__PURE__ */ tell(/* @__PURE__ */ monadTellWriterT(monoidCmd)(monadEffect));
var mapFlipped32 = /* @__PURE__ */ mapFlipped(/* @__PURE__ */ functorWriterT(functorEffect));
var sortWith2 = /* @__PURE__ */ sortWith(ordInstant);
var append14 = /* @__PURE__ */ append(semigroupArray);
var lessThanOrEq1 = /* @__PURE__ */ lessThanOrEq(ordInstant);
var findLeaf2 = /* @__PURE__ */ findLeaf(ordId);
var new3 = /* @__PURE__ */ $$new2({
  reflectSymbol: function() {
    return "Message";
  }
});
var mempty12 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidSet(ordId));
var findNewLeaf2 = /* @__PURE__ */ findNewLeaf(ordId);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindMaybe);
var member1 = /* @__PURE__ */ member3(ordId);
var transmissionReceived = function(v) {
  if (v instanceof Just) {
    return new TransmissionReceived(new Just(fromToClient(v.value0)));
  }
  ;
  if (v instanceof Nothing) {
    return new TransmissionReceived(Nothing.value);
  }
  ;
  throw new Error("Failed pattern match at Main (line 608, column 24 - line 610, column 42): " + [v.constructor.name]);
};
var toIVP = function(v) {
  return {
    id: v.id,
    value: v,
    parent: findMax2(v.depIds)
  };
};
var splitEvents = /* @__PURE__ */ foldr(foldableArray)(function(v) {
  return function(acc) {
    if (v.payload instanceof EventPayload_SetName2) {
      return {
        setName: new Cons(v.payload.value0, acc.setName),
        messageSend: acc.messageSend,
        messageEdit: acc.messageEdit,
        messageDelete: acc.messageDelete,
        setReadState: acc.setReadState
      };
    }
    ;
    if (v.payload instanceof EventPayload_MessageSend2) {
      return {
        messageSend: new Cons(v.payload.value0, acc.messageSend),
        setName: acc.setName,
        messageEdit: acc.messageEdit,
        messageDelete: acc.messageDelete,
        setReadState: acc.setReadState
      };
    }
    ;
    if (v.payload instanceof EventPayload_MessageEdit2) {
      return {
        messageEdit: new Cons(v.payload.value0, acc.messageEdit),
        messageSend: acc.messageSend,
        setName: acc.setName,
        messageDelete: acc.messageDelete,
        setReadState: acc.setReadState
      };
    }
    ;
    if (v.payload instanceof EventPayload_MessageDelete2) {
      return {
        messageDelete: new Cons(v.payload.value0, acc.messageDelete),
        messageEdit: acc.messageEdit,
        messageSend: acc.messageSend,
        setName: acc.setName,
        setReadState: acc.setReadState
      };
    }
    ;
    if (v.payload instanceof EventPayload_SetReadState) {
      return {
        setReadState: new Cons(v.payload.value0, acc.setReadState),
        messageDelete: acc.messageDelete,
        messageEdit: acc.messageEdit,
        messageSend: acc.messageSend,
        setName: acc.setName
      };
    }
    ;
    throw new Error("Failed pattern match at Main (line 581, column 8 - line 595, column 59): " + [v.payload.constructor.name]);
  };
})(/* @__PURE__ */ mempty(/* @__PURE__ */ monoidRecord()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "messageDelete";
  }
})(monoidList)()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "messageEdit";
  }
})(monoidList)()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "messageSend";
  }
})(monoidList)()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "setName";
  }
})(monoidList)()(/* @__PURE__ */ monoidRecordCons({
  reflectSymbol: function() {
    return "setReadState";
  }
})(monoidList)()(monoidRecordNil))))))));
var pushEvent = function(v) {
  return function(payload) {
    return function __do2() {
      var v1 = $$new3();
      var now = getNow2();
      return transmit2(toToServer(new ToServer_Push2({
        convoId: v.convoId,
        event: {
          id: v1,
          time: now,
          payload: payload(now)
        }
      })))(v.wsClient)();
    };
  };
};
var pushReadEvent = function(v) {
  return function(mid) {
    var $219 = member4(new Tuple(v.userId, mid))(v.events.folded.read);
    if ($219) {
      return pure15(v);
    }
    ;
    return discard1(liftEffect4(pushEvent(v)(function(v1) {
      return new EventPayload_SetReadState({
        convoId: v.convoId,
        userId: v.userId,
        messageId: mid,
        readState: true
      });
    })))(function() {
      return pure15({
        events: {
          folded: {
            read: insert7(new Tuple(v.userId, mid))(v.events.folded.read),
            messages: v.events.folded.messages,
            names: v.events.folded.names
          },
          raw: v.events.raw
        },
        convoId: v.convoId,
        inputBox: v.inputBox,
        messageParent: v.messageParent,
        nameInput: v.nameInput,
        notificationSound: v.notificationSound,
        thread: v.thread,
        unread: v.unread,
        userId: v.userId,
        wsClient: v.wsClient
      });
    });
  };
};
var onNotSelectingClickRE = function(msg) {
  return function(v) {
    return function __do2() {
      var selecting = isSelecting();
      if (selecting) {
        return Nothing.value;
      }
      ;
      return new Just(msg);
    };
  };
};
var onNotSelectingClick = /* @__PURE__ */ function() {
  var $340 = on2(produceProducer)("click");
  var $341 = producer(eqMsg)(onNotSelectingClickRE);
  return function($342) {
    return $340($341($342));
  };
}();
var threadBar = function(model) {
  var leaves2 = mapFlipped10(sortBy(function(a) {
    return function(b) {
      return compare4(snd(b).value.timeSent)(snd(a).value.timeSent);
    };
  })(leaves(model.events.folded.messages)))(fst);
  return batch([divS([margin("5px")])([])([button3([onClick2(NewThread.value)])([text2("New Thread")])]), divS([overflow("auto"), borderJ([vars.borderWidth1, "solid"])])([])(mapFlipped10(leaves2)(function(mid) {
    return function(v) {
      if (v instanceof Just) {
        var isRead = eq7(v.value0.value.authorId)(model.userId) || member4(new Tuple(model.userId, mid))(model.events.folded.read);
        var isChosen = function() {
          var v1 = siblings2(mid)(model.events.folded.messages);
          if (v1 instanceof Right && v1.value0.length === 0) {
            return true;
          }
          ;
          if (v1 instanceof Right) {
            return lessThanOrEq2(new Tuple(true, v.value0.value.timeSent))(foldl5(function(v2) {
              return function(m) {
                return new Tuple(min4(v2.value0)(isLeaf2(m.id)(model.events.folded.messages)), min1(v2.value1)(m.timeSent));
              };
            })(new Tuple(true, v.value0.value.timeSent))(v1.value0));
          }
          ;
          if (v1 instanceof Left) {
            return false;
          }
          ;
          throw new Error("Failed pattern match at Main (line 696, column 25 - line 707, column 42): " + [v1.constructor.name]);
        }();
        var $233 = !isChosen && (isRead && notEq2(model.thread)(new Just(mid))) || v.value0.value.deleted;
        if ($233) {
          return mempty5;
        }
        ;
        return divS([function() {
          var $234 = eq16(model.thread)(new Just(mid));
          if ($234) {
            return background(vars.accent1);
          }
          ;
          return mempty5;
        }(), following([borderTop("1px solid")]), padding(".3em"), whiteSpace("pre-wrap"), overflow("auto")])([onNotSelectingClick(new SelectThread(mid))])([spanS([function() {
          var $235 = eq7(v.value0.value.authorId)(model.userId) || isRead;
          if ($235) {
            return mempty5;
          }
          ;
          return color("#ff4040");
        }()])([])([text2(v.value0.value.content)])]);
      }
      ;
      if (v instanceof Nothing) {
        return mempty5;
      }
      ;
      throw new Error("Failed pattern match at Main (line 691, column 17 - line 737, column 36): " + [v.constructor.name]);
    }(lookup6(mid)(model.events.folded.messages));
  }))]);
};
var nameChanger = function(model) {
  return divS([margin(".3em")])([])([inputS([inputStyles2])([value3(model.nameInput), onInput3(UpdateNameInput.create)]), buttonS([marginLeft("5px")])([onClick2(UpdateName.value)])([text2("Update Name")])]);
};
var makeAudioUrl = function(name4) {
  return "https://www.myinstants.com/media/sounds/" + (name4 + ".mp3");
};
var getParent = function(v) {
  return function(tm) {
    return mapFlipped13(bind14(bind14(lookup6(v.id)(tm))(function(v1) {
      return v1.parent;
    }))(applySecond2(lookup6)(tm)))(function(v1) {
      return v1.value;
    });
  };
};
var getName = function(id5) {
  return function(names) {
    return fromMaybe("<anonymous>")(lookup1(id5)(names));
  };
};
var getItem = /* @__PURE__ */ function() {
  return getItemImpl(Nothing.value)(Just.create);
}();
var formatTimeDiff = function(iOld) {
  return function(iNew) {
    var show$prime = function(time) {
      return function(label) {
        return show6(round2(time)) + label;
      };
    };
    var seconds = (asMilliseconds(iNew) - asMilliseconds(iOld)) / 1e3;
    var $247 = round2(seconds) < 120;
    if ($247) {
      return show$prime(seconds)("s");
    }
    ;
    var minutes = seconds / 60;
    var $248 = round2(minutes) < 120;
    if ($248) {
      return show$prime(minutes)("m");
    }
    ;
    var hours = minutes / 60;
    var $249 = hours < 48;
    if ($249) {
      return show$prime(hours)("h");
    }
    ;
    var days = hours / 24;
    var $250 = days < 14;
    if ($250) {
      return show$prime(days)("d");
    }
    ;
    return show$prime(days / 7)("w");
  };
};
var foldEvents = function($343) {
  return function(events) {
    return {
      names: foldl12(function(acc) {
        return function(v) {
          return insert1(v.userId)(v.name)(acc);
        };
      })(empty2)(events.setName),
      messages: function() {
        var initialTM = toTreeMap2(mapFlipped22(events.messageSend)(function($344) {
          return toIVP(function(v) {
            return v.message;
          }($344));
        }));
        return applySecond2(foldl12(function(acc) {
          return function(v) {
            return edit2(v.messageId)(function(vpc) {
              return {
                value: {
                  content: v.content,
                  authorId: vpc.value.authorId,
                  convoId: vpc.value.convoId,
                  deleted: vpc.value.deleted,
                  depIds: vpc.value.depIds,
                  id: vpc.value.id,
                  timeSent: vpc.value.timeSent
                },
                parent: vpc.parent,
                children: vpc.children
              };
            })(acc);
          };
        }))(events.messageEdit)(foldl12(function(acc) {
          return function(v) {
            return removeLeafRecursive2(function($345) {
              return function(v1) {
                return v1.deleted;
              }(function(v1) {
                return v1.value;
              }($345));
            })(v.messageId)(edit2(v.messageId)(function(vpc) {
              return {
                value: {
                  deleted: true,
                  authorId: vpc.value.authorId,
                  content: vpc.value.content,
                  convoId: vpc.value.convoId,
                  depIds: vpc.value.depIds,
                  id: vpc.value.id,
                  timeSent: vpc.value.timeSent
                },
                parent: vpc.parent,
                children: vpc.children
              };
            })(acc));
          };
        })(initialTM)(events.messageDelete));
      }(),
      read: foldl12(function(acc) {
        return function(v) {
          if (v.readState) {
            return insert7(new Tuple(v.userId, v.messageId))(acc);
          }
          ;
          return acc;
        };
      })(empty4)(events.setReadState)
    };
  }(splitEvents($343));
};
var focusHandler = function(v) {
  return pure16(new Just(Focused.value));
};
var subscriptions = function(model) {
  return batch([wsToSub(transmissionReceived)(model.wsClient), on7("keydown")(hitEnter), on7("focus")(focusHandler)]);
};
var eventTime = function(v) {
  return v.time;
};
var createMessage = function(model) {
  return function(isSibling) {
    return function(styles) {
      return function(mes) {
        return divS([following([borderBottom("1px solid")]), position("relative"), padding("3px .25em 6px .25em"), styles, function() {
          var $265 = eq16(model.messageParent)(new Just(mes.id)) && notEq2(model.messageParent)(model.thread);
          if ($265) {
            return background("#000066");
          }
          ;
          return mempty5;
        }()])([onNotSelectingClick(function() {
          if (isSibling) {
            return SelectSibling.create;
          }
          ;
          return SelectMessageParent.create;
        }()(mes.id))])([function() {
          if (mes.deleted) {
            return mempty5;
          }
          ;
          return divS([font("0.72em sans-serif"), opacity("0.6"), marginBottom("0.7em")])([])([text2(getName(mes.authorId)(model.events.folded.names)), function(v) {
            if (v instanceof Just) {
              return spanS([marginLeft("12px")])([title2(dateString(asMilliseconds(mes.timeSent)))])([text2(v.value0)]);
            }
            ;
            if (v instanceof Nothing) {
              return mempty5;
            }
            ;
            throw new Error("Failed pattern match at Main (line 773, column 15 - line 782, column 34): " + [v.constructor.name]);
          }(mapFlipped13(getParent(mes)(model.events.folded.messages))(applySecond2(function($346) {
            return formatTimeDiff(function(v) {
              return v.timeSent;
            }($346));
          })(mes.timeSent)))]);
        }(), divS([whiteSpace("pre-wrap"), position("relative"), overflowX("auto"), marginTop("3px")])([])([text2(function() {
          if (mes.deleted) {
            return "(deleted)";
          }
          ;
          return mes.content;
        }())])]);
      };
    };
  };
};
var threadView = function(model) {
  var mthread = bind14(model.thread)(applySecond2(getThread2)(model.events.folded.messages));
  var messageList = function() {
    var $347 = map26(function(v) {
      return batch(reverse(snoc(mapFlipped10(v.value1)(createMessage(model)(true)(background(vars.lighterBackground22))))(createMessage(model)(false)(background(vars.background))(v.value0))));
    });
    return function($348) {
      return function(messagesHtml) {
        return divS([borderJ([vars.borderWidth1, "solid"]), overflow("auto"), display("flex"), flexDirection("column-reverse"), width2(calc(sub2("100%")(vars.borderWidth1)))])([])(messagesHtml);
      }($347(fromFoldable8($348)));
    };
  }();
  var messageInput = divS([display("flex"), width2(calc(add5("100%")(vars.borderWidth1)))])([])([html(model), button3([onClick2(SendMessage.value)])([text2("Send")])]);
  return keyedS("div")([panel, transform(translateX(calc(sub2("0px")(vars.borderWidth1))))])([])([new Tuple("message list", maybe(mempty5)(messageList)(mthread)), new Tuple("reply", function() {
    var $274 = eq16(model.messageParent)(model.thread);
    if ($274) {
      return mempty5;
    }
    ;
    return fromMaybe(mempty5)(bind14(model.messageParent)(function(id5) {
      return bind14(lookup6(id5)(model.events.folded.messages))(function(v) {
        return pure24(createMessage(model)(false)(mempty5)(v.value));
      });
    }));
  }()), new Tuple("input", messageInput)]);
};
var view = function(model) {
  return {
    head: [title3("\u2144" + function() {
      if (model.unread) {
        return " (unread messages)";
      }
      ;
      return "";
    }())],
    body: [staticStyles, divS([display("grid"), grid("100vh / min(30%, 350px) 1fr")])([])([divS([panel])([])([nameChanger(model), divS([margin(".3em")])([])([text2("Notification Sound "), inputS([inputStyles2])([value3(model.notificationSound), onInput3(UpdateNotificationSound.create)])]), threadBar(model)]), threadView(model)])]
  };
};
var audioLSKey = "notification-sound";
var init3 = function(v) {
  return discard1(liftEffect4(notificationsPermission))(function() {
    return bind24(liftEffect4(function __do2() {
      var v1 = liftEffect1(lift23(Tuple.create)(new1)(new2))();
      return initialize_f(function(idStr1) {
        return function(idStr2) {
          var v2 = lift21(Tuple.create)(parse2(idStr1))(parse1(idStr2));
          if (v2 instanceof Right) {
            return v2.value0;
          }
          ;
          if (v2 instanceof Left) {
            return unsafeThrow(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Main (line 87, column 10 - line 89, column 43): " + [v2.constructor.name]);
        };
      })(format2(v1.value0))(format1(v1.value1))();
    }))(function(v1) {
      return bind24(liftEffect4(newConnection({
        url: "wss://y.maynards.site:8081"
      })))(function(wsClient) {
        return discard1(tell3(function(msgCallback) {
          return onOpen(msgCallback(WebSocketOpened.value))(wsClient);
        }))(function() {
          return bind24(mapFlipped32(liftEffect4(getItem(audioLSKey)))(fromMaybe("")))(function(notificationSound) {
            return pure15({
              convoId: v1.value1,
              userId: v1.value0,
              wsClient,
              events: {
                raw: [],
                folded: {
                  names: empty2,
                  messages: empty5,
                  read: empty4
                }
              },
              inputBox: $$default,
              thread: Nothing.value,
              messageParent: Nothing.value,
              nameInput: "",
              unread: false,
              notificationSound
            });
          });
        });
      });
    });
  });
};
var addEvents = function(events) {
  return function(newEvents) {
    var sortedEvents = sortWith2(eventTime)(newEvents);
    var potentialFinalArray = append14(events)(sortedEvents);
    var oldEnd = mapFlipped13(unsnoc(events))(function(v) {
      return v.last;
    });
    var newHead = mapFlipped13(uncons(sortedEvents))(function(v) {
      return v.head;
    });
    if (oldEnd instanceof Just && newHead instanceof Just) {
      var $289 = lessThanOrEq1(oldEnd.value0.time)(newHead.value0.time);
      if ($289) {
        return potentialFinalArray;
      }
      ;
      return sortWith2(eventTime)(potentialFinalArray);
    }
    ;
    return potentialFinalArray;
  };
};
var update2 = /* @__PURE__ */ infuse(function(v) {
  return function(v1) {
    return {
      inputBox: v1,
      convoId: v.convoId,
      userId: v.userId,
      notificationSound: v.notificationSound,
      unread: v.unread,
      events: v.events,
      messageParent: v.messageParent,
      nameInput: v.nameInput,
      thread: v.thread,
      wsClient: v.wsClient
    };
  };
})(function(v) {
  var v1 = log2(v);
  return function(v2) {
    if (v2 instanceof UpdateNotificationSound) {
      return discard1(liftEffect4(setItem(audioLSKey)(v2.value0)))(function() {
        return pure15({
          notificationSound: v2.value0,
          convoId: v.convoId,
          inputBox: v.inputBox,
          userId: v.userId,
          unread: v.unread,
          events: v.events,
          messageParent: v.messageParent,
          nameInput: v.nameInput,
          thread: v.thread,
          wsClient: v.wsClient
        });
      });
    }
    ;
    if (v2 instanceof Undo) {
      return pure15({
        inputBox: undo(v.inputBox),
        convoId: v.convoId,
        userId: v.userId,
        notificationSound: v.notificationSound,
        unread: v.unread,
        events: v.events,
        messageParent: v.messageParent,
        nameInput: v.nameInput,
        thread: v.thread,
        wsClient: v.wsClient
      });
    }
    ;
    if (v2 instanceof Focused) {
      return pure15({
        unread: false,
        convoId: v.convoId,
        inputBox: v.inputBox,
        notificationSound: v.notificationSound,
        userId: v.userId,
        events: v.events,
        messageParent: v.messageParent,
        nameInput: v.nameInput,
        thread: v.thread,
        wsClient: v.wsClient
      });
    }
    ;
    if (v2 instanceof SelectSibling) {
      return discard1(focusInput)(function() {
        return bind24(pushReadEvent(v)(v2.value0))(function(model22) {
          return pure15({
            messageParent: new Just(v2.value0),
            thread: findLeaf2(v2.value0)(v.events.folded.messages),
            convoId: model22.convoId,
            events: model22.events,
            inputBox: model22.inputBox,
            nameInput: model22.nameInput,
            notificationSound: model22.notificationSound,
            unread: model22.unread,
            userId: model22.userId,
            wsClient: model22.wsClient
          });
        });
      });
    }
    ;
    if (v2 instanceof UpdateName) {
      return discard1(liftEffect4(pushEvent(v)(function(v3) {
        return new EventPayload_SetName2({
          convoId: v.convoId,
          userId: v.userId,
          name: v.nameInput
        });
      })))(function() {
        return pure15(v);
      });
    }
    ;
    if (v2 instanceof UpdateNameInput) {
      return pure15({
        nameInput: v2.value0,
        convoId: v.convoId,
        events: v.events,
        inputBox: v.inputBox,
        messageParent: v.messageParent,
        notificationSound: v.notificationSound,
        thread: v.thread,
        unread: v.unread,
        userId: v.userId,
        wsClient: v.wsClient
      });
    }
    ;
    if (v2 instanceof SelectMessageParent) {
      return discard1(focusInput)(function() {
        return pure15({
          messageParent: new Just(v2.value0),
          convoId: v.convoId,
          events: v.events,
          inputBox: v.inputBox,
          nameInput: v.nameInput,
          notificationSound: v.notificationSound,
          thread: v.thread,
          unread: v.unread,
          userId: v.userId,
          wsClient: v.wsClient
        });
      });
    }
    ;
    if (v2 instanceof NewThread) {
      return discard1(focusInput)(function() {
        return pure15({
          thread: Nothing.value,
          messageParent: Nothing.value,
          convoId: v.convoId,
          events: v.events,
          inputBox: v.inputBox,
          nameInput: v.nameInput,
          notificationSound: v.notificationSound,
          unread: v.unread,
          userId: v.userId,
          wsClient: v.wsClient
        });
      });
    }
    ;
    if (v2 instanceof SelectThread) {
      return discard1(focusInput)(function() {
        return bind24(pushReadEvent(v)(v2.value0))(function(model22) {
          return pure15({
            thread: new Just(v2.value0),
            messageParent: new Just(v2.value0),
            convoId: model22.convoId,
            events: model22.events,
            inputBox: model22.inputBox,
            nameInput: model22.nameInput,
            notificationSound: model22.notificationSound,
            unread: model22.unread,
            userId: model22.userId,
            wsClient: model22.wsClient
          });
        });
      });
    }
    ;
    if (v2 instanceof SendMessage) {
      return discard1(focusInput)(function() {
        var errorMsg = {
          inputBox: setContentAndCursor("You didn't send that message!")(v.inputBox),
          convoId: v.convoId,
          userId: v.userId,
          notificationSound: v.notificationSound,
          unread: v.unread,
          events: v.events,
          messageParent: v.messageParent,
          nameInput: v.nameInput,
          thread: v.thread,
          wsClient: v.wsClient
        };
        var content2 = content(v.inputBox);
        var $299 = content2 === "";
        if ($299) {
          return pure15(v);
        }
        ;
        var $300 = content2 === "/delete";
        if ($300) {
          return fromMaybe(pure15(v))(bind14(v.messageParent)(function(mid) {
            return bind14(lookup6(mid)(v.events.folded.messages))(function(v3) {
              return new Just(function() {
                var $302 = eq7(v3.value.authorId)(v.userId);
                if ($302) {
                  return discard1(liftEffect4(pushEvent(v)(function(v4) {
                    return new EventPayload_MessageDelete2({
                      convoId: v.convoId,
                      userId: v.userId,
                      messageId: v3.value.id
                    });
                  })))(function() {
                    return pure15({
                      inputBox: $$default,
                      convoId: v.convoId,
                      userId: v.userId,
                      notificationSound: v.notificationSound,
                      unread: v.unread,
                      events: v.events,
                      messageParent: v.messageParent,
                      nameInput: v.nameInput,
                      thread: v.thread,
                      wsClient: v.wsClient
                    });
                  });
                }
                ;
                return pure15(errorMsg);
              }());
            });
          }));
        }
        ;
        var $304 = startsWith("/edit ")(content2);
        if ($304) {
          return fromMaybe(pure15(v))(bind14(v.messageParent)(function(mid) {
            return bind14(lookup6(mid)(v.events.folded.messages))(function(v3) {
              return new Just(function() {
                var $306 = eq7(v3.value.authorId)(v.userId);
                if ($306) {
                  return discard1(liftEffect4(pushEvent(v)(function(v4) {
                    return new EventPayload_MessageEdit2({
                      convoId: v.convoId,
                      messageId: v3.value.id,
                      authorId: v.userId,
                      content: drop4(6)(content2)
                    });
                  })))(function() {
                    return pure15({
                      inputBox: reset(v.inputBox),
                      convoId: v.convoId,
                      userId: v.userId,
                      notificationSound: v.notificationSound,
                      unread: v.unread,
                      events: v.events,
                      messageParent: v.messageParent,
                      nameInput: v.nameInput,
                      thread: v.thread,
                      wsClient: v.wsClient
                    });
                  });
                }
                ;
                return pure15(errorMsg);
              }());
            });
          }));
        }
        ;
        return bind24(liftEffect4(new3))(function(v3) {
          return discard1(liftEffect4(pushEvent(v)(function(instant) {
            return new EventPayload_MessageSend2({
              convoId: v.convoId,
              message: {
                id: v3,
                timeSent: instant,
                authorId: v.userId,
                convoId: v.convoId,
                deleted: false,
                depIds: fromMaybe(mempty12)(mapFlipped13(v.messageParent)(singleton7)),
                content: content(v.inputBox)
              }
            });
          })))(function() {
            return pure15({
              inputBox: reset(v.inputBox),
              messageParent: new Just(v3),
              thread: function() {
                if (v.thread instanceof Nothing) {
                  return new Just(v3);
                }
                ;
                return v.thread;
              }(),
              convoId: v.convoId,
              events: v.events,
              nameInput: v.nameInput,
              notificationSound: v.notificationSound,
              unread: v.unread,
              userId: v.userId,
              wsClient: v.wsClient
            });
          });
        });
      });
    }
    ;
    if (v2 instanceof UpdateInputBox) {
      var model2 = {
        inputBox: setHeight2(v2.value1)(v.inputBox),
        convoId: v.convoId,
        userId: v.userId,
        notificationSound: v.notificationSound,
        unread: v.unread,
        events: v.events,
        messageParent: v.messageParent,
        nameInput: v.nameInput,
        thread: v.thread,
        wsClient: v.wsClient
      };
      if (v2.value0 instanceof Just) {
        return pure15(fromMaybe(model2)(bind14(model2.messageParent)(function(mid) {
          return bind14(lookup6(mid)(model2.events.folded.messages))(function(v3) {
            return new Just(function() {
              if (v3.value.deleted) {
                return model2;
              }
              ;
              return {
                inputBox: setContentAndCursor("/edit " + v3.value.content)(v.inputBox),
                convoId: model2.convoId,
                userId: model2.userId,
                notificationSound: model2.notificationSound,
                unread: model2.unread,
                events: model2.events,
                messageParent: model2.messageParent,
                nameInput: model2.nameInput,
                thread: model2.thread,
                wsClient: model2.wsClient
              };
            }());
          });
        })));
      }
      ;
      if (v2.value0 instanceof Nothing) {
        return pure15(model2);
      }
      ;
      throw new Error("Failed pattern match at Main (line 291, column 11 - line 312, column 35): " + [v2.value0.constructor.name]);
    }
    ;
    if (v2 instanceof TransmissionReceived) {
      if (v2.value0 instanceof Just) {
        return bind24(liftEffect4(hasFocus))(function(focused) {
          var newEvents = addEvents(v.events.raw)(v2.value0.value0.value0);
          var folded = foldEvents(newEvents);
          var newLeaf = applySecond2(applySecond2(findNewLeaf2)(v.events.folded.messages))(folded.messages);
          var newThread = bindFlipped2(newLeaf)(v.thread);
          var model22 = {
            events: {
              raw: newEvents,
              folded
            },
            nameInput: function() {
              var $319 = v.nameInput === "";
              if ($319) {
                return fromMaybe("")(lookup1(v.userId)(folded.names));
              }
              ;
              return v.nameInput;
            }(),
            messageParent: function() {
              if (v.messageParent instanceof Just) {
                var $321 = content(v.inputBox) === "" && isLeaf2(v.messageParent.value0)(v.events.folded.messages);
                if ($321) {
                  return newThread;
                }
                ;
                var v4 = mapFlipped13(v.messageParent)(applySecond2(member1)(folded.messages));
                if (v4 instanceof Just && !v4.value0) {
                  return bindFlipped2(newLeaf)(v.messageParent);
                }
                ;
                return v.messageParent;
              }
              ;
              if (v.messageParent instanceof Nothing) {
                return Nothing.value;
              }
              ;
              throw new Error("Failed pattern match at Main (line 350, column 25 - line 361, column 45): " + [v.messageParent.constructor.name]);
            }(),
            thread: newThread,
            unread: function() {
              if (focused) {
                return false;
              }
              ;
              return true;
            }(),
            convoId: v.convoId,
            inputBox: v.inputBox,
            notificationSound: v.notificationSound,
            userId: v.userId,
            wsClient: v.wsClient
          };
          var firstMessage = mapFlipped13(head(function(v3) {
            return v3.messageSend;
          }(splitEvents(v2.value0.value0.value0))))(function(v3) {
            return v3.message;
          });
          return bind24(function() {
            if (newThread instanceof Just) {
              return pushReadEvent(model22)(newThread.value0);
            }
            ;
            if (newThread instanceof Nothing) {
              return pure15(model22);
            }
            ;
            throw new Error("Failed pattern match at Main (line 374, column 17 - line 376, column 41): " + [newThread.constructor.name]);
          }())(function(model3) {
            return discard1(function() {
              if (firstMessage instanceof Just) {
                var $329 = eq7(firstMessage.value0.authorId)(v.userId);
                if ($329) {
                  return fromMaybe(pure15(unit))(bind14(v.messageParent)(function(mid) {
                    return bind14(lookup6(mid)(model3.events.folded.messages))(function(v3) {
                      return new Just(function() {
                        if (v3.parent instanceof Just) {
                          return pure15(unit);
                        }
                        ;
                        if (v3.parent instanceof Nothing) {
                          return focusInput;
                        }
                        ;
                        throw new Error("Failed pattern match at Main (line 386, column 26 - line 388, column 49): " + [v3.parent.constructor.name]);
                      }());
                    });
                  }));
                }
                ;
                return liftEffect4(sendNotification(v.notificationSound !== "")(makeAudioUrl(v.notificationSound))(getName(firstMessage.value0.authorId)(model3.events.folded.names))(firstMessage.value0.content));
              }
              ;
              if (firstMessage instanceof Nothing) {
                return pure15(unit);
              }
              ;
              throw new Error("Failed pattern match at Main (line 378, column 15 - line 399, column 37): " + [firstMessage.constructor.name]);
            }())(function() {
              return pure15(model3);
            });
          });
        });
      }
      ;
      if (v2.value0 instanceof Nothing) {
        return pure15(v);
      }
      ;
      throw new Error("Failed pattern match at Main (line 315, column 11 - line 403, column 34): " + [v2.value0.constructor.name]);
    }
    ;
    if (v2 instanceof WebSocketOpened) {
      return discard1(liftEffect4(function __do2() {
        transmit2(new ToServer_Hello({
          userId: v.userId
        }))(v.wsClient)();
        transmit2(toToServer(new ToServer_Subscribe2({
          userId: v.userId,
          convoId: v.convoId
        })))(v.wsClient)();
        return transmit2(toToServer(new ToServer_Pull2({
          convoId: v.convoId
        })))(v.wsClient)();
      }))(function() {
        return pure15(v);
      });
    }
    ;
    throw new Error("Failed pattern match at Main (line 133, column 7 - line 416, column 21): " + [v2.constructor.name]);
  };
});
var main = /* @__PURE__ */ app({
  init: init3,
  update: update2,
  view,
  subscriptions
});

// <stdin>
main();
