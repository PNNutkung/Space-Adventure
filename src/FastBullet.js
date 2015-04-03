var FastBullet = Bullet.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/bullet.png' );
    },

    update: function( dt ) {
        var x = this.getPositionX();
        x += 10;
        this.setPositionX( x );
    },

    randomPosition: function() {
        var y = 10 + Math.floor( Math.random() * ( screenHeight - 10 ) );
        this.setPosition( new cc.Point( 100, y ) );
    }
});
