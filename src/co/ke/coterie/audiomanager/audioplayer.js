/**
 * @package   Audio Player
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * Extends co.ke.coterie.audio.Manager 
 * Creates a player interface
 */

goog.provide('AudioPlayer');
goog.provide('co.ke.coterie.audio.Player');

goog.require('co.ke.coterie.audio.Sound');
goog.require('co.ke.coterie.audio.Manager');


/**
 * @constructor
 * @extends {co.ke.coterie.audio.Manager}
 * This class will manage the interaction between the UI and the audio manager
*/
co.ke.coterie.audio.Player = function()
{
	co.ke.coterie.audio.Manager.call(this);
}

goog.inherits( co.ke.coterie.audio.Player, co.ke.coterie.audio.Manager );

/**
 * @type {goog.ui.Control}
 */
co.ke.coterie.audio.Player.prototype.playButton;

/**
 * @type {goog.ui.Control}
 */
co.ke.coterie.audio.Player.prototype.nextButton;

/**
 * @type {goog.ui.Control}
 */
co.ke.coterie.audio.Player.prototype.prevButton;

/**
 * @type {goog.ui.Control}
 */
co.ke.coterie.audio.Player.prototype.volumeSlider;

/**
 * @type {goog.ui.Control}
 */
co.ke.coterie.audio.Player.prototype.seekBar;



AudioPlayer = new co.ke.coterie.audio.Player;

goog.exportSymbol( 'AudioPlayer', AudioPlayer );
