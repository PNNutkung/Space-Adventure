var FastBullet = Bullet.extend({
    ctor: function() {
        this._super();
    },
    update: function( dt ) {
        var x = this.getPositionX();
        x += 10;
        this.setPositionX( x );
    }
});
