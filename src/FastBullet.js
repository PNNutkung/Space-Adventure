var FastBullet = Bullet.extend({
    update: function( dt ) {
        var x = this.getPositionX();
        x += 10;
        this.setPositionX( x );
    }
});
