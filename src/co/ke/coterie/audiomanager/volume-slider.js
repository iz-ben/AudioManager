/**
 * @package   Audio Player
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 */
 
goog.provide('co.ke.coterie.audio.player.VolumeControl');

goog.require('goog.events.EventType');
goog.require('goog.events.EventTarget');
goog.require('goog.ui.Control');
goog.require('goog.ui.Popup');
goog.require('goog.ui.Slider');


/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @param {Element} trigger
 * @param {number=} opt_volume
*/
co.ke.coterie.audio.player.VolumeControl = function( trigger, opt_volume )
{
	goog.events.EventTarget.call(this);
	
	/**
	 * The parent contains the section where we'll insert the volume slider.
	 * When the volume slider is within the trigger button control it is not possible to monitor
	 */
	var parent = goog.dom.getAncestor(trigger),
	
	volumePopupEl = goog.dom.createDom( 'div', {'class':'volume-popup','style':'display:none;'}),
	
	volumeSliderEl = goog.dom.createDom( 'div', {'class':'volume-slider'});
	
	volumePopupEl.appendChild( volumeSliderEl );
	
	this.setVolume( opt_volume || this.getVolume() );
	
	this.triggerButton = new goog.ui.Control();
	
	this.triggerButton.render( trigger );
	
	this.volumeSlider= new goog.ui.Slider();
	this.volumeSlider.setOrientation(goog.ui.Slider.Orientation.VERTICAL);
	this.volumeSlider.createDom();
	this.volumeSlider.render( volumeSliderEl );
	
	this.volumePopup = new goog.ui.Popup( volumePopupEl );
	this.volumePopup.setHideOnEscape(true);
	this.volumePopup.setAutoHide(true);
	
	
}

goog.inherits( co.ke.coterie.audio.player.VolumeControl, goog.events.EventTarget );

/**
 * @enum {string}
 */
co.ke.coterie.audio.player.VolumeControl.EventType = {
	VOLUMECHANGE:goog.events.getUniqueId('volumechange')
}

/**
 * @type {number}
 */
co.ke.coterie.audio.player.VolumeControl.prototype.volume_ = 50;



/**
 * @type {goog.ui.Control}
 */
co.ke.coterie.audio.player.VolumeControl.prototype.triggerButton;

/**
 * @type {goog.ui.Slider}
 */
co.ke.coterie.audio.player.VolumeControl.prototype.volumeSlider;

/**
 * @type {goog.ui.Popup}
 */
co.ke.coterie.audio.player.VolumeControl.prototype.volumePopup;


co.ke.coterie.audio.player.VolumeControl.prototype.getVolume = function()
{
	return this.volume_;
}

/**
 * @param {number} volume
 */
co.ke.coterie.audio.player.VolumeControl.prototype.setVolume = function( volume )
{
	this.volume_ = volume;
	
	this.dispatchEvent( co.ke.coterie.audio.player.VolumeControl.EventType.VOLUMECHANGE );
}

/**
 *
 */
co.ke.coterie.audio.player.VolumeControl.prototype.displaySlider = function()
{
	//this.volumePopup
}