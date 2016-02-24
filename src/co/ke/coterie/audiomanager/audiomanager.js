/**
 * @package   Audio Manager
 * @author    Ben <ben@coterie.co.ke>
 * @link      http://coterie.co.ke
 * Pure HTML5 Web Audio sound manager based on Scottschiller's SoundManager2
 * https://github.com/scottschiller/SoundManager2
 * References:
 *  - https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/buffering_seeking_time_ranges
 *  - https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery
 *  - http://html5doctor.com/html5-audio-the-state-of-play/
 *  - http://www.w3schools.com/tags/ref_av_dom.asp
 *  - https://www.w3.org/wiki/HTML/Elements/audio
 */
 
goog.provide('co.ke.coterie.audio.Manager');

goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.EventTarget');

goog.require('co.ke.coterie.audio.Sound');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
*/
co.ke.coterie.audio.Manager = function()
{
	goog.events.EventTarget.call(this);	
}
goog.inherits( co.ke.coterie.audio.Manager, goog.events.EventTarget );

/**
 * @enum {string}
 */
co.ke.coterie.audio.Manager.EventType = {
	ERROR: goog.events.getUniqueId('error'),
	PAUSE: goog.events.getUniqueId('pause'),
	PLAY: goog.events.getUniqueId('play'),
	PLAYLISTCHANGE:goog.events.getUniqueId('playlistchange'),
	SOUNDCHANGE:goog.events.getUniqueId('soundchange'),
	READY: goog.events.getUniqueId('ready'),
	RESUME: goog.events.getUniqueId('resume'),
	STOP: goog.events.getUniqueId('stop'),
	VOLUMECHANGE:goog.events.getUniqueId('volumechange')
}


/**
 * @type {boolean}
 * @private
 */
co.ke.coterie.audio.Manager.prototype.ready_ = false;

/**
 * @type {boolean}
 * @private
 */
co.ke.coterie.audio.Manager.prototype.playing_ = false;

/**
 * @type {number}
 * @private
 * Volume will range between 0 and 100
 * Default volume is 50
 */
co.ke.coterie.audio.Manager.prototype.volume_ = 0;

/**
 * @type {Array.<co.ke.coterie.audio.Sound>}
 * @private
 */
co.ke.coterie.audio.Manager.prototype.sounds_;

/**
 * @type {co.ke.coterie.audio.Sound}
 */
co.ke.coterie.audio.Manager.prototype.activeSound;

/**
 * @return {number}
 */
co.ke.coterie.audio.Manager.prototype.getVolume = function()
{
	return this.volume_;
}

/**
 * @return {boolean}
 */
co.ke.coterie.audio.Manager.prototype.isReady = function()
{
	return this.ready_;
}

/**
 * @return {boolean}
 */
co.ke.coterie.audio.Manager.prototype.isPlaying = function()
{
	return this.playing_;
}


/**
 * @param {number} volume
 * Dispatches co.ke.coterie.audio.Manager.EventType.VOLUMECHANGE event
 */
co.ke.coterie.audio.Manager.prototype.setVolume = function( volume )
{
	this.volume_ = volume >= 0 && volume <=100 ? volume : this.volume_ ;
	
	this.dispatchEvent( co.ke.coterie.audio.Manager.EventType.VOLUMECHANGE );
}

/**
 * @param {co.ke.coterie.audio.Sound} sound
 * @private
 */
co.ke.coterie.audio.Manager.prototype.addSound = function( sound )
{
	this.sounds_ = this.sounds_ || [];
	
	this.sounds_.push( sound );
	
	this.activeSound = this.activeSound || sound;
	
	this.dispatchEvent( co.ke.coterie.audio.Manager.EventType.PLAYLISTCHANGE );
}

/**
 * @return {Array.<co.ke.coterie.audio.Sound>}
 * @private
 */
co.ke.coterie.audio.Manager.prototype.getSounds = function()
{
	return this.sounds_;
}

/**
 * @param {string} soundUrl
 * @param {string} title
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.createSound = function( soundUrl, title )
{
	var sound = new co.ke.coterie.audio.Sound( this, soundUrl, title );
	
	this.addSound(sound);
}

/**
 * @expose
 * @param {number} soundId
 */
co.ke.coterie.audio.Manager.prototype.playSound = function(soundId)
{
	var sounds = this.getSounds(),
	
	sound = soundId < sounds.length ? sounds[soundId] : null;
	
	if(sound && sound!==this.activeSound)
	{
		this.activeSound = sound;
		
		this.dispatchEvent( co.ke.coterie.audio.Manager.EventType.SOUNDCHANGE );
		
		this.play();
	}
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.play = function()
{
	this.activeSound.play();
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.pause = function()
{
	this.activeSound.pause();
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.togglePlay = function()
{
	
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.resume = function()
{
	
}