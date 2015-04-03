var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 0, 0, 0, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.ship = new Ship();
        this.ship.setPosition( new cc.Point( 700, 300 ) );
        this.addChild( this.ship );

        this.bullets = [];
        for ( var i = 0; i < 15; i++ ) {
            var p = Math.random();
            var bullet = null; 
            if ( p <= 0.4) {
                bullet = new NormalBullet();
            } else if ( p <= 0.7 ) {
                bullet = new FastBullet();
            } else {
                bullet = new WaveBullet();
            }
            bullet.randomPosition();
            bullet.setPositionX( 100 - 150 * i );
            this.addChild( bullet );
            bullet.scheduleUpdate();

            this.bullets.push( bullet );
        }

        this.life = 10;
        this.lifeLabel = cc.LabelTTF.create( 10, 'Arial', 32 );
        this.lifeLabel.setPosition( cc.p( 700, 550 ) );
        this.addChild( this.lifeLabel );
        
        this.addKeyboardHandlers();
        this.scheduleUpdate();
        
        return true;
    },

    update: function( dt ) {
        var self = this;
        this.bullets.forEach( function( bullet, i ) {
            var x = bullet.getPositionX();
            if ( ( x < screenWidth ) &&
                 ( x > screenWidth - 100 ) ) {
                var y = bullet.getPositionY();
                if ( Math.abs( y - self.ship.getPositionY() ) < 25 ) {
                    bullet.randomPosition();
                    self.life -= 1;
                    self.lifeLabel.setString( self.life );
                    if ( self.life == 0 ) {
                        var gameOverLabel = cc.LabelTTF.create( 'Game over', 'Arial', 60 );
                        gameOverLabel.setPosition( cc.p( 400, 300 ) );
                        self.addChild( gameOverLabel );
                        cc.director.pause();
                    }
                    return;
                }
            }
            if ( x > screenWidth ) {
                bullet.randomPosition();
            }
        });
    },
    
    onKeyDown: function( keyCode, event ) {
        if ( keyCode == cc.KEY.up ) {
            var y = this.ship.getPositionY();
            if ( y < screenHeight - 10 ) {
                y += 10;
                this.ship.setPositionY( y );
            }
        } else if ( keyCode == cc.KEY.down ) {
            var y = this.ship.getPositionY();
            if ( y > 10 ) {
                y -= 10;
                this.ship.setPositionY( y );
            }
        }
    },
    
    onKeyUp: function( keyCode, event ) {
    },
    
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    }
});
 
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
