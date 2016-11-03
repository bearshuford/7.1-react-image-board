
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var GridList = require('material-ui').GridList;
var GridTile = require('material-ui').GridTile;
var IconButton = require('material-ui').IconButton;
var Subheader = require('material-ui').Subheader;

require('backbone-react-component');


const styles = {
  root: {
    paddingTop: '70px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    overflowY: 'auto'
  }
};



var Tile = React.createClass({

  handleEdit: function(){
    this.props.handleEdit(this.props.img);
  },

  render: function(){
    var img = this.props.img;
    var self = this;
    return (
      <GridTile
        title={img.get('caption')}
        actionIcon={(
          <IconButton  onTouchTap={self.handleEdit}>
              <i className="material-icons">edit</i>
          </IconButton>)}
      >
        <img src={img.get('url')} />
      </GridTile>
    );
  }
});


var GalleryContainer = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function(){
    var coll = this.getCollection();
    var self = this;

    var tiles = coll.map(function(img) {
      return (
              <Tile
                img={img}
                key={img.get('_id') || img.cid}
                handleEdit={self.props.handleEdit}/>);
    });

    return (
      <div style={styles.root}>
        <GridList
          cols={1}
          style={styles.gridList}
        >
          {tiles}
        </GridList>
      </div>
    );
  }
});



module.exports = {
  Gallery: GalleryContainer
};
