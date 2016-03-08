/**
 * @package   AudioManager
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
 *  - https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery/Web_Audio_API_cross_browser
 *  - https://developer.mozilla.org/en-US/Apps/Build/Audio_and_video_delivery
 *  - https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
 *  - http://www.mathsisfun.com/algebra/sohcahtoa.html
 *  - https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
 */
 
goog.provide('co.ke.coterie.audio.Manager');

goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.EventTarget');

goog.require('co.ke.coterie.audio.Sound');
goog.require('co.ke.coterie.audio.SoundCloud');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
*/
co.ke.coterie.audio.Manager = function()
{
	goog.events.EventTarget.call(this);
	
	//initiate animation frame
	this.animationFrame = window.requestAnimationFrame( goog.bind( this.animationFrameManager, this ) );
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
	VOLUMECHANGE:goog.events.getUniqueId('volumechange'),
	SOUNDCLOUDRESOLVED:goog.events.getUniqueId('soundcloudresolved')
}

/**
 * @enum {string}
 */
co.ke.coterie.audio.Manager.MESSAGE = {
	NOTSTREAMABLE:'The soundcloud audio you provided is not streamable'
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
co.ke.coterie.audio.Manager.prototype.volume_ = 50;

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
 * Animation frame id
 * @type {number}
 */
co.ke.coterie.audio.Manager.prototype.animationFrame = 0;

/**
 * Frequency Data
 * @type {Uint8Array}
 */
co.ke.coterie.audio.Manager.prototype.frequencyData;

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
 * @param {co.ke.coterie.audio.Sound|null} sound
 * @param {number=} index
 * @private
 * @return {number}
 */
co.ke.coterie.audio.Manager.prototype.addSound = function( sound, index )
{
	this.sounds_ = this.sounds_ || [];
	
	if(sound)
	{
		this.activeSound = this.activeSound || sound;
	}
	
	if(index)
	{
		this.sounds_[index] = sound;
	}else
	{
		this.sounds_.push( sound );
	}
	
	this.dispatchEvent( co.ke.coterie.audio.Manager.EventType.PLAYLISTCHANGE );
	
	return this.sounds_.length - 1;
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
 * @param {string=} title
 * @expose
 * @return {number}
 */
co.ke.coterie.audio.Manager.prototype.createSound = function( soundUrl, title )
{
	if( co.ke.coterie.audio.SoundCloud.isSoundCloud( soundUrl ) )
	{
		var index = this.addSound( null ),
		
		audioManager = this,
		
		promise = new Promise(goog.bind(function( addSound )
		{
			var soundcloud = new co.ke.coterie.audio.SoundCloud( soundUrl );
			
			soundcloud.success = function( payload )
			{
				console.info('Audio Track ' + soundUrl + ' resolved');
				
				if(!payload['streamable'])
				{
					console.info(co.ke.coterie.audio.Manager.MESSAGE.NOTSTREAMABLE);
					
					return;
				}
				var streamuri = new goog.Uri( payload['stream_url'] );
				
				streamuri.setParameterValue('client_id', co.ke.coterie.audio.SoundCloud.API_KEY );	
				
				var sound = new co.ke.coterie.audio.Sound( audioManager, streamuri.toString(), title||'' );
				
				addSound.call(  audioManager, sound, index );
			}
			
			soundcloud.resolve();
			
		}, this, this.addSound));
		
		return index;
	}
	var sound = new co.ke.coterie.audio.Sound( this, soundUrl, title||'' );
	
	return this.addSound(sound);
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
		this.activeSound.pause();
		
		this.activeSound = sound;
		
		this.frequencyData = new Uint8Array(this.activeSound.getAnalyser()['frequencyBinCount']);
		
		this.dispatchEvent( co.ke.coterie.audio.Manager.EventType.SOUNDCHANGE );
		
		this.play();
	}
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.play = function()
{
	this.playing_ = true;
	
	this.activeSound.play();
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.pause = function()
{
	this.playing_ = false;
	
	this.activeSound.pause();
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.togglePlay = function()
{
	this.isPlaying() ? this.pause(): this.play();
}

/**
 * @expose
 */
co.ke.coterie.audio.Manager.prototype.resume = function()
{
	this.play();
}

/**
 * @expose
 * @type {Function|null|undefined}
 */
co.ke.coterie.audio.Manager.prototype.byteFrequencyData;

co.ke.coterie.audio.Manager.prototype.processFrequencyData = function()
{
	if(!this.isPlaying())
		return;
	
	this.activeSound.getAnalyser()['getByteFrequencyData']( this.frequencyData );
	
	if(typeof this.byteFrequencyData == 'function')
	{
		this.byteFrequencyData( this.frequencyData );
	}
	
	//console.log(this.frequencyData);
}

co.ke.coterie.audio.Manager.prototype.animationFrameManager = function()
{
	this.animationFrame = window.requestAnimationFrame( goog.bind( this.animationFrameManager, this ) );
	
	this.processFrequencyData();
	
	//console.log(this.animationFrame);
}

/**
 * @expose
 * Set the Soundcloud client key
 */
co.ke.coterie.audio.Manager.prototype.setSCKey = function( key )
{
	co.ke.coterie.audio.SoundCloud.API_KEY = key;	
}