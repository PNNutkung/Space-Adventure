var WaveBullet = Bullet.extend({
    update: function( dt ) {
        var pos = this.getPosition();

        this.step += 1;
        this.setPosition( cc.p( pos.x + 5, pos.y + 4 * Math.sin( Math.PI * this.step / this.period ) ) );
    },

    randomPosition: function() {
        var y = 10 + Math.floor( Math.random() * ( screenHeight - 10 ) );
        this.setPosition( new cc.Point( 100, y ) );
    }
});
