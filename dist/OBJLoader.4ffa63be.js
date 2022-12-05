// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"public/loaders/OBJLoader.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
(function () {
  var _object_pattern = /^[og]\s*(.+)?/; // mtllib file_reference

  var _material_library_pattern = /^mtllib /; // usemtl material_name

  var _material_use_pattern = /^usemtl /; // usemap map_name

  var _map_use_pattern = /^usemap /;
  var _face_vertex_data_separator_pattern = /\s+/;
  var _vA = new THREE.Vector3();
  var _vB = new THREE.Vector3();
  var _vC = new THREE.Vector3();
  var _ab = new THREE.Vector3();
  var _cb = new THREE.Vector3();
  var _color = new THREE.Color();
  function ParserState() {
    var state = {
      objects: [],
      object: {},
      vertices: [],
      normals: [],
      colors: [],
      uvs: [],
      materials: {},
      materialLibraries: [],
      startObject: function startObject(name, fromDeclaration) {
        // If the current object (initial from reset) is not from a g/o declaration in the parsed
        // file. We need to use it for the first parsed g/o to keep things in sync.
        if (this.object && this.object.fromDeclaration === false) {
          this.object.name = name;
          this.object.fromDeclaration = fromDeclaration !== false;
          return;
        }
        var previousMaterial = this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined;
        if (this.object && typeof this.object._finalize === 'function') {
          this.object._finalize(true);
        }
        this.object = {
          name: name || '',
          fromDeclaration: fromDeclaration !== false,
          geometry: {
            vertices: [],
            normals: [],
            colors: [],
            uvs: [],
            hasUVIndices: false
          },
          materials: [],
          smooth: true,
          startMaterial: function startMaterial(name, libraries) {
            var previous = this._finalize(false); // New usemtl declaration overwrites an inherited material, except if faces were declared
            // after the material, then it must be preserved for proper MultiMaterial continuation.

            if (previous && (previous.inherited || previous.groupCount <= 0)) {
              this.materials.splice(previous.index, 1);
            }
            var material = {
              index: this.materials.length,
              name: name || '',
              mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : '',
              smooth: previous !== undefined ? previous.smooth : this.smooth,
              groupStart: previous !== undefined ? previous.groupEnd : 0,
              groupEnd: -1,
              groupCount: -1,
              inherited: false,
              clone: function clone(index) {
                var cloned = {
                  index: typeof index === 'number' ? index : this.index,
                  name: this.name,
                  mtllib: this.mtllib,
                  smooth: this.smooth,
                  groupStart: 0,
                  groupEnd: -1,
                  groupCount: -1,
                  inherited: false
                };
                cloned.clone = this.clone.bind(cloned);
                return cloned;
              }
            };
            this.materials.push(material);
            return material;
          },
          currentMaterial: function currentMaterial() {
            if (this.materials.length > 0) {
              return this.materials[this.materials.length - 1];
            }
            return undefined;
          },
          _finalize: function _finalize(end) {
            var lastMultiMaterial = this.currentMaterial();
            if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
              lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
              lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
              lastMultiMaterial.inherited = false;
            } // Ignore objects tail materials if no face declarations followed them before a new o/g started.

            if (end && this.materials.length > 1) {
              for (var mi = this.materials.length - 1; mi >= 0; mi--) {
                if (this.materials[mi].groupCount <= 0) {
                  this.materials.splice(mi, 1);
                }
              }
            } // Guarantee at least one empty material, this makes the creation later more straight forward.

            if (end && this.materials.length === 0) {
              this.materials.push({
                name: '',
                smooth: this.smooth
              });
            }
            return lastMultiMaterial;
          }
        }; // Inherit previous objects material.
        // Spec tells us that a declared material must be set to all objects until a new material is declared.
        // If a usemtl declaration is encountered while this new object is being parsed, it will
        // overwrite the inherited material. Exception being that there was already face declarations
        // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

        if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {
          var declared = previousMaterial.clone(0);
          declared.inherited = true;
          this.object.materials.push(declared);
        }
        this.objects.push(this.object);
      },
      finalize: function finalize() {
        if (this.object && typeof this.object._finalize === 'function') {
          this.object._finalize(true);
        }
      },
      parseVertexIndex: function parseVertexIndex(value, len) {
        var index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;
      },
      parseNormalIndex: function parseNormalIndex(value, len) {
        var index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;
      },
      parseUVIndex: function parseUVIndex(value, len) {
        var index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 2) * 2;
      },
      addVertex: function addVertex(a, b, c) {
        var src = this.vertices;
        var dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
      },
      addVertexPoint: function addVertexPoint(a) {
        var src = this.vertices;
        var dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
      },
      addVertexLine: function addVertexLine(a) {
        var src = this.vertices;
        var dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
      },
      addNormal: function addNormal(a, b, c) {
        var src = this.normals;
        var dst = this.object.geometry.normals;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
      },
      addFaceNormal: function addFaceNormal(a, b, c) {
        var src = this.vertices;
        var dst = this.object.geometry.normals;
        _vA.fromArray(src, a);
        _vB.fromArray(src, b);
        _vC.fromArray(src, c);
        _cb.subVectors(_vC, _vB);
        _ab.subVectors(_vA, _vB);
        _cb.cross(_ab);
        _cb.normalize();
        dst.push(_cb.x, _cb.y, _cb.z);
        dst.push(_cb.x, _cb.y, _cb.z);
        dst.push(_cb.x, _cb.y, _cb.z);
      },
      addColor: function addColor(a, b, c) {
        var src = this.colors;
        var dst = this.object.geometry.colors;
        if (src[a] !== undefined) dst.push(src[a + 0], src[a + 1], src[a + 2]);
        if (src[b] !== undefined) dst.push(src[b + 0], src[b + 1], src[b + 2]);
        if (src[c] !== undefined) dst.push(src[c + 0], src[c + 1], src[c + 2]);
      },
      addUV: function addUV(a, b, c) {
        var src = this.uvs;
        var dst = this.object.geometry.uvs;
        dst.push(src[a + 0], src[a + 1]);
        dst.push(src[b + 0], src[b + 1]);
        dst.push(src[c + 0], src[c + 1]);
      },
      addDefaultUV: function addDefaultUV() {
        var dst = this.object.geometry.uvs;
        dst.push(0, 0);
        dst.push(0, 0);
        dst.push(0, 0);
      },
      addUVLine: function addUVLine(a) {
        var src = this.uvs;
        var dst = this.object.geometry.uvs;
        dst.push(src[a + 0], src[a + 1]);
      },
      addFace: function addFace(a, b, c, ua, ub, uc, na, nb, nc) {
        var vLen = this.vertices.length;
        var ia = this.parseVertexIndex(a, vLen);
        var ib = this.parseVertexIndex(b, vLen);
        var ic = this.parseVertexIndex(c, vLen);
        this.addVertex(ia, ib, ic);
        this.addColor(ia, ib, ic); // normals

        if (na !== undefined && na !== '') {
          var nLen = this.normals.length;
          ia = this.parseNormalIndex(na, nLen);
          ib = this.parseNormalIndex(nb, nLen);
          ic = this.parseNormalIndex(nc, nLen);
          this.addNormal(ia, ib, ic);
        } else {
          this.addFaceNormal(ia, ib, ic);
        } // uvs

        if (ua !== undefined && ua !== '') {
          var uvLen = this.uvs.length;
          ia = this.parseUVIndex(ua, uvLen);
          ib = this.parseUVIndex(ub, uvLen);
          ic = this.parseUVIndex(uc, uvLen);
          this.addUV(ia, ib, ic);
          this.object.geometry.hasUVIndices = true;
        } else {
          // add placeholder values (for inconsistent face definitions)
          this.addDefaultUV();
        }
      },
      addPointGeometry: function addPointGeometry(vertices) {
        this.object.geometry.type = 'Points';
        var vLen = this.vertices.length;
        for (var vi = 0, l = vertices.length; vi < l; vi++) {
          var index = this.parseVertexIndex(vertices[vi], vLen);
          this.addVertexPoint(index);
          this.addColor(index);
        }
      },
      addLineGeometry: function addLineGeometry(vertices, uvs) {
        this.object.geometry.type = 'Line';
        var vLen = this.vertices.length;
        var uvLen = this.uvs.length;
        for (var vi = 0, l = vertices.length; vi < l; vi++) {
          this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
        }
        for (var uvi = 0, _l = uvs.length; uvi < _l; uvi++) {
          this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
        }
      }
    };
    state.startObject('', false);
    return state;
  } //
  var OBJLoader = /*#__PURE__*/function (_THREE$Loader) {
    _inherits(OBJLoader, _THREE$Loader);
    var _super = _createSuper(OBJLoader);
    function OBJLoader(manager) {
      var _this;
      _classCallCheck(this, OBJLoader);
      _this = _super.call(this, manager);
      _this.materials = null;
      return _this;
    }
    _createClass(OBJLoader, [{
      key: "load",
      value: function load(url, onLoad, onProgress, onError) {
        var scope = this;
        var loader = new THREE.FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, function (text) {
          try {
            onLoad(scope.parse(text));
          } catch (e) {
            if (onError) {
              onError(e);
            } else {
              console.error(e);
            }
            scope.manager.itemError(url);
          }
        }, onProgress, onError);
      }
    }, {
      key: "setMaterials",
      value: function setMaterials(materials) {
        this.materials = materials;
        return this;
      }
    }, {
      key: "parse",
      value: function parse(text) {
        var state = new ParserState();
        if (text.indexOf('\r\n') !== -1) {
          // This is faster than String.split with regex that splits on both
          text = text.replace(/\r\n/g, '\n');
        }
        if (text.indexOf('\\\n') !== -1) {
          // join lines separated by a line continuation character (\)
          text = text.replace(/\\\n/g, '');
        }
        var lines = text.split('\n');
        var result = [];
        for (var i = 0, l = lines.length; i < l; i++) {
          var line = lines[i].trimStart();
          if (line.length === 0) continue;
          var lineFirstChar = line.charAt(0); // @todo invoke passed in handler if any

          if (lineFirstChar === '#') continue;
          if (lineFirstChar === 'v') {
            var data = line.split(_face_vertex_data_separator_pattern);
            switch (data[0]) {
              case 'v':
                state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
                if (data.length >= 7) {
                  _color.setRGB(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6])).convertSRGBToLinear();
                  state.colors.push(_color.r, _color.g, _color.b);
                } else {
                  // if no colors are defined, add placeholders so color and vertex indices match
                  state.colors.push(undefined, undefined, undefined);
                }
                break;
              case 'vn':
                state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
                break;
              case 'vt':
                state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
                break;
            }
          } else if (lineFirstChar === 'f') {
            var lineData = line.slice(1).trim();
            var vertexData = lineData.split(_face_vertex_data_separator_pattern);
            var faceVertices = []; // Parse the face vertex data into an easy to work with format

            for (var j = 0, jl = vertexData.length; j < jl; j++) {
              var vertex = vertexData[j];
              if (vertex.length > 0) {
                var vertexParts = vertex.split('/');
                faceVertices.push(vertexParts);
              }
            } // Draw an edge between the first vertex and all subsequent vertices to form an n-gon

            var v1 = faceVertices[0];
            for (var _j = 1, _jl = faceVertices.length - 1; _j < _jl; _j++) {
              var v2 = faceVertices[_j];
              var v3 = faceVertices[_j + 1];
              state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
            }
          } else if (lineFirstChar === 'l') {
            var lineParts = line.substring(1).trim().split(' ');
            var lineVertices = [];
            var lineUVs = [];
            if (line.indexOf('/') === -1) {
              lineVertices = lineParts;
            } else {
              for (var li = 0, llen = lineParts.length; li < llen; li++) {
                var parts = lineParts[li].split('/');
                if (parts[0] !== '') lineVertices.push(parts[0]);
                if (parts[1] !== '') lineUVs.push(parts[1]);
              }
            }
            state.addLineGeometry(lineVertices, lineUVs);
          } else if (lineFirstChar === 'p') {
            var _lineData = line.slice(1).trim();
            var pointData = _lineData.split(' ');
            state.addPointGeometry(pointData);
          } else if ((result = _object_pattern.exec(line)) !== null) {
            // o object_name
            // or
            // g group_name
            // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
            // let name = result[ 0 ].slice( 1 ).trim();
            var name = (' ' + result[0].slice(1).trim()).slice(1);
            state.startObject(name);
          } else if (_material_use_pattern.test(line)) {
            // material
            state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
          } else if (_material_library_pattern.test(line)) {
            // mtl file
            state.materialLibraries.push(line.substring(7).trim());
          } else if (_map_use_pattern.test(line)) {
            // the line is parsed but ignored since the loader assumes textures are defined MTL files
            // (according to https://www.okino.com/conv/imp_wave.htm, 'usemap' is the old-style Wavefront texture reference method)
            console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
          } else if (lineFirstChar === 's') {
            result = line.split(' '); // smooth shading
            // @todo Handle files that have varying smooth values for a set of faces inside one geometry,
            // but does not define a usemtl for each face set.
            // This should be detected and a dummy material created (later MultiMaterial and geometry groups).
            // This requires some care to not create extra material on each smooth value for "normal" obj files.
            // where explicit usemtl defines geometry groups.
            // Example asset: examples/models/obj/cerberus/Cerberus.obj

            /*
               	 * http://paulbourke.net/dataformats/obj/
               	 *
               	 * From chapter "Grouping" Syntax explanation "s group_number":
               	 * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
               	 * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
               	 * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
               	 * than 0."
               	 */

            if (result.length > 1) {
              var value = result[1].trim().toLowerCase();
              state.object.smooth = value !== '0' && value !== 'off';
            } else {
              // ZBrush can produce "s" lines #11707
              state.object.smooth = true;
            }
            var material = state.object.currentMaterial();
            if (material) material.smooth = state.object.smooth;
          } else {
            // Handle null terminated files without exception
            if (line === '\0') continue;
            console.warn('THREE.OBJLoader: Unexpected line: "' + line + '"');
          }
        }
        state.finalize();
        var container = new THREE.Group();
        container.materialLibraries = [].concat(state.materialLibraries);
        var hasPrimitives = !(state.objects.length === 1 && state.objects[0].geometry.vertices.length === 0);
        if (hasPrimitives === true) {
          for (var _i = 0, _l2 = state.objects.length; _i < _l2; _i++) {
            var object = state.objects[_i];
            var geometry = object.geometry;
            var materials = object.materials;
            var isLine = geometry.type === 'Line';
            var isPoints = geometry.type === 'Points';
            var hasVertexColors = false; // Skip o/g line declarations that did not follow with any faces

            if (geometry.vertices.length === 0) continue;
            var buffergeometry = new THREE.BufferGeometry();
            buffergeometry.setAttribute('position', new THREE.Float32BufferAttribute(geometry.vertices, 3));
            if (geometry.normals.length > 0) {
              buffergeometry.setAttribute('normal', new THREE.Float32BufferAttribute(geometry.normals, 3));
            }
            if (geometry.colors.length > 0) {
              hasVertexColors = true;
              buffergeometry.setAttribute('color', new THREE.Float32BufferAttribute(geometry.colors, 3));
            }
            if (geometry.hasUVIndices === true) {
              buffergeometry.setAttribute('uv', new THREE.Float32BufferAttribute(geometry.uvs, 2));
            } // Create materials

            var createdMaterials = [];
            for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {
              var sourceMaterial = materials[mi];
              var materialHash = sourceMaterial.name + '_' + sourceMaterial.smooth + '_' + hasVertexColors;
              var _material = state.materials[materialHash];
              if (this.materials !== null) {
                _material = this.materials.create(sourceMaterial.name); // mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.

                if (isLine && _material && !(_material instanceof THREE.LineBasicMaterial)) {
                  var materialLine = new THREE.LineBasicMaterial();
                  THREE.Material.prototype.copy.call(materialLine, _material);
                  materialLine.color.copy(_material.color);
                  _material = materialLine;
                } else if (isPoints && _material && !(_material instanceof THREE.PointsMaterial)) {
                  var materialPoints = new THREE.PointsMaterial({
                    size: 10,
                    sizeAttenuation: false
                  });
                  THREE.Material.prototype.copy.call(materialPoints, _material);
                  materialPoints.color.copy(_material.color);
                  materialPoints.map = _material.map;
                  _material = materialPoints;
                }
              }
              if (_material === undefined) {
                if (isLine) {
                  _material = new THREE.LineBasicMaterial();
                } else if (isPoints) {
                  _material = new THREE.PointsMaterial({
                    size: 1,
                    sizeAttenuation: false
                  });
                } else {
                  _material = new THREE.MeshPhongMaterial();
                }
                _material.name = sourceMaterial.name;
                _material.flatShading = sourceMaterial.smooth ? false : true;
                _material.vertexColors = hasVertexColors;
                state.materials[materialHash] = _material;
              }
              createdMaterials.push(_material);
            } // Create mesh

            var mesh = void 0;
            if (createdMaterials.length > 1) {
              for (var _mi = 0, _miLen = materials.length; _mi < _miLen; _mi++) {
                var _sourceMaterial = materials[_mi];
                buffergeometry.addGroup(_sourceMaterial.groupStart, _sourceMaterial.groupCount, _mi);
              }
              if (isLine) {
                mesh = new THREE.LineSegments(buffergeometry, createdMaterials);
              } else if (isPoints) {
                mesh = new THREE.Points(buffergeometry, createdMaterials);
              } else {
                mesh = new THREE.Mesh(buffergeometry, createdMaterials);
              }
            } else {
              if (isLine) {
                mesh = new THREE.LineSegments(buffergeometry, createdMaterials[0]);
              } else if (isPoints) {
                mesh = new THREE.Points(buffergeometry, createdMaterials[0]);
              } else {
                mesh = new THREE.Mesh(buffergeometry, createdMaterials[0]);
              }
            }
            mesh.name = object.name;
            container.add(mesh);
          }
        } else {
          // if there is only the default parser state object with no geometry data, interpret data as point cloud
          if (state.vertices.length > 0) {
            var _material2 = new THREE.PointsMaterial({
              size: 1,
              sizeAttenuation: false
            });
            var _buffergeometry = new THREE.BufferGeometry();
            _buffergeometry.setAttribute('position', new THREE.Float32BufferAttribute(state.vertices, 3));
            if (state.colors.length > 0 && state.colors[0] !== undefined) {
              _buffergeometry.setAttribute('color', new THREE.Float32BufferAttribute(state.colors, 3));
              _material2.vertexColors = true;
            }
            var points = new THREE.Points(_buffergeometry, _material2);
            container.add(points);
          }
        }
        return container;
      }
    }]);
    return OBJLoader;
  }(THREE.Loader);
  THREE.OBJLoader = OBJLoader;
})();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58341" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","public/loaders/OBJLoader.js"], null)
//# sourceMappingURL=/OBJLoader.4ffa63be.js.map