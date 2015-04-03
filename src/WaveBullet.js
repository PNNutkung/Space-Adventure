var WaveBullet = Bullet.extend({
    ctor: function() {
        this._super();
    },
    update: function( dt ) {
        var pos = this.getPosition();

        this.step += 1;
        this.setPosition( cc.p( pos.x + 5, pos.y + 4 * Math.sin( Math.PI * this.step / this.period ) ) );
    }
});
