L.CouchMap = function () {
  var map;
  var active = false;
  
  var layers_enabled = {
    'nodes': false,
    'links': false
  };

  var layers = {
    'nodes': new L.CMLayerGroup( setLayer('nodes', true), setLayer('nodes', false) ),
    'links': new L.CMLayerGroup( setLayer('links', true), setLayer('links', false) )
  };

  function activate() {
    active = true;
    console.log('activate!');
  }
  
  function deactivate() {
    active = false;
    console.log('deactivate!');
  }

  function updateLayer() {
    var active_new = false;
    for (layername in layers_enabled) {
      if (layers_enabled[layername]) {
        active_new = true;
      }
    }
    if (active && !active_new) {
      deactivate();
    } else if (!active && active_new) {
      activate();
    }
  }

  function setLayer(layername, enable) { 
    return function (layermap) {
      layers_enabled[layername] = enable;
      map = layermap;
      console.log('layer '+layername+' enabled? ' + enable);
      updateLayer();
    }
  }

  this.getLayers = function() {
    return layers;
  }
  
  var marker = L.marker([51.5, -0.09]);
}

// we enhance the onAdd and onRemove functions s.t. they call the provided 
// handler onAdded and onRemoved
L.CMLayerGroup = function (onAdded, onRemoved) {
  this.onAdded = onAdded || (function () {});
  this.onRemoved = onRemoved || function () {};
  var args = Array.prototype.slice.call(arguments);
  L.LayerGroup.apply(this, args.slice(2));
}
L.CMLayerGroup.prototype = new L.LayerGroup();
L.CMLayerGroup.prototype.constructor = new L.CMLayerGroup;

L.CMLayerGroup.prototype.onAdd = function (map) {
  var ret = L.LayerGroup.prototype.onAdd.call(this, map);
  this.onAdded(this, map);
  return ret;
}

L.CMLayerGroup.prototype.onRemove = function (map) {
  var ret = L.LayerGroup.prototype.onRemove.call(this, map);
  this.onRemoved(this, map);
  return ret;
}
